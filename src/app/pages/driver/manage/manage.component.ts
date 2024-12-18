import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Driver } from 'src/app/models/driver.model';
import { DriverService} from 'src/app/services/driver.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {
  mode: number; // 1 -> View. 2 -> Create. 3 -> Update
  driver: Driver;
  theFormGroup: FormGroup;
  trySend: boolean;
  // Se encarga de activar la ruta
  constructor(private activateRoute: ActivatedRoute,
              private service: DriverService,
              private router: Router,
              private theFormBuilder: FormBuilder
  ) {
    this.mode = 0;
    // Objeto creado por defecto, enlaza la vista con el controlador
    this.driver = {id: 0, license_expiry: null, license_number: "", user_id: ""};
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
      this.driver.id = this.activateRoute.snapshot.params.id;
      this.getDriver(this.driver.id);
    }
  }

  getDriver(id: number){
    this.service.view(id).subscribe(data => {
      this.driver = data;
    })
  }

  create() {
    this.trySend = true;
    if(this.theFormGroup.invalid) {
      Swal.fire("Error", "Por favor llene correctamente los campos", "error")
    } else {
    this.service.create(this.driver).subscribe(data => {
        Swal.fire("Completado", "Se ha creado correctamente", "success");
        this.router.navigate(['drivers/list'])
      })
    }
  }

  update(){
    this.trySend = true;
    if(this.theFormGroup.invalid) {
      Swal.fire("Error", "Por favor llene correctamente los campos", "error")
    } else {
      this.service.update(this.driver).subscribe(data => {
        Swal.fire("Actualizado", "Se ha actualizado correctamente", "success");
        this.router.navigate(['drivers/list'])
      })
    }
  }
}

