import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LocalStorageService } from "../../db/LocalStorageService";
import { Router } from '@angular/router';

@Component({
  selector: 'app-formulario',
  templateUrl: "./newproject.html",
  styleUrls: ["./newproject.css"]
})
export class project1 {
  formulario: FormGroup;

  constructor(
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

    this.formulario.patchValue({
      fechaCreacion: new Date().toISOString()
    });
  }

  guardarFormulario() {
    if (this.formulario.valid) {
      const projectName = this.formulario.get('projectName')?.value;
      const descripcion = this.formulario.get('descripcion')?.value;
      const projectManager = this.formulario.get('projectManager')?.value;
      const asignado = this.formulario.get('asignado')?.value;
      const estado = this.formulario.get('estado')?.value;
  
      // Obtener la fecha y hora actual en el huso horario del usuario
      const fechaCreacion = new Date().toLocaleString();
  
      // Crear un objeto con los datos del formulario actual, incluyendo la fecha de creación
      const formData = {
        projectName: projectName,
        descripcion: descripcion,
        projectManager: projectManager,
        asignado: asignado,
        estado: estado,
        fechaCreacion: fechaCreacion
      };
  
      // Obtener los datos almacenados previamente en el almacenamiento local
      let storedData: any[] = this.localStorageService.obtenerDatosDeLocalStorage('Formbuilder');
  
      // Si no hay datos almacenados previamente, inicializar la matriz vacía
      if (!storedData) {
        storedData = [];
      }
  
      // Agregar los datos del formulario actual a la matriz de datos almacenados
      storedData.push(formData);
  
      // Guardar la matriz en el almacenamiento local
      this.localStorageService.guardarDatosEnLocalStorage('Formbuilder', storedData);
  
      console.log('Los datos se han guardado en el almacenamiento local.');
      this.router.navigate(['projects']);
    } else {
      alert('El formulario no es válido. Por favor, complete todos los campos requeridos.');
    }
  }  
}
