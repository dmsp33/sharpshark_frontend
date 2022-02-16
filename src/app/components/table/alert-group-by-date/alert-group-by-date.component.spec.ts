import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertGroupByDateComponent } from './alert-group-by-date.component';

describe('AlertGroupByDateComponent', () => {
  let component: AlertGroupByDateComponent;
  let fixture: ComponentFixture<AlertGroupByDateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlertGroupByDateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertGroupByDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
