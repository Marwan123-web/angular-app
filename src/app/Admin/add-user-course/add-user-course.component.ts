import { Component, OnInit } from '@angular/core';
import { AdminservicesService } from 'src/app/services/adminservices.service';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-add-user-course',
  templateUrl: './add-user-course.component.html',
  styleUrls: ['./add-user-course.component.scss']
})
export class AddUserCourseComponent implements OnInit {

  _id: any;
  userdata: any;
  courseCode: string;
  course: any;
  allCourses: any;
  constructor(private adminservices: AdminservicesService, private _Activatedroute: ActivatedRoute,
    private _router: Router) { }
  sub: any;
  selectChangeHandler(event: any) {
    //update the ui
    this.course = event.target.value;
  }

  addUserCourse() {
    this.sub = this._Activatedroute.paramMap.subscribe(params => {
      this._id = params.get('id');
      this.adminservices.addUserCourse(this._id, this.course).subscribe(res => {
        this.userdata = res;
      }, err => {
        this.userdata = err
      }
      );
    });
  }

  // deleteUserCourse(courseCode: HTMLInputElement) {
  //   this.courseCode = courseCode.value;
  //   this.sub = this._Activatedroute.paramMap.subscribe(params => {
  //     this._id = params.get('id');
  //     this.adminservices.deleteUserCourse(this._id, this.courseCode).subscribe(res => {
  //       this.userdata = res;
  //     }, err => {
  //       this.userdata = err
  //     }
  //     );
  //   });
  //   courseCode.value = "";
  // }
  ngOnInit(): void {
    this.adminservices.getCourses().subscribe(res => {
      this.allCourses = res;
    }, err => {
      this.allCourses = err
    }
    );
  }
}
