import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../../db/LocalStorageService';

@Component({
  selector: 'project',
  templateUrl: './project.html',
  styleUrls: ['./project.css']
})
export class project implements OnInit {
  formDataList: any[] = []; // Propiedad para almacenar los datos del formulario
  showConfirmation: boolean = false; // Propiedad para controlar la visibilidad del mensaje de confirmación
  proyectoAEliminarIndex: number = -1; // Índice del proyecto a eliminar
  dropdownOpen!: number | null;
  currentIndex: number = -1;
  constructor(private localStorageService: LocalStorageService) {}
  toggleDropdown(index: number) {
    this.dropdownOpen = this.dropdownOpen === index ? null : index;
    this.dropdownOpen = this.currentIndex = index;
  }
  
  ngOnInit() {
    // Obtener los datos del formulario guardados en el Local Storage
    const storedData = this.localStorageService.obtenerDatosDeLocalStorage('Formbuilder');

    // Verificar si existen datos almacenados
    if (storedData && storedData.length > 0) {
      this.formDataList = storedData;
    }
  }

  mostrarConfirmacionEliminacion(index: number) {
    this.showConfirmation = true;
    this.proyectoAEliminarIndex = index;
  }

  cancelarEliminacion() {
    this.showConfirmation = false;
    this.proyectoAEliminarIndex = -1;
  }

  eliminarProyecto() {
    // Eliminar el proyecto del array formDataList
    this.formDataList.splice(this.proyectoAEliminarIndex, 1);
    // Actualizar los datos en el Local Storage
    this.localStorageService.guardarDatosEnLocalStorage('Formbuilder', this.formDataList);
    this.showConfirmation = false;
    console.log('Proyecto eliminado.');
  }
}
