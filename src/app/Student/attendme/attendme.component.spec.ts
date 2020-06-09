import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendmeComponent } from './attendme.component';

describe('AttendmeComponent', () => {
  let component: AttendmeComponent;
  let fixture: ComponentFixture<AttendmeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttendmeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttendmeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
