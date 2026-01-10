import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { CarritoService } from '../../service/carrito.service';
import { PedidoService } from '../../service/pedido.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [
    CommonModule,    // 👈 ngIf, ngFor, pipes
    RouterModule     // 👈 navegación
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
  console.log('🟢 Click en confirmar compra');

  if (this.total <= 0) {
    alert('El carrito está vacío');
    return;
  }

  console.log('🟢 Llamando a generarPedido');

  this.procesando = true;

this.pedidoService.generarPedido().subscribe({
  next: (pedido: any) => {
    this.router.navigate(['/checkout-exito', pedido.idPedido]);
  },
  error: () => {
    alert('Error al generar el pedido');
    this.procesando = false;
  }
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
