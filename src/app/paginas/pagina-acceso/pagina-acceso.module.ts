import { RouterModule } from '@angular/router';
import { PaginaAccesoComponent } from './pagina-acceso.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [PaginaAccesoComponent],
  imports: [CommonModule, MatButtonModule, RouterModule]
})
export class PaginaAccesoModule {}
