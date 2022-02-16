import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionNeedComponent } from './action-need.component';

describe('ActionNeedComponent', () => {
  let component: ActionNeedComponent;
  let fixture: ComponentFixture<ActionNeedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActionNeedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionNeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
