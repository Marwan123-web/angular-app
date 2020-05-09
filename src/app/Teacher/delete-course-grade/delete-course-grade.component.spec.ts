import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteCourseGradeComponent } from './delete-course-grade.component';

describe('DeleteCourseGradeComponent', () => {
  let component: DeleteCourseGradeComponent;
  let fixture: ComponentFixture<DeleteCourseGradeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteCourseGradeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteCourseGradeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
