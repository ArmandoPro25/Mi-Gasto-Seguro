import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessIncomeFormComponent } from './business-income-form.component';

describe('BusinessIncomeFormComponent', () => {
  let component: BusinessIncomeFormComponent;
  let fixture: ComponentFixture<BusinessIncomeFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BusinessIncomeFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BusinessIncomeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
