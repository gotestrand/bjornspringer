import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityOverlayComponent } from './activity-overlay.component';

describe('ActivityOverlayComponent', () => {
  let component: ActivityOverlayComponent;
  let fixture: ComponentFixture<ActivityOverlayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivityOverlayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityOverlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
