import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { User, Role } from '../../_models';
import { Router, ActivatedRoute } from '@angular/router';
import { TeacherServiceService } from 'src/app/services/teacher-service.service';
import { CourseService } from 'src/app/services/course.service';
import { Course } from 'src/app/_models/course';
import { Semester } from '../../_models/semester';
import { SemesterserviceService } from 'src/app/services/semesterservice.service';
@Component({
  selector: 'app-courses-registeration',
  templateUrl: './courses-registeration.component.html',
  styleUrls: ['./courses-registeration.component.scss']
})
export class CoursesRegisterationComponent implements OnInit {
  currentUser: User;
  currentCourse: Course;
  currentCourseSemester: Semester;
  _id: any;
  userdata: any;
  courseCode: string;
  course: any;
  allCourses: any;
  response: any;
  error: any;
  constructor(
    private router: Router,
    private authenticationService: AuthService,
    private teacherservices: TeacherServiceService,
    private _Activatedroute: ActivatedRoute,
    private courseService: CourseService,
    private semesterserviceService: SemesterserviceService

  ) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    this.currentUser = this.authenticationService.currentUserValue;
    this.currentCourse = this.courseService.currentCourseValue;
    this.currentCourseSemester = this.semesterserviceService.currentCourseSemesterValue;
  }
  selectChangeHandler(event: any) {
    //update the ui
    this.course = event.target.value;
  }

  addUserCourse() {

    let response = document.getElementById('response');
    let error = document.getElementById('error');
    this.teacherservices.addUserCourse(this.currentUser._id, this.course).subscribe(res => {
      this.response = res;
      if (error.classList.contains('d-block')) {
        error.classList.replace('d-block', 'd-none');
      }
      response.classList.replace('d-none', 'd-block');
      response.innerHTML = this.response.msg;
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
  deleteUserCourse() {

    let response = document.getElementById('response');
    let error = document.getElementById('error');
    this.teacherservices.deleteUserCourse(this.currentUser._id, this.course).subscribe(res => {
      this.response = res;
      if (error.classList.contains('d-block')) {
        error.classList.replace('d-block', 'd-none');
      }
      response.classList.replace('d-none', 'd-block');
      response.innerHTML = this.response.msg;
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
    this.teacherservices.getActiveCourses().subscribe(res => {
      this.allCourses = res;
    }, err => {
      this.allCourses = err
    }
    );
  }
}

