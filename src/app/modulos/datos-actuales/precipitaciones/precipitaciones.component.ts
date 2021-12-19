import { environment } from './../../../../environments/environment';
import { Component, OnInit } from '@angular/core';
import { PeticionesService, PeticionOpciones } from './../../../nucleo/servicios/peticiones/peticiones.service';
import { FormControl, FormGroup } from '@angular/forms';

export interface DatosPluviometricos {
  pluviometro: {
    codigo: string;
    nombre: string;
  };
  provincia: {
    codigo: string;
    nombre: string;
  };
  precipitacionesHoraActual: string;
  precipitacionesUltimas12horas: string;
  precipitacionesAcumuladoHoy: string;
  precipitacionesAcumuladoAyer: string;
  precipitacionesUnidad: string;
  ubicacion?: {
    lat: number;
    lng: number;
  };
}

@Component({
  selector: 'app-precipitaciones',
  templateUrl: './precipitaciones.component.html',
  styleUrls: ['./precipitaciones.component.scss']
})
export class PrecipitacionesComponent implements OnInit {
  datosOriginales: DatosPluviometricos[] = [];
  datosFiltrados: DatosPluviometricos[] = [];

  constructor(private peticionesService: PeticionesService) {}

  ngOnInit(): void {
    const peticionesOpciones: PeticionOpciones = {
      url: `${environment.url}/api/tiempo-real/precipitaciones`,
      method: 'get',
      adjuntarToken: false,
      mostrarAlertaError: false
    };

    this.peticionesService.peticion<DatosPluviometricos[]>(peticionesOpciones).subscribe((res) => {
      if (res.body) {
        this.datosOriginales = res.body;
        this.datosFiltrados = res.body;
      }
    });
  }

  actualizarDatosFiltrados(datosFiltrados: DatosPluviometricos[]) {
    this.datosFiltrados = datosFiltrados;
  }
}
