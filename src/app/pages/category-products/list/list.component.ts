import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryProducts } from 'src/app/models/category-products.model';
import { CategoryProductsService } from 'src/app/services/category-products.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  

  categoryproducts:CategoryProducts[]
  //inyectamos factureservice
  constructor(private service:CategoryProductsService, private router: Router) { 
    this.categoryproducts=[]
  }

  ngOnInit(): void {
    this.list()
  }

  list(){
    //llamamos el servicio, con el metodo list que devuelve un observable
    //el subscribe es similar a un await, pero en el backend, así que va a esperar la respuesta del backend
    //la respuesta es data
    this.service.list().subscribe(data =>{
      this.categoryproducts=data

      console.log(JSON.stringify(this.categoryproducts));
      
    })
  }

  delete(id:number){
    console.log("Eliminando a ", id);
      Swal.fire({
      title: 'Eliminar categoría del producto',
      text: "Está seguro que quiere eliminar la categoría del producto?",
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
      'la categoría del producto ha sido eliminada correctamente',
      'success'
      )
      this.ngOnInit(); //esto es para refescar, pero ciertos elementos y no toda la pagiba
      });
      }
      })
  }

  create() {
    this.router.navigate(['category-products/create']);
  }

  view(id: number) {
    this.router.navigate(['category-products/view/'+id]);
  }

  update(id: number) {
    this.router.navigate(['category-products/update/'+id]);
  }

}
