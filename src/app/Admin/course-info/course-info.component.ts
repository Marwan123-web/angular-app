import { Component, OnInit } from '@angular/core';
import { AdminservicesService } from 'src/app/services/adminservices.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CourseService } from 'src/app/services/course.service';

@Component({
  selector: 'app-course-info',
  templateUrl: './course-info.component.html',
  styleUrls: ['./course-info.component.scss']
})
export class CourseInfoComponent implements OnInit {

  _id: any;
  coursedata: any;
  numberofusers: any;
  semester_time: string;
  currentCourse: any;
  coursesemesterdata: any;
  coursaSemesterGrades: any;
  constructor(private adminservices: AdminservicesService, private _Activatedroute: ActivatedRoute, private courseService: CourseService,
    private _router: Router) {
    this.currentCourse = this.courseService.currentCourseValue;
  }
  sub: any;
  ngOnInit(): void {

    this.sub = this._Activatedroute.paramMap.subscribe(params => {
      this._id = params.get('id');
      this.semester_time = params.get('semester');
      // this.adminservices.getCourseStudentsSheet(this._id).subscribe(res => {
      //   this.numberofusers = res.length;
      // }, err => {
      //   this.numberofusers = err
      // }
      // );
      this.adminservices.getCourseSemesterData(this._id, this.semester_time).subscribe(res => {
        this.coursesemesterdata = res.semesters[0];
        this.coursaSemesterGrades = res.semesters[0];
      }, err => {
        this.coursesemesterdata = err
      }
      );
      this.adminservices.getCourseData(this._id).subscribe(res => {
        this.coursedata = res;
      }, err => {
        this.coursedata = err
      }
      );
    });
  }

}
