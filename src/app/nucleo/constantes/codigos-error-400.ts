import { Error400Res } from '../interfaces/respuesta.models';

export class CodigoError400 {
  private static codigoYDescripcion: { [index: string]: string } = {
    // Aquí se personaliza el mensaje para un código de error concreto.
    TPR_ERR_001: 'Mensaje personalizado para un código concreto' // ¡EJEMPLO A BORRAR!
  };

  /**
   * Obtiene la descrición más apropiada para el error 400 pasado por parámetro.
   * @param error - Respuesta de error o null
   * @returns Descripción del error
   */
  public static obtenerDescripcionError(error: Error400Res): string {
    if (error.status != 400) {
      throw new Error('Error inesperado. Se esperaba un error 400');
    }

    let msgError: string = '';
    const detalles = error.details;

    // Comprobar que el error trae un array de descripción de errores
    if (detalles && Array.isArray(detalles) && detalles.length > 0) {
      try {
        detalles.forEach((detalle) => {
          const codigo = detalle.code;
          const descripcion = detalle.description;
          let nuevoMsg: string = '';

          if (!codigo || !descripcion) {
            throw new Error('No existe el campo código o descripción en el error 400');
          }

          if (codigo in this.codigoYDescripcion) {
            // Existe una descripción personalizada para el código de error en cuestión
            nuevoMsg = this.codigoYDescripcion[codigo];
          } else {
            // No existe una descripción personalizada. Utilizar la descripción que viene en la respuesta.
            nuevoMsg = descripcion;
          }

          msgError.concat(`${nuevoMsg}. `); // Concatenamos la lista de errores en un string. La mayoria de veces será un solo error
        });
      } catch (e) {
        console.error('Error inesperado al generar el mensaje de error: ' + e);
        msgError = 'Error desconocido.';
      }
    } else {
      msgError = 'Error desconocido.';
    }

    return msgError;
  }
}
