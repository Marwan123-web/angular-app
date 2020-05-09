import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { User, Role } from '../../_models';
import { Router, ActivatedRoute } from '@angular/router';
import { TeacherServiceService } from 'src/app/services/teacher-service.service';
import { CourseService } from 'src/app/services/course.service';
import { Course } from 'src/app/_models/course';

@Component({
  selector: 'app-delete-course-grade',
  templateUrl: './delete-course-grade.component.html',
  styleUrls: ['./delete-course-grade.component.scss']
})
export class TeacherDeleteCourseGradeComponent implements OnInit {
  currentUser: User;
  currentCourse: Course;
  _id: any;
  gradetype: any;
  grade: any;
  response: any;
  coursedata: any;
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

  selectChangeHandler(event: any) {
    //update the ui
    this.gradetype = event.target.value;
  }
  deleteCourseGrade() {

    this.teacherservices.deleteCourseGrade(this.currentCourse.courseCode, this.gradetype).subscribe(res => {
      this.response = res;
      this.teacherservices.getCourseData(this.currentCourse.courseCode).subscribe(res => {
        this.coursedata = res;
      }, err => {
        this.coursedata = err
      }
      );
    }, err => {
      this.response = err;
    }
    );



  }
  ngOnInit(): void {
    this.teacherservices.getCourseData(this.currentCourse.courseCode).subscribe(res => {
      this.coursedata = res;
    }, err => {
      this.coursedata = err
    }
    );

  }

}
