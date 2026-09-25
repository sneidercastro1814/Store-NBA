import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { CartService } from '../../../core/services/cart.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  template: `
    <header class="navbar-wrapper">
      <!-- NBA Accent Bar -->
      <div class="nba-top-bar">
        <span class="pulse-dot"></span>
        <span>OFICIAL • TIENDA OFICIAL DE BALONES DE BALONCESTO • ENVÍO RÁPIDO A TODO EL MUNDO</span>
      </div>

      <nav class="container nav-content">
        <!-- Logo -->
        <a routerLink="/catalogo" class="brand-logo">
          <div class="logo-icon">
            <i class="ri-basketball-line"></i>
          </div>
          <div class="logo-text">
            <span class="logo-title">HOOP<span class="red-text">STORE</span></span>
            <span class="logo-subtitle">BALONCESTO PROFESIONAL</span>
          </div>
        </a>

        <!-- Navigation Links -->
        <div class="nav-links">
          <a routerLink="/catalogo" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}" class="nav-item">
            <i class="ri-store-2-line"></i> Catálogo
          </a>
          <a routerLink="/catalogo" [queryParams]="{ligaId: 1}" class="nav-item league-nba">
            <span class="league-pill nba">NBA</span>
          </a>
          <a routerLink="/catalogo" [queryParams]="{ligaId: 2}" class="nav-item league-fiba">
            <span class="league-pill fiba">FIBA</span>
          </a>
          <a routerLink="/catalogo" [queryParams]="{ligaId: 3}" class="nav-item league-euro">
            <span class="league-pill euro">EuroLeague</span>
          </a>
        </div>

        <!-- Action Icons: User & Cart -->
        <div class="nav-actions">
          <!-- Auth User -->
          @if (authService.isAuthenticated()) {
            <div class="user-profile">
              <a routerLink="/mis-pedidos" class="user-greeting" title="Mis compras">
                <i class="ri-user-smile-line"></i> {{ authService.currentUser()?.nombre }}
              </a>
              <button class="btn-logout" (click)="authService.logout()" title="Cerrar sesión">
                <i class="ri-logout-box-r-line"></i>
              </button>
            </div>
          } @else {
            <a routerLink="/auth/login" class="btn-login">
              <i class="ri-user-line"></i> Iniciar Sesión
            </a>
          }

          <!-- Cart Drawer Toggle Button -->
          <button class="cart-btn" (click)="cartService.toggleDrawer()" aria-label="Abrir carrito">
            <i class="ri-shopping-bag-3-line"></i>
            @if (cartService.totalUnits() > 0) {
              <span class="cart-badge">{{ cartService.totalUnits() }}</span>
            }
          </button>
        </div>
      </nav>
    </header>
  `,
  styles: [`
    .navbar-wrapper {
      position: sticky;
      top: 0;
      z-index: 100;
      background: rgba(10, 15, 29, 0.92);
      backdrop-filter: blur(18px);
      -webkit-backdrop-filter: blur(18px);
      border-bottom: 1px solid var(--border-color);
    }

    .nba-top-bar {
      background: linear-gradient(90deg, #006BB6 0%, #004d80 50%, #C9082A 100%);
      color: #ffffff;
      font-size: 0.72rem;
      font-weight: 700;
      letter-spacing: 0.08em;
      text-align: center;
      padding: 0.35rem 1rem;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
    }

    .pulse-dot {
      width: 7px;
      height: 7px;
      background: #fff;
      border-radius: 50%;
      animation: pulse 1.8s infinite;
    }

    @keyframes pulse {
      0% { opacity: 1; transform: scale(1); }
      50% { opacity: 0.4; transform: scale(0.8); }
      100% { opacity: 1; transform: scale(1); }
    }

    .nav-content {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 72px;
    }

    .brand-logo {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      text-decoration: none;
    }

    .logo-icon {
      width: 44px;
      height: 44px;
      background: linear-gradient(135deg, var(--nba-blue) 0%, var(--nba-red) 100%);
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #fff;
      font-size: 1.6rem;
      box-shadow: 0 4px 16px rgba(0, 107, 182, 0.4);
    }

    .logo-text {
      display: flex;
      flex-direction: column;
    }

    .logo-title {
      font-family: var(--font-heading);
      font-weight: 900;
      font-size: 1.45rem;
      letter-spacing: -0.03em;
      color: #fff;
      line-height: 1.1;

      .red-text {
        color: var(--nba-red);
      }
    }

    .logo-subtitle {
      font-size: 0.62rem;
      font-weight: 700;
      letter-spacing: 0.12em;
      color: var(--text-muted);
    }

    .nav-links {
      display: flex;
      align-items: center;
      gap: 1.5rem;

      @media (max-width: 768px) {
        display: none;
      }
    }

    .nav-item {
      color: var(--text-secondary);
      font-weight: 600;
      font-size: 0.92rem;
      display: flex;
      align-items: center;
      gap: 0.4rem;
      transition: color var(--transition-fast);

      &:hover, &.active {
        color: #fff;
      }
    }

    .league-pill {
      padding: 0.2rem 0.6rem;
      border-radius: 6px;
      font-size: 0.75rem;
      font-weight: 800;

      &.nba {
        background: rgba(0, 107, 182, 0.2);
        color: #38bdf8;
        border: 1px solid rgba(0, 107, 182, 0.4);
      }
      &.fiba {
        background: rgba(201, 8, 42, 0.2);
        color: #f87171;
        border: 1px solid rgba(201, 8, 42, 0.4);
      }
      &.euro {
        background: rgba(217, 130, 43, 0.2);
        color: #fbbf24;
        border: 1px solid rgba(217, 130, 43, 0.4);
      }
    }

    .nav-actions {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .btn-login {
      background: rgba(255, 255, 255, 0.08);
      color: #fff;
      padding: 0.5rem 1rem;
      border-radius: 8px;
      font-size: 0.88rem;
      font-weight: 600;
      display: flex;
      align-items: center;
      gap: 0.4rem;
      border: 1px solid var(--border-color);

      &:hover {
        background: rgba(255, 255, 255, 0.15);
      }
    }

    .user-profile {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      background: rgba(0, 107, 182, 0.15);
      padding: 0.4rem 0.8rem;
      border-radius: 8px;
      border: 1px solid rgba(0, 107, 182, 0.3);
    }

    .user-greeting {
      font-size: 0.85rem;
      font-weight: 600;
      color: #93c5fd;
      display: flex;
      align-items: center;
      gap: 0.35rem;
    }

    .btn-logout {
      background: transparent;
      color: var(--text-muted);
      font-size: 1.1rem;
      display: flex;
      align-items: center;

      &:hover {
        color: var(--nba-red);
      }
    }

    .cart-btn {
      position: relative;
      background: rgba(255, 255, 255, 0.08);
      color: #fff;
      width: 44px;
      height: 44px;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.3rem;
      border: 1px solid var(--border-color);

      &:hover {
        background: var(--nba-red);
        border-color: var(--nba-red);
        transform: scale(1.05);
      }
    }

    .cart-badge {
      position: absolute;
      top: -5px;
      right: -5px;
      background: var(--nba-red);
      color: #fff;
      font-size: 0.72rem;
      font-weight: 800;
      min-width: 20px;
      height: 20px;
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 2px solid var(--bg-primary);
      box-shadow: 0 2px 8px rgba(201, 8, 42, 0.6);
      animation: popIn 0.3s ease;
    }

    @keyframes popIn {
      0% { transform: scale(0); }
      80% { transform: scale(1.2); }
      100% { transform: scale(1); }
    }
  `]
})
export class NavbarComponent {
  authService = inject(AuthService);
  cartService = inject(CartService);
}
