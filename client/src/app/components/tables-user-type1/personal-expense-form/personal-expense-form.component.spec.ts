import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalExpenseFormComponent } from './personal-expense-form.component';

describe('PersonalExpenseFormComponent', () => {
  let component: PersonalExpenseFormComponent;
  let fixture: ComponentFixture<PersonalExpenseFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PersonalExpenseFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonalExpenseFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
