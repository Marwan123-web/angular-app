import { Component, OnInit } from '@angular/core';
import { AdminservicesService } from 'src/app/services/adminservices.service';


@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {
  coursedata: any[];
  department: any;
  constructor(private adminservices: AdminservicesService) { }
  selectChangeHandler(event: any) {
    //update the ui
    this.department = event.target.value;
    if (this.department == '') {
      this.adminservices.getCourses().subscribe(res => {
        this.coursedata = res;
      }, err => {
        this.coursedata = err;
      });
    }
    else {
      this.adminservices.getDepartmentCourses(this.department).subscribe(res => {
        this.coursedata = res;
      }, err => {
        this.coursedata = err;
      });
    }

  }

  ngOnInit(): void {
    this.adminservices.getCourses().subscribe(res => {
      this.coursedata = res;
    }, err => {
      this.coursedata = err;
    });



  }

}
