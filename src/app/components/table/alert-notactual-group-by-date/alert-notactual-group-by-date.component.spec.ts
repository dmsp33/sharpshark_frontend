import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertNotactualGroupByDateComponent } from './alert-notactual-group-by-date.component';

describe('AlertNotactualGroupByDateComponent', () => {
  let component: AlertNotactualGroupByDateComponent;
  let fixture: ComponentFixture<AlertNotactualGroupByDateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlertNotactualGroupByDateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertNotactualGroupByDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
