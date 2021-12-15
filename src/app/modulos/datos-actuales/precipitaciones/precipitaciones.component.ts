import { environment } from './../../../../environments/environment';
import { Component, OnInit } from '@angular/core';
import { PeticionesService, PeticionOpciones } from './../../../nucleo/servicios/peticiones/peticiones.service';

@Component({
  selector: 'app-precipitaciones',
  templateUrl: './precipitaciones.component.html',
  styleUrls: ['./precipitaciones.component.scss']
})
export class PrecipitacionesComponent implements OnInit {
  datos: any;

  constructor(private peticionesService: PeticionesService) {}

  ngOnInit(): void {
    const peticionesOpciones: PeticionOpciones = {
      url: `${environment.url}/api/tiempo-real/precipitaciones`,
      method: 'get',
      adjuntarToken: false,
      mostrarAlertaError: false
    };

    this.peticionesService.peticion(peticionesOpciones).subscribe((res: any) => {
      console.log(res);
      if (res?.body && res.body instanceof Object) {
        this.datos = JSON.stringify(res.body['datos']);
      }
    });
  }
}
