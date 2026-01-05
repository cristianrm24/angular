import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Producto } from '../data/producto/producto';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

private apiUrl = 'https://proyecto-z9eq.onrender.com/api/v1/productos';

  // En Render luego lo cambiamos por la URL pública

  constructor(private http: HttpClient) {}

  listar(filtros?: {
    categoria?: number;
    q?: string;
    minPrecio?: number;
    maxPrecio?: number;
  }): Observable<Producto[]> {

    let params = new HttpParams();

    if (filtros) {
      if (filtros.categoria) params = params.set('categoria', filtros.categoria);
      if (filtros.q) params = params.set('q', filtros.q);
      if (filtros.minPrecio) params = params.set('minPrecio', filtros.minPrecio);
      if (filtros.maxPrecio) params = params.set('maxPrecio', filtros.maxPrecio);
    }

    return this.http.get<Producto[]>(this.apiUrl, { params });
  }

  obtener(id: number): Observable<Producto> {
    return this.http.get<Producto>(`${this.apiUrl}/${id}`);
  }

  crear(producto: Producto): Observable<Producto> {
    return this.http.post<Producto>(this.apiUrl, producto);
  }

  actualizar(id: number, producto: Producto): Observable<Producto> {
    return this.http.put<Producto>(`${this.apiUrl}/${id}`, producto);
  }

  actualizarStock(id: number, stock: number): Observable<Producto> {
    return this.http.patch<Producto>(
      `${this.apiUrl}/${id}/stock`,
      null,
      { params: { stock } }
    );
  }

  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
