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
  error: any;
  semester_time: string;

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
      this.semester_time = params.get('semester');

      let response = document.getElementById('response');
      let error = document.getElementById('error');
      this.adminservices.deleteCourseSemesterGrade(this._id, this.semester_time, this.gradetype).subscribe(res => {
        this.response = res;
        if (error.classList.contains('d-block')) {
          error.classList.replace('d-block', 'd-none');
        }
        response.classList.replace('d-none', 'd-block');
        response.innerHTML = this.response.msg;
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
    this.sub = this._Activatedroute.paramMap.subscribe(params => {
      this._id = params.get('id');
      this.semester_time = params.get('semester');
      this.adminservices.getCourseSemesterData(this._id, this.semester_time).subscribe(res => {
        this.coursedata = res.semesters[0];
      }, err => {
        this.coursedata = err
      }
      );
    });
  }

}
