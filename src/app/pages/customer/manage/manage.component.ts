import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Customer } from 'src/app/models/customer.model';
import { CustomerService } from 'src/app/services/customer.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {

  
  customer: Customer;
  mode: number;
  theFormGroup:FormGroup
  trySend:boolean
  constructor(private customerService: CustomerService,
    private router: Router,
    private activateRoute: ActivatedRoute,
     private theFormBuilder:FormBuilder
  ) { //esto me ayuda a llmar las apis
    this.customer = {
      id: 0,
      phone: "",
      address: ""
      
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
      this.customer.id = this.activateRoute.snapshot.params.id;
      this.getCustomer(this.customer.id);
    }
  }

  configFormGroup() {
    this.theFormGroup = this.theFormBuilder.group({
      phone: ['', [Validators.pattern(/^[\d+]+$/)]], // Solo números enteros, opcional
      address: ['', [Validators.required]]
    });
  }
  

  //esto lo definimos como un get para que esta funcion sea
  //como una variable para el html
  get getTheFormGroup(){
    return this.theFormGroup.controls
  }

  getCustomer(id: number) {
    this.customerService.view(id).subscribe(data => {
      this.customer = data
    })
  }

  create() {
    console.log(JSON.stringify(this.customer));

    if(this.theFormGroup.invalid){
      this.trySend = true
      Swal.fire("Formulario incorrecto", "ingrese correctamente los datos", "error")
      return    
    }
    console.log(JSON.stringify(this.customer));
    this.customerService.create(this.customer).subscribe(data=>{
      Swal.fire("Creado"," se ha creado exitosa mente", "success")//tirulo a la alerta
      this.router.navigate(["customers/list"]); 
    })

  }

  update() {
    if(this.theFormGroup.invalid){
        this.trySend = true
        Swal.fire("Formulario incorrecto", "ingrese correctamente los datos", "error")
        return    
      }
    console.log(JSON.stringify(this.customer), "hola");

    this.customerService.update(this.customer).subscribe(data => {
      Swal.fire("Actualizado", " se ha actualizado exitosa mente", "success")//tirulo a la alerta
      this.router.navigate(["customers/list"]);
    })

  }
}
