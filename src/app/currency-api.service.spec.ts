import { TestBed } from '@angular/core/testing';

import { CurrencyAPIService } from './currency-api.service';

describe('CurrencyAPIService', () => {
  let service: CurrencyAPIService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CurrencyAPIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
