import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCourseInfoComponent } from './user-course-info.component';

describe('UserCourseInfoComponent', () => {
  let component: UserCourseInfoComponent;
  let fixture: ComponentFixture<UserCourseInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserCourseInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserCourseInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
