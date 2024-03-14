import { TestBed } from '@angular/core/testing';

import { HealtkitService } from './healtkit.service';

describe('HealtkitService', () => {
  let service: HealtkitService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HealtkitService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
