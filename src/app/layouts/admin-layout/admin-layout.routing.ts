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
    },
    {
        path: 'contracts',
        loadChildren: () => import('src/app/pages/contract/contract.module').then(m => m.ContractModule)
    },
    {
        path: 'products',
        loadChildren: () => import('src/app/pages/product/product.module').then(m => m.ProductModule)
    },
    {
        path: 'lots',
        loadChildren: () => import('src/app/pages/lot/lot.module').then(m => m.LotModule)
    },
    {
        path: 'sec_address',
        loadChildren: () => import('src/app/pages/sec_address/sec_address.module').then(m => m.SecAddressModule)
    },
    {
        path: 'dir_list_order',
        loadChildren: () => import('src/app/pages/dir_list_order/dir_list_order.module').then(m => m.DirListOrderModule)
    },
    {
        path: 'rutes',
        loadChildren: () => import('src/app/pages/rute/rute.module').then(m => m.RuteModule)
    },
    {
        path: 'customers',
        loadChildren: () => import('src/app/pages/customer/customer.module').then(m => m.CustomerModule)
    },
    {
        path: 'natural-persons',
        loadChildren: () => import('src/app/pages/natural-person/natural-person.module').then(m => m.NaturalPersonModule)
    },
    {
        path: 'operations',
        loadChildren: () => import('src/app/pages/operation/operation.module').then(m => m.OperationModule)
    },
    {
        path: 'driver-vehicles',
        loadChildren: () => import('src/app/pages/driver-vehicle/driver-vehicle.module').then(m => m.DriverVehicleModule)
    },
    {
        path: 'owner-vehicles',
        loadChildren: () => import('src/app/pages/owner-vehicle/owner-vehicle.module').then(m => m.OwnerVehicleModule)
    },
    {
        path: 'administrators',
        loadChildren: () => import('src/app/pages/administrator/administrator.module').then(m => m.AdministratorModule)
    },
    {
        path: 'categories',
        loadChildren: () => import('src/app/pages/category/category.module').then(m => m.CategoryModule)
    },
    {
        path: 'category-products',
        loadChildren: () => import('src/app/pages/category-products/category-products.module').then(m => m.CategoryProductsModule)
    },
    {
        path: 'companies',
        loadChildren: () => import('src/app/pages/company/company.module').then(m => m.CompanyModule)
    },
    {
        path: 'distribution-centers',
        loadChildren: () => import('src/app/pages/distribution-center/distribution-center.module').then(m => m.DistributionCenterModule)
    },
    {
        path: 'hotels',
        loadChildren: () => import('src/app/pages/hotel/hotel.module').then(m => m.HotelModule)
    },
    {
        path: 'insurances',
        loadChildren: () => import('src/app/pages/insurance/insurance.module').then(m => m.InsuranceModule)
    },
    {
        path: 'municipalities',
        loadChildren: () => import('src/app/pages/municipality/municipality.module').then(m => m.MunicipalityModule)
    },
    {
        path: 'restaurants',
        loadChildren: () => import('src/app/pages/restaurant/restaurant.module').then(m => m.RestaurantModule)
    },
    {
        path: 'shifts',
        loadChildren: () => import('src/app/pages/shift/shift.module').then(m => m.ShiftModule)
    },
    {
        path: 'departments',
        loadChildren: () => import('src/app/pages/departament/departament.module').then(m => m.DepartamentModule)
    },
];
