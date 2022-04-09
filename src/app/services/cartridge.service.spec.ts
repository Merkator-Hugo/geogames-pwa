import { TestBed } from '@angular/core/testing';

import { CartridgeService } from './cartridge.service';

describe('CartridgeService', () => {
  let service: CartridgeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CartridgeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
