import { environment } from './../../../../environments/environment';
import { Component, OnInit } from '@angular/core';
import { PeticionesService, PeticionOpciones } from './../../../nucleo/servicios/peticiones/peticiones.service';
import { DatosPluviometricosTr } from 'src/app/nucleo/interfaces/datos.models';
import { GetDatosPluviometricosTrResp } from 'src/app/nucleo/interfaces/respuesta.models';
import { delay } from 'rxjs';

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

  constructor(private peticionesService: PeticionesService) {}

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
}
