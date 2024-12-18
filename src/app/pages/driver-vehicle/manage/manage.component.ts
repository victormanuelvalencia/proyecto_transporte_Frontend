import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DriverVehicle } from 'src/app/models/driver-vehicle.model';
import { Driver } from 'src/app/models/driver.model';
import { Owner } from 'src/app/models/owner.model';
import { Vehicle } from 'src/app/models/vehicle.model';
import { DriverVehicleService } from 'src/app/services/driver-vehicle.service';
import { DriverService } from 'src/app/services/driver.service';
import { OwnerService } from 'src/app/services/owner.service';
import { VehicleService } from 'src/app/services/vehicle.service';
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
  drivers: Driver[];
  vehicles: Vehicle[];
  owners: Owner[];
  // Se encarga de activar la ruta
  constructor(private activateRoute: ActivatedRoute,
              private service: DriverVehicleService,
              private driverService: DriverService, // Acá conectamos con el backend
              private vehicleService: VehicleService,
              private ownerService: OwnerService,
              private router: Router,
              private theFormBuilder: FormBuilder
  ) {
    this.drivers = [];
    this.vehicles = [];
    this.owners = [];
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

  loadOwnersAndVehiclesAndDrivers() {
    this.ownerService.list().subscribe({ // Acá conectamos con el backend para listar los owners
      next: (data) => {
        this.owners = data;
      },
      error: (err) => {
        console.error('Error al cargar owners:', err);
      }
    });

    this.vehicleService.list().subscribe({ // Acá conectamos con el backend para listar los vehicles
      next: (data) => {
        this.vehicles = data;
      },
      error: (err) => {
        console.error('Error al cargar vehicles:', err);
      }
    });

    this.driverService.list().subscribe({ // Acá conectamos con el backend para listar los owners
      next: (data) => {
        this.drivers = data;
      },
      error: (err) => {
        console.error('Error al cargar owners:', err);
      }
    });
  }


  ngOnInit(): void {
    this.configFormGroup();
    this.loadOwnersAndVehiclesAndDrivers();
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
      id: [null], // Opcional, sin validaciones
      vehicle_id: ['', [Validators.required]],
      driver_id: ['',],
      owner_id: [null,], // Añadido para evitar el error
    });
  }
  

  get getTheFormGroup(){
    return this.theFormGroup.controls
  }

  create() {
    if (this.theFormGroup.invalid) {
      this.trySend = true;
      Swal.fire("Formulario incorrecto", "Ingrese correctamente los datos", "error");
    } else {
      // Sincroniza los valores del formulario con el objeto `driver_vehicle`
      this.driver_vehicle = {
        id: this.theFormGroup.get('id')?.value,
        vehicle_id: this.theFormGroup.get('vehicle_id')?.value,
        driver_id: this.theFormGroup.get('driver_id')?.value,
        owner_id: this.theFormGroup.get('owner_id')?.value,
      };

      this.service.create(this.driver_vehicle).subscribe({
            next: () => {
                Swal.fire("Completado", "Se ha creado correctamente", "success");
                this.router.navigate(['driver-vehicles/list']);
            },
            error: (err) => {
                console.error('Error al crear el driver_vehicle:', err);
                Swal.fire("Error", "No se pudo crear el registro", "error");
            }
        });
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