import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DirListOrder } from 'src/app/models/dir_list_order.model';
import { dirlistorderservice } from 'src/app/services/dir_list_order.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  dirListOrders: DirListOrder[];

  constructor(private service: dirlistorderservice,
              private router: Router
  ) {
    this.dirListOrders = []
  }

  ngOnInit(): void {
    this.list(); // Llama el método 'list'
  }

  list() {
    // El 'susbcribe' hace que se quede esperando a que dé una respuesta, similar a un 'await'
    this.service.list().subscribe(data => {
      this.dirListOrders = data;
    })
  }

  delete(id: number) {
    Swal.fire({
      title: 'Eliminar dir Lista|Orden',
      text: "Está seguro que quiere eliminar la dir Lista|Orden?",
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
            'La dir Lista|Orden ha sido eliminada correctamente',
            'success'
          )
          this.ngOnInit();
        });
      }
    }) 
  }
  
  create() {
    this.router.navigate(['dir_list_order/create']);
  }

  view(id: number) {
    this.router.navigate(['dir_list_order/view/'+id]);
  }

  update(id: number) {
    this.router.navigate(['dir_list_order/update/'+id]);
  }
}

