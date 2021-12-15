import { map, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmacionPersonalizadaComponent } from './confirmacion-personalizada.component';

const width = '600px'; // Configura la anchura de las alertas.
const maxWidth = '95vw'; // Configura el margen de las alertas cuando está en pantalla pequeña.

@Injectable({
  providedIn: 'root'
})
export class ConfirmacionPersonalizadaService {
  constructor(public dialog: MatDialog) {}

  /**
   * Muestra una alerta de confirmación personalizable.
   * @param titulo El titulo de la alerta.
   * @param cuerpo El cuerpo de la alerta.
   * @param noMostrarCancelar No mostrar el botón de 'Cancelar'. Lo mostrará si no se especifica el parámetro.
   * @returns Observable con el resultado de la acción elegida por el usuario.
   */
  confirmacionPersonalizada(titulo: string, cuerpo: string, noMostrarCancelar: boolean = false): Observable<boolean> {
    const dialogRef = this.dialog.open(ConfirmacionPersonalizadaComponent, {
      width,
      maxWidth,
      ariaLabel: titulo,
      data: {
        titulo,
        cuerpo,
        noMostrarCancelar
      } as DatosConfirmacionPersonalizada
    });

    return dialogRef.afterClosed().pipe(map((res) => (res === true ? true : false))); // Convertir los undefined a false
  }
}

export interface DatosConfirmacionPersonalizada {
  titulo: string;
  cuerpo: string;
  noMostrarCancelar: boolean;
}
