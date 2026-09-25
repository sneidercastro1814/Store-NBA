import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { OrderService } from '../../core/services/order.service';
import { Pedido } from '../../core/models/pedido.model';

@Component({
  selector: 'app-my-orders',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <main class="container orders-layout">
      <section class="orders-header">
        <h1 class="orders-title">MIS <span class="gradient-text">COMPRAS</span></h1>
        <p class="orders-subtitle">Historial de balones que ya has comprado en HoopStore</p>
      </section>

      @if (loading()) {
        <div class="state-box">
          <i class="ri-loader-4-line spin"></i>
          <p>Cargando tus pedidos...</p>
        </div>
      } @else if (pedidos().length === 0) {
        <div class="state-box">
          <i class="ri-basketball-line"></i>
          <p>Todavía no tienes compras registradas.</p>
          <a routerLink="/catalogo" class="btn-primary">Ir al catálogo</a>
        </div>
      } @else {
        <div class="orders-list">
          @for (pedido of pedidos(); track pedido.id) {
            <article class="order-card">
              <header class="order-card-header">
                <div>
                  <span class="order-id">Pedido #{{ pedido.id }}</span>
                  <span class="order-date">{{ pedido.fechaPedido | date:'dd/MM/yyyy HH:mm' }}</span>
                </div>
                <span class="order-status" [class]="'status-' + pedido.estado.toLowerCase()">
                  {{ pedido.estado }}
                </span>
              </header>

              <div class="order-items">
                @for (item of pedido.detalles; track item.id) {
                  <div class="order-item">
                    <img [src]="item.balonImagen" [alt]="item.balonNombre" />
                    <div class="order-item-info">
                      <span class="order-item-name">{{ item.balonNombre }}</span>
                      <span class="order-item-qty">Cantidad: {{ item.cantidad }}</span>
                    </div>
                    <span class="order-item-subtotal">\${{ item.subtotal.toFixed(2) }}</span>
                  </div>
                }
              </div>

              <footer class="order-card-footer">
                <span class="order-shipping"><i class="ri-map-pin-line"></i> {{ pedido.direccionEnvio }}</span>
                <span class="order-total">Total: \${{ pedido.total.toFixed(2) }}</span>
              </footer>
            </article>
          }
        </div>
      }
    </main>
  `,
  styles: [`
    .orders-layout {
      padding: 3rem 1.5rem 4rem;
      min-height: 60vh;
    }

    .orders-header {
      margin-bottom: 2rem;
      text-align: center;
    }

    .orders-title {
      font-family: var(--font-heading);
      font-weight: 900;
      font-size: 2.2rem;
      color: var(--text-primary);
      letter-spacing: -0.02em;
    }

    .gradient-text {
      background: linear-gradient(90deg, var(--nba-blue), var(--nba-red));
      -webkit-background-clip: text;
      background-clip: text;
      color: transparent;
    }

    .orders-subtitle {
      color: var(--text-secondary);
      margin-top: 0.5rem;
    }

    .state-box {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1rem;
      padding: 4rem 1rem;
      color: var(--text-secondary);

      i {
        font-size: 2.5rem;
        color: var(--text-muted);
      }
    }

    .spin {
      animation: spin 1s linear infinite;
    }

    @keyframes spin {
      to { transform: rotate(360deg); }
    }

    .btn-primary {
      background: linear-gradient(135deg, var(--nba-blue), var(--nba-red));
      color: #fff;
      padding: 0.7rem 1.4rem;
      border-radius: var(--radius-md);
      font-weight: 700;
      margin-top: 0.5rem;
    }

    .orders-list {
      display: flex;
      flex-direction: column;
      gap: 1.25rem;
      max-width: 780px;
      margin: 0 auto;
    }

    .order-card {
      background: var(--bg-card);
      border: 1px solid var(--border-color);
      border-radius: var(--radius-lg);
      padding: 1.25rem 1.5rem;
    }

    .order-card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-bottom: 0.9rem;
      margin-bottom: 0.9rem;
      border-bottom: 1px solid var(--border-color);
    }

    .order-id {
      font-weight: 800;
      color: var(--text-primary);
      display: block;
    }

    .order-date {
      font-size: 0.8rem;
      color: var(--text-muted);
    }

    .order-status {
      font-size: 0.75rem;
      font-weight: 800;
      padding: 0.3rem 0.75rem;
      border-radius: var(--radius-full);
      text-transform: uppercase;
      background: rgba(255, 255, 255, 0.08);
      color: var(--text-secondary);
    }

    .status-pagado, .status-entregado {
      background: rgba(34, 197, 94, 0.15);
      color: #4ade80;
    }

    .status-pendiente {
      background: rgba(217, 130, 43, 0.15);
      color: #fbbf24;
    }

    .status-cancelado {
      background: rgba(201, 8, 42, 0.15);
      color: #f87171;
    }

    .order-items {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }

    .order-item {
      display: flex;
      align-items: center;
      gap: 0.9rem;
    }

    .order-item img {
      width: 48px;
      height: 48px;
      border-radius: var(--radius-sm);
      object-fit: cover;
      background: var(--bg-secondary);
    }

    .order-item-info {
      display: flex;
      flex-direction: column;
      flex: 1;
    }

    .order-item-name {
      font-weight: 600;
      color: var(--text-primary);
      font-size: 0.92rem;
    }

    .order-item-qty {
      font-size: 0.78rem;
      color: var(--text-muted);
    }

    .order-item-subtotal {
      font-weight: 700;
      color: var(--text-primary);
    }

    .order-card-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 1rem;
      padding-top: 0.9rem;
      border-top: 1px solid var(--border-color);
      font-size: 0.85rem;
      color: var(--text-secondary);
    }

    .order-total {
      font-weight: 800;
      color: var(--text-primary);
      font-size: 1rem;
    }
  `]
})
export class MyOrdersComponent implements OnInit {
  private orderService = inject(OrderService);

  pedidos = signal<Pedido[]>([]);
  loading = signal(true);

  ngOnInit(): void {
    this.orderService.getMyOrders().subscribe(data => {
      this.pedidos.set(data);
      this.loading.set(false);
    });
  }
}
