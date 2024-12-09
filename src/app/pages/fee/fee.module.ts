import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeeRoutingModule } from './fee-routing.module';
import { ListComponent } from './list/list.component';
import { ManageComponent } from './manage/manage.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ListComponent,
    ManageComponent
  ],
  imports: [
    CommonModule,
    FeeRoutingModule,
    FormsModule, //Esto es para que funcione el ngModule
    ReactiveFormsModule
  ]
})
export class FeeModule { }
