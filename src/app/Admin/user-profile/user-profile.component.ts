import { Component, OnInit } from '@angular/core';
import { AdminservicesService } from 'src/app/services/adminservices.service';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  _id: any;
  userdata: any;
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
    });
  }

}
