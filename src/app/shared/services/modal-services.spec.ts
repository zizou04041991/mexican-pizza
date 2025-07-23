import { TestBed } from '@angular/core/testing';

import { ModalServices } from './modal-services';

describe('ModalServices', () => {
  let service: ModalServices;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModalServices);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
