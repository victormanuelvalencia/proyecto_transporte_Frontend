import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoryProductsRoutingModule } from './category-products-routing.module';
import { ListComponent } from './list/list.component';
import { ManageComponent } from './manage/manage.component';


@NgModule({
  declarations: [
    ListComponent,
    ManageComponent
  ],
  imports: [
    CommonModule,
    CategoryProductsRoutingModule
  ]
})
export class CategoryProductsModule { }
