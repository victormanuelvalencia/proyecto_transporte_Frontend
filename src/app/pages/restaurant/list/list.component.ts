import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Restaurant } from 'src/app/models/restaurant.model';
import { RestaurantService } from 'src/app/services/restaurant.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  

  restaurants:Restaurant[]
  //inyectamos factureservice
  constructor(private service:RestaurantService, private router: Router) { 
    this.restaurants=[]
  }

  ngOnInit(): void {
    this.list()
  }

  list(){
    //llamamos el servicio, con el metodo list que devuelve un observable
    //el subscribe es similar a un await, pero en el backend, así que va a esperar la respuesta del backend
    //la respuesta es data
    this.service.list().subscribe(data =>{
      this.restaurants=data

      console.log(JSON.stringify(this.restaurants));
      
    })
  }

  delete(id:number){
    console.log("Eliminando a ", id);
      Swal.fire({
      title: 'Eliminar restaurante',
      text: "Está seguro que quiere eliminar el restaurante?",
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
      'el restaurante ha sido eliminada correctamente',
      'success'
      )
      this.ngOnInit(); //esto es para refescar, pero ciertos elementos y no toda la pagiba
      });
      }
      })
  }

  create() {
    this.router.navigate(['restaurants/create']);
  }

  view(id: number) {
    this.router.navigate(['restaurants/view/'+id]);
  }

  update(id: number) {
    this.router.navigate(['restaurants/update/'+id]);
  }

}
