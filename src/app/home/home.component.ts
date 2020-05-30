import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { User } from '../_models';

declare var $: any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  currentUser: User;

  constructor(private authenticationService: AuthService) { this.currentUser = this.authenticationService.currentUserValue; }

  ngOnInit(): void {
  


  }

}
