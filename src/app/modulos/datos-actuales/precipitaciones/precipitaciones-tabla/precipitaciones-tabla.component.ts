import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-precipitaciones-tabla',
  templateUrl: './precipitaciones-tabla.component.html',
  styleUrls: ['./precipitaciones-tabla.component.scss']
})
export class PrecipitacionesTablaComponent {
  @Input() datos: any;

  displayedColumns: string[] = ['nombrePunto', 'horaActual', 'ultimas12horas', 'acumuladoHoy', 'acumuladoAyer'];

  constructor() {}
}