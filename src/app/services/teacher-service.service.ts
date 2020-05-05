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

  constructor(private httpClient: HttpClient) { }
  public myCourses(id): Observable<any> {
    this.userId = id;
    return this.httpClient.get<User>(`http://localhost:3000/my/courses/${this.userId}`);
  }
  public getCourseData(id): Observable<any> {
    this.courseId = id;
    return this.httpClient.get<User>(`http://localhost:3000/course/${this.courseId}`);
  }
  
}
