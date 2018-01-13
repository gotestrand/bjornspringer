import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityElevationComponent } from './activity-elevation.component';

describe('ActivityElevationComponent', () => {
  let component: ActivityElevationComponent;
  let fixture: ComponentFixture<ActivityElevationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivityElevationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityElevationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
