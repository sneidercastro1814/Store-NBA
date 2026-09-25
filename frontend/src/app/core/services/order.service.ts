import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CreateOrderRequest, Pedido } from '../models/pedido.model';


@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private http = inject(HttpClient);
  private apiUrl = 'https://store-nba-production.up.railway.app/api/pedidos';

  createOrder(request: CreateOrderRequest): Observable<Pedido> {
    return this.http.post<Pedido>(this.apiUrl, request);
  }

  getMyOrders(): Observable<Pedido[]> {
    return this.http.get<Pedido[]>(`${this.apiUrl}/mis-pedidos`);
  }
}
