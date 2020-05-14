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
  error: any;
  constructor(private adminservices: AdminservicesService, private _Activatedroute: ActivatedRoute,
    private _router: Router) { }
  sub: any;

  addCourseGrade(type: HTMLInputElement, grade: HTMLInputElement) {
    this.gradetype = type.value, this.grade = grade.value;
    let response = document.getElementById('response');
    let error = document.getElementById('error');
    this.sub = this._Activatedroute.paramMap.subscribe(params => {
      this._id = params.get('id');
      this.adminservices.addCourseGrade(this._id, this.gradetype, this.grade).subscribe(res => {
        this.response = res;
        if (error.classList.contains('d-block')) {
          error.classList.replace('d-block', 'd-none');
        }
        response.classList.replace('d-none', 'd-block');
        response.innerHTML = this.response.msg;

        type.value = '';
        grade.value = "";
      }, err => {
        this.error = err.error;
        if (response.classList.contains('d-block')) {
          response.classList.replace('d-block', 'd-none');
        }
        error.classList.replace('d-none', 'd-block');
        error.innerHTML = this.error.msg;
      }
      );
    });

  }
  ngOnInit(): void {

  }

}
