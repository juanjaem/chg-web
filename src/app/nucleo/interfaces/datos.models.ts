export interface DatosPluviometricosTr {
  pluviometro: {
    codigo: string;
    nombre: string;
  };
  provincia: {
    codigo: string;
    nombre: string;
  };
  precipitacionesHoraActual: number;
  precipitacionesUltimas12horas: number;
  precipitacionesAcumuladoHoy: number;
  precipitacionesAcumuladoAyer: number;
  precipitacionesUnidad: string;
  ubicacion?: {
    lat: number;
    lng: number;
  };
}
