import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayForAccess1Component } from './pay-for-access-1.component';

describe('PayForAccess1Component', () => {
  let component: PayForAccess1Component;
  let fixture: ComponentFixture<PayForAccess1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PayForAccess1Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PayForAccess1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
