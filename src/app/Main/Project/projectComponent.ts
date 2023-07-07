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
  currentPage: number = 1;
  pageSize: number = 10;
  totalPages: number = 1;
  paginatedList: any[] = [];

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
      this.totalPages = Math.ceil(this.formDataList.length / this.pageSize);
      this.updatePaginatedList();
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

    this.totalPages = Math.ceil(this.formDataList.length / this.pageSize);
    this.currentPage = Math.min(this.currentPage, this.totalPages);
    this.updatePaginatedList();
  }

  updatePaginatedList() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedList = this.formDataList.slice(startIndex, endIndex);
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePaginatedList();
    }
  }

  generatePageArray(): number[] {
    return Array.from({ length: this.totalPages }, (_, index) => index + 1);
  }
}
