import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
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
  // Se encarga de activar la ruta
  constructor(private activateRoute: ActivatedRoute,
              private service: DriverVehicleService,
              private router: Router
  ) {
    this.mode = 1;
    // Objeto creado por defecto, enlaza la vista con el controlador
    this.driver_vehicle = {id: 0, owner_id: 0, driver_id: 0, vehicle_id: 0};
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
  

  create() {
    this.service.create(this.driver_vehicle).subscribe(data => {
      Swal.fire("Completado", "Se ha creado correctamente", "success");
      this.router.navigate(['driver-vehicles/list'])
    })
  }

  update(){
    this.service.update(this.driver_vehicle).subscribe(data => {
      Swal.fire("Actualizado", "Se ha actualizado correctamente", "success");
      this.router.navigate(['driver-vehicles/list'])
    })
  }
}