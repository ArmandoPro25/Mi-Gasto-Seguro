import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayForAccess2Component } from './pay-for-access-2.component';

describe('PayForAccess2Component', () => {
  let component: PayForAccess2Component;
  let fixture: ComponentFixture<PayForAccess2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PayForAccess2Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PayForAccess2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
