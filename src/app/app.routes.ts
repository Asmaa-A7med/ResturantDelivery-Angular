import { Routes } from '@angular/router';
import { SearchComponent } from './Components/search/search.component';
import { MenuComponent } from './Components/menu/menu.component';

export const routes: Routes = [
    { path: '', component: SearchComponent },
    {path:'menu',loadComponent: () => import('./Components/menu/menu.component').then(m => m.MenuComponent) },
    { path: 'menu/:id', loadComponent: () => import('./Components/menu/menu.component').then(m => m.MenuComponent) },
    {path:'reserve',loadComponent: () => import('./Components/reserve/reserve.component').then(m => m.ReserveComponent)},   
    {path:'Back',loadComponent: () => import('./Components/menu/menu.component').then(m => m.MenuComponent) },
    {path:'confirm',loadComponent: () => import('./Components/confirm/confirm.component').then(m => m.ConfirmComponent) },
    { path: 'reserve/:id', loadComponent: () => import('./Components/reserve/reserve.component').then(m => m.ReserveComponent) },

];
