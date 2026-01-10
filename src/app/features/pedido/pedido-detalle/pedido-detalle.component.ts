import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

import { PedidoService } from '../../../service/pedido.service';

@Component({
  selector: 'app-pedido-detalle',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pedido-detalle.component.html'
})
export class PedidoDetalleComponent implements OnInit {

  pedido: any;
  total = 0;
  cargando = true;

  constructor(
    private route: ActivatedRoute,
    private pedidoService: PedidoService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.pedidoService.obtenerDetalle(id).subscribe({
      next: (data: any) => {
        this.pedido = data;
        this.cargando = false;
      },
      error: err => {
        console.error(err);
        this.cargando = false;
      }
    });

    this.pedidoService.totalPedido(id).subscribe({
      next: t => this.total = t as number
    });
  }
}
