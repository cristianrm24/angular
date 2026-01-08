import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ProductoService } from '../../../../service/producto.service';
import { CategoriaService } from '../../../../service/categoria.service';
import { ProductoFormDTO } from '../../../../data/producto/producto-form-dto';

import { Categoria } from '../../../../data/categoria/categoria';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-producto-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './producto-form.component.html'
})

export class ProductoFormComponent implements OnInit {

  idProducto: number | null = null;
  esEdicion = false;

  categorias: Categoria[] = [];

producto: ProductoFormDTO = {
  nombre: '',
  precio: 0,
  stock: 0,
  categoria: {
    idCategoria: null
  }
};


  guardando = false;

  constructor(
    private productoService: ProductoService,
    private categoriaService: CategoriaService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {

    // cargar categorias
    this.categoriaService.listar().subscribe({
      next: data => this.categorias = data,
      error: err => console.error(err)
    });

    // detectar edición
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.idProducto = +id;
        this.esEdicion = true;

        this.productoService.obtener(this.idProducto).subscribe((p: any) => {
          this.producto = {
            nombre: p.nombre,
            precio: p.precio,
            stock: p.stock,
            categoria: {
              idCategoria: p.categoria?.idCategoria ?? null
            }
          };
        });
      }
    });
  }

  guardar() {
    this.guardando = true;

    const request = this.idProducto
      ? this.productoService.actualizar(this.idProducto, this.producto)
      : this.productoService.crear(this.producto);

    request.subscribe({
      next: () => {
        alert(this.idProducto ? 'Producto actualizado' : 'Producto creado');
        this.router.navigate(['/productos']);
      },
      error: err => {
        console.error(err);
        this.guardando = false;
      }
    });
  }
}
