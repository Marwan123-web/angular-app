import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursesRegisterationComponent } from './courses-registeration.component';

describe('CoursesRegisterationComponent', () => {
  let component: CoursesRegisterationComponent;
  let fixture: ComponentFixture<CoursesRegisterationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoursesRegisterationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursesRegisterationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
