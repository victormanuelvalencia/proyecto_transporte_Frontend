import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Owner } from 'src/app/models/owner.model';
import { OwnerService } from 'src/app/services/owner.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {
  mode: number; // 1 -> View. 2 -> Create. 3 -> Update
  owner: Owner;
  // Se encarga de activar la ruta
  constructor(private activateRoute: ActivatedRoute,
              private service: OwnerService,
              private router: Router
  ) {
    this.mode = 1;
    // Objeto creado por defecto, enlaza la vista con el controlador
    this.owner = {id: 0, license_expiry: "", license_number: "", user_id: "", rating: 0};
  }

  ngOnInit(): void {
    // Esta línea se encarga de tomarle una foto a la ruta y se la asigna a 'currentUrl'
    const currentUrl = this.activateRoute.snapshot.url.join('/');
    // Si la ruta incluye la palabra 'view', se le asigna el modo 1
    if (currentUrl.includes('view')) {
      this.mode =  1;
    } else if (currentUrl.includes('create')) {
      this.mode =  2;
    } else if (currentUrl.includes('update')) {
      this.mode =  3;
    }
    if(this.activateRoute.snapshot.params.id) {
      /*  
      Lo que hace este condicional es tomarle una foto al 'activateRoute',
      y si viene el parámetro 'id' se le asigna al 'id' del 'theater' 
      */
      this.owner.id = this.activateRoute.snapshot.params.id;
      this.getOwner(this.owner.id);
    }
  }

  getOwner(id: number){
    this.service.view(id).subscribe(data => {
      this.owner = data;
    })
  }

  create() {
    this.service.create(this.owner).subscribe(data => {
      Swal.fire("Completado", "Se ha creado correctamente", "success");
      this.router.navigate(['owners/list'])
    })
  }

  update(){
    this.service.update(this.owner).subscribe(data => {
      Swal.fire("Actualizado", "Se ha actualizado correctamente", "success");
      this.router.navigate(['owners/list'])
    })
  }
}