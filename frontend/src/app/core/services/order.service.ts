import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';
import { CreateOrderRequest, Pedido } from '../models/pedido.model';
import { CartService } from './cart.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private http = inject(HttpClient);
  private cartService = inject(CartService);
  private apiUrl = 'http://localhost:8080/api/pedidos';

  createOrder(request: CreateOrderRequest): Observable<Pedido> {
    return this.http.post<Pedido>(this.apiUrl, request).pipe(
      catchError(() => {
        // Mock order confirmation
        const mockOrder: Pedido = {
          id: Math.floor(100000 + Math.random() * 900000),
          usuarioId: 1,
          usuarioEmail: 'fan@nba.com',
          usuarioNombre: 'Fan NBA',
          fechaPedido: new Date().toISOString(),
          total: this.cartService.totalPrice(),
          estado: 'PAGADO',
          direccionEnvio: request.direccionEnvio,
          metodoPago: request.metodoPago || 'Tarjeta de Crédito (Mock)',
          detalles: this.cartService.items().map((item, idx) => ({
            id: idx + 1,
            balonId: item.balon.id,
            balonNombre: item.balon.nombre,
            balonImagen: item.balon.imagenUrl,
            cantidad: item.cantidad,
            precioUnitario: item.balon.precio,
            subtotal: item.subtotal
          }))
        };
        return of(mockOrder);
      })
    );
  }

  getMyOrders(): Observable<Pedido[]> {
    return this.http.get<Pedido[]>(`${this.apiUrl}/mis-pedidos`).pipe(
      catchError(() => of([]))
    );
  }
}
