import { Component, OnInit } from '@angular/core';
import { AdminservicesService } from 'src/app/services/adminservices.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-student-sheet',
  templateUrl: './student-sheet.component.html',
  styleUrls: ['./student-sheet.component.scss']
})
export class StudentSheetComponent implements OnInit {

  _id: any;
  courseusers: any;
  semester_time: string;
  constructor(private adminservices: AdminservicesService, private _Activatedroute: ActivatedRoute,
    private _router: Router) { }
  sub: any;
  ngOnInit(): void {
    this.sub = this._Activatedroute.paramMap.subscribe(params => {
      this._id = params.get('id');
      this.semester_time = params.get('semester');
      this.adminservices.getCourseSemesterStudentsSheet(this._id, this.semester_time).subscribe(res => {
        this.courseusers = res;
      }, err => {
        this.courseusers = err
      }
      );
    });
  }

}
