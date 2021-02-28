import { TestBed } from '@angular/core/testing';

import { DatastoreService } from './data-store.service';

describe('DatastoreService', () => {
  let service: DatastoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DatastoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
