import { TestBed, inject } from '@angular/core/testing';

import { StravaService } from './strava.service';

describe('StravaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StravaService]
    });
  });

  it('should be created', inject([StravaService], (service: StravaService) => {
    expect(service).toBeTruthy();
  }));
});
