import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ProductoService } from '../../../../service/producto.service';
import { CategoriaService } from '../../../../service/categoria.service';

import { Categoria } from '../../../../data/categoria/categoria';

@Component({
  selector: 'app-producto-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './producto-form.component.html'
})
export class ProductoFormComponent implements OnInit {

  categorias: Categoria[] = [];

  producto = {
    nombre: '',
    precio: 0,
    stock: 0,
    categoria: {
      idCategoria: null as number | null
    }
  };

  guardando = false;

  constructor(
    private productoService: ProductoService,
    private categoriaService: CategoriaService
  ) {}

  ngOnInit(): void {
    this.categoriaService.listar().subscribe({
      next: data => {
        console.log('CATEGORIAS:', data);
        this.categorias = data;
      },
      error: err => console.error(err)
    });
  }

  guardar() {
    console.log('JSON ENVIADO:', this.producto);
    this.guardando = true;

    this.productoService.crear(this.producto as any).subscribe({
      next: () => {
        alert('Producto creado correctamente');
        this.producto = {
          nombre: '',
          precio: 0,
          stock: 0,
          categoria: { idCategoria: null }
        };
        this.guardando = false;
      },
      error: err => {
        console.error(err);
        alert('Error al guardar producto');
        this.guardando = false;
      }
    });
  }
}
