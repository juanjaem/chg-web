import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SpinnerPantallaCompletaComponent } from './spinner-pantalla-completa/spinner-pantalla-completa.component';

@NgModule({
  declarations: [SpinnerPantallaCompletaComponent],
  imports: [CommonModule, MatProgressSpinnerModule]
})
export class SpinnerModule {}
