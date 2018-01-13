import { TestBed, inject } from '@angular/core/testing';

import { AtheleteRepositoryService } from './athelete-repository.service';

describe('AtheleteRepositoryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AtheleteRepositoryService]
    });
  });

  it('should be created', inject([AtheleteRepositoryService], (service: AtheleteRepositoryService) => {
    expect(service).toBeTruthy();
  }));
});
