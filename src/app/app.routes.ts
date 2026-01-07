import { Routes } from '@angular/router';
import { ProductoListComponent } from './features/productos/producto-list/producto-list/producto-list.component';
import { CategoriaListComponent } from './features/categorias/categorias-list/categoria-list/categoria-list.component';
import { ProductoFormComponent } from './features/productos/producto-list/producto-form/producto-form.component';

export const routes: Routes = [
  { path: 'productos', component: ProductoListComponent },
  { path: 'categorias', component: CategoriaListComponent },
    { path: 'productos/nuevo', component: ProductoFormComponent },

  { path: '', redirectTo: 'productos', pathMatch: 'full' }
];
