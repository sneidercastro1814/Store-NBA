export interface OrderItemRequest {
  balonId: number;
  cantidad: number;
}

export interface CreateOrderRequest {
  direccionEnvio: string;
  metodoPago?: string;
  items: OrderItemRequest[];
}

export interface DetallePedidoDTO {
  id: number;
  balonId: number;
  balonNombre: string;
  balonImagen: string;
  cantidad: number;
  precioUnitario: number;
  subtotal: number;
}

export interface Pedido {
  id: number;
  usuarioId: number;
  usuarioEmail: string;
  usuarioNombre: string;
  fechaPedido: string;
  total: number;
  estado: string;
  direccionEnvio: string;
  metodoPago: string;
  detalles: DetallePedidoDTO[];
}
