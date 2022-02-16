import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotactualComponent } from './notactual.component';

describe('NotactualComponent', () => {
  let component: NotactualComponent;
  let fixture: ComponentFixture<NotactualComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotactualComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotactualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
