import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

import { CarritoService } from '../../service/carrito.service';
import { PedidoService } from '../../service/pedido.service';
import { AuthService } from '../../service/auth.service';
import { CarritoItem } from '../../data/carrito/carrito-item';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './checkout.component.html'
})
export class CheckoutComponent implements OnInit {

  items: CarritoItem[] = [];
  total: number = 0;

  constructor(
    private carritoService: CarritoService,
    private pedidoService: PedidoService,
    private authService: AuthService,
    private router: Router
  ) {}


ngOnInit(): void {
  this.carritoService.obtenerCarrito().subscribe({
    next: data => {
      this.items = data.items;
    }
  });

  this.carritoService.total().subscribe({
    next: t => this.total = t
  });
}

  confirmarPedido() {
    const usuario = this.authService.obtenerUsuario();
    if (!usuario) return;

    this.pedidoService.generarPedido(usuario.idUsuario).subscribe({
      next: () => {
        alert('Pedido generado correctamente');
        this.carritoService.vaciarCarrito();
        this.router.navigate(['/mis-pedidos']);
      },
      error: err => console.error('Error al generar pedido', err)
    });
  }
}
