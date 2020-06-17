import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'


import { AuthGuard } from './_guards'
import { Role } from './_models';







import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { CoursesComponent } from './Admin/courses/courses.component';
import { CourseInfoComponent } from './Admin/course-info/course-info.component';
import { ProfileComponent } from './profile/profile.component';
import { AddUserComponent } from './Admin/add-user/add-user.component';
import { UsersComponent } from './Admin/users/users.component';
import { UserCoursesComponent } from './Admin/user-courses/user-courses.component';
import { StudentSheetComponent } from './Admin/student-sheet/student-sheet.component';
import { AddCourseGradeComponent } from './Admin/add-course-grade/add-course-grade.component';
import { AddStudentGradeComponent } from './Admin/add-student-grade/add-student-grade.component';
import { AddCourseComponent } from './Admin/add-course/add-course.component';
import { StudentsGradeComponent } from './Admin/students-grade/students-grade.component';
import { UpdateStudentGradeComponent } from './Admin/update-student-grade/update-student-grade.component';
import { UpdateCourseComponent } from './Admin/update-course/update-course.component';
import { DeleteCourseComponent } from './Admin/delete-course/delete-course.component';
import { AddUserCourseComponent } from './Admin/add-user-course/add-user-course.component';
import { DeleteUserCourseComponent } from './Admin/delete-user-course/delete-user-course.component';
import { DeleteUserComponent } from './Admin/delete-user/delete-user.component';
import { UpdateUserComponent } from './Admin/update-user/update-user.component';
import { DeleteCourseGradeComponent } from './Admin/delete-course-grade/delete-course-grade.component';
import { UserProfileComponent } from './Admin/user-profile/user-profile.component';
import { NavbarComponent } from './navbar/navbar.component';





import { CoursesComponents } from './Student/courses/courses.component';


import { NotificationsComponent } from './Student/notifications/notifications.component';
import { CoursesSingleComponent } from './Student/courses-single/courses-single.component';

import { GradesComponent } from './Student/grades/grades.component';

import { AttendanceSheetStudentComponent } from './Student/attendance-sheet-student/attendance-sheet-student.component';





import { AttendanceComponentt } from './Teacher/attendance/attendance.component';


import { CoursesInfoComponentt } from './Teacher/courses-info/courses-info.component';
import { GradesComponentt } from './Teacher/grades/grades.component';
import { AssignmentatComponentt } from './Teacher/assignmentat/assignmentat.component';
import { AddCourseStudentGradeComponent } from './Teacher/add-student-grade/add-student-grade.component';
import { UpdateStudentGradetComponent } from './Teacher/update-student-grade/update-student-grade.component';

import { TeacherAddCourseGradeComponent } from './Teacher/add-course-grade/add-course-grade.component';
import { TeacherDeleteCourseGradeComponent } from './Teacher/delete-course-grade/delete-course-grade.component';
import { TeacherStudentSheetComponent } from './Teacher/student-sheet/student-sheet.component';

import { AddLectureComponent } from './Teacher/add-lecture/add-lecture.component';

// import { AddAttendanceComponent } from './Teacher/add-attendance/add-attendance.component';


import { AttendmeComponent } from './Student/attendme/attendme.component';



import { AttendanceSheetStudentComponentt } from './Teacher/attendance-sheet-student/attendance-sheet-student.component';
import { AddTaskComponent } from './Teacher/add-task/add-task.component';
import { DeleteTaskComponent } from './Teacher/delete-task/delete-task.component';
import { LoginComponent } from './login/login.component';
import { from } from 'rxjs';
import { JwtInterceptor } from './_helpers';
import { AttendanceReportComponent } from './Teacher/attendance-report/attendance-report.component';
import { GradesReportComponent } from './Teacher/grades-report/grades-report.component';

import { CourseSemestersComponent } from './Admin/course-semesters/course-semesters.component';
import { AddCourseSemesterComponent } from './Admin/add-course-semester/add-course-semester.component';
import { UserCourseInfoComponent } from './Admin/user-course-info/user-course-info.component';


@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HomeComponent,
    CoursesComponent,
    CourseInfoComponent,
    ProfileComponent,
    AddUserComponent,
    UsersComponent,
    UserCoursesComponent,
    StudentSheetComponent,
    AddCourseGradeComponent,
    AddStudentGradeComponent,
    AddCourseComponent,
    StudentsGradeComponent,
    UpdateStudentGradeComponent,
    UpdateCourseComponent,
    DeleteCourseComponent,
    AddUserCourseComponent,
    DeleteUserCourseComponent,
    DeleteUserComponent,
    UpdateUserComponent,
    DeleteCourseGradeComponent,
    UserProfileComponent,
    NavbarComponent,









    CoursesComponents,

    NotificationsComponent,
    CoursesSingleComponent,
    GradesComponent,
    AttendanceSheetStudentComponent,


    AddCourseStudentGradeComponent,
    UpdateStudentGradetComponent,
    TeacherAddCourseGradeComponent,
    TeacherDeleteCourseGradeComponent,
    TeacherStudentSheetComponent,

    AddLectureComponent,
    // AddAttendanceComponent,




    AttendanceComponentt,
    CoursesInfoComponentt,
    GradesComponentt,
    AssignmentatComponentt,
    AttendanceSheetStudentComponentt,
    AddTaskComponent,
    DeleteTaskComponent,
    LoginComponent,
    AttendmeComponent,
    AttendanceReportComponent,
    GradesReportComponent,
    CourseSemestersComponent,
    AddCourseSemesterComponent,
    UserCourseInfoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot([
      // { path: '', redirectTo: '/home', pathMatch: 'full' },


      {
        path: 'home', component: HomeComponent,
        canActivate: [AuthGuard],
        data: { roles: [Role.Admin, Role.Teacher, Role.Student] }
      },

      { path: 'login', component: LoginComponent },




      {
        path: 'profile', component: ProfileComponent,
        canActivate: [AuthGuard],
        data: { roles: [Role.Admin, Role.Teacher, Role.Student] }

      },

      {
        path: 'courses', component: CoursesComponent,
        canActivate: [AuthGuard],
        data: { roles: [Role.Admin] }
      },

      {
        path: 'courses/add-course', component: AddCourseComponent,
        canActivate: [AuthGuard],
        data: { roles: [Role.Admin] }
      },

      {
        path: 'courses/update-course', component: UpdateCourseComponent,
        canActivate: [AuthGuard],
        data: { roles: [Role.Admin] }
      },

      {
        path: 'courses/delete-course', component: DeleteCourseComponent,
        canActivate: [AuthGuard],
        data: { roles: [Role.Admin] }
      },

      //ana hna ya joo
      {
        path: 'course/semesters', component: CourseSemestersComponent,
        canActivate: [AuthGuard],
        data: { roles: [Role.Admin] }
      },
      //ana hna ya joo
      {
        path: 'course/add-semester', component: AddCourseSemesterComponent,
        canActivate: [AuthGuard],
        data: { roles: [Role.Admin] }
      },
      {
        path: 'course/semester/info', component: CourseInfoComponent,
        canActivate: [AuthGuard],
        data: { roles: [Role.Admin] }
      },

      {
        path: 'course/semester/students-sheet', component: StudentSheetComponent,
        canActivate: [AuthGuard],
        data: { roles: [Role.Admin] }
      },//--------

      {
        path: 'course/semester/add-course-grade', component: AddCourseGradeComponent,
        canActivate: [AuthGuard],
        data: { roles: [Role.Admin] }
      },

      {
        path: 'course/semester/delete-course-grade', component: DeleteCourseGradeComponent,
        canActivate: [AuthGuard],
        data: { roles: [Role.Admin] }
      },

      {
        path: 'course/semester/students-grades', component: StudentsGradeComponent,
        canActivate: [AuthGuard],
        data: { roles: [Role.Admin] }
      },

      {
        path: 'course/semester/add-student-grade', component: AddStudentGradeComponent,
        canActivate: [AuthGuard],
        data: { roles: [Role.Admin] }
      },

      {
        path: 'course/semester/update-student-grade', component: UpdateStudentGradeComponent,
        canActivate: [AuthGuard],
        data: { roles: [Role.Admin] }
      },


      {
        path: 'users', component: UsersComponent,
        canActivate: [AuthGuard],
        data: { roles: [Role.Admin] }

      },

      {
        path: 'user/courses', component: UserCoursesComponent,
        canActivate: [AuthGuard],
        data: { roles: [Role.Admin] }
      },
      {
        path: 'user/course/info', component: UserCourseInfoComponent,
        canActivate: [AuthGuard],
        data: { roles: [Role.Admin] }
      },

      {
        path: 'user/add-user', component: AddUserComponent,
        canActivate: [AuthGuard],
        data: { roles: [Role.Admin] }
      },

      {
        path: 'user/update-user', component: UpdateUserComponent,
        canActivate: [AuthGuard],
        data: { roles: [Role.Admin] }
      },

      {
        path: 'user/delete-user', component: DeleteUserComponent,
        canActivate: [AuthGuard],
        data: { roles: [Role.Admin] }
      },

      {
        path: 'user/add-delete-course', component: AddUserCourseComponent,
        canActivate: [AuthGuard],
        data: { roles: [Role.Admin] }
      },

      {
        path: 'user/profile', component: UserProfileComponent,
        canActivate: [AuthGuard],
        data: { roles: [Role.Admin] }
      },


      // ------------------------------------------------Student-----------------------------


      {
        path: 'mycourses', component: CoursesComponents,
        canActivate: [AuthGuard],
        data: { roles: [Role.Teacher, Role.Student] }
      },
      {
        path: 'course/semester/home', component: CoursesSingleComponent,
        canActivate: [AuthGuard],
        data: { roles: [Role.Teacher, Role.Student] }
      },

      {
        path: 'course/semester/attendance', component: AttendanceComponentt,
        canActivate: [AuthGuard],
        data: { roles: [Role.Teacher, Role.Student] }
      },


      {
        path: 'course/semester/attend-me', component: AttendmeComponent,
        canActivate: [AuthGuard],
        data: { roles: [Role.Student] }
      },

      {
        path: 'course/semester/add-lecture', component: AddLectureComponent,
        canActivate: [AuthGuard],
        data: { roles: [Role.Teacher] }
      },
      // {
      //   path: 'course/semester/add-attendance', component: AddAttendanceComponent,
      //   canActivate: [AuthGuard],
      //   data: { roles: [Role.Teacher] }
      // },


      {
        path: 'course/semester/information', component: CoursesInfoComponentt,
        canActivate: [AuthGuard],
        data: { roles: [Role.Teacher, Role.Student] }
      },
      {
        path: 'course/semester/add-course-grade', component: TeacherAddCourseGradeComponent,
        canActivate: [AuthGuard],
        data: { roles: [Role.Teacher] }
      },
      {
        path: 'course/semester/delete-course-grade', component: TeacherDeleteCourseGradeComponent,
        canActivate: [AuthGuard],
        data: { roles: [Role.Teacher] }
      },
      {
        path: 'course/semester/students-sheet', component: TeacherStudentSheetComponent,
        canActivate: [AuthGuard],
        data: { roles: [Role.Teacher] }
      },


      {
        path: 'course/semester/mygrades', component: GradesComponent,
        canActivate: [AuthGuard],
        data: { roles: [Role.Student] }
      },
      {
        path: 'course/semester/students/grades', component: GradesComponentt,
        canActivate: [AuthGuard],
        data: { roles: [Role.Teacher] }
      },
      {
        path: 'course/semester/add-grade', component: AddCourseStudentGradeComponent,
        canActivate: [AuthGuard],
        data: { roles: [Role.Teacher] }
      },
      {
        path: 'course/semester/update-grade', component: UpdateStudentGradetComponent,
        canActivate: [AuthGuard],
        data: { roles: [Role.Teacher] }
      },


      {
        path: 'course/semester/assignments', component: AssignmentatComponentt,
        canActivate: [AuthGuard],
        data: { roles: [Role.Teacher, Role.Student] }
      },

      {
        path: 'course/semester/add-task', component: AddTaskComponent,
        canActivate: [AuthGuard],
        data: { roles: [Role.Teacher] }
      },
      {
        path: 'course/semester/delete-task', component: DeleteTaskComponent,
        canActivate: [AuthGuard],
        data: { roles: [Role.Teacher] }
      },


      {
        path: 'course/semester/attendance-sheet', component: AttendanceSheetStudentComponent,
        canActivate: [AuthGuard],
        data: { roles: [Role.Student] }
      },

      {
        path: 'course/semester/students-attendance-sheet', component: AttendanceSheetStudentComponentt,
        canActivate: [AuthGuard],
        data: { roles: [Role.Teacher] }
      },

      {
        path: 'notifications', component: NotificationsComponent,
        canActivate: [AuthGuard],
        data: { roles: [Role.Teacher, Role.Student] }
      },
      {
        path: 'course/semester/students-attendance-report', component: AttendanceReportComponent,
        canActivate: [AuthGuard],
        data: { roles: [Role.Teacher] }
      },

      {
        path: 'course/semester/students-grades-report', component: GradesReportComponent,
        canActivate: [AuthGuard],
        data: { roles: [Role.Teacher] }
      },
      // ------------------------------------------------Teacher-----------------------------


      //  { path: 'test', component: UserCoursesComponent2 },

      // { path: 'teacher/attendance', component: AttendanceComponentt },
      // { path: 'teacher/notifications', component: NotificationsComponentt },
      // { path: 'teacher/courses-single', component: CoursesSingleComponentt },
      // { path: 'teacher/courses-info', component: CoursesInfoComponentt },
      // { path: 'teacher/grades', component: GradesComponentt },
      // { path: 'teacher/assignmentat', component: AssignmentatComponentt },

      // { path: 'teacher/AttendanceSheetStudentComponent', component: AttendanceSheetStudentComponentt },


      { path: '**', redirectTo: '/home' },



    ])
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
