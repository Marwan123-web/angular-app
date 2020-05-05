import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendanceSheetStudentComponent } from './attendance-sheet-student.component';

describe('AttendanceSheetStudentComponent', () => {
  let component: AttendanceSheetStudentComponent;
  let fixture: ComponentFixture<AttendanceSheetStudentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttendanceSheetStudentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttendanceSheetStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
