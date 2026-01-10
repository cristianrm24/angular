import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarritoService } from '../../../service/carrito.service';
import { CarritoItem } from '../../../data/carrito/carrito-item';
import { Router } from '@angular/router';

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [CommonModule],
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
cargando = true;

ngOnInit(): void {
  this.cargarCarrito();
}

cargarCarrito() {
  this.carritoService.obtenerCarrito().subscribe({
    next: data => {
      this.items = data.items;
    },
    error: err => console.error(err)
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
