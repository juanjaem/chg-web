import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DatosPluviometricos } from '../precipitaciones.component';

@Component({
  selector: 'app-precipitaciones-filtros',
  templateUrl: './precipitaciones-filtros.component.html',
  styleUrls: ['./precipitaciones-filtros.component.scss']
})
export class PrecipitacionesFiltrosComponent {
  @Input() datosOriginales: DatosPluviometricos[] = [];
  @Output() datosFiltrados = new EventEmitter<DatosPluviometricos[]>();

  provinciasSeleccionadasEstado: boolean = false;
  provinciasSeleccionadas: string[] = [];

  provinciasLista: { codigo: string; valor: string }[] = [
    { codigo: 'AB', valor: 'Albacete' },
    { codigo: 'AL', valor: 'Almería' },
    { codigo: 'BA', valor: 'Badajoz' },
    { codigo: 'CE', valor: 'Ceuta' },
    { codigo: 'CR', valor: 'Ciudad Real' },
    { codigo: 'CO', valor: 'Córdoba' },
    { codigo: 'GR', valor: 'Granada' },
    { codigo: 'HU', valor: 'Huelva' },
    { codigo: 'JA', valor: 'Jaén' },
    { codigo: 'ME', valor: 'Melilla' },
    { codigo: 'SE', valor: 'Sevilla' }
  ];

  constructor() {}

  filtrar() {
    let datosFiltrados: DatosPluviometricos[] = [...this.datosOriginales];
    console.log(this.provinciasSeleccionadas);
    console.log(this.provinciasSeleccionadasEstado);

    // FILTRO DE PROVINCIA
    if (this.provinciasSeleccionadasEstado) {
      if (this.provinciasSeleccionadas.length > 0) {
        datosFiltrados = this.datosOriginales.filter(
          (datoPluv) =>
            this.provinciasSeleccionadas.findIndex((codigo) => {
              console.log(datoPluv.provincia.codigo + ' - ' + codigo);

              return datoPluv.provincia.codigo === codigo;
            }) >= 0
        );
      }
    }

    this.datosFiltrados.emit(datosFiltrados);
  }
}
