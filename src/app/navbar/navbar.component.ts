import { Component, OnInit } from '@angular/core';
declare var $: any;

import { AuthService } from '../services/auth.service';
import { User, Role } from '../_models';
import { Router } from '@angular/router';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent implements OnInit {

  currentUser: User;

  constructor(
    private router: Router,
    private authenticationService: AuthService
  ) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  get isAdmin() {
    return this.currentUser && this.currentUser.role === Role.Admin;
  }
  get isStudent() {
    return this.currentUser && this.currentUser.role === Role.Student;
  }
  get isTeacher() {
    return this.currentUser && this.currentUser.role === Role.Teacher;
  }

  get isTeacherOrStudent() {
    return this.currentUser && (this.currentUser.role === Role.Teacher || this.currentUser.role === Role.Student);
  }
  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }
  ngOnInit(): void {


  }
  homebtn: boolean = true;
  coursebtn: boolean = false;
  userbtn: boolean = false;
  profilebtn: boolean = false;
  coursesbtn: boolean = false;
  notibtn: boolean = false;
  activebtn(name) {
    if (name == 'course') {
      this.coursebtn = true;
      this.homebtn = false;
      this.userbtn = false;
      this.profilebtn = false;
      this.coursesbtn=false;
      this.notibtn=false;
    }
    else if (name == 'home') {
      this.coursebtn = false;
      this.homebtn = true;
      this.userbtn = false;
      this.profilebtn = false;
      this.coursesbtn=false;
      this.notibtn=false;
    }
    else if (name == 'user') {
      this.coursebtn = false;
      this.homebtn = false;
      this.userbtn = true;
      this.profilebtn = false;
      this.coursesbtn=false;
      this.notibtn=false;
    }
    else if (name == 'profile') {
      this.coursebtn = false;
      this.homebtn = false;
      this.userbtn = false;
      this.profilebtn = true;
      this.coursesbtn=false;
      this.notibtn=false;
    }
    else if (name == 'name') {
      this.coursebtn = false;
      this.homebtn = false;
      this.userbtn = false;
      this.profilebtn = true;
      this.coursesbtn=false;
      this.notibtn=false;
    }
    else if (name == 'courses') {
      this.coursebtn = false;
      this.homebtn = false;
      this.userbtn = false;
      this.profilebtn = false;
      this.coursesbtn=true;
      this.notibtn=false;
    }
    else if (name == 'noti') {
      this.coursebtn = false;
      this.homebtn = false;
      this.userbtn = false;
      this.profilebtn = false;
      this.coursesbtn=false;
      this.notibtn=true;
    }
  }

}