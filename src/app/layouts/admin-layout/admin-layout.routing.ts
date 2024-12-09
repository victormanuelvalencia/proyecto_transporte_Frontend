import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { TablesComponent } from '../../pages/tables/tables.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'user-profile',   component: UserProfileComponent },
    { path: 'tables',         component: TablesComponent },
    { path: 'icons',          component: IconsComponent },
    { path: 'maps',           component: MapsComponent },
    {
        path: 'drivers',
        loadChildren: () => import('src/app/pages/driver/driver.module').then(m => m.DriverModule)
    },
    {
        path: 'vehicles',
        loadChildren: () => import('src/app/pages/vehicle/vehicle.module').then(m => m.VehicleModule)
    },
    {
        path: 'expenses',
        loadChildren: () => import('src/app/pages/expense/expense.module').then(m => m.ExpenseModule)
    },
    {
        path: 'services',
        loadChildren: () => import('src/app/pages/service/service.module').then(m => m.ServiceModule)
    },
    {
        path: 'owners',
        loadChildren: () => import('src/app/pages/owner/owner.module').then(m => m.OwnerModule)
    },
    {
        path: 'factures',
        loadChildren: () => import('src/app/pages/factures/factures.module').then(m => m.FacturesModule)
    },
    {
        path: 'fees',
        loadChildren: () => import('src/app/pages/fee/fee.module').then(m => m.FeeModule)
    }
   
];
