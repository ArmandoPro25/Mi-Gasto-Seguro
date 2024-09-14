import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangePasswordEmailComponent } from './change-password-email.component';

describe('ChangePasswordEmailComponent', () => {
  let component: ChangePasswordEmailComponent;
  let fixture: ComponentFixture<ChangePasswordEmailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChangePasswordEmailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChangePasswordEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
