import { Component, OnInit } from '@angular/core';
import { AdminservicesService } from 'src/app/services/adminservices.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  usersdata: any[];
  role: any;
  constructor(private adminservices: AdminservicesService) { }
  selectChangeHandler(event: any) {
    //update the ui
    this.role = event.target.value;
    if (this.role == '') {
      this.adminservices.getUsers().subscribe(res => {
        this.usersdata = res;
      }, err => {
        this.usersdata = err
      }
      );
    }
    else {
      this.adminservices.getUsersByRole(this.role).subscribe(res => {
        this.usersdata = res;
      }, err => {
        this.usersdata = err
      }
      );
    }

  }
  ngOnInit(): void {
    this.adminservices.getUsers().subscribe(res => {
      this.usersdata = res;
    }, err => {
      this.usersdata = err
    }
    );
  }

}
