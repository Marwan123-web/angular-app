import { Component, OnInit } from '@angular/core';
import { AdminservicesService } from 'src/app/services/adminservices.service';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-students-grade',
  templateUrl: './students-grade.component.html',
  styleUrls: ['./students-grade.component.scss']
})
export class StudentsGradeComponent implements OnInit {

  _id: any;
  courseStudentsGrades: any;
  GradeTypeGrade: any;
  gradetype: any;
  courseGradeData: any;
  x: any;
  constructor(private adminservices: AdminservicesService, private _Activatedroute: ActivatedRoute,
    private _router: Router) { }
  sub: any;

  selectChangeHandler(event: any) {
    //update the ui
    this.gradetype = event.target.value;
    this.adminservices.getCourseStudentsGrades(this._id, this.gradetype).subscribe(res => {
      this.courseStudentsGrades = res;
    }, err => {
      this.courseStudentsGrades = err;
    });

    this.adminservices.getCourseGrades(this._id, this.gradetype).subscribe(res => {
      this.GradeTypeGrade = res;
    }, err => {
      this.GradeTypeGrade = err;
    });
  }
  ngOnInit(): void {
    this.sub = this._Activatedroute.paramMap.subscribe(params => {
      this._id = params.get('id');


      this.adminservices.getCourseData(this._id).subscribe(res => {
        this.courseGradeData = res;
        this.x = this.courseGradeData.grades[0].type;
        this.adminservices.getCourseGrades(this._id, this.x).subscribe(res => {
          this.GradeTypeGrade = res;
          this.adminservices.getCourseStudentsGrades(this._id, this.x).subscribe(res => {
            this.courseStudentsGrades = res;
          }, err => {
            this.courseStudentsGrades = err;
          });
        }, err => {
          this.GradeTypeGrade = err;
        });
      }, err => {
        this.courseGradeData = err;
      });

    });
  }
}
