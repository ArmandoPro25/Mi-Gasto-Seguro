import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalIncomeFromComponent } from './personal-income-from.component';

describe('PersonalIncomeFromComponent', () => {
  let component: PersonalIncomeFromComponent;
  let fixture: ComponentFixture<PersonalIncomeFromComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PersonalIncomeFromComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonalIncomeFromComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
