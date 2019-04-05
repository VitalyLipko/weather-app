import { TestBed } from '@angular/core/testing';

import { LocationManagementService } from './location-management.service';

describe('LocationManagementService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LocationManagementService = TestBed.get(LocationManagementService);
    expect(service).toBeTruthy();
  });
});
