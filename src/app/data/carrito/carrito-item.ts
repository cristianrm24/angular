import { Producto } from '../producto/producto';

export interface CarritoItem {
  producto: Producto;
  cantidad: number;
  subtotal: number;
}
