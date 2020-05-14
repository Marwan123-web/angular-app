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
  response: any;
  error: any;
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
      let response = document.getElementById('response');
      let error = document.getElementById('error');
      this.adminservices.addUserCourse(this._id, this.course).subscribe(res => {
        this.response = res;
        if (error.classList.contains('d-block')) {
          error.classList.replace('d-block', 'd-none');
        }
        response.classList.replace('d-none', 'd-block');
        response.innerHTML = this.response.msg;
      }, err => {
        this.error = err.error;
        if (response.classList.contains('d-block')) {
          response.classList.replace('d-block', 'd-none');
        }
        error.classList.replace('d-none', 'd-block');
        error.innerHTML = this.error.msg;
      }
      );
    });
  }
  deleteUserCourse() {
    this.sub = this._Activatedroute.paramMap.subscribe(params => {
      this._id = params.get('id');
      let response = document.getElementById('response');
      let error = document.getElementById('error');
      this.adminservices.deleteUserCourse(this._id, this.course).subscribe(res => {
        this.response = res;
        if (error.classList.contains('d-block')) {
          error.classList.replace('d-block', 'd-none');
        }
        response.classList.replace('d-none', 'd-block');
        response.innerHTML = this.response.msg;
      }, err => {
        this.error = err.error;
        if (response.classList.contains('d-block')) {
          response.classList.replace('d-block', 'd-none');
        }
        error.classList.replace('d-none', 'd-block');
        error.innerHTML = this.error.msg;
      }
      );
    });
  }

  ngOnInit(): void {
    this.adminservices.getCourses().subscribe(res => {
      this.allCourses = res;
    }, err => {
      this.allCourses = err
    }
    );
  }
}
