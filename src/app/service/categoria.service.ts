import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environments';
import { Categoria } from '../data/categoria/categoria';
import { Producto } from '../data/producto/producto';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  private api = environment.apiUrl;

  constructor(private http: HttpClient) {}

  // =========================
  // 🗂️ CATEGORÍAS
  // =========================

  /** Listar categorías */
  listar(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(
      `${this.api}/categorias`
    );
  }

  /** Detalle de categoría */
  obtener(idCategoria: number): Observable<Categoria> {
    return this.http.get<Categoria>(
      `${this.api}/categorias/${idCategoria}`
    );
  }

  /** Crear categoría (ADMIN) */
  crear(data: { nombre: string }): Observable<Categoria> {
    return this.http.post<Categoria>(
      `${this.api}/categorias`,
      data
    );
  }

  /** Actualizar categoría (ADMIN) */
  actualizar(idCategoria: number, data: { nombre: string }): Observable<Categoria> {
    return this.http.put<Categoria>(
      `${this.api}/categorias/${idCategoria}`,
      data
    );
  }

  /** Eliminar categoría (ADMIN) */
  eliminar(idCategoria: number): Observable<void> {
    return this.http.delete<void>(
      `${this.api}/categorias/${idCategoria}`
    );
  }

  // =========================
  // 📦 PRODUCTOS POR CATEGORÍA
  // =========================

  /** Productos por categoría */
  productosPorCategoria(idCategoria: number): Observable<Producto[]> {
    return this.http.get<Producto[]>(
      `${this.api}/categorias/${idCategoria}/productos`
    );
  }
}
