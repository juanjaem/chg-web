import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginaAccesoModule } from './pagina-acceso/pagina-acceso.module';
import { PaginaRutaNoEncontradaModule } from './pagina-ruta-no-encontrada/pagina-ruta-no-encontrada.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, PaginaAccesoModule, PaginaRutaNoEncontradaModule]
})
export class PaginasModule {}
