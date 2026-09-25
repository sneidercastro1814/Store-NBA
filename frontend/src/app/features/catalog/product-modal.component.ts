import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Balon } from '../../core/models/balon.model';
import { CartService } from '../../core/services/cart.service';

@Component({
  selector: 'app-product-modal',
  standalone: true,
  imports: [CommonModule],
  template: `
    @if (balon) {
      <div class="modal-backdrop" (click)="closeModal()">
        <div class="modal-container" (click)="$event.stopPropagation()">
          <button class="btn-close" (click)="closeModal()" aria-label="Cerrar modal">
            <i class="ri-close-line"></i>
          </button>

          <div class="modal-grid">
            <!-- Media column -->
            <div class="modal-media">
              <img [src]="balon.imagenUrl" [alt]="balon.nombre" class="product-img" />
              <div class="tags-row">
                <span class="badge" [ngClass]="{
                  'badge-nba': balon.ligaNombre === 'NBA',
                  'badge-fiba': balon.ligaNombre === 'FIBA',
                  'badge-euroleague': balon.ligaNombre === 'EuroLeague'
                }">{{ balon.ligaNombre || 'OFICIAL' }}</span>
                <span class="spec-tag">{{ balon.talla }}</span>
                <span class="spec-tag">{{ balon.anioEdicion }}</span>
              </div>
            </div>

            <!-- Details column -->
            <div class="modal-details">
              <div class="brand-bar">
                <span class="brand-name">{{ balon.marca }}</span>
                @if (balon.equipoNombre) {
                  <span class="team-badge"><i class="ri-shield-star-line"></i> {{ balon.equipoNombre }}</span>
                }
              </div>

              <h2 class="product-title">{{ balon.nombre }}</h2>

              <div class="price-row">
                <span class="price-val">\${{ balon.precio.toFixed(2) }}</span>
                <span class="stock-status" [ngClass]="balon.stock > 5 ? 'in-stock' : 'low-stock'">
                  <i class="ri-checkbox-circle-fill"></i>
                  {{ balon.stock > 5 ? 'En stock (' + balon.stock + ' disp.)' : '¡Últimas ' + balon.stock + ' unidades!' }}
                </span>
              </div>

              <p class="description">{{ balon.descripcion }}</p>

              <!-- Technical specs table -->
              <div class="specs-table">
                <div class="spec-item">
                  <span class="spec-label">Material:</span>
                  <strong class="spec-value">{{ balon.material }}</strong>
                </div>
                <div class="spec-item">
                  <span class="spec-label">Talla Oficial:</span>
                  <strong class="spec-value">{{ balon.talla }}</strong>
                </div>
                <div class="spec-item">
                  <span class="spec-label">Edición / Año:</span>
                  <strong class="spec-value">{{ balon.anioEdicion }}</strong>
                </div>
                <div class="spec-item">
                  <span class="spec-label">Uso recomendado:</span>
                  <strong class="spec-value">Indoor / Madera Parquet</strong>
                </div>
              </div>

              <!-- Quantity selector and Add button -->
              <div class="modal-action-row">
                <div class="quantity-box">
                  <button (click)="decreaseQty()" [disabled]="quantity <= 1">-</button>
                  <span>{{ quantity }}</span>
                  <button (click)="increaseQty()" [disabled]="quantity >= balon.stock">+</button>
                </div>

                <button class="btn-danger add-btn" (click)="addToCart()">
                  <i class="ri-shopping-cart-2-line"></i>
                  <span>Añadir al Carrito • \${{ (balon.precio * quantity).toFixed(2) }}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    }
  `,
  styles: [`
    .modal-backdrop {
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.82);
      backdrop-filter: blur(8px);
      z-index: 1050;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 1.5rem;
      animation: fadeIn 0.2s ease;
    }

    .modal-container {
      position: relative;
      background: #0f1628;
      border: 1px solid var(--border-color);
      border-radius: 20px;
      width: 100%;
      max-width: 820px;
      max-height: 90vh;
      overflow-y: auto;
      box-shadow: 0 25px 60px rgba(0, 0, 0, 0.8);
    }

    .btn-close {
      position: absolute;
      top: 1rem;
      right: 1rem;
      width: 36px;
      height: 36px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.1);
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.3rem;
      z-index: 10;

      &:hover {
        background: var(--nba-red);
      }
    }

    .modal-grid {
      display: grid;
      grid-template-columns: 1.1fr 1.3fr;
      gap: 2rem;
      padding: 2.5rem;

      @media (max-width: 768px) {
        grid-template-columns: 1fr;
        padding: 1.5rem;
      }
    }

    .modal-media {
      display: flex;
      flex-direction: column;
      gap: 1rem;

      .product-img {
        width: 100%;
        height: 340px;
        object-fit: cover;
        border-radius: 16px;
        background: #000;
        box-shadow: 0 8px 30px rgba(0, 0, 0, 0.5);
      }

      .tags-row {
        display: flex;
        gap: 0.5rem;
        flex-wrap: wrap;
      }

      .spec-tag {
        background: rgba(255, 255, 255, 0.08);
        color: var(--text-secondary);
        font-size: 0.75rem;
        font-weight: 600;
        padding: 0.25rem 0.6rem;
        border-radius: 6px;
      }
    }

    .modal-details {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }

    .brand-bar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 0.5rem;

      .brand-name {
        font-weight: 800;
        color: var(--nba-blue);
        letter-spacing: 0.1em;
        text-transform: uppercase;
        font-size: 0.85rem;
      }

      .team-badge {
        background: rgba(201, 8, 42, 0.15);
        color: #f87171;
        font-size: 0.8rem;
        font-weight: 700;
        padding: 0.2rem 0.6rem;
        border-radius: 6px;
        border: 1px solid rgba(201, 8, 42, 0.3);
      }
    }

    .product-title {
      font-size: 1.6rem;
      color: #fff;
      line-height: 1.2;
      margin-bottom: 0.75rem;
    }

    .price-row {
      display: flex;
      align-items: center;
      gap: 1.25rem;
      margin-bottom: 1.25rem;

      .price-val {
        font-family: var(--font-heading);
        font-size: 1.8rem;
        font-weight: 900;
        color: #fff;
      }

      .stock-status {
        display: flex;
        align-items: center;
        gap: 0.35rem;
        font-size: 0.85rem;
        font-weight: 600;

        &.in-stock {
          color: #34d399;
        }

        &.low-stock {
          color: #fbbf24;
        }
      }
    }

    .description {
      color: var(--text-secondary);
      font-size: 0.95rem;
      line-height: 1.6;
      margin-bottom: 1.5rem;
    }

    .specs-table {
      background: rgba(0, 0, 0, 0.25);
      border: 1px solid var(--border-color);
      border-radius: 12px;
      padding: 1rem;
      display: flex;
      flex-direction: column;
      gap: 0.6rem;
      margin-bottom: 1.75rem;

      .spec-item {
        display: flex;
        justify-content: space-between;
        font-size: 0.88rem;

        .spec-label {
          color: var(--text-muted);
        }

        .spec-value {
          color: #fff;
        }
      }
    }

    .modal-action-row {
      display: flex;
      gap: 1rem;

      .quantity-box {
        display: flex;
        align-items: center;
        background: rgba(255, 255, 255, 0.05);
        border: 1px solid var(--border-color);
        border-radius: 12px;
        padding: 0 0.5rem;

        button {
          background: transparent;
          color: #fff;
          width: 32px;
          height: 44px;
          font-size: 1.2rem;
          font-weight: 700;

          &:disabled {
            opacity: 0.2;
            cursor: not-allowed;
          }
        }

        span {
          min-width: 30px;
          text-align: center;
          font-weight: 700;
          font-size: 1rem;
        }
      }

      .add-btn {
        flex: 1;
        justify-content: center;
        font-size: 1rem;
        border-radius: 12px;
      }
    }
  `]
})
export class ProductModalComponent {
  @Input() balon: Balon | null = null;
  @Output() close = new EventEmitter<void>();

  cartService = inject(CartService);
  quantity = 1;

  increaseQty(): void {
    if (this.balon && this.quantity < this.balon.stock) {
      this.quantity++;
    }
  }

  decreaseQty(): void {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  addToCart(): void {
    if (this.balon) {
      this.cartService.addToCart(this.balon, this.quantity);
      this.closeModal();
    }
  }

  closeModal(): void {
    this.quantity = 1;
    this.close.emit();
  }
}
