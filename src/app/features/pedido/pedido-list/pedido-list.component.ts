import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule, Router } from '@angular/router';
import { CarritoService } from '../../../service/carrito.service';
import { PedidoService } from '../../../service/pedido.service';
import { AuthService } from '../../../service/auth.service';

@Component({
  selector: 'app-pedido-list',
  standalone: true,
  imports: [
    CommonModule,    // 👈 ngFor, ngIf
    RouterModule     // 👈 routerLink
  ],
  templateUrl: './pedido-list.component.html'
})
export class PedidoListComponent implements OnInit {

  pedidos: any[] = [];

  constructor(private pedidoService: PedidoService,    private authService: AuthService,      private carritoService: CarritoService,
      private router: Router
) {}
agregar(producto: any) {
  if (!this.authService.estaAutenticado()) {
    this.router.navigate(['/login']);
    return;
  }

  this.carritoService.agregarProducto(producto.idProducto, 1)
    .subscribe(() => {
      alert('Producto agregado al carrito');
    });
}
descargarFactura(idPedido: number) {
  this.pedidoService.descargarFactura(idPedido).subscribe({
    next: blob => {
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement('a');
      a.href = url;
      a.download = `factura_${idPedido}.txt`; // o .pdf si aplica
      a.click();

      window.URL.revokeObjectURL(url);
    },
    error: err => {
      console.error(err);
      alert('No se pudo descargar la factura');
    }
  });
}

  ngOnInit(): void {
    this.pedidoService.listarPedidosUsuario().subscribe({
      next: data => this.pedidos = data as any[],
      error: err => console.error(err)
    });
  }
}
