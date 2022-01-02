import { environment } from './../../../../environments/environment';
import { Component, OnInit } from '@angular/core';
import { PeticionesService, PeticionOpciones } from './../../../nucleo/servicios/peticiones/peticiones.service';
import { DatosPluviometricosTr } from 'src/app/nucleo/interfaces/datos.models';
import { GetDatosPluviometricosTrResp } from 'src/app/nucleo/interfaces/respuesta.models';
import { MapaPluviometricoService } from '../mapa-pluviometrico/mapa-pluviometrico.service';
import { DatosMapaPluviometrico } from '../mapa-pluviometrico/mapa-pluviometrico.component';

export interface DatosPluviometricosTrExt extends DatosPluviometricosTr {
  favorito?: boolean;
}

@Component({
  selector: 'app-precipitaciones',
  templateUrl: './precipitaciones.component.html',
  styleUrls: ['./precipitaciones.component.scss']
})
export class PrecipitacionesComponent implements OnInit {
  datosOriginales: DatosPluviometricosTrExt[] = [];
  datosFiltrados: DatosPluviometricosTrExt[] = [];

  constructor(private peticionesService: PeticionesService, private mpoService: MapaPluviometricoService) {}

  ngOnInit(): void {
    const peticionesOpciones: PeticionOpciones = {
      url: `${environment.url}/api/tiempo-real/precipitaciones`,
      method: 'get',
      adjuntarToken: false,
      mostrarAlertaError: false
    };

    this.peticionesService.peticion<GetDatosPluviometricosTrResp>(peticionesOpciones).subscribe((res) => {
      if (res.body) {
        this.datosOriginales = res.body;
        this.datosFiltrados = res.body;
      }
    });
  }

  actualizarDatosFiltrados(datosFiltrados: DatosPluviometricosTrExt[]) {
    this.datosFiltrados = datosFiltrados;
  }

  abrirMapa(estacionSeleccionada: DatosPluviometricosTrExt) {
    const datos: DatosMapaPluviometrico = { datosPluviometricos: this.datosOriginales, centrarMapaEn: estacionSeleccionada };
    this.mpoService.abrirMapaPluviometrico(datos);
  }
}
