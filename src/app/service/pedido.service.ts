import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { environment } from '../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  private api = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

generarPedido(idUsuario: number) {
  return this.http.post(
    `${this.api}/pedidos/generar`,
    null,
    {
      params: {
        idUsuario: idUsuario
      }
    }
  );
}

descargarFactura(idPedido: number) {
  return this.http.get(
    `${this.api}/pedidos/${idPedido}/factura`,
    { responseType: 'blob' }
  );
}
obtenerDetalle(idPedido: number) {
  return this.http.get(
    `${this.api}/pedidos/${idPedido}`
  );
}

totalPedido(idPedido: number) {
  return this.http.get(
    `${this.api}/pedidos/${idPedido}/total`
  );
}

pedidosPorUsuario(id: number) {
  return this.http.get<any[]>(
    `${environment.apiUrl}/usuarios/${id}/pedidos`
  );
}

  listarPedidosUsuario() {
    const usuario = this.authService.obtenerUsuario();
    if (!usuario) {
      throw new Error('Usuario no autenticado');
    }

    return this.http.get(
      `${this.api}/usuarios/${usuario.idUsuario}/pedidos`
    );
  }
}
