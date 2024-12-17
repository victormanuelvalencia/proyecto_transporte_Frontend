import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Lot } from 'src/app/models/lot.model';
import { LotService } from 'src/app/services/lot.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {
  mode: number; // 1 -> View. 2 -> Create. 3 -> Update
  lot: Lot;
  theFormGroup: FormGroup;
  // Se encarga de activar la ruta
  constructor(private activateRoute: ActivatedRoute,
              private service: LotService,
              private router: Router,
              private theFormBuilder: FormBuilder
  ) {
    this.mode = 1;
    // Objeto creado por defecto, enlaza la vista con el controlador
    this.lot = {id: 0, total_weight: 0, dir_list_order_id: null, rute_id: null};
  }
  getLot(id: number) {
    this.service.view(id).subscribe(data => {
      this.lot = data
    })
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
    if (this.activateRoute.snapshot.params.id) {
      this.lot.id = this.activateRoute.snapshot.params.id;
      this.getLot(this.lot.id);
    }
  }
  
  configFormGroup() {
    this.theFormGroup = this.theFormBuilder.group({
      total_weight: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      dir_list_order_id: [0, [Validators.pattern(/^\d+$/)]],
      rute_id: [0, [Validators.pattern(/^\d+$/)]] // Sin validaciones, opcional
    });
  }

  create() {
    this.service.create(this.lot).subscribe(data => {
      Swal.fire("Completado", "Se ha creado correctamente", "success");
      this.router.navigate(['lots/list'])
    })
  }

  update(){
    this.service.update(this.lot).subscribe(data => {
      Swal.fire("Actualizado", "Se ha actualizado correctamente", "success");
      this.router.navigate(['lots/list'])
    })
  }
}

