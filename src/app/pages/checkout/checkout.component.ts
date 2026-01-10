
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarritoService } from '../../service/carrito.service';
import { PedidoService } from '../../service/pedido.service';
import { CarritoItem } from '../../data/carrito/carrito-item';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './checkout.component.html'
})
export class CheckoutComponent implements OnInit {

items: CarritoItem[] = [];
  total = 0;
  procesando = false;

  constructor(
    private carritoService: CarritoService,
      private router: Router,

    private pedidoService: PedidoService
  ) {}

  ngOnInit(): void {
    this.items = this.carritoService.obtenerItems();
    this.total = this.carritoService.total();
  }


  confirmarPedido() {
    this.procesando = true;

    this.pedidoService.generarPedido().subscribe({
      next: () => {
        alert('Pedido generado correctamente');
        this.carritoService.vaciarCarrito();
        this.router.navigate(['/mis-pedidos']);

      },
      error: err => {
        console.error(err);
        alert('Error al generar pedido');
        this.procesando = false;
      }
    });
  }
}
