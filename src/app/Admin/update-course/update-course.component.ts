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
  constructor(private adminservices: AdminservicesService) { }
  selectChangeHandler(event: any) {
    //update the ui
    this.courseDepartment = event.target.value;
  }

  updateCourse(courseCode: HTMLInputElement, courseName: HTMLInputElement, creaditHours: HTMLInputElement) {
    this.courseCode = courseCode.value, this.courseName = courseName.value, this.creditHours = creaditHours.value;
    this.adminservices.updateCourse(this.courseCode, this.courseName, this.courseDepartment, this.creditHours).subscribe(res => {
      console.log('Done Course Added');
    }, err => {
      console.log('Fail' + this.courseDepartment);
    }
    );
    courseCode.value = "";
    courseName.value = "";
    creaditHours.value = "";
  }
  ngOnInit(): void {
  }

}
