import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateStudentGradeComponent } from './update-student-grade.component';

describe('UpdateStudentGradeComponent', () => {
  let component: UpdateStudentGradeComponent;
  let fixture: ComponentFixture<UpdateStudentGradeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateStudentGradeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateStudentGradeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
