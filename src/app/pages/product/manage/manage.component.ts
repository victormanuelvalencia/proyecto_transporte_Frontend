import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {
  mode: number; // 1 -> View. 2 -> Create. 3 -> Update
  product: Product;
  theFormGroup: FormGroup;
  // Se encarga de activar la ruta
  constructor(private activateRoute: ActivatedRoute,
              private service: ProductService,
              private router: Router,
              private theFormBuilder: FormBuilder
  ) {
    this.mode = 1;
    // Objeto creado por defecto, enlaza la vista con el controlador
    this.product = {id: 0, name: '', description: '', price: 0, weight: 0, lot_id: null, customer_id: null};
  }

  getProduct(id: number) {
    this.service.view(id).subscribe({
      next: (data) => {
        console.log('Datos recibidos del servicio:', data);
        this.product = data; // Asignar los datos
      },
      error: (err) => {
        console.error('Error al cargar el producto:', err);
        Swal.fire("Error", "No se pudo cargar el producto", "error");
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
    if (this.activateRoute.snapshot.params.id) {
      this.product.id = this.activateRoute.snapshot.params.id;
      this.getProduct(this.product.id);
    }
  }
  
  configFormGroup() {
    this.theFormGroup = this.theFormBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      description: ['', [Validators.required, Validators.minLength(4)]],
      price: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      weight: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      lot_id: [0, [Validators.pattern(/^\d+$/)]],
      customer_id: [0, [Validators.pattern(/^\d+$/)]] // Sin validaciones, opcional
    });
  }


  create() {
    this.service.create(this.product).subscribe(data => {
      Swal.fire("Completado", "Se ha creado correctamente", "success");
      this.router.navigate(['products/list'])
    })
  }

  update(){
    this.service.update(this.product).subscribe(data => {
      Swal.fire("Actualizado", "Se ha actualizado correctamente", "success");
      this.router.navigate(['products/list'])
    })
  }
}

