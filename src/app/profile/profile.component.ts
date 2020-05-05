import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { User } from '../_models';
import { AdminservicesService } from 'src/app/services/adminservices.service';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  currentUser: User;
  userdata: any;
  constructor(private authenticationService: AuthService,
    private adminservices: AdminservicesService
  ) {
    this.currentUser = this.authenticationService.currentUserValue;
  }


  ngOnInit(): void {
    this.adminservices.profile(this.currentUser._id).subscribe(res => {
      this.userdata = res;
    }, err => {
      this.userdata = err;
    });
  }

}
