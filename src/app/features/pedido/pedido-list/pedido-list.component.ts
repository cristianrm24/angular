import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { PedidoService } from '../../../service/pedido.service';

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

  constructor(private pedidoService: PedidoService) {}

  ngOnInit(): void {
    this.pedidoService.listarPedidosUsuario().subscribe({
      next: data => this.pedidos = data as any[],
      error: err => console.error(err)
    });
  }
}
