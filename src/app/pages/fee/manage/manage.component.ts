import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Fee } from 'src/app/models/fee.model';
import { FeeService } from 'src/app/services/fee.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {

  
  fee: Fee;
  mode: number;
  theFormGroup:FormGroup
  trySend:boolean
  constructor(private feeService: FeeService,
    private router: Router,
    private activateRoute: ActivatedRoute,
     private theFormBuilder:FormBuilder
  ) { //esto me ayuda a llmar las apis
    this.fee = {
      id: 0,
      contract_id: null,
      amount: 0,
      due_date: ""
      
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
      this.fee.id = this.activateRoute.snapshot.params.id;
      this.getFee(this.fee.id);
    }
  }

  configFormGroup() {
    this.theFormGroup = this.theFormBuilder.group({
      id: ['', [Validators.pattern('^[0-9]+$')]], // Solo números enteros, opcional
      contract_id: ['', [Validators.pattern('^[0-9]+$')]], // Solo números enteros, opcional
      amount: ['', [Validators.required, Validators.pattern('^[0-9]+(\\.[0-9]{1,2})?$')]], // Requerido, número decimal con 1 o 2 decimales opcionales
      due_date: [''], // Requerido, se puede añadir un validador personalizado para fechas válidas
    });
  }
  

  //esto lo definimos como un get para que esta funcion sea
  //como una variable para el html
  get getTheFormGroup(){
    return this.theFormGroup.controls
  }

  getFee(id: number) {
    this.feeService.view(id).subscribe(data => {
      this.fee = data
    })
  }

  create() {
    console.log(JSON.stringify(this.fee));

    this.feeService.create(this.fee).subscribe(data => {
      Swal.fire("Creado", " se ha creado exitosa mente", "success")//tirulo a la alerta
      this.router.navigate(["fees/list"]);
    })
    // if(this.theFormGroup.invalid){
    //   this.trySend = true
    //   Swal.fire("Formulario incorrecto", "ingrese correctamente los datos", "error")
    //   return    
    // }
    // console.log(JSON.stringify(this.fee));
    // this.feeService.create(this.fee).subscribe(data=>{
    //   Swal.fire("Creado"," se ha creado exitosa mente", "success")//tirulo a la alerta
    //   this.router.navigate(["fees/list"]); 
    // })

  }

  update() {
    // if(this.theFormGroup.invalid){
    //     this.trySend = true
    //     Swal.fire("Formulario incorrecto", "ingrese correctamente los datos", "error")
    //     return    
    //   }
    console.log(JSON.stringify(this.fee), "hola");

    this.feeService.update(this.fee).subscribe(data => {
      Swal.fire("Actualizado", " se ha actualizado exitosa mente", "success")//tirulo a la alerta
      this.router.navigate(["fees/list"]);
    })

  }

}
