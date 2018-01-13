import { TestBed, inject } from '@angular/core/testing';

import { BaseRepositoryService } from './base-repository.service';

describe('BaseRepositoryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BaseRepositoryService]
    });
  });

  it('should be created', inject([BaseRepositoryService], (service: BaseRepositoryService) => {
    expect(service).toBeTruthy();
  }));
});
