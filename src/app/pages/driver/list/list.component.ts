import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Driver } from 'src/app/models/driver.model';
import { DriverService } from 'src/app/services/driver.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  drivers: Driver[];

  constructor(private service: DriverService,
              private router: Router
  ) {
    this.drivers = []
  }

  ngOnInit(): void {
    this.list(); // Llama el método 'list'
  }

  list() {
    // El 'susbcribe' hace que se quede esperando a que dé una respuesta, similar a un 'await'
    this.service.list().subscribe(data => {
      this.drivers = data;
    })
  }

  delete(id: number) {
    Swal.fire({
      title: 'Eliminar conductor',
      text: "Está seguro que quiere eliminar el conductor?",
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
            'El conductor ha sido eliminado correctamente',
            'success'
          )
          this.ngOnInit();
        });
      }
    }) 
  }
  
  create() {
    this.router.navigate(['drivers/create']);
  }

  view(id: number) {
    this.router.navigate(['drivers/view/'+id]);
  }

  update(id: number) {
    this.router.navigate(['drivers/update/'+id]);
  }
}

