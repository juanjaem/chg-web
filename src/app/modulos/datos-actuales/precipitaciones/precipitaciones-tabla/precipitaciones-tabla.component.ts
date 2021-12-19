import { Component, Input } from '@angular/core';
import { DatosPluviometricosTr } from 'src/app/nucleo/interfaces/datos.models';

@Component({
  selector: 'app-precipitaciones-tabla',
  templateUrl: './precipitaciones-tabla.component.html',
  styleUrls: ['./precipitaciones-tabla.component.scss']
})
export class PrecipitacionesTablaComponent {
  @Input() datos: DatosPluviometricosTr[] = [];

  displayedColumns: string[] = ['nombrePunto', 'horaActual', 'ultimas12horas', 'acumuladoHoy', 'acumuladoAyer'];

  constructor() {}
}
