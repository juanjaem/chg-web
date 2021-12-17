import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { PrecipitacionesTablaComponent } from './precipitaciones-tabla/precipitaciones-tabla.component';
import { PrecipitacionesFiltrosComponent } from './precipitaciones-filtros/precipitaciones-filtros.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@NgModule({
  declarations: [PrecipitacionesTablaComponent, PrecipitacionesFiltrosComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatTableModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatSlideToggleModule
  ],
  exports: [PrecipitacionesTablaComponent, PrecipitacionesFiltrosComponent]
})
export class PrecipitacionesModule {}
