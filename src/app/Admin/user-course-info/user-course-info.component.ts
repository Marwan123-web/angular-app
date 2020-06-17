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
  selector: 'app-user-course-info',
  templateUrl: './user-course-info.component.html',
  styleUrls: ['./user-course-info.component.scss']
})
export class UserCourseInfoComponent implements OnInit {
  currentClickedUser: User;
  currentCourse: Course;
  currentCourseSemester: Semester;
  private _id: string;
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
  GradeTypeGrade: any;
  studentgrades: any;
  gradetype: any;
  arrofdata: Array<any> = [];
  x: any;
  mydata: any;
  courseTotalGrades: any;
  usertotalgrades: any;
  sub: any;
  ngOnInit(): void {
    this.adminservices.totalCourseSemesterGrades(this.currentCourse.courseCode, this.currentCourseSemester.semesters[0].semester_time).subscribe(res => {
      this.courseTotalGrades = res
    }, err => {
      this.courseTotalGrades = err
    });

    this.adminservices.semesterStudentTotalGrades(this.currentClickedUser._id, this.currentCourse.courseCode, this.currentCourseSemester.semesters[0].semester_time).subscribe(res => {
      this.usertotalgrades = res
    }, err => {
      this.usertotalgrades = err
    });

    this.adminservices.getCourseSemesterData(this.currentCourse.courseCode, this.currentCourseSemester.semesters[0].semester_time).subscribe(res => {
      this.GradeTypeGrade = res.semesters[0].grades;
      for (let i = 0; i < this.GradeTypeGrade.length; i++) {
        this.adminservices.getMyCourseSemesterGrades(this.currentClickedUser._id, this.currentCourse.courseCode, this.currentCourseSemester.semesters[0].semester_time, this.GradeTypeGrade[i].type).subscribe(res => {
          this.studentgrades = res;
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
