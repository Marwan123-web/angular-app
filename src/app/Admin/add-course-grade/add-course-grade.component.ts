import { Component, OnInit } from '@angular/core';
import { AdminservicesService } from 'src/app/services/adminservices.service';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-add-course-grade',
  templateUrl: './add-course-grade.component.html',
  styleUrls: ['./add-course-grade.component.scss']
})
export class AddCourseGradeComponent implements OnInit {

  _id: any;
  gradetype: any;
  grade: any;
  response: any;
  constructor(private adminservices: AdminservicesService, private _Activatedroute: ActivatedRoute,
    private _router: Router) { }
  sub: any;

  addCourseGrade(type: HTMLInputElement, grade: HTMLInputElement) {
    this.gradetype = type.value, this.grade = grade.value,
      this.sub = this._Activatedroute.paramMap.subscribe(params => {
        this._id = params.get('id');
        this.adminservices.addCourseGrade(this._id, this.gradetype, this.grade).subscribe(res => {
          this.response = res;
        }, err => {
          this.response = err;
        }
        );
      });
    type.value = '';
    grade.value = "";
  }
  ngOnInit(): void {

  }

}
