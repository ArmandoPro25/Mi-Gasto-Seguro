import { TestBed } from '@angular/core/testing';

import { BusinessExpensesService } from './business-expenses.service';

describe('BusinessExpensesService', () => {
  let service: BusinessExpensesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BusinessExpensesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
