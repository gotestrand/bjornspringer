import { TestBed, inject } from '@angular/core/testing';

import { MapStateService } from './map-state.service';

describe('MapStateService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MapStateService]
    });
  });

  it('should be created', inject([MapStateService], (service: MapStateService) => {
    expect(service).toBeTruthy();
  }));
});
