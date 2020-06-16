import { Component, OnInit } from '@angular/core';
import { AdminservicesService } from 'src/app/services/adminservices.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-course-semesters',
  templateUrl: './course-semesters.component.html',
  styleUrls: ['./course-semesters.component.scss']
})
export class CourseSemestersComponent implements OnInit {
  _id: any;
  coursedata: any;
  numberofusers: any;
  coursesemesters: any;
  constructor(private adminservices: AdminservicesService, private _Activatedroute: ActivatedRoute,
    private _router: Router) { }
  sub: any;
  ngOnInit(): void {
    this.sub = this._Activatedroute.paramMap.subscribe(params => {
      this._id = params.get('id');
      this.adminservices.getCourseData(this._id).subscribe(res => {
        this.coursedata = res;
        this.coursesemesters = res.semesters;
      }, err => {
        this.coursedata = err
      }
      );
    });
  }

}
