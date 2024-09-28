import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalExpenseFromComponent } from './personal-expense-from.component';

describe('PersonalExpenseFromComponent', () => {
  let component: PersonalExpenseFromComponent;
  let fixture: ComponentFixture<PersonalExpenseFromComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PersonalExpenseFromComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonalExpenseFromComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
