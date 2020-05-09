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
    this.lectureNumber = lectureNumber.value, this.beaconId = beaconId.value,
      this.teacherservices.attendMe(this.currentUser._id, this.currentCourse.courseCode, this.lectureNumber, this.beaconId).subscribe(res => {
        // console.log(this.currentCourse.courseCode)
        console.log('Done');
        lectureNumber.value = "";
        beaconId.value = "";

      }, err => {
        console.log('Fail');
      }
      );
  }

  ngOnInit(): void {



  }

}
