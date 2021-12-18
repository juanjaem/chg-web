import { environment } from './../../../../environments/environment';
import { Component, OnInit } from '@angular/core';
import { PeticionesService, PeticionOpciones } from './../../../nucleo/servicios/peticiones/peticiones.service';
import { FormControl, FormGroup } from '@angular/forms';

export interface TRPrecipitacion {
  nombrePunto: string;
  horaActual: string;
  ultimas12horas: string;
  acumuladoHoy: string;
  acumuladoAyer: string;
  unidad: string;
}

@Component({
  selector: 'app-precipitaciones',
  templateUrl: './precipitaciones.component.html',
  styleUrls: ['./precipitaciones.component.scss']
})
export class PrecipitacionesComponent implements OnInit {
  datosOriginales: TRPrecipitacion[] = [];
  datosFiltrados: TRPrecipitacion[] = [];

  constructor(private peticionesService: PeticionesService) {}

  ngOnInit(): void {
    const peticionesOpciones: PeticionOpciones = {
      url: `${environment.url}/api/tiempo-real/precipitaciones`,
      method: 'get',
      adjuntarToken: false,
      mostrarAlertaError: false
    };

    this.peticionesService.peticion<TRPrecipitacion[]>(peticionesOpciones).subscribe((res) => {
      if (res.body) {
        this.datosOriginales = res.body;
        this.datosFiltrados = res.body;
      }
    });
  }

  actualizarDatosFiltrados(datosFiltrados: TRPrecipitacion[]) {
    this.datosFiltrados = datosFiltrados;
  }
}
