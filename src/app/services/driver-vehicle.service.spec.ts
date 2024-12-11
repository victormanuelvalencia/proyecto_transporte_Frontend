import { TestBed } from '@angular/core/testing';

import { DriverVehicleService } from './driver-vehicle.service';

describe('DriverVehicleService', () => {
  let service: DriverVehicleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DriverVehicleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
