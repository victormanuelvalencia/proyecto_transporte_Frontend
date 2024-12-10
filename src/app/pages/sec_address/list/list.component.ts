import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SecAddress } from 'src/app/models/sec_address.model';
import { SecAddressService } from 'src/app/services/sec_address.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  secAddresses: SecAddress[];

  constructor(private service: SecAddressService,
              private router: Router
  ) {
    this.secAddresses = []
  }

  ngOnInit(): void {
    this.list(); // Llama el método 'list'
  }

  list() {
    // El 'susbcribe' hace que se quede esperando a que dé una respuesta, similar a un 'await'
    this.service.list().subscribe(data => {
      this.secAddresses = data;
    })
  }

  delete(id: number) {
    Swal.fire({
      title: 'Eliminar dirección',
      text: "Está seguro que quiere eliminar la dirección?",
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
            'La dirección ha sido eliminada correctamente',
            'success'
          )
          this.ngOnInit();
        });
      }
    }) 
  }
  
  create() {
    this.router.navigate(['secaddresses/create']);
  }

  view(id: number) {
    this.router.navigate(['secaddresses/view/'+id]);
  }

  update(id: number) {
    this.router.navigate(['secaddresses/update/'+id]);
  }
}

