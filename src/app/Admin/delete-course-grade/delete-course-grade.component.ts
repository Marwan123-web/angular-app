import { Component, OnInit } from '@angular/core';
import { AdminservicesService } from 'src/app/services/adminservices.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UserserviceService } from 'src/app/services/userservice.service';
import { CourseService } from 'src/app/services/course.service';
import { SemesterserviceService } from 'src/app/services/semesterservice.service';
import { User } from '../../_models';
import { Course } from '../../_models/course';
import { Semester } from '../../_models/semester';
import { first } from 'rxjs/operators';
@Component({
  selector: 'app-delete-course-grade',
  templateUrl: './delete-course-grade.component.html',
  styleUrls: ['./delete-course-grade.component.scss']
})
export class DeleteCourseGradeComponent implements OnInit {
  currentClickedUser: User;
  currentCourse: Course;
  currentCourseSemester: Semester;

  _id: any;
  gradetype: any;
  grade: any;
  response: any;
  coursedata: any;
  error: any;
  semester_time: string;

  constructor(private adminservices: AdminservicesService, private _Activatedroute: ActivatedRoute,
    private _router: Router,
    private userserviceService: UserserviceService,
    private courseService: CourseService,
    private semesterserviceService: SemesterserviceService
  ) {
    this.currentClickedUser = this.userserviceService.currentClickedUserValue;
    this.currentCourse = this.courseService.currentCourseValue;
    this.currentCourseSemester = this.semesterserviceService.currentCourseSemesterValue;
  }
  sub: any;
  selectChangeHandler(event: any) {
    //update the ui
    this.gradetype = event.target.value;
  }
  deleteCourseGrade() {


    let response = document.getElementById('response');
    let error = document.getElementById('error');
    this.adminservices.deleteCourseSemesterGrade(this.currentCourse.courseCode, this.currentCourseSemester.semesters[0].semester_time, this.gradetype).subscribe(res => {
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
    this.adminservices.getCourseSemesterData(this.currentCourse.courseCode, this.currentCourseSemester.semesters[0].semester_time).subscribe(res => {
      this.coursedata = res.semesters[0];
    }, err => {
      this.coursedata = err
    }
    );
  }

}
