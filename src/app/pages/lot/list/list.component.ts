import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Lot } from 'src/app/models/lot.model';
import { LotService } from 'src/app/services/lot.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  lots: Lot[];

  constructor(private service: LotService,
              private router: Router
  ) {
    this.lots = []
  }

  ngOnInit(): void {
    this.list(); // Llama el método 'list'
  }

  list() {
    // El 'susbcribe' hace que se quede esperando a que dé una respuesta, similar a un 'await'
    this.service.list().subscribe(data => {
      this.lots = data;
    })
  }

  delete(id: number) {
    Swal.fire({
      title: 'Eliminar lote',
      text: "Está seguro que quiere eliminar el lote?",
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
            'El lote ha sido eliminado correctamente',
            'success'
          )
          this.ngOnInit();
        });
      }
    }) 
  }
  
  create() {
    this.router.navigate(['Lots/create']);
  }

  view(id: number) {
    this.router.navigate(['Lots/view/'+id]);
  }

  update(id: number) {
    this.router.navigate(['Lots/update/'+id]);
  }
}

