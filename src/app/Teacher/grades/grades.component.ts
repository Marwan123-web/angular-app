import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { User, Role } from '../../_models';
import { Router, ActivatedRoute } from '@angular/router';
import { TeacherServiceService } from 'src/app/services/teacher-service.service';
import { CourseService } from 'src/app/services/course.service';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-grades',
  templateUrl: './grades.component.html',
  styleUrls: ['./grades.component.css']
})
export class GradesComponentt implements OnInit {



  currentUser: User;

  // _id: string;
  currentCourse: any;
  courseStudentsGrades: any;
  GradeTypeGrade: any;
  gradetype: any;
  courseGradeData: any;
  courseGrades: any;
  x: any;
  things: any[][];
  coursedata: any;
  useragrade: any;
  courseusers: any;
  userdata: any;
  usertotalgrades: any;
  arrayofusersdata: Array<object> = [];
  usertotalgradestotal: Array<object> = [];
  fakedata: any;
  courseTotalGrades: any;
  coursegrades: any;
  constructor(
    private router: Router,
    private authenticationService: AuthService,
    private teacherservices: TeacherServiceService,
    private _Activatedroute: ActivatedRoute,
    private courseService: CourseService,

  ) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    this.currentCourse = this.courseService.currentCourseValue;
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
      this.coursedata=res;
      this.coursegrades = res.grades
      for (let i = 0; i < this.coursegrades.length; i++) {
        this.teacherservices.studentsGradesheet(x, this.currentCourse.courseCode, this.coursegrades[i].type).subscribe(res => {
          this.useragrade = res;
          this.things[y][i] = this.useragrade;

        }, err => {
          this.useragrade = err
        });

      }
    }, err => {
      this.coursegrades = err
    });
  }
  ngOnInit(): void {

    this.teacherservices.totalCourseGrades(this.currentCourse.courseCode).subscribe(res => {
      this.courseTotalGrades = res
    }, err => {
      this.courseTotalGrades = err
    });
    this.teacherservices.getCourseStudentsSheet(this.currentCourse.courseCode).subscribe(res => {
      this.courseusers = res;
      for (let y = 0; y < this.courseusers.length; y++) {
        this.teacherservices.profile(this.courseusers[y]._id).subscribe(res => {
          this.userdata = res

          this.teacherservices.studentTotalGrades(this.courseusers[y]._id, this.currentCourse.courseCode).subscribe(res => {
            this.usertotalgrades = res
            this.usertotalgradestotal[y] = this.usertotalgrades;
          }, err => {
            this.usertotalgrades = err
          });

          this.arrayofusersdata[y] = this.userdata;
          this.things[y] = [];
          this.getcoursedata(this.userdata._id, y);
        }, err => {
          this.userdata = err
        });

      }
    }, err => {
      this.courseusers = err;
    });



  }

}
