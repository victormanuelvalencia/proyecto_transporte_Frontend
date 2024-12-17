import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DistributionCenterRoutingModule } from './distribution-center-routing.module';
import { ListComponent } from './list/list.component';
import { ManageComponent } from './manage/manage.component';


@NgModule({
  declarations: [
    ListComponent,
    ManageComponent
  ],
  imports: [
    CommonModule,
    DistributionCenterRoutingModule
  ]
})
export class DistributionCenterModule { }
