import { Routes } from '@angular/router';
import { Inventory } from './AppComponents/inventory/inventory';
import { Customer } from './AppComponents/customer/customer';

export const routes: Routes = [
{
  path:'inventory', component:Inventory
},
{
path:'customer', component:Customer
}
];
