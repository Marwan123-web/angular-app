import { Component, OnInit } from '@angular/core';
import { AdminservicesService } from 'src/app/services/adminservices.service';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-user-courses',
  templateUrl: './user-courses.component.html',
  styleUrls: ['./user-courses.component.scss']
})
export class UserCoursesComponent2 implements OnInit {
  _id: any;
  userdata: any;
  usercoursesdata: any;
  constructor(private adminservices: AdminservicesService, private _Activatedroute: ActivatedRoute,
    private _router: Router) { }
  sub: any;
  ngOnInit(): void {
    this.sub = this._Activatedroute.paramMap.subscribe(params => {
      this._id = params.get('id');
      this.adminservices.getUserprofiledata(this._id).subscribe(res => {
        this.userdata = res;
      }, err => {
        this.userdata = err
      }
      );
      this.adminservices.getUserCoursesdata(this._id).subscribe(res => {
        this.usercoursesdata = res;
      }, err => {
        this.usercoursesdata = err
      }
      );
    });
  }

}
