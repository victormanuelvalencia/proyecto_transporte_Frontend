import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Departament } from 'src/app/models/departament.model';
import { DepartamentService } from 'src/app/services/departament.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  departaments:Departament[]
  //inyectamos factureservice
  constructor(private service:DepartamentService, private router: Router) { 
    this.departaments=[]
  }

  ngOnInit(): void {
    this.list()
  }

  list(){
    //llamamos el servicio, con el metodo list que devuelve un observable
    //el subscribe es similar a un await, pero en el backend, así que va a esperar la respuesta del backend
    //la respuesta es data
    this.service.list().subscribe(data =>{
      this.departaments=data

      console.log(JSON.stringify(this.departaments));
      
    })
  }

  delete(id:number){
    console.log("Eliminando a ", id);
      Swal.fire({
      title: 'Eliminar departamento',
      text: "Está seguro que quiere eliminar el departamento?",
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
      'el departamento ha sido eliminada correctamente',
      'success'
      )
      this.ngOnInit(); //esto es para refescar, pero ciertos elementos y no toda la pagiba
      });
      }
      })
  }

  create() {
    this.router.navigate(['departaments/create']);
  }

  view(id: number) {
    this.router.navigate(['departaments/view/'+id]);
  }

  update(id: number) {
    this.router.navigate(['departaments/update/'+id]);
  }

}
