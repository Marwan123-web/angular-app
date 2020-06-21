import { Component, OnInit } from '@angular/core';
import { AdminservicesService } from 'src/app/services/adminservices.service';
import { Router, ActivatedRoute } from '@angular/router';

import { UserserviceService } from 'src/app/services/userservice.service';
import { CourseService } from 'src/app/services/course.service';
import { SemesterserviceService } from 'src/app/services/semesterservice.service';
import { User } from '../../_models';
import { Course } from '../../_models/course';
import { Semester } from '../../_models/semester';
import { first } from 'rxjs/operators';
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  currentClickedUser: User;
  currentCourse: Course;
  currentCourseSemester: Semester;

  _id: any;
  userdata: any;
  usercredithours: any;
  nohours: any;
  constructor(private adminservices: AdminservicesService, private _Activatedroute: ActivatedRoute,
    private _router: Router,
    private userserviceService: UserserviceService,
    private courseService: CourseService,
    private semesterserviceService: SemesterserviceService
  ) {
    this.currentClickedUser = this.userserviceService.currentClickedUserValue;
    this.currentCourse = this.courseService.currentCourseValue;
    this.currentCourseSemester = this.semesterserviceService.currentCourseSemesterValue;
  }

  ngOnInit(): void {
    this.adminservices.getUserprofiledata(this.currentClickedUser._id).subscribe(res => {
      this.userdata = res;
    }, err => {
      this.userdata = err
    }
    );
    this.adminservices.calculatMyCreditHours(this.currentClickedUser._id).subscribe(res => {

      if (res == 0) {
        this.nohours = 'No Finished Hours Yet'
      }
      else {
        this.usercredithours = res;
      }
      console.log(this.usercredithours)
    }, err => {
      this.usercredithours = err
    }
    );


  }
  closClickedUser() {
    this.userserviceService.closeClickedUser();
  }
  openClickedUser(id) {
    this.userserviceService.getClickedUser(id).pipe(first()).subscribe(res => {
    }, err => {
      console.log('Fail to get Course');
    }
    );
  }
}
