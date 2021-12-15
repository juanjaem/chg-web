import { TestBed } from '@angular/core/testing';

import { ConfirmacionPersonalizadaService } from './confirmacion-personalizada.service';

describe('ConfirmacionPersonalizadaService', () => {
  let service: ConfirmacionPersonalizadaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConfirmacionPersonalizadaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
