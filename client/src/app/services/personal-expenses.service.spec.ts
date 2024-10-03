import { TestBed } from '@angular/core/testing';

import { PersonalExpensesService } from './personal-expenses.service';

describe('PersonalExpensesService', () => {
  let service: PersonalExpensesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PersonalExpensesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
