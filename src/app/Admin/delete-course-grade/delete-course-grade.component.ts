import { Component, OnInit } from '@angular/core';
import { AdminservicesService } from 'src/app/services/adminservices.service';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-delete-course-grade',
  templateUrl: './delete-course-grade.component.html',
  styleUrls: ['./delete-course-grade.component.scss']
})
export class DeleteCourseGradeComponent implements OnInit {
  _id: any;
  gradetype: any;
  grade: any;
  response: any;
  coursedata: any;
  constructor(private adminservices: AdminservicesService, private _Activatedroute: ActivatedRoute,
    private _router: Router) { }
  sub: any;
  selectChangeHandler(event: any) {
    //update the ui
    this.gradetype = event.target.value;
  }
  deleteCourseGrade() {
    this.sub = this._Activatedroute.paramMap.subscribe(params => {
      this._id = params.get('id');
      this.adminservices.deleteCourseGrade(this._id, this.gradetype).subscribe(res => {
        this.response = res;
        this.adminservices.getCourseData(this._id).subscribe(res => {
          this.coursedata = res;
        }, err => {
          this.coursedata = err
        }
        );
      }, err => {
        this.response = err;
      }
      );

    });

  }
  ngOnInit(): void {
    this.sub = this._Activatedroute.paramMap.subscribe(params => {
      this._id = params.get('id');
      this.adminservices.getCourseData(this._id).subscribe(res => {
        this.coursedata = res;
      }, err => {
        this.coursedata = err
      }
      );
    });
  }

}
