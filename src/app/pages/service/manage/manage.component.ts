import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Service } from 'src/app/models/service.model';
import { ServiceService } from 'src/app/services/service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {
  mode: number; // 1 -> View. 2 -> Create. 3 -> Update
  servicee: Service;
  theFormGroup: FormGroup;
  trySend: boolean;
  // Se encarga de activar la ruta
  constructor(private activateRoute: ActivatedRoute,
              private service: ServiceService,
              private router: Router,
              private theFormBuilder: FormBuilder
  ) {
    this.mode = 0;
    // Objeto creado por defecto, enlaza la vista con el controlador
    this.servicee = {id: 0, total_ammount: null, service_name: ""};
    this.trySend = false;
  }

  configFormGroup() {
    this.theFormGroup = this.theFormBuilder.group({
      total_ammount: [
        '', 
        [Validators.required, Validators.pattern(/^\d+$/)] // Solo números
      ],
      service_name: [
        '', 
        [Validators.required, Validators.pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)] // Letras y espacios, incluyendo caracteres especiales
      ]
    });
  }
  
      
  get getTheFormGroup(){
    return this.theFormGroup.controls;
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
      y si viene el parámetro 'id' se le asigna al 'id' del 'Service' 
      */
      this.servicee.id = this.activateRoute.snapshot.params.id;
      this.getService(this.servicee.id);
    }
  }

  getService(id: number){
    this.service.view(id).subscribe(data => {
      this.servicee = data;
    })
  }

  create() {
    if (this.theFormGroup.invalid) {
      this.trySend = true;
      Swal.fire("Error", "Por favor llene correctamente los campos", "error");
    } else {
      this.servicee.service_name = this.theFormGroup.get('service_name')?.value;
      this.servicee.total_ammount = this.theFormGroup.get('total_ammount')?.value;
      this.service.create(this.servicee).subscribe(data => {
        Swal.fire("Completado", "Se ha creado correctamente", "success");
        this.router.navigate(['services/list']);
      });
    }
  }
  
  update() {
    if (this.theFormGroup.invalid) {
      this.trySend = true;
      Swal.fire("Error", "Por favor llene correctamente los campos", "error");
    } else {
      this.servicee.service_name = this.theFormGroup.get('service_name')?.value;
      this.servicee.total_ammount = this.theFormGroup.get('total_ammount')?.value;
      this.service.update(this.servicee).subscribe(data => {
        Swal.fire("Actualizado", "Se ha actualizado correctamente", "success");
        this.router.navigate(['services/list']);
      });
    }
  }
  
}