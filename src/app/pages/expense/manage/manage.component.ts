import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Expense } from 'src/app/models/expense.model';
import { ExpenseService } from 'src/app/services/expense.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {
  mode: number; // 1 -> View. 2 -> Create. 3 -> Update
  expense: Expense;
  theFormGroup:FormGroup;
  trySend:boolean;
  // Se encarga de activar la ruta
  constructor(private activateRoute: ActivatedRoute,
              private service: ExpenseService,
              private router: Router,
              private theFormBuilder: FormBuilder
  ) {
    this.mode = 1;
    // Objeto creado por defecto, enlaza la vista con el controlador
    this.expense = {id: null, description: "", ammount: null, status: "", hotel_id: null, restaurant_id: null, driver_id: null, owner_id: null};
    this.trySend = false;
  }

  ngOnInit(): void {
    this.configFormGroup();
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
      this.expense.id = this.activateRoute.snapshot.params.id;
      this.getExpense(this.expense.id);
    }
  }

  configFormGroup() {
    this.theFormGroup = this.theFormBuilder.group({
      id: [null], // Campo opcional, por eso no se le agregan validaciones
      description: [
        '', 
        [
          Validators.required // El campo descripción es obligatorio
        ]
      ],
      ammount: [
        null, 
        [
          Validators.required, 
          Validators.min(0) // El monto debe ser mayor o igual a 0
        ]
      ],
      status: [
        '', 
        [
          Validators.required, 
          Validators.pattern(/^(Activo|Inactivo)$/i) // Solo permite los valores "activo" o "inactivo"
        ]
      ],
      hotel_id: [
        '', 
        [
          Validators.pattern(/^\d{1,5}$/) // Solo permite números de hasta 5 dígitos
        ]
      ],
      restaurant_id: [
        '', 
        [
          Validators.pattern(/^\d{1,5}$/) // Solo permite números de hasta 5 dígitos
        ]
      ],
      driver_id: [
        '', 
        [
          Validators.pattern(/^\d{1,5}$/) // Solo permite números de hasta 5 dígitos
        ]
      ],
      owner_id: [
        '', 
        [
          Validators.pattern(/^\d{1,5}$/) // Solo permite números de hasta 5 dígitos
        ]
      ]
    });
  }

  get getTheFormGroup(){
    return this.theFormGroup.controls
  }
  

  getExpense(id: number){
    this.service.view(id).subscribe(data => {
      this.expense = data;
    })
  }

  create() {
    this.service.create(this.expense).subscribe(data => {
      Swal.fire("Completado", "Se ha creado correctamente", "success");
      this.router.navigate(['expenses/list'])
    })
  }

  update(){
    this.service.update(this.expense).subscribe(data => {
      Swal.fire("Actualizado", "Se ha actualizado correctamente", "success");
      this.router.navigate(['expenses/list'])
    })
  }
}

