import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { User, Role } from '../../_models';
import { Router, ActivatedRoute } from '@angular/router';
import { TeacherServiceService } from 'src/app/services/teacher-service.service';
import { CourseService } from 'src/app/services/course.service';
import { Course } from 'src/app/_models/course';

@Component({
  selector: 'app-delete-task',
  templateUrl: './delete-task.component.html',
  styleUrls: ['./delete-task.component.scss']
})
export class DeleteTaskComponent implements OnInit {


  currentUser: User;

  _id: string;
  coursedata: any;
  currentCourse: Course;
  taskType: string;


  constructor(
    private router: Router,
    private authenticationService: AuthService,
    private teacherservices: TeacherServiceService,
    private _Activatedroute: ActivatedRoute,
    private courseService: CourseService,

  ) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    this.currentCourse = this.courseService.currentCourseValue;
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
  selectChangeHandler(event: any) {
    //update the ui
    this.taskType = event.target.value;
  }
  DeleteTask() {
      this.teacherservices.deleteCourseTask(this.currentCourse.courseCode, this.taskType).subscribe(res => {
        // console.log(this.currentCourse.courseCode)
        location.reload();
        console.log('Done');
      }, err => {
        console.log('Fail');
      }
      );
  }

  ngOnInit(): void {

    this.teacherservices.getCourseData(this.currentCourse.courseCode).subscribe(res => {
      // console.log(this.currentCourse.courseCode)
      this.coursedata = res;
    }, err => {
      this.coursedata = err
    }
    );

  }

}
