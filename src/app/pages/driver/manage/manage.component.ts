import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Driver } from 'src/app/models/driver.model';
import { DriverService } from 'src/app/services/driver.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {
  mode: number; // 1 -> View. 2 -> Create. 3 -> Update
  driver: Driver;
  theFormGroup: FormGroup;
  trySend: boolean;
  // Se encarga de activar la ruta
  constructor(private activateRoute: ActivatedRoute,
              private service: DriverService,
              private router: Router,
              private theFormBuilder: FormBuilder
  ) {
    this.mode = 1;
    // Objeto creado por defecto, enlaza la vista con el controlador
    this.driver = {id: 0, license_number: "", license_expiry: null, user_id: ""};
    this.trySend = false;
  }

  getDriver(id: number) {
    this.service.view(id).subscribe({
      next: (data) => {
        console.log('Datos recibidos del servicio:', data);
        this.driver = data; // Asignar los datos
      },
      error: (err) => {
        console.error('Error al cargar el conductor:', err);
        Swal.fire("Error", "No se pudo cargar el conductor", "error");
      }
    });
  }

  configFormGroup(){
    // Primer elemento del vector: Valor por defecto
    // Lista: Reglas 
    this.theFormGroup = this.theFormBuilder.group({
      license_expiry: ['', [Validators.required]],
      license_number: [
        '', 
        [Validators.required, Validators.pattern(/^[0-9]{5,30}$/)] // Solo números, entre 5 y 30 dígitos
      ],
      user_id: [
        '', 
        [Validators.pattern(/^[a-zA-Z0-9]{0,30}$/)] // Letras y números, máximo 30 caracteres
      ],
    });
  } 
      
  get getTheFormGroup(){
    return this.theFormGroup.controls
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
  

  create() {
    this.trySend = true;
    if(this.theFormGroup.invalid) {
      Swal.fire("Error", "Por favor llene correctamente los campos", "error")
    } else {
      this.service.create(this.driver).subscribe(data => {
        Swal.fire("Completado", "Se ha creado correctamente", "success");
        this.router.navigate(['drivers/list'])
      })
    }
  }

  update(){
    this.trySend = true;
    if(this.theFormGroup.invalid) {
      Swal.fire("Error", "Por favor llene correctamente los campos", "error")
    } else {
      this.service.update(this.driver).subscribe(data => {
        Swal.fire("Actualizado", "Se ha actualizado correctamente", "success");
        this.router.navigate(['drivers/list'])
      })
    }
  }
}

