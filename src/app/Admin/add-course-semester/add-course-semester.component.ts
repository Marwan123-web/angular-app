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
  selector: 'app-add-course-semester',
  templateUrl: './add-course-semester.component.html',
  styleUrls: ['./add-course-semester.component.scss']
})
export class AddCourseSemesterComponent implements OnInit {
  currentClickedUser: User;
  currentCourse: Course;
  currentCourseSemester: Semester;
  _id: any;
  coursedata: any;
  numberofusers: any;
  courseSemester: any;
  semesterYear: string;
  response: any;
  error: any;
  semester_time: any;
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
    this.courseSemester = event.target.value;
  }
  addCourseSemester(year: HTMLInputElement,) {
    this.semesterYear = year.value;
    let response = document.getElementById('response');
    let error = document.getElementById('error');

    this.semester_time = this.courseSemester + " " + this.semesterYear;
    this.adminservices.addCourseSemester(this.currentCourse.courseCode, this.semester_time).subscribe(res => {
      this.response = res;
      if (error.classList.contains('d-block')) {
        error.classList.replace('d-block', 'd-none');
      }
      response.classList.replace('d-none', 'd-block');
      response.innerHTML = this.response.msg;

      year.value = "";

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
