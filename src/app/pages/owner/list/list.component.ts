import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Owner } from 'src/app/models/owner.model';
import { OwnerService } from 'src/app/services/owner.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  owners: Owner[];

  constructor(private service: OwnerService,
              private router: Router
  ) {
    this.owners = []
  }

  ngOnInit(): void {
    this.list(); // Llama el método 'list'
  }

  list() {
    // El 'susbcribe' hace que se quede esperando a que dé una respuesta, similar a un 'await'
    this.service.list().subscribe(data => {
      this.owners = data;
    })
  }

  delete(id: number) {
    Swal.fire({
      title: 'Eliminar dueño',
      text: "Está seguro que quiere eliminar el dueño?",
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
            'El dueño ha sido eliminado correctamente',
            'success'
          )
          this.ngOnInit();
        });
      }
    }) 
  }
  
  create() {
    this.router.navigate(['owners/create']);
  }

  view(id: number) {
    this.router.navigate(['owners/view/'+id]);
  }

  update(id: number) {
    this.router.navigate(['owners/update/'+id]);
  }
}