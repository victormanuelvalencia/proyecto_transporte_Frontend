import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DirListOrder } from 'src/app/models/dir_list_order.model';
import { dirlistorderservice } from 'src/app/services/dir_list_order.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {
  mode: number; // 1 -> View. 2 -> Create. 3 -> Update
  dirListOrder: DirListOrder;
  theFormGroup: FormGroup;
  // Se encarga de activar la ruta
  constructor(private activateRoute: ActivatedRoute,
              private service: dirlistorderservice,
              private router: Router,
              private theFormBuilder: FormBuilder
  ) {
    this.mode = 1;
    // Objeto creado por defecto, enlaza la vista con el controlador
    this.dirListOrder = {id: 0, origin: "", destination: "", rute_id: null, sec_address_id: null};
  }

  getDriver(id: number) {
    this.service.view(id).subscribe({
      next: (data) => {
        console.log('Datos recibidos del servicio:', data);
        this.dirListOrder = data; // Asignar los datos
      },
      error: (err) => {
        console.error('Error al cargar la dir Lista|Orden:', err);
        Swal.fire("Error", "No se pudo cargar la dir Lista|Orden", "error");
      }
    });
  }
  
  ngOnInit(): void {
    this.configFormGroup();
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
  
  configFormGroup() {
    this.theFormGroup = this.theFormBuilder.group({
      origin: ['', [Validators.required, Validators.minLength(4)]],
      destination: ['', [Validators.required, Validators.minLength(4)]],
      rute_id: [0, [Validators.pattern(/^\d+$/)]],
      sec_address_id: [0, [Validators.pattern(/^\d+$/)]] // Sin validaciones, opcional
    });
  }

  create() {
    this.service.create(this.dirListOrder).subscribe(data => {
      Swal.fire("Completado", "Se ha creado correctamente", "success");
      this.router.navigate(['dir_list_order/list'])
    })
  }

  update(){
    this.service.update(this.dirListOrder).subscribe(data => {
      Swal.fire("Actualizado", "Se ha actualizado correctamente", "success");
      this.router.navigate(['dir_list_order/list'])
    })
  }
}

