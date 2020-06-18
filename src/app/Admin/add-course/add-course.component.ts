import { Component, OnInit } from '@angular/core';
import { AdminservicesService } from 'src/app/services/adminservices.service';
declare var $: any;
@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.scss']
})
export class AddCourseComponent implements OnInit {
  courseCode: string;
  courseName: string;
  courseDepartment: string;
  creditHours: any;
  response: any;
  error: any;
  constructor(private adminservices: AdminservicesService) { }

  selectChangeHandler(event: any) {
    //update the ui
    this.courseDepartment = event.target.value;
  }
  addCourse(courseCode: HTMLInputElement, courseName: HTMLInputElement, creaditHours: HTMLInputElement) {
    this.courseCode = courseCode.value, this.courseName = courseName.value, this.creditHours = creaditHours.value;
    let response = document.getElementById('response');
    let error = document.getElementById('error');
    this.adminservices.addCourse(this.courseCode, this.courseName, this.courseDepartment, this.creditHours).subscribe(res => {
      this.response = res;
      console.log(res)
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
