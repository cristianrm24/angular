import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CategoriaService } from '../../../../service/categoria.service';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './categoria-form.component.html'
})
export class CategoriaFormComponent implements OnInit {

  idCategoria: number | null = null;
  categoria = { nombre: '' };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private categoriaService: CategoriaService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.idCategoria = +id;
      this.categoriaService.obtener(this.idCategoria).subscribe({
        next: data => this.categoria = data
      });
    }
  }

  guardar() {
    const req = this.idCategoria
      ? this.categoriaService.actualizar(this.idCategoria, this.categoria)
      : this.categoriaService.crear(this.categoria);

    req.subscribe(() => this.router.navigate(['/categorias']));
  }
}

