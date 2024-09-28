import { TestBed } from '@angular/core/testing';

import { WelcomeVideoService } from './welcome-video.service';

describe('WelcomeVideoService', () => {
  let service: WelcomeVideoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WelcomeVideoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
