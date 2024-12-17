import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Fee } from 'src/app/models/fee.model';
import { FeeService } from 'src/app/services/fee.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  fee:Fee[]
  //inyectamos factureservice
  constructor(private service:FeeService, private router: Router) { 
    this.fee=[]
  }

  ngOnInit(): void {
    this.list()
  }

  list(){
    //llamamos el servicio, con el metodo list que devuelve un observable
    //el subscribe es similar a un await, pero en el backend, así que va a esperar la respuesta del backend
    //la respuesta es data
    this.service.list().subscribe(data =>{
      this.fee=data

      console.log(JSON.stringify(this.fee));
      
    })
  }

  delete(id:number){
    console.log("Eliminando a ", id);
      Swal.fire({
      title: 'Eliminar cuota',
      text: "Está seguro que quiere eliminar la cuota?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'No, cancele'
      }).then((result) => {
      if (result.isConfirmed) {
      this.service.delete(id).
      subscribe(data => {
      Swal.fire(
      'Eliminado!',
      'la cuota ha sido eliminada correctamente',
      'success'
      )
      this.ngOnInit(); //esto es para refescar, pero ciertos elementos y no toda la pagiba
      });
      }
      })
  }

  create() {
    this.router.navigate(['fees/create']);
  }

  view(id: number) {
    this.router.navigate(['fees/view/'+id]);
  }

  update(id: number) {
    this.router.navigate(['fees/update/'+id]);
  }
}
