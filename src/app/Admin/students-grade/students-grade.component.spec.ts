import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentsGradeComponent } from './students-grade.component';

describe('StudentsGradeComponent', () => {
  let component: StudentsGradeComponent;
  let fixture: ComponentFixture<StudentsGradeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentsGradeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentsGradeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
