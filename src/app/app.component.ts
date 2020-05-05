import { Component, OnInit } from '@angular/core';
declare var $: any;
import { AuthService } from './services/auth.service';
import { User, Role } from './_models';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

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
  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }
  title = 'Smart-Attendance';

  ngOnInit(): void {
  
  }
}
