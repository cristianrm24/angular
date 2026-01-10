import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Categoria } from '../../../data/categoria/categoria';
import { CategoriaService } from '../../../service/categoria.service';

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './detalle-categoria.component.html'
})
export class CategoriaDetalleComponent implements OnInit {

  categoria!: Categoria;

  constructor(
    private route: ActivatedRoute,
    private categoriaService: CategoriaService
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.categoriaService.obtener(id).subscribe({
      next: data => this.categoria = data
    });
  }
}
