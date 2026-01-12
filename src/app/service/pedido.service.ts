import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environments';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PedidoService {

  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  // 1️⃣ Generar pedido (checkout)
  generarPedido(idUsuario: number): Observable<any> {
    return this.http.post(
      `${this.baseUrl}/usuarios/${idUsuario}/pedidos`,
      {}
    );
  }

  // 2️⃣ Listar todos los pedidos (admin)
  listarPedidos(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/pedidos`);
  }

  // 3️⃣ Detalle de un pedido
  obtenerPedido(idPedido: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/pedidos/${idPedido}`);
  }

  // 4️⃣ Total del pedido
  totalPedido(idPedido: number): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/pedidos/${idPedido}/total`);
  }

  // 5️⃣ Descargar factura
  descargarFactura(idPedido: number): Observable<Blob> {
    return this.http.get(
      `${this.baseUrl}/pedidos/${idPedido}/factura`,
      { responseType: 'blob' }
    );
  }
}
