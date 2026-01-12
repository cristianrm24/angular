import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../service/auth.service';

import { CarritoService } from '../../service/carrito.service';
import { PedidoService } from '../../service/pedido.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [
    CommonModule,    // 👈 ngIf, ngFor, pipes
    RouterModule
  ],
  templateUrl: './checkout.component.html'
})
export class CheckoutComponent implements OnInit {

  total = 0;
  cargando = true;
  procesando = false;

  constructor(
    private carritoService: CarritoService,
      private router: Router,
  private authService: AuthService,

    private pedidoService: PedidoService
  ) {}
irAPago() {
  this.router.navigate(['/pago']);
}

  ngOnInit(): void {
    this.carritoService.total().subscribe({
      next: total => {
        this.total = total;
        this.cargando = false;
      },
      error: () => {
        alert('No se pudo obtener el total');
        this.cargando = false;
      }
    });
  }
confirmarPedido() {
  const usuario = this.authService.obtenerUsuario();
  if (!usuario) return;

  this.pedidoService.generarPedido(usuario.idUsuario).subscribe({
    next: () => {
      alert('Pedido generado correctamente');
      this.carritoService.vaciarCarrito();
      this.router.navigate(['/pedidos']);
    },
    error: err => console.error(err)
  });
}

/*
  confirmarPedido() {
    if (this.total <= 0) {
      alert('El carrito está vacío');
      return;
    }

    this.procesando = true;

    this.pedidoService.generarPedido().subscribe({
      next: () => alert('Pedido generado correctamente'),
      error: () => {
        alert('Error al generar pedido');
        this.procesando = false;
      }
    });
  }*/
}
