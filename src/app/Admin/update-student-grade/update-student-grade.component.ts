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

      this.adminservices.updateStudentGrade(this._id, this.studentId, this.gradeType, this.score).subscribe(res => {
        this.coursedata = res;
        this.adminservices.getCourseData(this._id).subscribe(res => {
          this.coursedata = res;
        }, err => {
          this.coursedata = err
        }
        );
      }, err => {
        this.coursedata = err
      });
      studentId.value = "";
      score.value = "";
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
