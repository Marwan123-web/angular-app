import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseSemestersComponent } from './course-semesters.component';

describe('CourseSemestersComponent', () => {
  let component: CourseSemestersComponent;
  let fixture: ComponentFixture<CourseSemestersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseSemestersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseSemestersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
