import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Contract } from 'src/app/models/contract.model';
import { ContractService } from 'src/app/services/contract.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {

  contract: Contract;
  mode: number;
  theFormGroup:FormGroup
  trySend:boolean
  constructor(private contractService: ContractService,
    private router: Router,
    private activateRoute: ActivatedRoute,
     private theFormBuilder:FormBuilder
  ) { //esto me ayuda a llmar las apis
    this.contract = {
      id: 0,
      start_date: "",
      end_date: "",
      total_amount: 0,
      customer_id: null
      
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
      this.contract.id = this.activateRoute.snapshot.params.id;
      this.getContract(this.contract.id);
    }
  }

  configFormGroup() {
    this.theFormGroup = this.theFormBuilder.group({
      start_date: ['', [Validators.required]], // Solo números enteros, opcional
      end_date: ['', [Validators.required]], // Requerido, número decimal con 1 o 2 decimales opcionales
      total_amount: [0, [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]], // Requerido, número decimal con hasta 2 decimales
      customer_id: [0] // Requerido, solo números enteros
    });
  }
  

  //esto lo definimos como un get para que esta funcion sea
  //como una variable para el html
  get getTheFormGroup(){
    return this.theFormGroup.controls
  }

  getContract(id: number) {
    this.contractService.view(id).subscribe(data => {
      this.contract = data
    })
  }

  create() {
    console.log(JSON.stringify(this.contract));

    if(this.theFormGroup.invalid){
      this.trySend = true
      Swal.fire("Formulario incorrecto", "ingrese correctamente los datos", "error")
      return    
    }
    console.log(JSON.stringify(this.contract));
    this.contractService.create(this.contract).subscribe(data=>{
      Swal.fire("Creado"," se ha creado exitosa mente", "success")//tirulo a la alerta
      this.router.navigate(["contracts/list"]); 
    })

  }

  update() {
    if(this.theFormGroup.invalid){
        this.trySend = true
        Swal.fire("Formulario incorrecto", "ingrese correctamente los datos", "error")
        return    
      }
    console.log(JSON.stringify(this.contract), "hola");

    this.contractService.update(this.contract).subscribe(data => {
      Swal.fire("Actualizado", " se ha actualizado exitosa mente", "success")//tirulo a la alerta
      this.router.navigate(["contracts/list"]);
    })

  }

}
