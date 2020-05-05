import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { User, Role } from '../../_models';
import { Router, ActivatedRoute } from '@angular/router';
import { TeacherServiceService } from 'src/app/services/teacher-service.service';

@Component({
  selector: 'app-courses-single',
  templateUrl: './courses-single.component.html',
  styleUrls: ['./courses-single.component.css']
})
export class CoursesSingleComponent implements OnInit {
  currentUser: User;
  sub: any;
  _id: string;
  coursesdata: any;

  constructor(
    private router: Router,
    private authenticationService: AuthService,
    private teacherservices: TeacherServiceService,
    private _Activatedroute: ActivatedRoute,

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
  ngOnInit(): void {
    this.sub = this._Activatedroute.paramMap.subscribe(params => {
      this._id = params.get('id');
      this.teacherservices.getCourseData(this._id).subscribe(res => {
        this.coursesdata = res;
      }, err => {
        this.coursesdata = err
      }
      );
    });

  }

}
