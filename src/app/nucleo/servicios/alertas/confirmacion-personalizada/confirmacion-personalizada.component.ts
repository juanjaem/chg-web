import { Component, Inject } from '@angular/core';
import { DatosConfirmacionPersonalizada } from './confirmacion-personalizada.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  templateUrl: './confirmacion-personalizada.component.html',
  styleUrls: ['./confirmacion-personalizada.component.scss']
})
export class ConfirmacionPersonalizadaComponent {
  constructor(public dialogRef: MatDialogRef<ConfirmacionPersonalizadaComponent>, @Inject(MAT_DIALOG_DATA) public data: DatosConfirmacionPersonalizada) {}
}
