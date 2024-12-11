import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Operation } from 'src/app/models/operation.model';
import { OperationService } from 'src/app/services/operation.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {

  
  operation: Operation;
  mode: number;
  theFormGroup: FormGroup
  trySend: boolean
  constructor(private operationService: OperationService,
    private router: Router,
    private activateRoute: ActivatedRoute,
    private theFormBuilder: FormBuilder
  ) { //esto me ayuda a llmar las apis
    this.operation = {
      id: 0,
      date: "",
      operation_type: "",
      state: null,
      municipality_id: null,
      vehicle_id: null

    };
    // //mode =1 es para visualiza, si el mode=2, es para crear, mode=3 es para actualizar
    this.mode = 0;
    this.trySend = false
  }

  //este metodo es unas clases como interfaz cuando arranque la pagina ejecute el contructor y llama a las apis
  ngOnInit(): void {
    //tomar foto a la ul
    this.configFormGroup();//aqui llamo a la funcion de validacion
    const currentUrl = this.activateRoute.snapshot.url.join('/');
    if (currentUrl.includes('view')) {
      this.mode = 1;
    } else if (currentUrl.includes('create')) {
      this.mode = 2;
    } else if (currentUrl.includes('update')) {
      this.mode = 3;
    }
    if (this.activateRoute.snapshot.params.id) {
      this.operation.id = this.activateRoute.snapshot.params.id;
      this.getOperation(this.operation.id);
    }
  }

  configFormGroup() {
    this.theFormGroup = this.theFormBuilder.group({
      date: ['', [Validators.required, Validators.pattern(/^\d{4}-\d{2}-\d{2}$/)]], // Requerido, formato de fecha 'YYYY-MM-DD'
      operation_type: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]], // Requerido, longitud mínima 3 y máxima 50 caracteres
      state: [false, [Validators.required]], // Requerido, valor booleano
      municipality_id: [null, [Validators.pattern(/^\d+$/)]], // Opcional, solo números enteros positivos
      vehicle_id: [null, [Validators.pattern(/^\d+$/)]], // Opcional, solo números enteros positivos
 
    });
  }


  //esto lo definimos como un get para que esta funcion sea
  //como una variable para el html
  get getTheFormGroup() {
    return this.theFormGroup.controls
  }

 getOperation(id: number) {
    this.operationService.view(id).subscribe(data => {
      this.operation = data
    })
  } 

  create() {
    console.log(JSON.stringify(this.operation));

    if (this.theFormGroup.invalid) {
      this.trySend = true
      Swal.fire("Formulario incorrecto", "ingrese correctamente los datos", "error")
      return
    }
    console.log(JSON.stringify(this.operation));
    this.operationService.create(this.operation).subscribe(data => {
      Swal.fire("Creado", " se ha creado exitosa mente", "success")//tirulo a la alerta
      this.router.navigate(["operations/list"]);
    })

  }

  update() {
    if (this.theFormGroup.invalid) {
      this.trySend = true
      Swal.fire("Formulario incorrecto", "ingrese correctamente los datos", "error")
      return
    }
    console.log(JSON.stringify(this.operation), "hola");

    this.operationService.update(this.operation).subscribe(data => {
      Swal.fire("Actualizado", " se ha actualizado exitosa mente", "success")//tirulo a la alerta
      this.router.navigate(["operations/list"]);
    })

  }

}
