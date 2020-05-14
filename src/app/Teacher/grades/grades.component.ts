import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { User, Role } from '../../_models';
import { Router, ActivatedRoute } from '@angular/router';
import { TeacherServiceService } from 'src/app/services/teacher-service.service';
import { CourseService } from 'src/app/services/course.service';

@Component({
  selector: 'app-grades',
  templateUrl: './grades.component.html',
  styleUrls: ['./grades.component.css']
})
export class GradesComponentt implements OnInit {



  currentUser: User;

  _id: string;
  currentCourse: any;
  courseStudentsGrades: any;
  GradeTypeGrade: any;
  gradetype: any;
  courseGradeData: any;
  courseGrades: any;
  x: any;
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
  get isStudent() {
    return this.currentUser && this.currentUser.role === Role.Student;
  }
  get isTeacher() {
    return this.currentUser && this.currentUser.role === Role.Teacher;
  }

  get isTeacherOrStudent() {
    return this.currentUser && (this.currentUser.role === Role.Teacher || this.currentUser.role === Role.Student);
  }

  selectChangeHandler(event: any) {
    //update the ui
    this.gradetype = event.target.value;
    this.teacherservices.getCourseStudentsGrades(this.currentCourse.courseCode, this.gradetype).subscribe(res => {
      this.courseStudentsGrades = res;
    }, err => {
      this.courseStudentsGrades = err;
    });

    this.teacherservices.getCourseGrades(this.currentCourse.courseCode, this.gradetype).subscribe(res => {
      this.GradeTypeGrade = res;
    }, err => {
      this.GradeTypeGrade = err;
    });
  }
  ngOnInit(): void {

    this.teacherservices.getCourseData(this.currentCourse.courseCode).subscribe(res => {
      this.courseGradeData = res;
      this.x = this.courseGradeData.grades[0].type;
      if (this.x ) {
        this.teacherservices.getCourseGrades(this.currentCourse.courseCode, this.x).subscribe(res => {
          this.GradeTypeGrade = res;
          this.teacherservices.getCourseStudentsGrades(this.currentCourse.courseCode, this.x).subscribe(res => {
            this.courseStudentsGrades = res;
          }, err => {
            this.courseStudentsGrades = err;
          });
        }, err => {
          this.GradeTypeGrade = err;
        });
      }
    }, err => {
      this.courseGradeData = err;
    });



  }

}
