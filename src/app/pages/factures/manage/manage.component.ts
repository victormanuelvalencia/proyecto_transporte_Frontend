import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Facture } from 'src/app/models/facture.model';
import { FacturesService } from 'src/app/services/factures.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {

  facture: Facture;
  mode: number;
  theFormGroup:FormGroup
  trySend:boolean
  constructor(private factureService: FacturesService,
    private router: Router,
    private activateRoute: ActivatedRoute,
     private theFormBuilder:FormBuilder
  ) { //esto me ayuda a llmar las apis
    this.facture = {
      id: 0,
      card_number: '',
      exp_year: '',
      exp_month: '',
      cvc: '',
      name: '',
      last_name: '',
      email: '',
      phone: '',
      doc_number: '',
      city: '',
      address: '',
      cellPhone: '',
      bill: '',
      value: '',
      expense_id: 0,
      fee_id: 0
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
      this.facture.id = this.activateRoute.snapshot.params.id;
      this.getFacture(this.facture.id);
    }
  }

  configFormGroup(){
    this.theFormGroup=this.theFormBuilder.group({
      // primer elemento del vector, valor por defecto
      // lista, serán las reglas
      cardNumber: ['', [Validators.required, Validators.pattern('^[0-9]{16}$')]], // Tarjeta de 16 dígitos
      expYear: ['', [Validators.required, Validators.pattern('^[0-9]{4}$')]], // Año de 4 dígitos
      expMonth: ['', [Validators.required, Validators.pattern('^(0[1-9]|1[0-2])$')]], // Mes en formato MM
      cvc: ['', [Validators.required, Validators.pattern('^[0-9]{3,4}$')]], // CVC de 3 o 4 dígitos
      name: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]], // Teléfono de 10 dígitos
      docNumber: ['', [Validators.required, Validators.pattern('^[0-9]+$')]], // Solo números
      city: ['', [Validators.required, Validators.minLength(2)]],
      address: ['', [Validators.required, Validators.minLength(5)]],
      cellPhone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]], // Teléfono de 10 dígitos
      bill: ['', [Validators.required]],
      value: ['', [Validators.required, Validators.pattern('^[0-9]+$')]], // Valor numérico
      
    })
  }

  //esto lo definimos como un get para que esta funcion sea
  //como una variable para el html
  get getTheFormGroup(){
    return this.theFormGroup.controls
  }

  getFacture(id: number) {
    this.factureService.view(id).subscribe(data => {
      this.facture = data
    })
  }

  create() {
    console.log(JSON.stringify(this.facture));

    this.factureService.create(this.facture).subscribe(data => {
      Swal.fire("Creado", " se ha creado exitosa mente", "success")//tirulo a la alerta
      this.router.navigate(["factures/list"]);
    })
    // if(this.theFormGroup.invalid){
    //   this.trySend = true
    //   Swal.fire("Formulario incorrecto", "ingrese correctamente los datos", "error")
    //   return    
    // }
    // console.log(JSON.stringify(this.facture));
    // this.factureService.create(this.facture).subscribe(data=>{
    //   Swal.fire("Creado"," se ha creado exitosa mente", "success")//tirulo a la alerta
    //   this.router.navigate(["factures/list"]); 
    // })

  }

  update() {
    // if(this.theFormGroup.invalid){
    //     this.trySend = true
    //     Swal.fire("Formulario incorrecto", "ingrese correctamente los datos", "error")
    //     return    
    //   }
    console.log(JSON.stringify(this.facture), "hola");

    this.factureService.update(this.facture).subscribe(data => {
      Swal.fire("Actualizado", " se ha actualizado exitosa mente", "success")//tirulo a la alerta
      this.router.navigate(["factures/list"]);
    })

  }

}
