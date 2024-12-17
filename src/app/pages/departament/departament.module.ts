import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DepartamentRoutingModule } from './departament-routing.module';
import { ListComponent } from './list/list.component';
import { ManageComponent } from './manage/manage.component';


@NgModule({
  declarations: [
    ListComponent,
    ManageComponent
  ],
  imports: [
    CommonModule,
    DepartamentRoutingModule
  ]
})
export class DepartamentModule { }
