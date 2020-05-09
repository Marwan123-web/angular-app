import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { User, Role } from '../../_models';
import { Router, ActivatedRoute } from '@angular/router';
import { TeacherServiceService } from 'src/app/services/teacher-service.service';
import { CourseService } from 'src/app/services/course.service';
import { Course } from 'src/app/_models/course';

@Component({
  selector: 'app-attendance-sheet-student',
  templateUrl: './attendance-sheet-student.component.html',
  styleUrls: ['./attendance-sheet-student.component.scss']
})
export class AttendanceSheetStudentComponent implements OnInit {
  currentUser: User;
  currentCourse: Course;
  mydata: any;
  myattendance: any;

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




  ngOnInit(): void {
    this.teacherservices.profile(this.currentUser._id).subscribe(res => {
      this.mydata = res
    }, err => {
      this.mydata = err;
    });
    this.teacherservices.myattendancesheet(this.currentUser._id,this.currentCourse.courseCode).subscribe(res => {
      this.myattendance = res
    }, err => {
      this.myattendance = err;
    });



  }


}
