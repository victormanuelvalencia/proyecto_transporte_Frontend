import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NaturalPersonRoutingModule } from './natural-person-routing.module';
import { ListComponent } from './list/list.component'; // Importar los componentes
import { ManageComponent } from './manage/manage.component'; // Importar los componentes

@NgModule({
  declarations: [
    ListComponent, 
    ManageComponent
  ], // Declarar los componentes
  imports: [
    CommonModule,
    NaturalPersonRoutingModule,
    FormsModule, // Para el ngModel
    ReactiveFormsModule // Para el formGroup
  ]
})
export class NaturalPersonModule { }
