import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { User, Role } from '../../_models';
import { Router, ActivatedRoute } from '@angular/router';
import { TeacherServiceService } from 'src/app/services/teacher-service.service';
import { CourseService } from 'src/app/services/course.service';
import { Course } from 'src/app/_models/course';
@Component({
  selector: 'app-update-student-grade',
  templateUrl: './update-student-grade.component.html',
  styleUrls: ['./update-student-grade.component.scss']
})
export class UpdateStudentGradetComponent implements OnInit {
  currentUser: User;
  currentCourse: Course;
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
    this.currentUser = this.authenticationService.currentUserValue;
  }


  coursedata: any;
  gradeType: any;
  studentId: any;
  score: any;
  studentedata: any;

  selectChangeHandler(event: any) {
    //update the ui
    this.gradeType = event.target.value;
  }
  updateStudentGradefun(studentId: HTMLInputElement, score: HTMLInputElement) {


    this.studentId = studentId.value, this.score = score.value;
    let response = document.getElementById('response');
    let error = document.getElementById('error');
    this.teacherservices.updateStudentGrade(this.currentCourse.courseCode, this.studentId, this.gradeType, this.score).subscribe(res => {
      this.response = res;
      if (error.classList.contains('d-block')) {
        error.classList.replace('d-block', 'd-none');
      }
      response.classList.replace('d-none', 'd-block');
      response.innerHTML = this.response.msg;

      studentId.value = "";
      score.value = "";
    }, err => {
      this.error = err.error;
      if (response.classList.contains('d-block')) {
        response.classList.replace('d-block', 'd-none');
      }
      error.classList.replace('d-none', 'd-block');
      error.innerHTML = this.error.msg;
    }
    );
  };
  ngOnInit(): void {

    this.teacherservices.getCourseData(this.currentCourse.courseCode).subscribe(res => {
      this.coursedata = res;
    }, err => {
      this.coursedata = err
    }
    );

  }
}
