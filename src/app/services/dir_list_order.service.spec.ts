import { TestBed } from '@angular/core/testing';

import { DirListOrderService } from './dir_list_order.service';

describe('DirListOrderService', () => {
  let service: DirListOrderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DirListOrderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
