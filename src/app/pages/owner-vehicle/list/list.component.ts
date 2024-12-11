import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OwnerVehicle } from 'src/app/models/owner-vehicle';
import { OwnerVehicleService } from 'src/app/services/owner-vehicle.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  owner_vehicles: OwnerVehicle[];
  constructor(private service: OwnerVehicleService,
              private router: Router
  ) {
    this.owner_vehicles = []
  }
  ngOnInit(): void {
    this.list(); // Llama el método 'list'
  }
  list() {
    // El 'susbcribe' hace que se quede esperando a que dé una respuesta, similar a un 'await'
    this.service.list().subscribe(data => {
      this.owner_vehicles = data;
    })
  }
  delete(id: number) {
    Swal.fire({
      title: 'Eliminar dueño de vehículos?',
      text: "Está seguro que quiere eliminar el dueño de vehículos?",
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
            'El dueño de vehículos ha sido eliminado correctamente',
            'success'
          )
          this.ngOnInit();
        });
      }
    }) 
  }
  
  create() {
    this.router.navigate(['owner-vehicles/create']);
  }
  view(id: number) {
    this.router.navigate(['owner-vehicles/view/'+id]);
  }
  update(id: number) {
    this.router.navigate(['owner-vehicles/update/'+id]);
  }
}