import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DriverVehicle } from 'src/app/models/driver-vehicle.model';
import { DriverVehicleService } from 'src/app/services/driver-vehicle.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {
  mode: number; // 1 -> View. 2 -> Create. 3 -> Update
  driver_vehicle: DriverVehicle;
  theFormGroup: FormGroup;
  trySend: boolean;
  // Se encarga de activar la ruta
  constructor(private activateRoute: ActivatedRoute,
              private service: DriverVehicleService,
              private router: Router,
              private theFormBuilder: FormBuilder
  ) {
    this.mode = 1;
    // Objeto creado por defecto, enlaza la vista con el controlador
    this.driver_vehicle = {id: null, owner_id: null, driver_id: null, vehicle_id: null};
    this.trySend = false;
  }

  getDriverVehicle(id: number) {
    this.service.view(id).subscribe({
      next: (data) => {
        console.log('Datos recibidos del servicio:', data);
        this.driver_vehicle = data; // Asignar los datos
      },
      error: (err) => {
        console.error('Error al cargar el conductor:', err);
        Swal.fire("Error", "No se pudo cargar el conductor", "error");
      }
    });
  }
  
  ngOnInit(): void {
    this.configFormGroup();
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
      this.getDriverVehicle(id);
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
      driver_id: [
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
      this.service.create(this.driver_vehicle).subscribe(data => {
        Swal.fire("Completado", "Se ha creado correctamente", "success");
        this.router.navigate(['driver-vehicles/list'])
      })
    }
  }

  update(){
    if(this.theFormGroup.invalid){
      this.trySend = true
      Swal.fire("Formulario incorrecto", "Ingrese correctamente los datos", "error")
    } else {
      this.service.update(this.driver_vehicle).subscribe(data => {
        Swal.fire("Actualizado", "Se ha actualizado correctamente", "success");
        this.router.navigate(['driver-vehicles/list'])
      })
    }
  }
}