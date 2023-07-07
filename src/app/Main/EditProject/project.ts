import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LocalStorageService } from '../../db/LocalStorageService';

@Component({
  selector: 'project-list',
  templateUrl: './projectlist.html',
  styleUrls: ['./editproject.css']
})
export class editproject implements OnInit {
  formDataList: any[] = [];
  proyectoIndex: number = -1;
  proyecto: any = {};
  formulario: FormGroup;

  constructor(
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private localStorageService: LocalStorageService,
    private router: Router
  ) {
    this.formulario = this.formBuilder.group({
      projectName: ['', Validators.required],
      descripcion: ['', Validators.required],
      projectManager: ['', Validators.required],
      asignado: ['', Validators.required],
      estado: ['', Validators.required]
    });
  }

  ngOnInit() {
    // Obtener los datos del formulario guardados en el Local Storage
    const storedData = this.localStorageService.obtenerDatosDeLocalStorage('Formbuilder');

    // Verificar si existen datos almacenados
    if (storedData && storedData.length > 0) {
      this.formDataList = storedData;
    }

    // Obtener el número de índice de la URL
    this.activatedRoute.params.subscribe(params => {
      const index = params['index'];
      this.proyectoIndex = Number(index);
      this.proyecto = this.formDataList[this.proyectoIndex];
      
      // Rellenar el formulario con los datos del proyecto
      this.formulario.patchValue({
        projectName: this.proyecto.projectName,
        descripcion: this.proyecto.descripcion,
        projectManager: this.proyecto.projectManager,
        asignado: this.proyecto.asignado,
        estado: this.proyecto.estado
      });
    });
  }

  guardarFormulario() {
    if (this.formulario.valid) {
      // Obtener los valores del formulario
      const projectName = this.formulario.get('projectName')?.value;
      const descripcion = this.formulario.get('descripcion')?.value;
      const projectManager = this.formulario.get('projectManager')?.value;
      const asignado = this.formulario.get('asignado')?.value;
      const estado = this.formulario.get('estado')?.value;
      
      // Actualizar los datos del proyecto con los valores del formulario
      this.proyecto.projectName = projectName;
      this.proyecto.descripcion = descripcion;
      this.proyecto.projectManager = projectManager;
      this.proyecto.asignado = asignado;
      this.proyecto.estado = estado;
      
      // Actualizar los datos en el Local Storage
      this.localStorageService.guardarDatosEnLocalStorage('Formbuilder', this.formDataList);
      console.log('Proyecto actualizado.');

      // Redireccionar a la ruta /project
      this.router.navigate(['/projects']);
    } else {
      alert('El formulario no es válido. Por favor, complete todos los campos requeridos.');
    }
  }
}