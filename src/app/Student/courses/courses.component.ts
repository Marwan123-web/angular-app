import { Component, OnInit } from '@angular/core';
import { TeacherServiceService } from 'src/app/services/teacher-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { User } from '../../_models';
import { Course } from '../../_models/course';
import { first } from 'rxjs/operators';
import { CourseService } from 'src/app/services/course.service';
@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponents implements OnInit {
  _id: any;
  userdata: any;
  usercoursesdata: any;
  currentUser: User;
  currentCourse: Course;

  constructor(private teacherservices: TeacherServiceService, private _Activatedroute: ActivatedRoute,
    private _router: Router, private authenticationService: AuthService,private courseService: CourseService, ) {
    this.currentUser = this.authenticationService.currentUserValue;
    this.currentCourse = this.courseService.currentCourseValue;

  }
  ngOnInit(): void {
    this.teacherservices.myCourses(this.currentUser._id).subscribe(res => {
      this.usercoursesdata = res;
    }, err => {
      this.usercoursesdata = err
    }
    );
    this.courseService.closeCourse();
  }  
  openCourse(courseCode) {
    this.courseService.getCourse(courseCode).pipe(first()).subscribe(res => { 
    }, err => {
      console.log('Fail to get Course');
    }
    );

  }

}
