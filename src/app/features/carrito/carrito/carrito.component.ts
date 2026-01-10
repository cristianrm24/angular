import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarritoService } from '../../../service/carrito.service';
import { CarritoItem } from '../../../data/carrito/carrito-item';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './carrito.component.html'
})
export class CarritoComponent implements OnInit {



constructor(
  private carritoService: CarritoService,
  private router: Router
) {}
irACheckout() {
  this.router.navigate(['/checkout']);
}
items: any[] = [];
total = 0;
totalp =0;
cargando = true;

ngOnInit(): void {
  this.cargarCarrito();
      this.carritoService.total().subscribe({
      next: totalp => {
        this.totalp = totalp;
        this.cargando = false;
      },
      error: () => {
        alert('No se pudo obtener el total');
        this.cargando = false;
      }
    });
}

cargarCarrito() {
  this.carritoService.obtenerCarrito().subscribe({
    next: (data: any) => {
      this.items = data.items;
      this.total = data.total;
      this.cargando = false;
    },
    error: err => {
      console.error(err);
      this.cargando = false;
    }
  });
}

eliminar(idProducto: number) {
  this.carritoService.eliminarProducto(idProducto).subscribe({
    next: () => {
      console.log('🗑 Producto eliminado');
      this.cargarCarrito(); // 🔥 ESTO ES CLAVE
    },
    error: err => console.error(err)
  });
}



vaciar() {
  this.carritoService.vaciarCarrito().subscribe(() => {
    this.items = [];
    this.total = 0;
  });
}



}
