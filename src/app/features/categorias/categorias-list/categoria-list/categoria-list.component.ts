import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriaService } from '../../../../service/categoria.service';
import { Categoria } from '../../../../data/categoria/categoria';

@Component({
  selector: 'app-categoria-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './categoria-list.component.html'
})
export class CategoriaListComponent implements OnInit {

  categorias: Categoria[] = [];
  cargando = false;

  constructor(private categoriaService: CategoriaService) {}

  ngOnInit(): void {
    this.cargarCategorias();
  }
cargarCategorias() {
  this.cargando = true;

  this.categoriaService.listar().subscribe({
    next: data => {
      console.log('CATEGORIAS RECIBIDAS:', data);
      this.categorias = data;
      this.cargando = false;
    },
    error: err => {
      console.error('ERROR CATEGORIAS:', err);
      this.cargando = false;
    },
    complete: () => {
      console.log('CATEGORIAS COMPLETADO');
    }
  });
}

 /* cargarCategorias() {
    this.cargando = true;
    this.categoriaService.listar().subscribe({
      next: data => {
        console.log('CATEGORIAS:', data);
        this.categorias = data;
        this.cargando = false;
      },
      error: err => {
        console.error(err);
        this.cargando = false;
      }
    });
  }*/
}
