import { TestBed } from '@angular/core/testing';

import { SecAddressService } from './sec_address.service';

describe('SecAddressService', () => {
  let service: SecAddressService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SecAddressService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
