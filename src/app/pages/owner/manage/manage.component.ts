import { NonNullAssert } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Owner } from 'src/app/models/owner.model';
import { OwnerService } from 'src/app/services/owner.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {
  mode: number; // 1 -> View. 2 -> Create. 3 -> Update
  owner: Owner;
  theFormGroup: FormGroup;
  trySend: boolean;
  // Se encarga de activar la ruta
  constructor(private activateRoute: ActivatedRoute,
              private service: OwnerService,
              private router: Router,
              private theFormBuilder: FormBuilder
  ) {
    this.mode = 0;
    // Objeto creado por defecto, enlaza la vista con el controlador
    this.owner = {id: 0, license_expiry: null, license_number: "", user_id: "", rating: null};
    this.trySend = false;
  }

  configFormGroup(){
    // Primer elemento del vector: Valor por defecto
    // Lista: Reglas 
    this.theFormGroup = this.theFormBuilder.group({
      license_expiry: [null, [Validators.required]],
      license_number: [
        '', 
        [Validators.required, Validators.pattern(/^[0-9]{5,30}$/)] // Solo números, entre 5 y 30 dígitos
      ],
      user_id: [
        '', 
        [Validators.pattern(/^[a-zA-Z0-9]{0,30}$/)] // Letras y números, máximo 30 caracteres
      ],
      rating: [
        '', 
        [Validators.required, Validators.min(1), Validators.max(10)] // Número entre 1 y 10
      ]
    });
  } 
      
  get getTheFormGroup(){
    return this.theFormGroup.controls
  }

  ngOnInit(): void {
    this.configFormGroup();
    // Esta línea se encarga de tomarle una foto a la ruta y se la asigna a 'currentUrl'
    const currentUrl = this.activateRoute.snapshot.url.join('/');
    // Si la ruta incluye la palabra 'view', se le asigna el modo 1
    if (currentUrl.includes('view')) {
      this.mode =  1;
    } else if (currentUrl.includes('create')) {
      this.mode =  2;
    } else if (currentUrl.includes('update')) {
      this.mode =  3;
    }
    if(this.activateRoute.snapshot.params.id) {
      /*  
      Lo que hace este condicional es tomarle una foto al 'activateRoute',
      y si viene el parámetro 'id' se le asigna al 'id' del 'theater' 
      */
      this.owner.id = this.activateRoute.snapshot.params.id;
      this.getOwner(this.owner.id);
    }
  }

  getOwner(id: number){
    this.service.view(id).subscribe(data => {
      this.owner = data;
    })
  }

  create() {
    this.trySend = true;
    if(this.theFormGroup.invalid) {
      Swal.fire("Error", "Por favor llene correctamente los campos", "error")
    } else {
    this.service.create(this.owner).subscribe(data => {
        Swal.fire("Completado", "Se ha creado correctamente", "success");
        this.router.navigate(['owners/list'])
      })
    }
  }

  update(){
    this.trySend = true;
    if(this.theFormGroup.invalid) {
      Swal.fire("Error", "Por favor llene correctamente los campos", "error")
    } else {
      this.service.update(this.owner).subscribe(data => {
        Swal.fire("Actualizado", "Se ha actualizado correctamente", "success");
        this.router.navigate(['owners/list'])
      })
    }
  }
}