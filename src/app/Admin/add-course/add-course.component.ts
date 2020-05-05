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
  constructor(private adminservices: AdminservicesService) { }

  selectChangeHandler(event: any) {
    //update the ui
    this.courseDepartment = event.target.value;
  }
  addCourse(courseCode: HTMLInputElement, courseName: HTMLInputElement, creaditHours: HTMLInputElement) {


    this.courseCode = courseCode.value, this.courseName = courseName.value, this.creditHours = creaditHours.value;
    this.adminservices.addCourse(this.courseCode, this.courseName, this.courseDepartment, this.creditHours).subscribe(res => {
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
