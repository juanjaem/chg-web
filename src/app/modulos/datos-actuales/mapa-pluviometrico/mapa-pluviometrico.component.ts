import { Component, AfterViewInit, Inject, OnDestroy } from '@angular/core';
import { DatosPluviometricosTr } from 'src/app/nucleo/interfaces/datos.models';
import * as L from 'leaflet';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DatosMapaPluviometrico {
  datosPluviometricos: DatosPluviometricosTr[];
  centrarMapaEn?: DatosPluviometricosTr;
}

const ignRasterTile = L.tileLayer.wms('https://www.ign.es/wms-inspire/mapa-raster?service=WMS', {
  layers: 'mtn_rasterizado', //nombre de la capa (ver get capabilities)
  format: 'image/png',
  transparent: true,
  version: '1.3.0', //wms version (ver get capabilities)
  attribution: 'PNOA WMS. Cedido por © Instituto Geográfico Nacional de España'
});

const googleHybridTile = L.tileLayer('http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}', {
  maxZoom: 19,
  subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
});

const openStreetMapTile = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 18,
  minZoom: 3,
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
});

@Component({
  selector: 'app-mapa-pluviometrico',
  templateUrl: './mapa-pluviometrico.component.html',
  styleUrls: ['./mapa-pluviometrico.component.scss']
})
export class MapaPluviometricoComponent implements AfterViewInit, OnDestroy {
  private map!: L.Map;

  constructor(public dialogRef: MatDialogRef<MapaPluviometricoComponent>, @Inject(MAT_DIALOG_DATA) public datosMapa: DatosMapaPluviometrico) {}

  ngAfterViewInit(): void {
    this.initMap();
  }

  ngOnDestroy(): void {
    this.map.off();
    this.map.remove();
  }

  private initMap(): void {
    let parametrosMapa = {};
    if (this.datosMapa.centrarMapaEn?.coordenadasDecimal?.lat && this.datosMapa.centrarMapaEn?.coordenadasDecimal?.lng) {
      parametrosMapa = {
        center: [this.datosMapa.centrarMapaEn.coordenadasDecimal.lat, this.datosMapa.centrarMapaEn.coordenadasDecimal.lng],
        zoom: 15
      };
    }
    this.map = L.map('map', parametrosMapa);

    // Cargar puntos de las estaciones
    this.datosMapa.datosPluviometricos.forEach((dato) => {
      if (dato.coordenadasDecimal?.lat && dato.coordenadasDecimal?.lng) {
        L.circleMarker([dato.coordenadasDecimal?.lat, dato.coordenadasDecimal?.lng]).addTo(this.map);
      }
    });

    ignRasterTile.addTo(this.map);
  }

  cerrar(): void {
    this.dialogRef.close();
  }

  cambiarCapa(mapaElegido: string): void {
    this.map.eachLayer((layer) => {
      this.map.removeLayer(layer);
    });
    switch (mapaElegido) {
      case 'rasterIgn':
        ignRasterTile.addTo(this.map);
        break;
      case 'googleHybrid':
        googleHybridTile.addTo(this.map);
        break;
      case 'openStreetMap':
        openStreetMapTile.addTo(this.map);
        break;
      default:
        break;
    }
  }
}
