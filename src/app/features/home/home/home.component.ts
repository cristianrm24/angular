import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

import { ProductoService } from '../../../service/producto.service';
import { CategoriaService } from '../../../service/categoria.service';
import { AuthService } from '../../../service/auth.service';
import { CarritoService } from '../../../service/carrito.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
usuario: any = null;

  categorias: any[] = [];
  productosPorCategoria: any = {};

  constructor(
    private productoService: ProductoService,
    private categoriaService: CategoriaService,
      private carritoService: CarritoService,

    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
      this.usuario = this.authService.obtenerUsuario();

    this.categoriaService.listar().subscribe(cats => {
      this.categorias = cats;

      cats.forEach(c => {
this.productoService.listar({ categoria: c.idCategoria }).subscribe(prods => {
  this.productosPorCategoria[c.idCategoria] = prods;
});

      });
    });
  }


agregar(producto: any) {
  if (!this.authService.estaAutenticado()) {
    this.router.navigate(['/login']);
    return;
  }

  this.carritoService.agregarProducto(producto);
}
logout() {
  this.authService.logout();
  location.reload(); // recarga limpia carrito
}

    // luego aquí va el carrito
  }

