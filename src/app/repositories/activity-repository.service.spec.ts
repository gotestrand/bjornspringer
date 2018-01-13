import { TestBed, inject } from '@angular/core/testing';

import { ActivityRepositoryService } from './activity-repository.service';

describe('ActivityRepositoryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ActivityRepositoryService]
    });
  });

  it('should be created', inject([ActivityRepositoryService], (service: ActivityRepositoryService) => {
    expect(service).toBeTruthy();
  }));
});
