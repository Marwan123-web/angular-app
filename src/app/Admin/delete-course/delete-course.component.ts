import { Component, OnInit } from '@angular/core';
import { AdminservicesService } from 'src/app/services/adminservices.service';

@Component({
  selector: 'app-delete-course',
  templateUrl: './delete-course.component.html',
  styleUrls: ['./delete-course.component.scss']
})
export class DeleteCourseComponent implements OnInit {
  courseCode: any;
  response: any;
  error: any;
  constructor(private adminservices: AdminservicesService) { }

  deleteCourse(courseCode: HTMLInputElement) {
    this.courseCode = courseCode.value;
    let response = document.getElementById('response');
    let error = document.getElementById('error');
    this.adminservices.deleteCourse(this.courseCode).subscribe(res => {
      this.response = res;
      if (error.classList.contains('d-block')) {
        error.classList.replace('d-block', 'd-none');
      }
      response.classList.replace('d-none', 'd-block');
      response.innerHTML = this.response.msg;
      courseCode.value = '';
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
