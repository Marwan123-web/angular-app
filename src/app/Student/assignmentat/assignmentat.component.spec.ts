import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignmentatComponent } from './assignmentat.component';

describe('AssignmentatComponent', () => {
  let component: AssignmentatComponent;
  let fixture: ComponentFixture<AssignmentatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignmentatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignmentatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
