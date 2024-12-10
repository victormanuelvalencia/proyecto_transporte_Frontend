import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Rute } from 'src/app/models/rute.model';
import { RuteService } from 'src/app/services/rute.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {


  rute: Rute;
  mode: number;
  theFormGroup: FormGroup
  trySend: boolean
  constructor(private ruteService: RuteService,
    private router: Router,
    private activateRoute: ActivatedRoute,
    private theFormBuilder: FormBuilder
  ) { //esto me ayuda a llmar las apis
    this.rute = {
      id: 0,
      distance: 0,
      count_distribution_centers: 0,
      average_time: 0,
      contract_id: null,
      vehicle_id: null

    };
    // //mode =1 es para visualiza, si el mode=2, es para crear, mode=3 es para actualizar
    this.mode = 0;
    this.trySend = false
  }

  //este metodo es unas clases como interfaz cuando arranque la pagina ejecute el contructor y llama a las apis
  ngOnInit(): void {
    //tomar foto a la ul
    this.configFormGroup();//aqui llamo a la funcion de validacion
    const currentUrl = this.activateRoute.snapshot.url.join('/');
    if (currentUrl.includes('view')) {
      this.mode = 1;
    } else if (currentUrl.includes('create')) {
      this.mode = 2;
    } else if (currentUrl.includes('update')) {
      this.mode = 3;
    }
    if (this.activateRoute.snapshot.params.id) {
      this.rute.id = this.activateRoute.snapshot.params.id;
      this.getRute(this.rute.id);
    }
  }

  configFormGroup() {
    this.theFormGroup = this.theFormBuilder.group({
      distance: [
        '',
        [Validators.required, Validators.pattern(/^\d+(\.\d+)?$/)] // Requerido, solo números enteros positivos
      ],
      count_distribution_centers: [
        '',
        [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)] // Requerido, número decimal con 1 o 2 decimales opcionales
      ],
      average_time: [
        0,
        [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)] // Requerido, número decimal con hasta 2 decimales
      ],
      contract_id: [0, [Validators.pattern(/^\d+$/)]], // Sin validaciones, opcional
      vehicle_id: [0, [Validators.pattern(/^\d+$/)]] // Sin validaciones, opcional
    });
  }


  //esto lo definimos como un get para que esta funcion sea
  //como una variable para el html
  get getTheFormGroup() {
    return this.theFormGroup.controls
  }

  getRute(id: number) {
    this.ruteService.view(id).subscribe(data => {
      this.rute = data
    })
  }

  create() {
    console.log(JSON.stringify(this.rute));

    if (this.theFormGroup.invalid) {
      this.trySend = true
      Swal.fire("Formulario incorrecto", "ingrese correctamente los datos", "error")
      return
    }
    console.log(JSON.stringify(this.rute));
    this.ruteService.create(this.rute).subscribe(data => {
      Swal.fire("Creado", " se ha creado exitosa mente", "success")//tirulo a la alerta
      this.router.navigate(["rutes/list"]);
    })

  }

  update() {
    if (this.theFormGroup.invalid) {
      this.trySend = true
      Swal.fire("Formulario incorrecto", "ingrese correctamente los datos", "error")
      return
    }
    console.log(JSON.stringify(this.rute), "hola");

    this.ruteService.update(this.rute).subscribe(data => {
      Swal.fire("Actualizado", " se ha actualizado exitosa mente", "success")//tirulo a la alerta
      this.router.navigate(["rutes/list"]);
    })

  }

}
