import { Component, OnInit } from '@angular/core';
import { AdminservicesService } from 'src/app/services/adminservices.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UserserviceService } from 'src/app/services/userservice.service';
import { CourseService } from 'src/app/services/course.service';
import { SemesterserviceService } from 'src/app/services/semesterservice.service';
import { User } from '../../_models';
import { Course } from '../../_models/course';
import { Semester } from '../../_models/semester';
import { first } from 'rxjs/operators';
@Component({
  selector: 'app-students-grade',
  templateUrl: './students-grade.component.html',
  styleUrls: ['./students-grade.component.scss']
})
export class StudentsGradeComponent implements OnInit {
  currentClickedUser: User;
  currentCourse: Course;
  currentCourseSemester: Semester;

  _id: any;
  courseStudentsGrades: any;
  GradeTypeGrade: any;
  gradetype: any;
  courseGradeData: any;
  courseGrades: any;
  x: any;
  things: any[][];
  coursedata: any;
  useragrade: any;
  courseusers: any;
  userdata: any;
  usertotalgrades: any;
  arrayofusersdata: Array<object> = [];
  usertotalgradestotal: Array<object> = [];
  fakedata: any;
  courseTotalGrades: any;
  courseDataCode: any;
  semester_time: string;
  courseSemesterDataCode: any;
  constructor(private adminservices: AdminservicesService, private _Activatedroute: ActivatedRoute,
    private _router: Router,
    private userserviceService: UserserviceService,
    private courseService: CourseService,
    private semesterserviceService: SemesterserviceService
  ) {
    this.currentClickedUser = this.userserviceService.currentClickedUserValue;
    this.currentCourse = this.courseService.currentCourseValue;
    this.currentCourseSemester = this.semesterserviceService.currentCourseSemesterValue;
    this.things = [];
  }

  sub: any;

  getcoursedata(x, y) {

    this.adminservices.getCourseSemesterData(this.currentCourse.courseCode, this.currentCourseSemester.semesters[0].semester_time).subscribe(res => {
      this.coursedata = res.semesters[0].grades
      this.courseDataCode = res;
      this.courseSemesterDataCode = res.semesters[0];
      // this.courseTotalGrades = this.coursedata.length;
      for (let i = 0; i < this.coursedata.length; i++) {
        this.adminservices.semesterStudentsGradesheet(x, this.currentCourse.courseCode, this.currentCourseSemester.semesters[0].semester_time, this.coursedata[i].type).subscribe(res => {
          // this.fakedata = { "_id": "5eba5bb7900576e5c44f34b2", "studentId": x, "courseId": this.currentCourse.courseCode, "gradeType": this.coursedata[i].type, "score": 100, "__v": 0 }
          this.useragrade = res;
          this.things[y][i] = this.useragrade;

        }, err => {
          this.useragrade = err
        });

      }
    }, err => {
      this.coursedata = err
    });
  }

  ngOnInit(): void {

    this.adminservices.totalCourseSemesterGrades(this.currentCourse.courseCode, this.currentCourseSemester.semesters[0].semester_time).subscribe(res => {
      this.courseTotalGrades = res
    }, err => {
      this.courseTotalGrades = err
    });
    this.adminservices.getCourseSemesterStudentsSheet(this.currentCourse.courseCode, this.currentCourseSemester.semesters[0].semester_time).subscribe(res => {
      this.courseusers = res;
      for (let y = 0; y < this.courseusers.length; y++) {
        this.adminservices.profile(this.courseusers[y]._id).subscribe(res => {
          this.userdata = res

          this.adminservices.semesterStudentTotalGrades(this.courseusers[y]._id, this.currentCourse.courseCode, this.currentCourseSemester.semesters[0].semester_time).subscribe(res => {
            this.usertotalgrades = res
            this.usertotalgradestotal[y] = this.usertotalgrades;
          }, err => {
            this.usertotalgrades = err
          });

          this.arrayofusersdata[y] = this.userdata;
          this.things[y] = [];
          this.getcoursedata(this.userdata._id, y);
        }, err => {
          this.userdata = err
        });

      }
    }, err => {
      this.courseusers = err;
    });
  }
}
