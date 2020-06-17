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
  selector: 'app-course-semesters',
  templateUrl: './course-semesters.component.html',
  styleUrls: ['./course-semesters.component.scss']
})
export class CourseSemestersComponent implements OnInit {
  currentClickedUser: User;
  currentCourse: Course;
  currentCourseSemester: Semester;

  _id: any;
  coursedata: any;
  numberofusers: any;
  coursesemesters: any;
  courseStatusCahnge: any;
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
  changeto: string;
  sub: any;
  getcoursedata() {
    this.adminservices.getCourseData(this.currentCourse.courseCode).subscribe(res => {
      this.coursedata = res;
      this.coursesemesters = res.semesters;
    }, err => {
      this.coursedata = err
    }
    );
  }
  ngOnInit(): void {
    this.getcoursedata();
  }
  changecoursestatus(status) {
    if (status == "active") {
      this.changeto = "finished"
    }
    else if (status == "finished") {
      this.changeto = "active"
    }
    this.adminservices.changeCourseStatus(this.currentCourse.courseCode, this.changeto).subscribe(res => {
      this.courseStatusCahnge = res;
      this.getcoursedata();
    }, err => {
      this.courseStatusCahnge = err
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
