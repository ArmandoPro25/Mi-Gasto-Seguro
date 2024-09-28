import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalIncomeComponent } from './personal-income.component';

describe('PersonalIncomeComponent', () => {
  let component: PersonalIncomeComponent;
  let fixture: ComponentFixture<PersonalIncomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PersonalIncomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonalIncomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
