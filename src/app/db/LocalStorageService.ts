import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  guardarDatosEnLocalStorage(clave: string, datos: any) {
    localStorage.setItem(clave, JSON.stringify(datos));
  }

  obtenerDatosDeLocalStorage(clave: string): any[] {
    const datos = localStorage.getItem(clave);
    return datos ? JSON.parse(datos) : [];
  }

  getFormData(): any[] {
    return this.obtenerDatosDeLocalStorage('formData');
  }
}