import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapaPluviometricoComponent } from './mapa-pluviometrico.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [MapaPluviometricoComponent],
  imports: [CommonModule, MatIconModule, MatButtonModule, MatMenuModule],
  exports: [MapaPluviometricoComponent],
  entryComponents: [MapaPluviometricoComponent]
})
export class MapaPluviometricoModule {}
