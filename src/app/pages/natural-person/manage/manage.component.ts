import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NaturalPerson } from 'src/app/models/natural-person.model';
import { NaturalPersonService } from 'src/app/services/natural-person.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {

 
  naturalPerson: NaturalPerson;
  mode: number;
  theFormGroup:FormGroup
  trySend:boolean
  constructor(private naturalpersonService: NaturalPersonService,
    private router: Router,
    private activateRoute: ActivatedRoute,
     private theFormBuilder:FormBuilder
  ) { //esto me ayuda a llmar las apis
    this.naturalPerson = {
      id: 0,
      document_type: "",
      document_number: "",
      company_id: null,
      customer_id: null,
      user_id:null
      
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
      this.naturalPerson.id = this.activateRoute.snapshot.params.id;
      this.getNaturalPerson(this.naturalPerson.id);
    }
  }

  configFormGroup() {
    this.theFormGroup = this.theFormBuilder.group({
      document_type: ['', [
        Validators.required, 
        Validators.pattern(/^[A-Za-z]+$/)]],  // Solo letras      
      document_number: ['', [
        Validators.required, 
        Validators.pattern(/^\d+$/)]], // Solo números enteros
      company_id: [0, [
        Validators.pattern(/^\d+$/)]], // Solo números enteros
      customer_id: [0, [
        Validators.pattern(/^\d+$/)]],  // Solo números enteros
      user_id: ['', [
        Validators.pattern(/^\w+$/)]] // Cadena de texto (alfanumérico y guiones bajos)
      
    });
  }
  

  //esto lo definimos como un get para que esta funcion sea
  //como una variable para el html
  get getTheFormGroup(){
    return this.theFormGroup.controls
  }

  getNaturalPerson(id: number) {
    this.naturalpersonService.view(id).subscribe(data => {
      this.naturalPerson = data
    })
  }

  create() {
    console.log(JSON.stringify(this.naturalPerson));

    if(this.theFormGroup.invalid){
      this.trySend = true
      Swal.fire("Formulario incorrecto", "ingrese correctamente los datos", "error")
      return    
    }
    console.log(JSON.stringify(this.naturalPerson));
    this.naturalpersonService.create(this.naturalPerson).subscribe(data=>{
      Swal.fire("Creado"," se ha creado exitosa mente", "success")//tirulo a la alerta
      this.router.navigate(["natural-persons/list"]); 
    })

  }

  update() {
    if(this.theFormGroup.invalid){
        this.trySend = true
        Swal.fire("Formulario incorrecto", "ingrese correctamente los datos", "error")
        return    
      }

    this.naturalpersonService.update(this.naturalPerson).subscribe(data => {
      Swal.fire("Actualizado", " se ha actualizado exitosa mente", "success")//tirulo a la alerta
      this.router.navigate(["natural-persons/list"]);
    })

  }
}
