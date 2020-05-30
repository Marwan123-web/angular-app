import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { User, Role } from '../../_models';
import { Router, ActivatedRoute } from '@angular/router';
import { TeacherServiceService } from 'src/app/services/teacher-service.service';
import { CourseService } from 'src/app/services/course.service';
import { Course } from 'src/app/_models/course';

@Component({
  selector: 'app-grades',
  templateUrl: './grades.component.html',
  styleUrls: ['./grades.component.css']
})
export class GradesComponent implements OnInit {
  currentUser: User;
  currentCourse: Course;
  GradeTypeGrade: any;
  studentgrades: any;
  gradetype: any;
  arrofdata: Array<any> = [];
  x: any;
  mydata: any;
  courseTotalGrades: any;
  usertotalgrades: any;
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
    this.teacherservices.totalCourseGrades(this.currentCourse.courseCode).subscribe(res => {
      this.courseTotalGrades = res
      console.log(this.courseTotalGrades)

    }, err => {
      this.courseTotalGrades = err
    });

    this.teacherservices.studentTotalGrades(this.currentUser._id, this.currentCourse.courseCode).subscribe(res => {
      this.usertotalgrades = res
      console.log(this.usertotalgrades)
    }, err => {
      this.usertotalgrades = err
    });

    this.teacherservices.getCourseData(this.currentCourse.courseCode).subscribe(res => {
      // console.log(this.currentCourse.courseCode)
      this.GradeTypeGrade = res.grades;
      // this.teacherservices.profile(this.currentUser._id).subscribe(res => {
      //   this.mydata = res
      // }, err => {
      //   this.mydata = err;
      // });
      for (let i = 0; i < this.GradeTypeGrade.length; i++) {
        this.teacherservices.getMyCourseGrades(this.currentUser._id, this.currentCourse.courseCode, this.GradeTypeGrade[i].type).subscribe(res => {
          this.studentgrades = res[0];
          if (this.studentgrades) {
            this.arrofdata.push(this.studentgrades);

          }
        }, err => {
          this.studentgrades = err;
        });

      }


    }, err => {
      this.GradeTypeGrade = err;
    }
    );




  }

}
