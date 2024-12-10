import { TestBed } from '@angular/core/testing';

import { RuteService } from './rute.service';

describe('RuteService', () => {
  let service: RuteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RuteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
