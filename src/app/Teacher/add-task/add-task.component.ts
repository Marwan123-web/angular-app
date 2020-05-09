import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { User, Role } from '../../_models';
import { Router, ActivatedRoute } from '@angular/router';
import { TeacherServiceService } from 'src/app/services/teacher-service.service';
import { CourseService } from 'src/app/services/course.service';
import { Course } from 'src/app/_models/course';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})
export class AddTaskComponent implements OnInit {

  currentUser: User;
currentCourse: Course;
  _id: string;
  coursesdata: any;
  
  taskType: string;
  taskPath: string;

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
  AddTask(taskType: HTMLInputElement, taskPath: HTMLInputElement) {
    this.taskType = taskType.value, this.taskPath = taskPath.value,
      this.teacherservices.addCourseTask(this.currentCourse.courseCode, this.taskType, this.taskPath).subscribe(res => {
        // console.log(this.currentCourse.courseCode)
        console.log('Done');
        taskType.value = "";
        taskPath.value = "";
      }, err => {
        console.log('Fail');
      }
      );
  }

  ngOnInit(): void {



  }
}
