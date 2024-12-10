import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SecAddress } from 'src/app/models/sec_address.model';
import { SecAddressService } from 'src/app/services/sec_address.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {
  mode: number; // 1 -> View. 2 -> Create. 3 -> Update
  secAddress: SecAddress;
  // Se encarga de activar la ruta
  constructor(private activateRoute: ActivatedRoute,
              private service: SecAddressService,
              private router: Router
  ) {
    this.mode = 1;
    // Objeto creado por defecto, enlaza la vista con el controlador
    this.secAddress = {id: 0, street: '', street_number: '', reference_point: ''};
  }

  getDriver(id: number) {
    this.service.view(id).subscribe({
      next: (data) => {
        console.log('Datos recibidos del servicio:', data);
        this.secAddress = data; // Asignar los datos
      },
      error: (err) => {
        console.error('Error al cargar la dirección:', err);
        Swal.fire("Error", "No se pudo cargar la dirección", "error");
      }
    });
  }
  
  ngOnInit(): void {
    const currentUrl = this.activateRoute.snapshot.url.join('/');
    if (currentUrl.includes('view')) {
      this.mode = 1;
    } else if (currentUrl.includes('create')) {
      this.mode = 2;
    } else if (currentUrl.includes('update')) {
      this.mode = 3;
    }
    const id = this.activateRoute.snapshot.params.id;
    if (id) {
      console.log('ID recibido:', id);
      this.getDriver(id);
    }
  }
  

  create() {
    this.service.create(this.secAddress).subscribe(data => {
      Swal.fire("Completado", "Se ha creado correctamente", "success");
      this.router.navigate(['secaddresses/list'])
    })
  }

  update(){
    this.service.update(this.secAddress).subscribe(data => {
      Swal.fire("Actualizado", "Se ha actualizado correctamente", "success");
      this.router.navigate(['secaddresses/list'])
    })
  }
}

