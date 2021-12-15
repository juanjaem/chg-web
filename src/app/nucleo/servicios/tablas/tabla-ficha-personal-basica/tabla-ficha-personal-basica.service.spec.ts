import { TestBed } from '@angular/core/testing';

import { TablaFichaPersonalBasicaService } from './tabla-ficha-personal-basica.service';

describe('TablaFichaPersonalBasicaService', () => {
  let service: TablaFichaPersonalBasicaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TablaFichaPersonalBasicaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
