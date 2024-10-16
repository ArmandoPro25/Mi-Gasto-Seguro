import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessExpenseFormComponent } from './business-expense-form.component';

describe('BusinessExpenseFormComponent', () => {
  let component: BusinessExpenseFormComponent;
  let fixture: ComponentFixture<BusinessExpenseFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BusinessExpenseFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BusinessExpenseFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
