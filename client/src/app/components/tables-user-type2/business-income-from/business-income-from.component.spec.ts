import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessIncomeFromComponent } from './business-income-from.component';

describe('BusinessIncomeFromComponent', () => {
  let component: BusinessIncomeFromComponent;
  let fixture: ComponentFixture<BusinessIncomeFromComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BusinessIncomeFromComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BusinessIncomeFromComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
