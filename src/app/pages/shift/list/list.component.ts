import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Shift } from 'src/app/models/shift.model';
import { ShiftService } from 'src/app/services/shift.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  

  shifts:Shift[]
  //inyectamos factureservice
  constructor(private service:ShiftService, private router: Router) { 
    this.shifts=[]
  }

  ngOnInit(): void {
    this.list()
  }

  list(){
    //llamamos el servicio, con el metodo list que devuelve un observable
    //el subscribe es similar a un await, pero en el backend, así que va a esperar la respuesta del backend
    //la respuesta es data
    this.service.list().subscribe(data =>{
      this.shifts=data

      console.log(JSON.stringify(this.shifts));
      
    })
  }

  delete(id:number){
    console.log("Eliminando a ", id);
      Swal.fire({
      title: 'Eliminar turno',
      text: "Está seguro que quiere eliminar el turno?",
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
      'el turno ha sido eliminada correctamente',
      'success'
      )
      this.ngOnInit(); //esto es para refescar, pero ciertos elementos y no toda la pagiba
      });
      }
      })
  }

  create() {
    this.router.navigate(['shifts/create']);
  }

  view(id: number) {
    this.router.navigate(['shifts/view/'+id]);
  }

  update(id: number) {
    this.router.navigate(['shifts/update/'+id]);
  }

}
