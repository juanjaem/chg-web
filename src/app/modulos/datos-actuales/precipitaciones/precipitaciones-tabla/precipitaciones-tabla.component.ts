import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, Component, Input, ViewChild } from '@angular/core';
import { MatSort, MatSortable, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DatosPluviometricosTrExt } from '../precipitaciones.component';

@Component({
  selector: 'app-precipitaciones-tabla',
  templateUrl: './precipitaciones-tabla.component.html',
  styleUrls: ['./precipitaciones-tabla.component.scss']
})
export class PrecipitacionesTablaComponent {
  datosTabla: MatTableDataSource<DatosPluviometricosTrExt> | undefined;

  @ViewChild(MatSort) sort!: MatSort;
  @Input() set datos(datos: DatosPluviometricosTrExt[]) {
    this.datosTabla = new MatTableDataSource(datos);
    this.datosTabla.sortData = ordenamientoPersonalizado;
    this.datosTabla.sort = this.sort; // Para que ordene justo despues de obtener nuevos datos
  }

  displayedColumns: string[] = ['nombrePunto', 'horaActual', 'ultimas12horas', 'acumuladoHoy', 'acumuladoAyer'];

  constructor() {}
}

const ordenamientoPersonalizado = (datos: DatosPluviometricosTrExt[], orden: MatSort) => {
  console.log(orden.active + ' ' + orden.direction);

  return datos.reverse();
};
