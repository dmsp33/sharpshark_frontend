import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProtectedTrackingComponent } from './tracking.component';

describe('TrackingComponent', () => {
  let component: ProtectedTrackingComponent;
  let fixture: ComponentFixture<ProtectedTrackingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProtectedTrackingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProtectedTrackingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
