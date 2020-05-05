import { Component, OnInit } from '@angular/core';
import { AdminservicesService } from 'src/app/services/adminservices.service';

@Component({
  selector: 'app-delete-course',
  templateUrl: './delete-course.component.html',
  styleUrls: ['./delete-course.component.scss']
})
export class DeleteCourseComponent implements OnInit {
  courseCode: any;
  constructor(private adminservices: AdminservicesService) { }

  deleteCourse(courseCode: HTMLInputElement) {
    this.courseCode = courseCode.value;
    this.adminservices.deleteCourse(this.courseCode).subscribe(res => {
      console.log('Done');
      courseCode.value = '';
    }, err => {
      console.log('Fail');
    });
  }
  ngOnInit(): void {
  }

}
