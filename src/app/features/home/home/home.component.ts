import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

import { ProductoService } from '../../../service/producto.service';
import { CategoriaService } from '../../../service/categoria.service';
import { AuthService } from '../../../service/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  categorias: any[] = [];
  productosPorCategoria: any = {};

  constructor(
    private productoService: ProductoService,
    private categoriaService: CategoriaService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.categoriaService.listar().subscribe(cats => {
      this.categorias = cats;

      cats.forEach(c => {
        this.productoService.listar(c.idCategoria).subscribe(prods => {
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

    // luego aquí va el carrito
  }
}
