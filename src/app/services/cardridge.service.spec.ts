import { TestBed } from '@angular/core/testing';

import { CardridgeService } from './cardridge.service';

describe('CardridgeService', () => {
  let service: CardridgeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CardridgeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
