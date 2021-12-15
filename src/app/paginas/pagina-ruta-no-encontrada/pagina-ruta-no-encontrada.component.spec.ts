import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginaRutaNoEncontradaComponent } from './pagina-ruta-no-encontrada.component';

describe('PaginaRutaNoEncontradaComponent', () => {
  let component: PaginaRutaNoEncontradaComponent;
  let fixture: ComponentFixture<PaginaRutaNoEncontradaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PaginaRutaNoEncontradaComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginaRutaNoEncontradaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
