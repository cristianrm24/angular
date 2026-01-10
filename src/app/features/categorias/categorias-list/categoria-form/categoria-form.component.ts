import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CategoriaService } from '../../../../service/categoria.service';
import { AuthService } from '../../../../service/auth.service';
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
    private categoriaService: CategoriaService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    if (!this.authService.esAdmin()) {
      this.router.navigate(['/home']);
      return;
    }

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

