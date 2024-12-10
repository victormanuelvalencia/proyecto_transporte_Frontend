import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DirListOrderRoutingModule } from './dir_list_order-routing.module';
import { ListComponent } from './list/list.component';
import { ManageComponent } from './manage/manage.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ListComponent,
    ManageComponent
  ],
  imports: [
    CommonModule,
    DirListOrderRoutingModule,
    FormsModule
  ]
})
export class DirListOrderModule { }
