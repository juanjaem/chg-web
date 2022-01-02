import { Injectable } from '@angular/core';
import { DatosMapaPluviometrico, MapaPluviometricoComponent } from './mapa-pluviometrico.component';
import { MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class MapaPluviometricoService {
  constructor(private dialog: MatDialog) {}

  abrirMapaPluviometrico(datos: DatosMapaPluviometrico): any {
    const dialogRef = this.dialog.open(MapaPluviometricoComponent, {
      width: '100vw',
      height: '100vh',
      maxWidth: 'none',
      panelClass: 'mapa-pluviometria',
      data: datos
    });

    // dialogRef.afterClosed().subscribe(result => {
    //   console.log('The dialog was closed');
    // });
  }

}
