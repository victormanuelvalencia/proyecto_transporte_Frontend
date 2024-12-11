import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DriverVehicle } from 'src/app/models/driver-vehicle.model';
import { DriverVehicleService } from 'src/app/services/driver-vehicle.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  driver_vehicles: DriverVehicle[];

  constructor(private service: DriverVehicleService,
              private router: Router
  ) {
    this.driver_vehicles = []
  }

  ngOnInit(): void {
    this.list(); // Llama el método 'list'
  }

  list() {
    // El 'susbcribe' hace que se quede esperando a que dé una respuesta, similar a un 'await'
    this.service.list().subscribe(data => {
      this.driver_vehicles = data;
    })
  }

  delete(id: number) {
    Swal.fire({
      title: 'Eliminar conductor de vehículos?',
      text: "Está seguro que quiere eliminar el conductor de vehículos?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
      this.service.delete(id).
        subscribe(data => {
          Swal.fire(
            'Eliminado!',
            'El conductor de vehículos ha sido eliminado correctamente',
            'success'
          )
          this.ngOnInit();
        });
      }
    }) 
  }
  
  create() {
    this.router.navigate(['driver-vehicles/create']);
  }

  view(id: number) {
    this.router.navigate(['driver-vehicles/view/'+id]);
  }

  update(id: number) {
    this.router.navigate(['driver-vehicles/update/'+id]);
  }
}

