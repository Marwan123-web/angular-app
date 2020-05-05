import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUserCourseComponent } from './add-user-course.component';

describe('AddUserCourseComponent', () => {
  let component: AddUserCourseComponent;
  let fixture: ComponentFixture<AddUserCourseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddUserCourseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUserCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
