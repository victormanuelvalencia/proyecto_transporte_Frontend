import { TestBed } from '@angular/core/testing';

import { OwnerVehicleService } from './owner-vehicle.service';

describe('OwnerVehicleService', () => {
  let service: OwnerVehicleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OwnerVehicleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
