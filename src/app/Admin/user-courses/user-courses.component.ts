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
  selector: 'app-user-courses',
  templateUrl: './user-courses.component.html',
  styleUrls: ['./user-courses.component.scss']
})
export class UserCoursesComponent implements OnInit {
  currentClickedUser: User;
  currentCourse: Course;
  currentCourseSemester: Semester;

  _id: any;
  userdata: any;
  usercoursesdata: any;
  usercoursesdata2: any;
  data: any[];
  coursedata: Array<any> = [];
  coursedataarr: Array<any> = [];
  x: any;


  arr: any[];
  coursesdata: any;
  semesterdata: any;
  status: any;

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
    this.status = event.target.value;
    this.adminservices.myCoursesByStatus(this.currentClickedUser._id, this.status).subscribe(res => {
      this.usercoursesdata = res;
      this.arr = []
      if (res) {
        for (let i = 0; i < res.length; i++) {
          this.adminservices.getCourseSemesterData(this.usercoursesdata[i].Id, this.usercoursesdata[i].semester_time).subscribe(res => {
            this.coursesdata = res;
            this.semesterdata = this.coursesdata.semesters[0]
            var objectC = { ...this.usercoursesdata[i], ...this.coursesdata };
            this.arr[i] = objectC
          }, err => {
            this.coursesdata = err
          }
          );
        }
      }

    }, err => {
      this.usercoursesdata = err
    }
    );
  }
  ngOnInit(): void {

    this.adminservices.myCourses(this.currentClickedUser._id).subscribe(res => {
      this.usercoursesdata = res;
      this.arr = []
      if (res) {
        for (let i = 0; i < res.length; i++) {
          this.adminservices.getCourseSemesterData(this.usercoursesdata[i].Id, this.usercoursesdata[i].semester_time).subscribe(res => {
            this.coursesdata = res;
            this.semesterdata = this.coursesdata.semesters[0]
            var objectC = { ...this.usercoursesdata[i], ...this.coursesdata };
            this.arr[i] = objectC
          }, err => {
            this.coursesdata = err
          }
          );
        }
      }
    }, err => {
      this.usercoursesdata = err
    }
    );

  }
  closClickedUser() {
    this.userserviceService.closeClickedUser();
  }
  openClickedUser(id) {
    this.userserviceService.getClickedUser(id).pipe(first()).subscribe(res => {
    }, err => {
      console.log('Fail to get Course');
    }
    );
  }
  closCourse() {
    this.courseService.closeCourse();
  }
  openCourse(courseCode) {
    this.courseService.getCourse(courseCode).pipe(first()).subscribe(res => {
    }, err => {
      console.log('Fail to get Course');
    }
    );
  }

  closSemester() {
    this.semesterserviceService.closeSemester();
  }
  openSemester(courseCode, semester_time) {
    this.semesterserviceService.getCourseSemesterData(courseCode, semester_time).pipe(first()).subscribe(res => {
    }, err => {
      console.log('Fail to get Course Semester');
    }
    );
  }
}
