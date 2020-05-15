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
  currentCourse: any;
  courseStudentsGrades: any;
  GradeTypeGrade: any;
  gradetype: any;
  courseGradeData: any;
  courseGrades: any;
  x: any;
  things: any[][];
  coursedata: any;
  useragrade: any;
  courseusers: any;
  userdata: any;
  usertotalgrades: any;
  arrayofusersdata: Array<object> = [];
  usertotalgradestotal: Array<object> = [];
  fakedata: any;
  courseTotalGrades: any;
  courseDataCode: any;

  constructor(private adminservices: AdminservicesService, private _Activatedroute: ActivatedRoute,
    private _router: Router) { this.things = []; }
  sub: any;

  getcoursedata(x, y) {

    this.adminservices.getCourseData(this._id).subscribe(res => {
      this.coursedata = res.grades
      this.courseDataCode = res;
      // this.courseTotalGrades = this.coursedata.length;
      for (let i = 0; i < this.coursedata.length; i++) {
        this.adminservices.studentsGradesheet(x, this._id, this.coursedata[i].type).subscribe(res => {
          // this.fakedata = { "_id": "5eba5bb7900576e5c44f34b2", "studentId": x, "courseId": this.currentCourse.courseCode, "gradeType": this.coursedata[i].type, "score": 100, "__v": 0 }
          this.useragrade = res;
          this.things[y][i] = this.useragrade;

        }, err => {
          this.useragrade = err
        });

      }
    }, err => {
      this.coursedata = err
    });
  }

  ngOnInit(): void {
    this.sub = this._Activatedroute.paramMap.subscribe(params => {
      this._id = params.get('id');


      this.adminservices.totalCourseGrades(this._id).subscribe(res => {
        this.courseTotalGrades = res
      }, err => {
        this.courseTotalGrades = err
      });
      this.adminservices.getCourseStudentsSheet(this._id).subscribe(res => {
        this.courseusers = res;
        for (let y = 0; y < this.courseusers.length; y++) {
          this.adminservices.profile(this.courseusers[y]._id).subscribe(res => {
            this.userdata = res

            this.adminservices.studentTotalGrades(this.courseusers[y]._id, this._id).subscribe(res => {
              this.usertotalgrades = res
              this.usertotalgradestotal[y] = this.usertotalgrades;
            }, err => {
              this.usertotalgrades = err
            });

            this.arrayofusersdata[y] = this.userdata;
            this.things[y] = [];
            this.getcoursedata(this.userdata._id, y);
          }, err => {
            this.userdata = err
          });

        }
      }, err => {
        this.courseusers = err;
      });

    });
  }
}
