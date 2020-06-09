import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { User, Role } from '../../_models';
import { Router, ActivatedRoute } from '@angular/router';
import { TeacherServiceService } from 'src/app/services/teacher-service.service';
import { CourseService } from 'src/app/services/course.service';
import { Course } from 'src/app/_models/course';

@Component({
  selector: 'app-attendme',
  templateUrl: './attendme.component.html',
  styleUrls: ['./attendme.component.scss']
})
export class AttendmeComponent implements OnInit {

  currentUser: User;
  currentCourse: Course;
  _id: string;
  coursesdata: any;

  lectureNumber: string;
  lectureLocation: string;
  beaconId: string;
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
  get isStudent() {
    return this.currentUser && this.currentUser.role === Role.Student;
  }
  get isTeacher() {
    return this.currentUser && this.currentUser.role === Role.Teacher;
  }

  get isTeacherOrStudent() {
    return this.currentUser && (this.currentUser.role === Role.Teacher || this.currentUser.role === Role.Student);
  }
  attendMe(lectureNumber: HTMLInputElement, beaconId: HTMLInputElement) {
    this.lectureNumber = lectureNumber.value, this.beaconId = beaconId.value;
    let response = document.getElementById('response');
    let error = document.getElementById('error');
    this.teacherservices.attendMe(this.currentUser._id, this.currentCourse.courseCode, this.lectureNumber, this.beaconId).subscribe(res => {
      this.response = res;
      if (error.classList.contains('d-block')) {
        error.classList.replace('d-block', 'd-none');
      }
      response.classList.replace('d-none', 'd-block');
      response.innerHTML = this.response.msg;

      lectureNumber.value = "";
      beaconId.value = "";
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
