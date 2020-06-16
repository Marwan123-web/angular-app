import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { User, Role } from '../../_models';
import { Router, ActivatedRoute } from '@angular/router';
import { TeacherServiceService } from 'src/app/services/teacher-service.service';
import { CourseService } from 'src/app/services/course.service';
import { Course } from 'src/app/_models/course';
import { Semester } from '../../_models/semester';
import { SemesterserviceService } from 'src/app/services/semesterservice.service';
@Component({
  selector: 'app-attendance-sheet-student',
  templateUrl: './attendance-sheet-student.component.html',
  styleUrls: ['./attendance-sheet-student.component.scss']
})
export class AttendanceSheetStudentComponent implements OnInit {
  currentUser: User;
  currentCourse: Course;
  currentCourseSemester: Semester;
  mydata: any;
  myattendance: any;

  constructor(
    private router: Router,
    private authenticationService: AuthService,
    private teacherservices: TeacherServiceService,
    private _Activatedroute: ActivatedRoute,
    private courseService: CourseService,
    private semesterserviceService: SemesterserviceService

  ) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    this.currentUser = this.authenticationService.currentUserValue;
    this.currentCourse = this.courseService.currentCourseValue;
    this.currentCourseSemester = this.semesterserviceService.currentCourseSemesterValue;
  }
  get isStudent() {
    return this.currentUser && this.currentUser.role === Role.Student;
  }
  get isTeacher() {
    return this.currentUser && this.currentUser.role === Role.Teacher;
  }

  get isTeacherOrStudent() {
    return this.currentUser && (this.currentUser.role === Role.Teacher || this.currentUser.role === Role.Student);
  }




  ngOnInit(): void {
    this.teacherservices.profile(this.currentUser._id).subscribe(res => {
      this.mydata = res
    }, err => {
      this.mydata = err;
    });
    this.teacherservices.semesterMyattendancesheet(this.currentUser._id, this.currentCourse.courseCode, this.currentCourseSemester.semesters[0].semester_time).subscribe(res => {
      this.myattendance = res;
    }, err => {
      this.myattendance = err;
    });



  }


}
