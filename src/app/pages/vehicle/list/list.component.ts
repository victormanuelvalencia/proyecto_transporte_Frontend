import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Vehicle } from 'src/app/models/vehicle.model';
import { VehicleService } from 'src/app/services/vehicle.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  vehicles: Vehicle[];

  constructor(private service: VehicleService,
              private router: Router
  ) {
    this.vehicles = []
  }

  ngOnInit(): void {
    this.list(); // Llama el método 'list'
  }

  list() {
    // El 'susbcribe' hace que se quede esperando a que dé una respuesta, similar a un 'await'
    this.service.list().subscribe(data => {
      this.vehicles = data;
    })
  }

  delete(id: number) {
    Swal.fire({
      title: 'Eliminar vehículo',
      text: "Está seguro que quiere eliminar el vehículo?",
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
            'El vehículo ha sido eliminado correctamente',
            'success'
          )
          this.ngOnInit();
        });
      }
    }) 
  }
  
  create() {
    this.router.navigate(['vehicles/create']);
  }

  view(id: number) {
    this.router.navigate(['vehicles/view/'+id]);
  }

  update(id: number) {
    this.router.navigate(['vehicles/update/'+id]);
  }
}
