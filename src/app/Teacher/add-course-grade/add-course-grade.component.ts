import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { User, Role } from '../../_models';
import { Router, ActivatedRoute } from '@angular/router';
import { TeacherServiceService } from 'src/app/services/teacher-service.service';
import { CourseService } from 'src/app/services/course.service';
import { Course } from 'src/app/_models/course';

@Component({
  selector: 'app-add-course-grade',
  templateUrl: './add-course-grade.component.html',
  styleUrls: ['./add-course-grade.component.scss']
})
export class TeacherAddCourseGradeComponent implements OnInit {
  currentUser: User;
  currentCourse: Course;
  _id: any;
  gradetype: any;
  grade: any;
  response: any;
  error: any;
  constructor(
    private router: Router,
    private authenticationService: AuthService,
    private teacherservices: TeacherServiceService,
    private _Activatedroute: ActivatedRoute,
    private courseService: CourseService,

  ) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    this.currentCourse = this.courseService.currentCourseValue;
  }
  sub: any;

  addCourseGrade(type: HTMLInputElement, grade: HTMLInputElement) {
    this.gradetype = type.value, this.grade = grade.value;
    let response = document.getElementById('response');
    let error = document.getElementById('error');
    this.teacherservices.addCourseGrade(this.currentCourse.courseCode, this.gradetype, this.grade).subscribe(res => {
      this.response = res;
      if (error.classList.contains('d-block')) {
        error.classList.replace('d-block', 'd-none');
      }
      response.classList.replace('d-none', 'd-block');
      response.innerHTML = this.response.msg;


      type.value = '';
      grade.value = "";
    }, err => {
      this.error = err.error;
      if (response.classList.contains('d-block')) {
        response.classList.replace('d-block', 'd-none');
      }
      error.classList.replace('d-none', 'd-block');
      error.innerHTML = this.error.msg;
    }
    );
  }
  ngOnInit(): void {

  }

}
