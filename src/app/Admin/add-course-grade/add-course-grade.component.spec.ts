import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCourseGradeComponent } from './add-course-grade.component';

describe('AddCourseGradeComponent', () => {
  let component: AddCourseGradeComponent;
  let fixture: ComponentFixture<AddCourseGradeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCourseGradeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCourseGradeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
