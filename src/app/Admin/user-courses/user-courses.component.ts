import { Component, OnInit } from '@angular/core';
import { AdminservicesService } from 'src/app/services/adminservices.service';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-user-courses',
  templateUrl: './user-courses.component.html',
  styleUrls: ['./user-courses.component.scss']
})
export class UserCoursesComponent implements OnInit {
  _id: any;
  userdata: any;
  usercoursesdata: any;
  usercoursesdata2: any;
  data: any[];
  coursedata: Array<any> = [];
  coursedataarr: Array<any> = [];
  x: any;


  arr: any[];
  coursesdata: any;
  semesterdata: any;
  status: any;

  constructor(private adminservices: AdminservicesService, private _Activatedroute: ActivatedRoute,
    private _router: Router) { }
  sub: any;
  selectChangeHandler(event: any) {
    //update the ui
    this.status = event.target.value;
    this.adminservices.myCoursesByStatus(this._id, this.status).subscribe(res => {
      this.usercoursesdata = res;
      this.arr = []
      if (res) {
        for (let i = 0; i < res.length; i++) {
          this.adminservices.getCourseSemesterData(this.usercoursesdata[i].Id, this.usercoursesdata[i].semester_time).subscribe(res => {
            this.coursesdata = res;
            this.semesterdata = this.coursesdata.semesters[0]
            var objectC = { ...this.usercoursesdata[i], ...this.coursesdata };
            this.arr[i] = objectC
          }, err => {
            this.coursesdata = err
          }
          );
        }
      }

    }, err => {
      this.usercoursesdata = err
    }
    );
  }
  ngOnInit(): void {
    this.sub = this._Activatedroute.paramMap.subscribe(params => {
      this._id = params.get('id');
      this.adminservices.myCourses(this._id).subscribe(res => {
        this.usercoursesdata = res;
        this.arr = []
        for (let i = 0; i < res.length; i++) {
          this.adminservices.getCourseSemesterData(this.usercoursesdata[i].Id, this.usercoursesdata[i].semester_time).subscribe(res => {
            this.coursesdata = res;
            this.semesterdata = this.coursesdata.semesters[0]
            var objectC = { ...this.usercoursesdata[i], ...this.coursesdata };
            this.arr[i] = objectC
          }, err => {
            this.coursesdata = err
          }
          );
        }

      }, err => {
        this.usercoursesdata = err
      }
      );
    });
  }

}
