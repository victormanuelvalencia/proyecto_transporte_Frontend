import { TestBed } from '@angular/core/testing';

import { dirlistorderservice } from './dir_list_order.service';

describe('dirlistorderservice', () => {
  let service: dirlistorderservice;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(dirlistorderservice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
