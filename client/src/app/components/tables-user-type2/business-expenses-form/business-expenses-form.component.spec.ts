import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessExpensesFormComponent } from './business-expenses-form.component';

describe('BusinessExpensesFormComponent', () => {
  let component: BusinessExpensesFormComponent;
  let fixture: ComponentFixture<BusinessExpensesFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BusinessExpensesFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BusinessExpensesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
