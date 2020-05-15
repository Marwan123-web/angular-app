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
export class AttendanceSheetStudentComponentt implements OnInit {
  currentUser: User;
  currentCourse: Course;
  coursedata: any;
  courseusers: any;


  arrayofuserdata: Array<any> = [];
  arrayofstudentattendance: Array<any> = [];
  arrayofstudentattendance2: Array<object> = [];
  lecturesnumber: any;
  data: any;
  lectureattendance: any;

  arrayofusersdata: Array<any> = [];
  attendata: any;
  userdata: any;

  arrofdata: any;
  userattendance: any;


  things: any[][];
  usertotalattendance: any;
  usertotalattendancetotal: Array<object> = [];



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
    this.things = [];
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
  getcoursedata(x, y) {
    this.teacherservices.getCourseData(this.currentCourse.courseCode).subscribe(res => {
      this.coursedata = res.lectures
      this.lecturesnumber = this.coursedata.length;
      for (let i = 0; i < this.coursedata.length; i++) {
        this.teacherservices.studentsAttendancesheet(x, this.currentCourse.courseCode, this.coursedata[i].lectureNumber).subscribe(res => {
          this.userattendance = res;
          this.things[y][i] = this.userattendance;
        }, err => {
          this.userattendance = err
        });

      }
    }, err => {
      this.coursedata = err
    });
  }

  ngOnInit(): void {

    this.teacherservices.getCourseStudentsSheet(this.currentCourse.courseCode).subscribe(res => {
      this.courseusers = res;
      for (let y = 0; y < this.courseusers.length; y++) {
        this.teacherservices.profile(this.courseusers[y]._id).subscribe(res => {
          this.userdata = res

          this.teacherservices.studentTotalAttendance(this.courseusers[y]._id, this.currentCourse.courseCode).subscribe(res => {
            this.usertotalattendance = res
            this.usertotalattendancetotal[y] = this.usertotalattendance;
          }, err => {
            this.usertotalattendance = err
          });
          this.arrayofusersdata[y] = this.userdata;
          this.things[y] = [];
          this.getcoursedata(this.arrayofusersdata[y]._id, y);
        }, err => {
          this.userdata = err
        });

      }
    }, err => {
      this.courseusers = err;
    });


  }

}
