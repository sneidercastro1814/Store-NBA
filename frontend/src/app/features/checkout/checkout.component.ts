import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CartService } from '../../core/services/cart.service';
import { OrderService } from '../../core/services/order.service';
import { AuthService } from '../../core/services/auth.service';
import { Pedido } from '../../core/models/pedido.model';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <div class="container checkout-page">
      @if (confirmedOrder) {
        <!-- Order Success View -->
        <div class="success-screen glass-panel">
          <div class="success-icon-wrap">
            <i class="ri-check-line"></i>
          </div>
          <span class="order-badge">ORDEN #{{ confirmedOrder.id }} CONFIRMADA</span>
          <h2>¡GRACIAS POR TU COMPRA EN HOOPSTORE!</h2>
          <p class="success-desc">
            Hemos recibido tu pedido de balones oficiales. En breve recibirás un correo de confirmación y el código de seguimiento.
          </p>

          <div class="order-summary-box">
            <div class="summary-line">
              <span>Destinatario:</span>
              <strong>{{ authService.currentUser()?.nombre || 'Fan del Baloncesto' }}</strong>
            </div>
            <div class="summary-line">
              <span>Dirección de Envío:</span>
              <strong>{{ confirmedOrder.direccionEnvio }}</strong>
            </div>
            <div class="summary-line">
              <span>Método de Pago:</span>
              <strong>{{ confirmedOrder.metodoPago }}</strong>
            </div>
            <div class="summary-line total-line">
              <span>Total Pagado:</span>
              <strong class="total-highlight">\${{ confirmedOrder.total.toFixed(2) }} USD</strong>
            </div>
          </div>

          <div class="success-actions">
            <a routerLink="/catalogo" class="btn-primary">
              <i class="ri-arrow-left-line"></i> Volver a la Tienda
            </a>
          </div>
        </div>
      } @else {
        <!-- Checkout Flow -->
        <div class="checkout-header">
          <a routerLink="/catalogo" class="back-link">
            <i class="ri-arrow-left-line"></i> Volver al Catálogo
          </a>
          <h1 class="page-title">FINALIZAR COMPRA</h1>
          <p class="page-subtitle">Proceso de pago seguro y envío express garantizado</p>
        </div>

        <div class="checkout-grid">
          <!-- Form Section -->
          <div class="checkout-form-col">
            <div class="glass-panel section-panel">
              <div class="panel-title">
                <span class="step-num">1</span>
                <h3>Información de Envío</h3>
              </div>

              <div class="form-fields">
                <div class="form-row">
                  <div class="form-group flex-1">
                    <label>Nombre Completo</label>
                    <input type="text" [(ngModel)]="nombreCompleto" name="nombre" class="form-input" />
                  </div>
                  <div class="form-group flex-1">
                    <label>Teléfono de Contacto</label>
                    <input type="tel" [(ngModel)]="telefono" name="telefono" placeholder="+34 600 000 000" class="form-input" />
                  </div>
                </div>

                <div class="form-group">
                  <label>Dirección de Entrega</label>
                  <input
                    type="text"
                    [(ngModel)]="direccion"
                    name="direccion"
                    placeholder="Calle, Número, Piso o Departamento"
                    class="form-input"
                    required
                  />
                </div>

                <div class="form-row">
                  <div class="form-group flex-1">
                    <label>Ciudad</label>
                    <input type="text" [(ngModel)]="ciudad" name="ciudad" placeholder="Ej. Madrid o Los Ángeles" class="form-input" />
                  </div>
                  <div class="form-group flex-1">
                    <label>Código Postal</label>
                    <input type="text" [(ngModel)]="codigoPostal" name="codigoPostal" placeholder="28001" class="form-input" />
                  </div>
                </div>
              </div>
            </div>

            <!-- Payment Method Section -->
            <div class="glass-panel section-panel">
              <div class="panel-title">
                <span class="step-num">2</span>
                <h3>Método de Pago Seguro</h3>
              </div>

              <div class="payment-methods">
                <label class="payment-option" [class.selected]="metodoPago === 'credit-card'">
                  <input type="radio" name="metodo" value="credit-card" [(ngModel)]="metodoPago" />
                  <div class="payment-content">
                    <div class="payment-top">
                      <strong>Tarjeta de Crédito / Débito</strong>
                      <div class="card-icons">
                        <i class="ri-visa-line"></i>
                        <i class="ri-mastercard-line"></i>
                      </div>
                    </div>
                    <span class="payment-sub">Transacción cifrada SSL de 256 bits</span>
                  </div>
                </label>

                <label class="payment-option" [class.selected]="metodoPago === 'paypal'">
                  <input type="radio" name="metodo" value="paypal" [(ngModel)]="metodoPago" />
                  <div class="payment-content">
                    <div class="payment-top">
                      <strong>PayPal Express</strong>
                      <i class="ri-paypal-line"></i>
                    </div>
                    <span class="payment-sub">Paga fácilmente con tu cuenta de PayPal</span>
                  </div>
                </label>
              </div>

              @if (metodoPago === 'credit-card') {
                <div class="credit-card-inputs">
                  <div class="form-group">
                    <label>Número de Tarjeta</label>
                    <input type="text" [(ngModel)]="cardNumber" placeholder="4000 1234 5678 9010" class="form-input" />
                  </div>
                  <div class="form-row">
                    <div class="form-group flex-1">
                      <label>Vencimiento (MM/AA)</label>
                      <input type="text" [(ngModel)]="cardExp" placeholder="12/28" class="form-input" />
                    </div>
                    <div class="form-group flex-1">
                      <label>CVV</label>
                      <input type="password" [(ngModel)]="cardCvv" placeholder="123" maxlength="4" class="form-input" />
                    </div>
                  </div>
                </div>
              }
            </div>
          </div>

          <!-- Order Summary Sidebar -->
          <div class="checkout-summary-col">
            <div class="glass-panel summary-panel">
              <h3>Resumen del Pedido</h3>
              <span class="items-count">{{ cartService.totalUnits() }} artículos</span>

              <div class="summary-items-list">
                @for (item of cartService.items(); track item.balon.id) {
                  <div class="summary-item">
                    <img [src]="item.balon.imagenUrl" [alt]="item.balon.nombre" class="summary-thumb" />
                    <div class="summary-item-details">
                      <span class="name">{{ item.balon.nombre }}</span>
                      <span class="qty">Cant: {{ item.cantidad }} × \${{ item.balon.precio.toFixed(2) }}</span>
                    </div>
                    <strong class="subtotal">\${{ item.subtotal.toFixed(2) }}</strong>
                  </div>
                }
              </div>

              <div class="price-breakdown">
                <div class="breakdown-row">
                  <span>Subtotal</span>
                  <span>\${{ cartService.totalPrice().toFixed(2) }}</span>
                </div>
                <div class="breakdown-row">
                  <span>Envío Express Asegurado</span>
                  <span class="free">GRATIS</span>
                </div>
                <div class="breakdown-row total-row">
                  <span>Total</span>
                  <strong class="grand-total">\${{ cartService.totalPrice().toFixed(2) }} USD</strong>
                </div>
              </div>

              @if (errorMessage) {
                <div class="checkout-error">
                  <i class="ri-error-warning-line"></i> {{ errorMessage }}
                </div>
              }

              <button
                class="btn-danger w-100 place-order-btn"
                [disabled]="loading || cartService.items().length === 0"
                (click)="submitOrder()"
              >
                @if (loading) {
                  <i class="ri-loader-4-line spin"></i>
                  <span>Procesando Pago Seguro...</span>
                } @else {
                  <i class="ri-lock-2-line"></i>
                  <span>PAGAR AHORA • \${{ cartService.totalPrice().toFixed(2) }}</span>
                }
              </button>

              <div class="trust-notice">
                <i class="ri-shield-check-fill"></i>
                <span>Garantía de Satisfacción 30 días • Devoluciones gratis</span>
              </div>
            </div>
          </div>
        </div>
      }
    </div>
  `,
  styles: [`
    .checkout-page {
      padding: 3rem 1.5rem;
    }

    .checkout-header {
      margin-bottom: 2.5rem;

      .back-link {
        display: inline-flex;
        align-items: center;
        gap: 0.4rem;
        color: var(--nba-blue);
        font-weight: 700;
        font-size: 0.9rem;
        margin-bottom: 0.75rem;

        &:hover {
          text-decoration: underline;
        }
      }

      .page-title {
        font-size: 2.2rem;
        color: #fff;
        margin-bottom: 0.3rem;
      }

      .page-subtitle {
        color: var(--text-secondary);
        font-size: 0.95rem;
      }
    }

    .checkout-grid {
      display: grid;
      grid-template-columns: 1.4fr 1fr;
      gap: 2rem;
      align-items: start;

      @media (max-width: 900px) {
        grid-template-columns: 1fr;
      }
    }

    .section-panel {
      padding: 2rem;
      margin-bottom: 1.75rem;

      .panel-title {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        margin-bottom: 1.5rem;
        padding-bottom: 0.75rem;
        border-bottom: 1px solid var(--border-color);

        .step-num {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: var(--nba-blue);
          color: #fff;
          font-weight: 800;
          font-size: 0.85rem;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        h3 {
          font-size: 1.2rem;
          color: #fff;
        }
      }
    }

    .form-fields {
      display: flex;
      flex-direction: column;
      gap: 1.25rem;
    }

    .form-row {
      display: flex;
      gap: 1rem;

      @media (max-width: 576px) {
        flex-direction: column;
      }
    }

    .flex-1 {
      flex: 1;
    }

    .form-group {
      display: flex;
      flex-direction: column;
      gap: 0.4rem;

      label {
        font-size: 0.82rem;
        font-weight: 700;
        color: var(--text-secondary);
        text-transform: uppercase;
        letter-spacing: 0.05em;
      }

      .form-input {
        background: rgba(0, 0, 0, 0.4);
        border: 1px solid var(--border-color);
        color: #fff;
        padding: 0.75rem 1rem;
        border-radius: 10px;
        font-family: var(--font-body);
        font-size: 0.92rem;
        outline: none;

        &:focus {
          border-color: var(--nba-blue);
        }
      }
    }

    .payment-methods {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      margin-bottom: 1.5rem;
    }

    .payment-option {
      display: flex;
      align-items: center;
      gap: 1rem;
      background: rgba(255, 255, 255, 0.03);
      border: 1px solid var(--border-color);
      border-radius: 12px;
      padding: 1rem 1.25rem;
      cursor: pointer;
      transition: all var(--transition-fast);

      input {
        accent-color: var(--nba-blue);
        width: 18px;
        height: 18px;
      }

      &.selected {
        border-color: var(--nba-blue);
        background: rgba(0, 107, 182, 0.1);
      }

      .payment-content {
        flex: 1;

        .payment-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          color: #fff;

          .card-icons {
            font-size: 1.5rem;
            display: flex;
            gap: 0.5rem;
            color: var(--text-secondary);
          }
        }

        .payment-sub {
          font-size: 0.78rem;
          color: var(--text-muted);
        }
      }
    }

    .credit-card-inputs {
      background: rgba(0, 0, 0, 0.3);
      padding: 1.25rem;
      border-radius: 12px;
      border: 1px solid var(--border-color);
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    /* Summary Sidebar */
    .summary-panel {
      padding: 2rem;
      position: sticky;
      top: 100px;

      h3 {
        font-size: 1.25rem;
        color: #fff;
        margin-bottom: 0.2rem;
      }

      .items-count {
        font-size: 0.82rem;
        color: var(--text-muted);
        display: block;
        margin-bottom: 1.25rem;
      }
    }

    .summary-items-list {
      max-height: 260px;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
      gap: 0.85rem;
      margin-bottom: 1.5rem;
      padding-bottom: 1rem;
      border-bottom: 1px solid var(--border-color);

      .summary-item {
        display: flex;
        align-items: center;
        gap: 0.75rem;

        .summary-thumb {
          width: 50px;
          height: 50px;
          object-fit: cover;
          border-radius: 8px;
        }

        .summary-item-details {
          flex: 1;
          display: flex;
          flex-direction: column;

          .name {
            font-size: 0.85rem;
            color: #fff;
            font-weight: 600;
            line-height: 1.2;
          }

          .qty {
            font-size: 0.75rem;
            color: var(--text-muted);
          }
        }

        .subtotal {
          font-size: 0.9rem;
          color: #fff;
        }
      }
    }

    .price-breakdown {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
      margin-bottom: 1.5rem;

      .breakdown-row {
        display: flex;
        justify-content: space-between;
        font-size: 0.9rem;
        color: var(--text-secondary);

        .free {
          color: #10b981;
          font-weight: 800;
        }

        &.total-row {
          border-top: 1px solid var(--border-color);
          padding-top: 1rem;
          color: #fff;
          font-size: 1.1rem;
          font-weight: 700;

          .grand-total {
            font-family: var(--font-heading);
            font-size: 1.5rem;
            font-weight: 900;
            color: #fff;
          }
        }
      }
    }

    .checkout-error {
      background: rgba(201, 8, 42, 0.2);
      border: 1px solid var(--nba-red);
      color: #fca5a5;
      padding: 0.75rem;
      border-radius: 8px;
      margin-bottom: 1rem;
      font-size: 0.85rem;
      display: flex;
      align-items: center;
      gap: 0.4rem;
    }

    .place-order-btn {
      width: 100%;
      justify-content: center;
      padding: 1rem;
      font-size: 1rem;
      letter-spacing: 0.05em;
    }

    .trust-notice {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.4rem;
      font-size: 0.78rem;
      color: var(--text-muted);
      margin-top: 1rem;

      i {
        color: #10b981;
      }
    }

    /* Success Screen */
    .success-screen {
      max-width: 600px;
      margin: 2rem auto;
      padding: 3.5rem 2.5rem;
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;

      .success-icon-wrap {
        width: 72px;
        height: 72px;
        border-radius: 50%;
        background: linear-gradient(135deg, #10b981 0%, #059669 100%);
        color: #fff;
        font-size: 2.4rem;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 1.5rem;
        box-shadow: 0 10px 25px rgba(16, 185, 129, 0.4);
      }

      .order-badge {
        background: rgba(0, 107, 182, 0.2);
        color: #38bdf8;
        border: 1px solid rgba(0, 107, 182, 0.4);
        padding: 0.35rem 0.85rem;
        border-radius: 9999px;
        font-size: 0.8rem;
        font-weight: 800;
        letter-spacing: 0.08em;
        margin-bottom: 1rem;
      }

      h2 {
        font-size: 1.8rem;
        color: #fff;
        margin-bottom: 0.75rem;
      }

      .success-desc {
        color: var(--text-secondary);
        font-size: 0.95rem;
        line-height: 1.6;
        margin-bottom: 2rem;
      }

      .order-summary-box {
        width: 100%;
        background: rgba(0, 0, 0, 0.3);
        border: 1px solid var(--border-color);
        border-radius: 12px;
        padding: 1.25rem;
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
        margin-bottom: 2rem;
        text-align: left;

        .summary-line {
          display: flex;
          justify-content: space-between;
          font-size: 0.9rem;
          color: var(--text-secondary);

          strong {
            color: #fff;
          }

          &.total-line {
            border-top: 1px solid var(--border-color);
            padding-top: 0.75rem;
            margin-top: 0.25rem;
            color: #fff;

            .total-highlight {
              font-family: var(--font-heading);
              font-size: 1.2rem;
              color: #38bdf8;
            }
          }
        }
      }
    }

    .spin {
      animation: spin 1s linear infinite;
    }
  `]
})
export class CheckoutPageComponent {
  cartService = inject(CartService);
  orderService = inject(OrderService);
  authService = inject(AuthService);
  private router = inject(Router);

  nombreCompleto = this.authService.currentUser()?.nombre || 'LeBron James Fan';
  telefono = '+1 (555) 234-5678';
  direccion = '1111 S Figueroa St, Crypto.com Arena Suite 23';
  ciudad = 'Los Angeles';
  codigoPostal = '90015';

  metodoPago = 'credit-card';
  cardNumber = '4532 8921 4423 9920';
  cardExp = '08/28';
  cardCvv = '824';

  loading = false;
  errorMessage = '';
  confirmedOrder: Pedido | null = null;

  submitOrder(): void {
    if (!this.direccion) {
      this.errorMessage = 'Por favor ingresa la dirección de entrega';
      return;
    }

    if (this.cartService.items().length === 0) {
      this.errorMessage = 'El carrito no tiene artículos';
      return;
    }

    this.loading = true;
    this.errorMessage = '';

    const req = {
      direccionEnvio: `${this.direccion}, ${this.ciudad} (CP: ${this.codigoPostal})`,
      metodoPago: this.metodoPago === 'credit-card' ? 'Tarjeta Visa (**** 9920)' : 'PayPal Express',
      items: this.cartService.items().map(i => ({
        balonId: i.balon.id,
        cantidad: i.cantidad
      }))
    };

    this.orderService.createOrder(req).subscribe({
      next: (order) => {
        this.loading = false;
        this.confirmedOrder = order;
        this.cartService.clearCart();
      },
      error: (err) => {
        this.loading = false;
        this.errorMessage = err.error?.message || 'Error al procesar el pedido. Intenta nuevamente.';
      }
    });
  }
}
