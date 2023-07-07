import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../../db/LocalStorageService';

@Component({
  selector: 'project',
  templateUrl: './project.html',
  styleUrls: ['./project.css']
})
export class project implements OnInit {
  originalDataList: any[] = [];
  filteredDataList: any[] = [];
  showConfirmation: boolean = false;
  proyectoAEliminarIndex: number = -1;
  dropdownOpen!: number | null;
  currentIndex: number = -1;
  currentPage: number = 1;
  pageSize: number = 10;
  totalPages: number = 1;
  paginatedList: any[] = [];
  selectedProjectIndex: number | null = null;
  searchQuery: string = '';

  constructor(private localStorageService: LocalStorageService) {}

  toggleDropdown(index: number) {
    this.dropdownOpen = this.dropdownOpen === index ? null : index;
    this.dropdownOpen = this.currentIndex = index;
  }

  ngOnInit() {
    const storedData = this.localStorageService.obtenerDatosDeLocalStorage('Formbuilder');

    if (storedData && storedData.length > 0) {
      this.originalDataList = storedData;
      this.totalPages = Math.ceil(this.originalDataList.length / this.pageSize);
      this.filterDataList();
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
    const originalIndex = this.paginatedList[this.proyectoAEliminarIndex].originalIndex;
    this.originalDataList.splice(originalIndex, 1);
    this.localStorageService.guardarDatosEnLocalStorage('Formbuilder', this.originalDataList);
    this.showConfirmation = false;
    console.log('Proyecto eliminado.');

    this.totalPages = Math.ceil(this.originalDataList.length / this.pageSize);
    this.currentPage = Math.min(this.currentPage, this.totalPages);
    this.filterDataList();
    this.updatePaginatedList();
  }

  filterDataList() {
    this.filteredDataList = this.originalDataList.filter((formData) =>
      formData.projectName.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
    this.totalPages = Math.ceil(this.filteredDataList.length / this.pageSize);
    this.currentPage = Math.min(this.currentPage, this.totalPages);
  }

  updatePaginatedList() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    const paginatedData = this.filteredDataList.slice(startIndex, endIndex);
    this.paginatedList = paginatedData.map((formData) => ({
      ...formData,
      originalIndex: this.originalDataList.indexOf(formData)
    }));
    this.selectedProjectIndex = null; // Resetear el índice seleccionado
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

  selectProject(index: number) {
    const formData = this.paginatedList[index];
    if (formData) {
      const originalIndex = formData.originalIndex;
      const projectIndex = this.originalDataList.findIndex((data) => data.originalIndex === originalIndex);
      this.selectedProjectIndex = projectIndex !== -1 ? projectIndex : null;
    } else {
      this.selectedProjectIndex = null;
    }
  }

  searchProjects() {
    this.currentPage = 1;
    this.filterDataList();
    this.updatePaginatedList();
  }
}
