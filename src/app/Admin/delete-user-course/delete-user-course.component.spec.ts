import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteUserCourseComponent } from './delete-user-course.component';

describe('DeleteUserCourseComponent', () => {
  let component: DeleteUserCourseComponent;
  let fixture: ComponentFixture<DeleteUserCourseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteUserCourseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteUserCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
