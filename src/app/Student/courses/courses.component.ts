import { Component, OnInit } from '@angular/core';
import { TeacherServiceService } from 'src/app/services/teacher-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { User } from '../../_models';
@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponents implements OnInit {
  _id: any;
  userdata: any;
  usercoursesdata: any;
  currentUser: User;
  constructor(private teacherservices: TeacherServiceService, private _Activatedroute: ActivatedRoute,
    private _router: Router, private authenticationService: AuthService, ) {
    this.currentUser = this.authenticationService.currentUserValue;
  }
  sub: any;

  ngOnInit(): void {
    this.teacherservices.myCourses(this.currentUser._id).subscribe(res => {
      this.usercoursesdata = res;
    }, err => {
      this.usercoursesdata = err
    }
    );
  }

}
