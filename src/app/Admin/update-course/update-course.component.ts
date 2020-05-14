import { Component, OnInit } from '@angular/core';
import { AdminservicesService } from 'src/app/services/adminservices.service';

@Component({
  selector: 'app-update-course',
  templateUrl: './update-course.component.html',
  styleUrls: ['./update-course.component.scss']
})
export class UpdateCourseComponent implements OnInit {
  courseCode: string;
  courseName: string;
  courseDepartment: string;
  creditHours: string;
  response: any;
  error: any;
  constructor(private adminservices: AdminservicesService) { }
  selectChangeHandler(event: any) {
    //update the ui
    this.courseDepartment = event.target.value;
  }

  updateCourse(courseCode: HTMLInputElement, courseName: HTMLInputElement, creaditHours: HTMLInputElement) {
    this.courseCode = courseCode.value, this.courseName = courseName.value, this.creditHours = creaditHours.value;
    let response = document.getElementById('response');
    let error = document.getElementById('error');
    this.adminservices.updateCourse(this.courseCode, this.courseName, this.courseDepartment, this.creditHours).subscribe(res => {
      this.response = res;
      if (error.classList.contains('d-block')) {
        error.classList.replace('d-block', 'd-none');
      }
      response.classList.replace('d-none', 'd-block');
      response.innerHTML = this.response.msg;
      courseCode.value = "";
      courseName.value = "";
      creaditHours.value = "";
    }, err => {
      this.error = err.error;
      if (response.classList.contains('d-block')) {
        response.classList.replace('d-block', 'd-none');
      }
      error.classList.replace('d-none', 'd-block');
      error.innerHTML = this.error.msg;
    }
    );


  }
  ngOnInit(): void {
  }

}
