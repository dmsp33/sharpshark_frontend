import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProtectedNotrackingComponent } from './notracking.component';

describe('NotrakingComponent', () => {
  let component: ProtectedNotrackingComponent;
  let fixture: ComponentFixture<ProtectedNotrackingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProtectedNotrackingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProtectedNotrackingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
