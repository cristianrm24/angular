export interface ProductoFormDTO {
  nombre: string;
  precio: number;
  stock: number;
  categoria: {
    idCategoria: number | null;
  };
}
