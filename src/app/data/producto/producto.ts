import { Categoria } from '../categoria/categoria';

export interface Producto {
  idProducto: number;
  nombre: string;
  descripcion?: string;
  precio: number;
  stock: number;
  categoria?: Categoria;
}
