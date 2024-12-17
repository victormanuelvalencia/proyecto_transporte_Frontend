import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { OwnerVehicle } from 'src/app/models/owner-vehicle';
import { OwnerVehicleService } from 'src/app/services/owner-vehicle.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {

  mode: number; // 1 -> View. 2 -> Create. 3 -> Update
  owner_vehicle: OwnerVehicle;
  theFormGroup: FormGroup;
  trySend: boolean;
  // Se encarga de activar la ruta
  constructor(private activateRoute: ActivatedRoute,
              private service: OwnerVehicleService,
              private router: Router,
              private theFormBuilder: FormBuilder
  ) {
    this.mode = 1;
    // Objeto creado por defecto, enlaza la vista con el controlador
    this.owner_vehicle = {id: null, owner_id: null, vehicle_id: null};
    this.trySend = false;
  }

  getOwnerVehicle(id: number) {
    this.service.view(id).subscribe({
      next: (data) => {
        console.log('Datos recibidos del servicio:', data);
        this.owner_vehicle = data; // Asignar los datos
      },
      error: (err) => {
        console.error('Error al cargar el conductor:', err);
        Swal.fire("Error", "No se pudo cargar el conductor", "error");
      }
    });
  }
  
  ngOnInit(): void {
    this.configFormGroup()
    const currentUrl = this.activateRoute.snapshot.url.join('/');
    if (currentUrl.includes('view')) {
      this.mode = 1;
    } else if (currentUrl.includes('create')) {
      this.mode = 2;
    } else if (currentUrl.includes('update')) {
      this.mode = 3;
    }
    const id = this.activateRoute.snapshot.params.id;
    if (id) {
      console.log('ID recibido:', id);
      this.getOwnerVehicle(id);
    }
  }

  configFormGroup() {
    this.theFormGroup = this.theFormBuilder.group({
      id: [null], // Campo opcional, por eso no se le agregan validaciones
      owner_id: [
        '', 
        [
          Validators.required, 
          Validators.pattern('^[0-9]{1,5}$') 
        ]
      ],
      vehicle_id: [
        '', 
        [
          Validators.required,
          Validators.pattern('^[0-9]{1,5}$')  
        ]
      ]
    });
  }

  get getTheFormGroup(){
    return this.theFormGroup.controls
  }
  
  create() {
    if(this.theFormGroup.invalid){
      this.trySend = true
      Swal.fire("Formulario incorrecto", "Ingrese correctamente los datos", "error")
    } else {
      this.owner_vehicle.owner_id = this.theFormGroup.get('owner_id')?.value;
      this.owner_vehicle.vehicle_id = this.theFormGroup.get('vehicle_id')?.value;
      this.service.create(this.owner_vehicle).subscribe(data => {
        Swal.fire("Completado", "Se ha creado correctamente", "success");
        this.router.navigate(['owner-vehicles/list'])
      });
      
    }
  }
  update(){
    if(this.theFormGroup.invalid){
      this.trySend = true
      Swal.fire("Formulario incorrecto", "Ingrese correctamente los datos", "error")
    } else {
      this.owner_vehicle.owner_id = this.theFormGroup.get('owner_id')?.value;
      this.owner_vehicle.vehicle_id = this.theFormGroup.get('vehicle_id')?.value;
      this.service.update(this.owner_vehicle).subscribe(data => {
        Swal.fire("Actualizado", "Se ha actualizado correctamente", "success");
        this.router.navigate(['owner-vehicles/list'])
      });
    }
  }
}