import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessDepartmentComponent } from './business-department.component';

describe('BusinessDepartmentComponent', () => {
  let component: BusinessDepartmentComponent;
  let fixture: ComponentFixture<BusinessDepartmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BusinessDepartmentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BusinessDepartmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
