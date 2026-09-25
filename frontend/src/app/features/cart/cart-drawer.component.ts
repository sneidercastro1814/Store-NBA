import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CartService } from '../../core/services/cart.service';

@Component({
  selector: 'app-cart-drawer',
  standalone: true,
  imports: [CommonModule],
  template: `
    @if (cartService.isDrawerOpen()) {
      <div class="cart-backdrop" (click)="cartService.closeDrawer()">
        <div class="cart-sidebar" (click)="$event.stopPropagation()">
          <!-- Header -->
          <div class="drawer-header">
            <div class="header-title">
              <i class="ri-shopping-basket-2-line"></i>
              <h3>CARRITO DE COMPRAS</h3>
              <span class="count-tag">{{ cartService.totalUnits() }}</span>
            </div>
            <button class="close-btn" (click)="cartService.closeDrawer()" aria-label="Cerrar carrito">
              <i class="ri-close-line"></i>
            </button>
          </div>

          <!-- Items list -->
          <div class="drawer-body">
            @if (cartService.items().length === 0) {
              <div class="empty-state">
                <i class="ri-basketball-line empty-icon"></i>
                <p class="empty-text">Tu carrito está vacío</p>
                <span class="empty-sub">Explora los balones oficiales de la NBA, FIBA y EuroLeague.</span>
                <button class="btn-primary" (click)="cartService.closeDrawer()">Ver Catálogo</button>
              </div>
            } @else {
              <div class="items-list">
                @for (item of cartService.items(); track item.balon.id) {
                  <div class="cart-item-card">
                    <img [src]="item.balon.imagenUrl" [alt]="item.balon.nombre" class="item-thumb" />
                    <div class="item-info">
                      <span class="item-brand">{{ item.balon.marca }} • {{ item.balon.talla }}</span>
                      <h4 class="item-name">{{ item.balon.nombre }}</h4>
                      <span class="item-price">\${{ item.balon.precio.toFixed(2) }}</span>

                      <div class="item-actions">
                        <div class="quantity-controller">
                          <button (click)="cartService.updateQuantity(item.balon.id, item.cantidad - 1)" [disabled]="item.cantidad <= 1">
                            <i class="ri-subtract-line"></i>
                          </button>
                          <span>{{ item.cantidad }}</span>
                          <button (click)="cartService.updateQuantity(item.balon.id, item.cantidad + 1)" [disabled]="item.cantidad >= item.balon.stock">
                            <i class="ri-add-line"></i>
                          </button>
                        </div>
                        <button class="btn-remove" (click)="cartService.removeFromCart(item.balon.id)" title="Eliminar">
                          <i class="ri-delete-bin-6-line"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                }
              </div>
            }
          </div>

          <!-- Footer with subtotal and checkout button -->
          @if (cartService.items().length > 0) {
            <div class="drawer-footer">
              <div class="summary-row">
                <span>Subtotal</span>
                <strong>\${{ cartService.totalPrice().toFixed(2) }}</strong>
              </div>
              <div class="summary-row shipping-note">
                <span>Envío oficial</span>
                <span class="free-shipping">GRATIS</span>
              </div>
              <div class="total-row">
                <span>Total Estimado</span>
                <strong class="total-price">\${{ cartService.totalPrice().toFixed(2) }}</strong>
              </div>

              <button class="btn-danger w-100 checkout-btn" (click)="goToCheckout()">
                <span>FINALIZAR COMPRA</span>
                <i class="ri-arrow-right-line"></i>
              </button>
            </div>
          }
        </div>
      </div>
    }
  `,
  styles: [`
    .cart-backdrop {
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.7);
      backdrop-filter: blur(6px);
      z-index: 1000;
      display: flex;
      justify-content: flex-end;
      animation: fadeIn 0.25s ease;
    }

    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    .cart-sidebar {
      width: 100%;
      max-width: 440px;
      height: 100%;
      background: #0d1424;
      border-left: 1px solid var(--border-color);
      display: flex;
      flex-direction: column;
      box-shadow: -10px 0 30px rgba(0, 0, 0, 0.6);
      animation: slideIn 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    }

    @keyframes slideIn {
      from { transform: translateX(100%); }
      to { transform: translateX(0); }
    }

    .drawer-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 1.25rem 1.5rem;
      border-bottom: 1px solid var(--border-color);
      background: rgba(0, 0, 0, 0.2);

      .header-title {
        display: flex;
        align-items: center;
        gap: 0.6rem;

        i {
          color: var(--nba-red);
          font-size: 1.3rem;
        }

        h3 {
          font-size: 1.05rem;
          color: #fff;
          font-weight: 800;
          letter-spacing: 0.04em;
        }

        .count-tag {
          background: var(--nba-blue);
          color: #fff;
          font-size: 0.75rem;
          padding: 0.15rem 0.5rem;
          border-radius: 9999px;
          font-weight: 800;
        }
      }

      .close-btn {
        background: transparent;
        color: var(--text-secondary);
        font-size: 1.4rem;
        width: 36px;
        height: 36px;
        border-radius: 8px;
        display: flex;
        align-items: center;
        justify-content: center;

        &:hover {
          color: #fff;
          background: rgba(255, 255, 255, 0.1);
        }
      }
    }

    .drawer-body {
      flex: 1;
      overflow-y: auto;
      padding: 1.5rem;
    }

    .empty-state {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100%;
      text-align: center;
      gap: 1rem;
      padding: 2rem;

      .empty-icon {
        font-size: 4rem;
        color: var(--text-muted);
        opacity: 0.4;
      }

      .empty-text {
        font-family: var(--font-heading);
        font-size: 1.3rem;
        font-weight: 700;
        color: #fff;
      }

      .empty-sub {
        font-size: 0.88rem;
        color: var(--text-secondary);
        max-width: 260px;
      }
    }

    .items-list {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .cart-item-card {
      display: flex;
      gap: 1rem;
      background: rgba(255, 255, 255, 0.03);
      border: 1px solid var(--border-color);
      border-radius: 12px;
      padding: 0.85rem;

      .item-thumb {
        width: 80px;
        height: 80px;
        object-fit: cover;
        border-radius: 8px;
        background: #000;
      }

      .item-info {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        .item-brand {
          font-size: 0.72rem;
          color: var(--nba-blue);
          font-weight: 700;
          text-transform: uppercase;
        }

        .item-name {
          font-size: 0.88rem;
          color: #fff;
          font-weight: 600;
          line-height: 1.25;
        }

        .item-price {
          font-weight: 800;
          color: #fff;
          font-size: 0.95rem;
        }

        .item-actions {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: 0.4rem;
        }

        .quantity-controller {
          display: flex;
          align-items: center;
          background: rgba(0, 0, 0, 0.4);
          border: 1px solid var(--border-color);
          border-radius: 6px;

          button {
            background: transparent;
            color: #fff;
            width: 26px;
            height: 26px;
            display: flex;
            align-items: center;
            justify-content: center;

            &:disabled {
              opacity: 0.3;
              cursor: not-allowed;
            }

            &:hover:not(:disabled) {
              background: rgba(255, 255, 255, 0.1);
            }
          }

          span {
            font-size: 0.85rem;
            font-weight: 700;
            padding: 0 0.4rem;
          }
        }

        .btn-remove {
          background: transparent;
          color: var(--text-muted);
          font-size: 1.1rem;

          &:hover {
            color: var(--nba-red);
          }
        }
      }
    }

    .drawer-footer {
      padding: 1.25rem 1.5rem;
      border-top: 1px solid var(--border-color);
      background: rgba(0, 0, 0, 0.35);

      .summary-row {
        display: flex;
        justify-content: space-between;
        font-size: 0.9rem;
        color: var(--text-secondary);
        margin-bottom: 0.5rem;
      }

      .free-shipping {
        color: #10b981;
        font-weight: 700;
      }

      .total-row {
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-top: 1px solid var(--border-color);
        padding-top: 0.75rem;
        margin-top: 0.75rem;
        margin-bottom: 1.25rem;

        span {
          font-family: var(--font-heading);
          font-weight: 700;
          color: #fff;
          font-size: 1.05rem;
        }

        .total-price {
          font-family: var(--font-heading);
          font-size: 1.4rem;
          font-weight: 900;
          color: #fff;
        }
      }

      .checkout-btn {
        width: 100%;
        justify-content: center;
        padding: 0.9rem;
        font-size: 1rem;
        letter-spacing: 0.05em;
      }
    }
  `]
})
export class CartDrawerComponent {
  cartService = inject(CartService);
  private router = inject(Router);

  goToCheckout(): void {
    this.cartService.closeDrawer();
    this.router.navigate(['/checkout']);
  }
}
