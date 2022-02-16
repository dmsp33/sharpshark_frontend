import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProtectedNotTrackingGroupByDateComponent } from './protected-not-tracking-group-by-date.component';

describe('ProtectedNotTrackingGroupByDateComponent', () => {
  let component: ProtectedNotTrackingGroupByDateComponent;
  let fixture: ComponentFixture<ProtectedNotTrackingGroupByDateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProtectedNotTrackingGroupByDateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProtectedNotTrackingGroupByDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
