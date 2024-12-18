import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DistributionCenter } from 'src/app/models/distribution-center.model';
import { DistributionCenterService } from 'src/app/services/distribution-center.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  distributioncenters:DistributionCenter[]
  //inyectamos factureservice
  constructor(private service:DistributionCenterService, private router: Router) { 
    this.distributioncenters=[]
  }

  ngOnInit(): void {
    this.list()
  }

  list(){
    //llamamos el servicio, con el metodo list que devuelve un observable
    //el subscribe es similar a un await, pero en el backend, así que va a esperar la respuesta del backend
    //la respuesta es data
    this.service.list().subscribe(data =>{
      this.distributioncenters=data

      console.log(JSON.stringify(this.distributioncenters));
      
    })
  }

  delete(id:number){
    console.log("Eliminando a ", id);
      Swal.fire({
      title: 'Eliminar centro de distribución',
      text: "Está seguro que quiere eliminar el centro de distribución?",
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
      'el centro de distribución ha sido eliminada correctamente',
      'success'
      )
      this.ngOnInit(); //esto es para refescar, pero ciertos elementos y no toda la pagiba
      });
      }
      })
  }

  create() {
    this.router.navigate(['distribution-centers/create']);
  }

  view(id: number) {
    this.router.navigate(['distribution-centers/view/'+id]);
  }

  update(id: number) {
    this.router.navigate(['distribution-centers/update/'+id]);
  }

}
