import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'
import { Observable } from 'rxjs';
import { User } from '../_models';
@Injectable({
  providedIn: 'root'
})
export class TeacherServiceService {
  userId: any;
  courseId: any;
  addCourseGradeBody: any;
  deleteCourseGradebody: any;
  addCourseGradeId: any;
  deleteCourseGradetypebody: any;
  courseStudentsSheetBody: any;
  courseStudentsGradesBody: any;
  courseGradeType: any;
  addStudentGradeBody: any;
  addStudentGradeId: any;
  getCourseDataBody: any;
  getCourseGradeType: any;
  addCourseTaskBody: any;
  addCourseTaskId: any;
  deleteCourseTaskBody: any;
  deleteCourseTaskId: any;
  addCourseLectureBody: any;
  addCourseLectureId: any;
  addCourseAttendanceBody: any;
  addCourseAttendanceId: any;
  attendMeBody: any;
  attendMeCourseId: any;
  attendMeMyId: any;
  CourseId: any;
  myId: any;
  userProfileBody: any;

  constructor(private httpClient: HttpClient) { }
  public myCourses(id): Observable<any> {
    this.userId = id;
    return this.httpClient.get(`http://localhost:3000/my/courses/${this.userId}`);
  }
  public getCourseData(id): Observable<any> {
    this.courseId = id;
    return this.httpClient.get(`http://localhost:3000/course/${this.courseId}`);
  }
  public addCourseGrade(courseCode, type, grade): Observable<any> {
    this.addCourseGradeBody = { type, grade };
    this.addCourseGradeId = courseCode;
    console.log(this.addCourseGradeId);
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


  public getCourseGrades(courseCode, gradeType): Observable<any> {
    this.getCourseDataBody = courseCode;
    this.getCourseGradeType = gradeType;
    return this.httpClient.get(`http://localhost:3000/course/grades/${this.getCourseDataBody}/${this.getCourseGradeType}`);
  }

  public addCourseTask(courseCode, type, path): Observable<any> {
    this.addCourseTaskBody = { type, path };
    this.addCourseTaskId = courseCode;
    let headers = new HttpHeaders({ 'Content-Type': 'application/JSON' });
    return this.httpClient.post(`http://localhost:3000/add/course/task/${this.addCourseTaskId}`, this.addCourseTaskBody, { headers: headers });
  }

  public deleteCourseTask(courseCode, type): Observable<any> {
    console.log(type)
    this.deleteCourseTaskBody = type;
    this.deleteCourseTaskId = courseCode;
    return this.httpClient.delete(`http://localhost:3000/delete/course/task/${this.deleteCourseTaskId}/${this.deleteCourseTaskBody}`);
  }

  public addCourseLecture(courseCode, lectureNumber, lectureLocation, beacon_id): Observable<any> {
    this.addCourseLectureBody = { lectureNumber, lectureLocation, beacon_id };
    this.addCourseLectureId = courseCode;
    let headers = new HttpHeaders({ 'Content-Type': 'application/JSON' });
    return this.httpClient.post(`http://localhost:3000/add/course/lecture/${this.addCourseLectureId}`, this.addCourseLectureBody, { headers: headers });
  }

  public addCourseAttendance(courseId, lectureNumber, beacon_id): Observable<any> {
    this.addCourseAttendanceBody = { lectureNumber, beacon_id };
    this.addCourseAttendanceId = courseId;
    let headers = new HttpHeaders({ 'Content-Type': 'application/JSON' });
    return this.httpClient.post(`http://localhost:3000/add/course/attendance/${this.addCourseAttendanceId}`, this.addCourseAttendanceBody, { headers: headers });
  }

  public attendMe(id, courseId, lectureNumber, beacon_id): Observable<any> {
    this.attendMeBody = { lectureNumber, beacon_id };
    this.attendMeCourseId = courseId;
    this.attendMeMyId = id
    let headers = new HttpHeaders({ 'Content-Type': 'application/JSON' });
    return this.httpClient.post(`http://localhost:3000/course/attend/me/${this.attendMeMyId}/${this.attendMeCourseId}`, this.attendMeBody, { headers: headers });
  }


  public getMyCourseGrades(id, courseCode, gradetype): Observable<any> {
    this.CourseId = courseCode;
    this.myId = id;
    this.courseGradeType = gradetype;
    let headers = new HttpHeaders({ 'Content-Type': 'application/JSON' });
    return this.httpClient.get(`http://localhost:3000/course/my/grades/${this.myId}/${this.CourseId}/${this.courseGradeType}`);
  }

  public profile(id): Observable<any> {
    this.userId = id;
    return this.httpClient.get<User>(`http://localhost:3000/profile/${this.userId}`);
  }

  public myattendancesheet(id, courseCode): Observable<any> {
    this.myId = id;
    this.CourseId = courseCode;
    return this.httpClient.get<User>(`http://localhost:3000/course/my/attendance/${this.myId}/${this.CourseId}`);
  }

}
