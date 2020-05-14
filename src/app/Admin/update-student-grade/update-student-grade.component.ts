import { Component, OnInit } from '@angular/core';
import { AdminservicesService } from 'src/app/services/adminservices.service';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-update-student-grade',
  templateUrl: './update-student-grade.component.html',
  styleUrls: ['./update-student-grade.component.scss']
})
export class UpdateStudentGradeComponent implements OnInit {

  _id: any;
  courseStudentsGrades: any;
  coursedata: any;
  gradeType: any;
  studentId: any;
  score: any;
  studentedata: any;
  response: any;
  error: any;
  constructor(private adminservices: AdminservicesService, private _Activatedroute: ActivatedRoute,
    private _router: Router) { }
  sub: any;
  selectChangeHandler(event: any) {
    //update the ui
    this.gradeType = event.target.value;
  }
  updateStudentGradefun(studentId: HTMLInputElement, score: HTMLInputElement) {

    this.sub = this._Activatedroute.paramMap.subscribe(params => {
      this._id = params.get('id');
      this.studentId = studentId.value, this.score = score.value;
      let response = document.getElementById('response');
      let error = document.getElementById('error');
      this.adminservices.updateStudentGrade(this._id, this.studentId, this.gradeType, this.score).subscribe(res => {
        this.response = res;
        if (error.classList.contains('d-block')) {
          error.classList.replace('d-block', 'd-none');
        }
        response.classList.replace('d-none', 'd-block');
        response.innerHTML = this.response.msg;
        studentId.value = "";
        score.value = "";
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
  };
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
