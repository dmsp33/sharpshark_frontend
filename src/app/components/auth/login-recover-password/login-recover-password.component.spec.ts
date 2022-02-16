import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginRecoverPasswordComponent } from './login-recover-password.component';

describe('LoginRecoverPasswordComponent', () => {
  let component: LoginRecoverPasswordComponent;
  let fixture: ComponentFixture<LoginRecoverPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginRecoverPasswordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginRecoverPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
