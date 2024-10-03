import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessExpenseComponent } from './business-expense.component';

describe('BusinessExpenseComponent', () => {
  let component: BusinessExpenseComponent;
  let fixture: ComponentFixture<BusinessExpenseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BusinessExpenseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BusinessExpenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
