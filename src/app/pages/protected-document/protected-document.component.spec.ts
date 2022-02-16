import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProtectedDocumentComponent } from './protected-document.component';

describe('ProtectedDocumentComponent', () => {
  let component: ProtectedDocumentComponent;
  let fixture: ComponentFixture<ProtectedDocumentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProtectedDocumentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProtectedDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
