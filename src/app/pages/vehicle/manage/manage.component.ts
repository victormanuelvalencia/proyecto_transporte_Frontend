import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Vehicle } from 'src/app/models/vehicle.model';
import { VehicleService } from 'src/app/services/vehicle.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {
  mode: number; // 1 -> View. 2 -> Create. 3 -> Update
  vehicle: Vehicle;
  theFormGroup:FormGroup
  trySend:boolean;
  // Se encarga de activar la ruta
  constructor(private activateRoute: ActivatedRoute,
              private service: VehicleService,
              private router: Router,
              private theFormBuilder: FormBuilder
  ) {
    this.mode = 0;
    // Objeto creado por defecto, enlaza la vista con el controlador
    this.vehicle = {id: 0, license_plate: "", type_vehicle: ""};
    this.trySend = false;
  }

  ngOnInit(): void {
    this.configFormGroup()
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
      y si viene el parámetro 'id' se le asigna al 'id' del 'Vehicle' 
      */
      this.vehicle.id = this.activateRoute.snapshot.params.id;
      this.getVehicle(this.vehicle.id);
    }
  }

  configFormGroup() {
    this.theFormGroup = this.theFormBuilder.group({
      id: [null], // Campo opcional, por eso no se le agregan validaciones
      license_plate: [
        '', 
        [
          Validators.required, 
          Validators.pattern(/^[A-Z0-9-]+$/) // Placas con letras (A-Z), números (0-9) y guiones (-)
        ]
      ],
      type_vehicle: [
        '', 
        [
          Validators.required, 
          Validators.pattern(/^(Automóvil|Camión|Motocicleta|Bicicleta|Bus)$/i) // Solo permite ciertos valores (puedes personalizar esta lista)
        ]
      ]
    });
  }

  get getTheFormGroup(){
    return this.theFormGroup.controls
  }

  getVehicle(id: number){
    this.service.view(id).subscribe(data => {
      this.vehicle = data;
    })
  }

  create() {
    if(this.theFormGroup.invalid){
      this.trySend = true
      Swal.fire("Formulario incorrecto", "Ingrese correctamente los datos", "error") 
    } else {
      this.service.create(this.vehicle).subscribe(data=>{
        Swal.fire("Creado"," Se ha creado exitosamente", "success")
        this.router.navigate(["vehicles/list"]); 
      })
    }
  }

  update() {
    if(this.theFormGroup.invalid){
        this.trySend = true
        Swal.fire("Formulario incorrecto", "Ingrese correctamente los datos", "error")
    } else {
      this.service.update(this.vehicle).subscribe(data => {
        Swal.fire("Actualizado", " Se ha actualizado exitosamente", "success")
        this.router.navigate(["vehicles/list"]);
      })
    }
  }
}

