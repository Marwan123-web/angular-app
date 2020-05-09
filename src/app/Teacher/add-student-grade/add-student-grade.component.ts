import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { User, Role } from '../../_models';
import { Router, ActivatedRoute } from '@angular/router';
import { TeacherServiceService } from 'src/app/services/teacher-service.service';
import { CourseService } from 'src/app/services/course.service';

@Component({
  selector: 'app-add-student-grade',
  templateUrl: './add-student-grade.component.html',
  styleUrls: ['./add-student-grade.component.scss']
})
export class AddCourseStudentGradeComponent implements OnInit {



  currentUser: User;

  _id: string;
  coursedata: any;
  currentCourse: any;
  taskType: string;
  gradeType: any;
  studentId: string;
  score: string;


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
    this.gradeType = event.target.value;
  }
  addStudentGrade(studentId: HTMLInputElement, score: HTMLInputElement) {

    this.studentId = studentId.value, this.score = score.value;

    this.teacherservices.addStudentGrade(this.currentCourse.courseCode, this.studentId, this.gradeType, this.score).subscribe(res => {
      this.coursedata = res;
      this.teacherservices.getCourseData(this.currentCourse.courseCode).subscribe(res => {
        this.coursedata = res;
      }, err => {
        this.coursedata = err
      }
      );
    }, err => {
      this.coursedata = err
    });
    studentId.value = "";
    score.value = "";

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
