import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Municipality } from 'src/app/models/municipality.model';
import { MunicipalityService } from 'src/app/services/municipality.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  municipalities:Municipality[]
  //inyectamos factureservice
  constructor(private service:MunicipalityService, private router: Router) { 
    this.municipalities=[]
  }

  ngOnInit(): void {
    this.list()
  }

  list(){
    //llamamos el servicio, con el metodo list que devuelve un observable
    //el subscribe es similar a un await, pero en el backend, así que va a esperar la respuesta del backend
    //la respuesta es data
    this.service.list().subscribe(data =>{
      this.municipalities=data

      console.log(JSON.stringify(this.municipalities));
      
    })
  }

  delete(id:number){
    console.log("Eliminando a ", id);
      Swal.fire({
      title: 'Eliminar municipio',
      text: "Está seguro que quiere eliminar el municipio?",
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
      'el municipio ha sido eliminada correctamente',
      'success'
      )
      this.ngOnInit(); //esto es para refescar, pero ciertos elementos y no toda la pagiba
      });
      }
      })
  }

  create() {
    this.router.navigate(['municipalities/create']);
  }

  view(id: number) {
    this.router.navigate(['municipalities/view/'+id]);
  }

  update(id: number) {
    this.router.navigate(['municipalities/update/'+id]);
  }

}
