import { Routes } from '@angular/router';
import { ProductoListComponent } from './features/productos/producto-list/producto-list/producto-list.component';
import { CategoriaListComponent } from './features/categorias/categorias-list/categoria-list/categoria-list.component';
import { ProductoFormComponent } from './features/productos/producto-list/producto-form/producto-form.component';
import { CarritoComponent } from './features/carrito/carrito/carrito.component';
import { HomeComponent } from './features/home/home/home.component';
import { LoginComponent } from './features/auth/login/login.component';
import { RegistroComponent } from './features/auth/registro/registro.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { PedidoListComponent } from './features/pedido/pedido-list/pedido-list.component';

export const routes: Routes = [
  { path: 'productos', component: ProductoListComponent },
  { path: 'categorias', component: CategoriaListComponent },
  { path: 'productos/nuevo', component: ProductoFormComponent },
  { path: 'productos/editar/:id', component: ProductoFormComponent,},
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'mis-pedidos',component: PedidoListComponent},
  { path: 'carrito', component: CarritoComponent },
  { path: '', redirectTo: 'productos', pathMatch: 'full' }
];
