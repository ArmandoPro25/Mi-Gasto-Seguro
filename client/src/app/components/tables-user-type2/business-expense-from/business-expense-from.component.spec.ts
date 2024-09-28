import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessExpenseFromComponent } from './business-expense-from.component';

describe('BusinessExpenseFromComponent', () => {
  let component: BusinessExpenseFromComponent;
  let fixture: ComponentFixture<BusinessExpenseFromComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BusinessExpenseFromComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BusinessExpenseFromComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
