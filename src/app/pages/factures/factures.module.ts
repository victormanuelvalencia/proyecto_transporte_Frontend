import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FacturesRoutingModule } from './factures-routing.module';
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
    FacturesRoutingModule,
    FormsModule, //Esto es para que funcione el ngModule
    ReactiveFormsModule
  ]
})
export class FacturesModule { }
