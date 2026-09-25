import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <div class="auth-page">
      <div class="auth-card glass-panel">
        <div class="auth-header">
          <div class="auth-logo">
            <i class="ri-basketball-fill"></i>
          </div>
          <h2>Iniciar Sesión</h2>
          <p>Accede para gestionar tus compras de balones oficiales</p>
        </div>

        @if (errorMessage) {
          <div class="alert-error">
            <i class="ri-error-warning-line"></i>
            <span>{{ errorMessage }}</span>
          </div>
        }

        <form (ngSubmit)="onSubmit()" class="auth-form">
          <div class="form-group">
            <label>Correo Electrónico</label>
            <div class="input-wrap">
              <i class="ri-mail-line"></i>
              <input
                type="email"
                [(ngModel)]="email"
                name="email"
                placeholder="ejemplo@nba.com"
                required
              />
            </div>
          </div>

          <div class="form-group">
            <label>Contraseña</label>
            <div class="input-wrap">
              <i class="ri-lock-password-line"></i>
              <input
                type="password"
                [(ngModel)]="password"
                name="password"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          <button type="submit" class="btn-danger w-100 submit-btn" [disabled]="loading">
            @if (loading) {
              <i class="ri-loader-4-line spin"></i>
              <span>Autenticando...</span>
            } @else {
              <i class="ri-login-box-line"></i>
              <span>Entrar a HoopStore</span>
            }
          </button>
        </form>

        <!-- Quick Demo Credentials Shortcut -->
        <div class="demo-box">
          <span class="demo-title">Cuentas Demo para Prueba Rápida:</span>
          <div class="demo-buttons">
            <button type="button" class="btn-demo" (click)="setDemo('fan@nba.com', 'Hoops2024!')">
              <i class="ri-user-star-line"></i> Fan LeBron
            </button>
            <button type="button" class="btn-demo" (click)="setDemo('admin@hoopstore.com', 'Admin1234!')">
              <i class="ri-shield-user-line"></i> Administrador
            </button>
          </div>
        </div>

        <div class="auth-footer">
          <span>¿No tienes cuenta?</span>
          <a routerLink="/auth/register">Regístrate gratis</a>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .auth-page {
      min-height: calc(100vh - 200px);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 3rem 1.5rem;
    }

    .auth-card {
      width: 100%;
      max-width: 440px;
      padding: 2.5rem;
      border-radius: 20px;
    }

    .auth-header {
      text-align: center;
      margin-bottom: 2rem;

      .auth-logo {
        width: 54px;
        height: 54px;
        border-radius: 16px;
        background: linear-gradient(135deg, var(--nba-blue) 0%, var(--nba-red) 100%);
        color: #fff;
        font-size: 1.8rem;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 1rem;
        box-shadow: 0 8px 24px rgba(0, 107, 182, 0.4);
      }

      h2 {
        font-size: 1.6rem;
        color: #fff;
        margin-bottom: 0.4rem;
      }

      p {
        color: var(--text-secondary);
        font-size: 0.88rem;
      }
    }

    .alert-error {
      background: rgba(201, 8, 42, 0.2);
      border: 1px solid rgba(201, 8, 42, 0.4);
      color: #fca5a5;
      padding: 0.75rem 1rem;
      border-radius: 10px;
      margin-bottom: 1.5rem;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 0.88rem;
    }

    .auth-form {
      display: flex;
      flex-direction: column;
      gap: 1.25rem;
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

      .input-wrap {
        display: flex;
        align-items: center;
        background: rgba(0, 0, 0, 0.4);
        border: 1px solid var(--border-color);
        border-radius: 10px;
        padding: 0.75rem 1rem;
        gap: 0.6rem;

        i {
          color: var(--text-muted);
          font-size: 1.1rem;
        }

        input {
          background: transparent;
          border: none;
          outline: none;
          color: #fff;
          width: 100%;
          font-family: var(--font-body);
          font-size: 0.95rem;

          &::placeholder {
            color: var(--text-muted);
          }
        }
      }
    }

    .submit-btn {
      width: 100%;
      justify-content: center;
      padding: 0.85rem;
      font-size: 1rem;
      margin-top: 0.5rem;
    }

    .demo-box {
      margin-top: 1.5rem;
      padding-top: 1.25rem;
      border-top: 1px dashed var(--border-color);
      text-align: center;

      .demo-title {
        display: block;
        font-size: 0.75rem;
        color: var(--text-muted);
        margin-bottom: 0.75rem;
        font-weight: 600;
      }

      .demo-buttons {
        display: flex;
        gap: 0.6rem;

        .btn-demo {
          flex: 1;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid var(--border-color);
          color: #fff;
          padding: 0.5rem 0.75rem;
          border-radius: 8px;
          font-size: 0.78rem;
          font-weight: 600;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.35rem;

          &:hover {
            background: rgba(0, 107, 182, 0.3);
            border-color: var(--nba-blue);
          }
        }
      }
    }

    .auth-footer {
      text-align: center;
      margin-top: 1.75rem;
      font-size: 0.88rem;
      color: var(--text-secondary);

      a {
        color: var(--nba-blue);
        font-weight: 700;
        margin-left: 0.35rem;

        &:hover {
          text-decoration: underline;
        }
      }
    }

    .spin {
      animation: spin 1s linear infinite;
    }
    @keyframes spin {
      100% { transform: rotate(360deg); }
    }
  `]
})
export class LoginComponent {
  private authService = inject(AuthService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  email = '';
  password = '';
  loading = false;
  errorMessage = '';

  setDemo(email: string, pass: string): void {
    this.email = email;
    this.password = pass;
    this.errorMessage = '';
  }

  onSubmit(): void {
    if (!this.email || !this.password) {
      this.errorMessage = 'Por favor completa todos los campos';
      return;
    }

    this.loading = true;
    this.errorMessage = '';

    this.authService.login({ email: this.email, password: this.password }).subscribe({
      next: () => {
        this.loading = false;
        const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/catalogo';
        this.router.navigateByUrl(returnUrl);
      },
      error: (err) => {
        this.loading = false;
        this.errorMessage = err.error?.message || 'Error al autenticar. Verifica tus credenciales.';
      }
    });
  }
}
