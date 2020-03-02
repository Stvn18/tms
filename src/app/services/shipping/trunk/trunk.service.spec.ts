import { TestBed } from '@angular/core/testing';

import { TrunkService } from './trunk.service';

describe('TrunkService', () => {
  let service: TrunkService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TrunkService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
