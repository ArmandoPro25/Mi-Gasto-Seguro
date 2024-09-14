import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangePasswordCodeComponent } from './change-password-code.component';

describe('ChangePasswordCodeComponent', () => {
  let component: ChangePasswordCodeComponent;
  let fixture: ComponentFixture<ChangePasswordCodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChangePasswordCodeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChangePasswordCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
