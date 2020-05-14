import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../_models';

@Injectable({
  providedIn: 'root'
})
export class AdminservicesService {
  addUserBody: any;
  updateuserbody: any;
  deleteuserbody: any;
  addCourseBody: any;
  updateCourseBody: any;
  coursesDepartmentbody: any;
  userProfileBody: any;
  userRolebody: any;
  deleteCoursebody: any;
  userCoursesBody: any;
  addUserCourseBody: any;
  addUserCourseId: any;
  deleteUserCourseBody: any;
  deleteUserCourseId: any;
  getCourseDataBody: any;
  addCourseGradeBody: any;
  addCourseGradeId: any;
  deleteCourseGradebody: any;
  deleteCourseGradetypebody: any;
  courseStudentsSheetBody: any;
  courseStudentsGradesBody: any;
  addStudentGradeBody: any;
  addStudentGradeId: any;
  courseGradeType: any;
  getStudentGradeCourseCode: any;
  getStudentGradeGradeType: any;
  getCourseGradeType: any;
  userId: any;
  updateStudentGradeBody: any;
  updateuserIdbody: any;
  updateCourseIdBody: any;
  studentIdBody: any;
  courseIdBody: any;

  constructor(private httpClient: HttpClient) { }
  public profile(id): Observable<any> {
    this.userId = id;
    return this.httpClient.get<User>(`http://localhost:3000/profile/${this.userId}`);
  }

  public getUsers(): Observable<any> {
    return this.httpClient.get<User[]>('http://localhost:3000/users');
  }
  public getUsersByRole(role): Observable<any> {
    this.userRolebody = role;
    return this.httpClient.get<User[]>(`http://localhost:3000/users/${this.userRolebody}`);
  }

  public addUser(_id, name, email, password, role): Observable<any> {
    this.addUserBody = { _id, name, email, password, role }
    let headers = new HttpHeaders({ 'Content-Type': 'application/JSON' });
    return this.httpClient.post('http://localhost:3000/add/user', this.addUserBody, { headers: headers });
  }

  public updateUser(_id, name, email, password, role): Observable<any> {
    this.updateuserIdbody = _id;
    this.updateuserbody = { name, email, password, role }
    let headers = new HttpHeaders({ 'Content-Type': 'application/JSON' });
    return this.httpClient.put(`http://localhost:3000/update/user/${this.updateuserIdbody}`, this.updateuserbody, { headers: headers });
  }

  public deleteUser(_id): Observable<any> {
    this.deleteuserbody = _id;
    return this.httpClient.delete(`http://localhost:3000/delete/user/${this.deleteuserbody}`);
  }

  public getUserprofiledata(id): Observable<any> {
    this.userProfileBody = id;
    return this.httpClient.get(`http://localhost:3000/user/${this.userProfileBody}/profile`);
  }

  public getUserCoursesdata(id): Observable<any> {
    this.userCoursesBody = id;
    return this.httpClient.get(`http://localhost:3000/user/${this.userCoursesBody}/courses`);
  }

  public addUserCourse(id, courseCode): Observable<any> {
    this.addUserCourseBody = { courseCode };
    this.addUserCourseId = id;
    let headers = new HttpHeaders({ 'Content-Type': 'application/JSON' });
    return this.httpClient.post(`http://localhost:3000/add/user/course/${this.addUserCourseId}`, this.addUserCourseBody, { headers: headers });
  }

  public deleteUserCourse(id, courseCode): Observable<any> {
    this.deleteUserCourseBody = courseCode;
    this.deleteUserCourseId = id;
    return this.httpClient.delete(`http://localhost:3000/delete/user/course/${this.deleteUserCourseId}/${this.deleteUserCourseBody}`);
  }
  // ---------------------------------------------


  public getCourses(): Observable<any> {
    return this.httpClient.get('http://localhost:3000/courses');
  }

  public getCourseData(courseCode): Observable<any> {
    this.getCourseDataBody = courseCode
    return this.httpClient.get(`http://localhost:3000/course/${this.getCourseDataBody}`);
  }


  public getDepartmentCourses(courseDepartment): Observable<any> {
    this.coursesDepartmentbody = courseDepartment;
    return this.httpClient.get(`http://localhost:3000/courses/${this.coursesDepartmentbody}`);
  }


  public addCourse(courseCode, courseName, courseDepartment, creaditHours): Observable<any> {
    this.addCourseBody = { courseCode, courseName, courseDepartment, creaditHours }
    let headers = new HttpHeaders({ 'Content-Type': 'application/JSON' });
    return this.httpClient.post('http://localhost:3000/add/course', this.addCourseBody, { headers: headers });
  }

  public updateCourse(courseCode, courseName, courseDepartment, creaditHours): Observable<any> {
    this.updateCourseIdBody = courseCode;
    this.updateCourseBody = { courseName, courseDepartment, creaditHours }
    let headers = new HttpHeaders({ 'Content-Type': 'application/JSON' });
    return this.httpClient.put(`http://localhost:3000/update/course/${this.updateCourseIdBody}`, this.updateCourseBody, { headers: headers });
  }

  public deleteCourse(courseCode): Observable<any> {
    this.deleteCoursebody = courseCode;
    return this.httpClient.delete(`http://localhost:3000/delete/course/${this.deleteCoursebody}`);
  }



  public addCourseGrade(courseCode, type, grade): Observable<any> {
    this.addCourseGradeBody = { type, grade };
    this.addCourseGradeId = courseCode;
    let headers = new HttpHeaders({ 'Content-Type': 'application/JSON' });
    return this.httpClient.post(`http://localhost:3000/add/course/grade/${this.addCourseGradeId}`, this.addCourseGradeBody, { headers: headers });
  }
  public deleteCourseGrade(courseCode, type): Observable<any> {
    this.deleteCourseGradebody = courseCode;
    this.deleteCourseGradetypebody = type;
    return this.httpClient.delete(`http://localhost:3000/delete/course/grade/${this.deleteCourseGradebody}/${this.deleteCourseGradetypebody}`);
  }

  public getCourseStudentsSheet(courseCode): Observable<any> {
    this.courseStudentsSheetBody = courseCode;
    return this.httpClient.get(`http://localhost:3000/course/students/${this.courseStudentsSheetBody}`);
  }
  public getCourseStudentsGrades(courseCode, gradeType): Observable<any> {
    this.courseStudentsGradesBody = courseCode;
    this.courseGradeType = gradeType;
    return this.httpClient.get(`http://localhost:3000/course/students/grades/${this.courseStudentsGradesBody}/${this.courseGradeType}`);
  }




  public addStudentGrade(courseCode, studentId, gradeType, score): Observable<any> {
    this.addStudentGradeBody = { studentId, gradeType, score };
    this.addStudentGradeId = courseCode;
    let headers = new HttpHeaders({ 'Content-Type': 'application/JSON' });
    return this.httpClient.post(`http://localhost:3000/add/student/grade/${this.addStudentGradeId}`, this.addStudentGradeBody, { headers: headers });
  }
  public updateStudentGrade(courseId, studentId, gradeType, score): Observable<any> {
    this.updateStudentGradeBody = { gradeType, score };
    this.studentIdBody = studentId;
    this.courseIdBody = courseId
    let headers = new HttpHeaders({ 'Content-Type': 'application/JSON' });
    return this.httpClient.put(`http://localhost:3000/update/student/grade/${this.studentIdBody}/${this.courseIdBody}`, this.updateStudentGradeBody, { headers: headers });
  }

  public getCourseGrades(courseCode, gradeType): Observable<any> {
    this.getCourseDataBody = courseCode;
    this.getCourseGradeType = gradeType;
    return this.httpClient.get(`http://localhost:3000/course/grades/${this.getCourseDataBody}/${this.getCourseGradeType}`);
  }

  // public getCourseGrades(courseCode, gradeType): Observable<any> {
  //   this.getStudentGradeCourseCode = courseCode;
  //   this.getStudentGradeGradeType = gradeType;
  //   return this.httpClient.get(`http://localhost:3000/course/students/grades/${this.getStudentGradeCourseCode}/${this.getStudentGradeGradeType}`)
  // }
}
