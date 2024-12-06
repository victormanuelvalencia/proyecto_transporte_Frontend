import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Expense } from 'src/app/models/expense.model';
import { ExpenseService } from 'src/app/services/expense.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  expenses: Expense[];

  constructor(private service: ExpenseService,
              private router: Router
  ) {
    this.expenses = []
  }

  ngOnInit(): void {
    this.list(); // Llama el método 'list'
  }

  list() {
    // El 'susbcribe' hace que se quede esperando a que dé una respuesta, similar a un 'await'
    this.service.list().subscribe(data => {
      this.expenses = data;
    })
  }

  delete(id: number) {
    Swal.fire({
      title: 'Eliminar gasto',
      text: "Está seguro que quiere eliminar el gasto?",
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
            'El gasto ha sido eliminado correctamente',
            'success'
          )
          this.ngOnInit();
        });
      }
    }) 
  }
  
  create() {
    this.router.navigate(['expenses/create']);
  }

  view(id: number) {
    this.router.navigate(['expenses/view/'+id]);
  }

  update(id: number) {
    this.router.navigate(['expenses/update/'+id]);
  }
}
