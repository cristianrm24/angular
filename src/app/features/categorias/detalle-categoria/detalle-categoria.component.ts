import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';

import { CategoriaService } from '../../../service/categoria.service';
import { Categoria } from '../../../data/categoria/categoria';
import { Producto } from '../../../data/producto/producto';

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './detalle-categoria.component.html'
})
export class CategoriaDetalleComponent implements OnInit {

categoria?: Categoria;
  productos: Producto[] = [];
  cargando = true;

  constructor(
    private route: ActivatedRoute,
    private categoriaService: CategoriaService
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.categoriaService.obtener(id).subscribe({
      next: data => this.categoria = data
    });

    this.categoriaService.productosPorCategoria(id).subscribe({
      next: data => {
        this.productos = data;
        this.cargando = false;
      }
    });
  }
}
