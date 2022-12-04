import { Component, Input, ViewChild, EventEmitter, Output } from '@angular/core';
import { MatSort, SortDirection } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DatosPluviometricosTrExt } from '../precipitaciones.component';
import * as lodash from 'lodash';

@Component({
  selector: 'app-precipitaciones-tabla',
  templateUrl: './precipitaciones-tabla.component.html',
  styleUrls: ['./precipitaciones-tabla.component.scss']
})
export class PrecipitacionesTablaComponent {
  datosTabla: MatTableDataSource<DatosPluviometricosTrExt> = new MatTableDataSource();

  @ViewChild(MatSort) sort!: MatSort;
  @Input() set datosOriginales(datos: DatosPluviometricosTrExt[]) {
    this.datosTabla = new MatTableDataSource(datos);
    this.datosTabla.sortData = this.ordenamientoPersonalizado;
    this.datosTabla.sort = this.sort; // Para que ordene justo despues de obtener nuevos datos
  }
  @Output() favorito = new EventEmitter<string>();
  @Output() abrirMapa = new EventEmitter<DatosPluviometricosTrExt>();

  displayedColumns: string[] = ['nombrePunto', 'horaActual', 'horaAnterior', 'acumuladoHoy', 'acumuladoAyer'];

  constructor() {}

  private ordenamientoPersonalizado = (datos: DatosPluviometricosTrExt[], orden: MatSort) => {
    let datosOrdenados: DatosPluviometricosTrExt[] = [];
    let datosAux: DatosPluviometricosTrExt[] = lodash.cloneDeep(datos);

    // COLOCAR FAVORITOS AL PRINCIPIO
    datosAux = datosAux.filter((dato) => {
      if (dato?.favorito) {
        datosOrdenados.push(dato);
        return false;
      } else {
        return true;
      }
    });

    // ORDENAR ARRAY DE FAVORITOS Y RESTANTES INDEPENDIENTEMENTE
    switch (orden.active) {
      case 'nombrePunto':
        datosOrdenados = this.ordenarPorNombre(datosOrdenados, 'pluviometro.nombre', orden.direction);
        datosAux = this.ordenarPorNombre(datosAux, 'pluviometro.nombre', orden.direction);
        break;
      case 'horaActual':
        datosOrdenados = this.ordenarPorNumero(datosOrdenados, 'precipitacionesHoraActual', orden.direction);
        datosAux = this.ordenarPorNumero(datosAux, 'precipitacionesHoraActual', orden.direction);
        break;
      case 'horaAnterior':
        datosOrdenados = this.ordenarPorNumero(datosOrdenados, 'precipitacionesHoraAnterior', orden.direction);
        datosAux = this.ordenarPorNumero(datosAux, 'precipitacionesHoraAnterior', orden.direction);
        break;
      case 'acumuladoHoy':
        datosOrdenados = this.ordenarPorNumero(datosOrdenados, 'precipitacionesAcumuladoHoy', orden.direction);
        datosAux = this.ordenarPorNumero(datosAux, 'precipitacionesAcumuladoHoy', orden.direction);
        break;
      case 'acumuladoAyer':
        datosOrdenados = this.ordenarPorNumero(datosOrdenados, 'precipitacionesAcumuladoAyer', orden.direction);
        datosAux = this.ordenarPorNumero(datosAux, 'precipitacionesAcumuladoAyer', orden.direction);
        break;
    }
    datosOrdenados.push(...datosAux);

    return datosOrdenados;
  };

  private ordenarPorNombre(datos: DatosPluviometricosTrExt[], campoOrdenacion: string, orden: SortDirection): DatosPluviometricosTrExt[] {
    // Sin orden
    if (orden === '') {
      return datos;
    }

    // Orden ascendente
    datos.sort((a, b) => {
      const aStr: string = lodash.get(a, campoOrdenacion) || '';
      const bStr: string = lodash.get(b, campoOrdenacion) || '';
      return bStr.localeCompare(aStr);
    });

    // Orden descendente
    if (orden === 'desc') {
      datos = datos.reverse();
    }

    return datos;
  }

  private ordenarPorNumero(datos: DatosPluviometricosTrExt[], campoOrdenacion: string, orden: SortDirection): DatosPluviometricosTrExt[] {
    // Sin orden
    if (orden === '') {
      return datos;
    }

    // Orden ascendente
    datos.sort((a, b) => Math.round(lodash.get(a, campoOrdenacion) * 10) - Math.round(lodash.get(b, campoOrdenacion) * 10));

    if (orden === 'desc') {
      // Orden descendente
      datos = datos.reverse();
    }

    return datos;
  }
}
