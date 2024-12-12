import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Contract } from 'src/app/models/contract.model';
import { ContractService } from 'src/app/services/contract.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {


  contract:Contract[]
  //inyectamos factureservice
  constructor(private service:ContractService, private router: Router) { 
    this.contract=[]
  }

  ngOnInit(): void {
    this.list()
  }

  list(){
    //llamamos el servicio, con el metodo list que devuelve un observable
    //el subscribe es similar a un await, pero en el backend, así que va a esperar la respuesta del backend
    //la respuesta es data
    this.service.list().subscribe(data =>{
      this.contract=data

      console.log(JSON.stringify(this.contract));
      
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
    this.router.navigate(['contracts/create']);
  }

  view(id: number) {
    this.router.navigate(['contracts/view/'+id]);
  }

  update(id: number) {
    this.router.navigate(['contracts/update/'+id]);
  }
}
