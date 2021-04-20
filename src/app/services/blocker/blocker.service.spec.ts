import { TestBed } from '@angular/core/testing';

import { BlockerService } from './blocker.service';

describe('BlockerService', () => {
  let service: BlockerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BlockerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
