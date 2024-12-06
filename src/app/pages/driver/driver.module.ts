import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DriverRoutingModule } from './driver-routing.module';
import { ListComponent } from './list/list.component';
import { FormsModule } from '@angular/forms';
import { ManageComponent } from './manage/manage.component';


@NgModule({
  declarations: [
    ListComponent,
    ManageComponent
  ],
  imports: [
    CommonModule,
    DriverRoutingModule,
    FormsModule
  ]
})
export class DriverModule { }
