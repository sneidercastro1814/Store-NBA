import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <div class="auth-page">
      <div class="auth-card glass-panel">
        <div class="auth-header">
          <div class="auth-logo">
            <i class="ri-user-add-line"></i>
          </div>
          <h2>Crear Cuenta</h2>
          <p>Únete a la comunidad de fanáticos y coleccionistas</p>
        </div>

        @if (errorMessage) {
          <div class="alert-error">
            <i class="ri-error-warning-line"></i>
            <span>{{ errorMessage }}</span>
          </div>
        }

        <form (ngSubmit)="onSubmit()" class="auth-form">
          <div class="form-group">
            <label>Nombre Completo</label>
            <div class="input-wrap">
              <i class="ri-user-line"></i>
              <input
                type="text"
                [(ngModel)]="nombre"
                name="nombre"
                placeholder="Ej. Michael Jordan"
                required
              />
            </div>
          </div>

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
                placeholder="Mínimo 6 caracteres"
                required
              />
            </div>
          </div>

          <button type="submit" class="btn-primary w-100 submit-btn" [disabled]="loading">
            @if (loading) {
              <i class="ri-loader-4-line spin"></i>
              <span>Creando cuenta...</span>
            } @else {
              <i class="ri-user-check-line"></i>
              <span>Registrarse</span>
            }
          </button>
        </form>

        <div class="auth-footer">
          <span>¿Ya tienes cuenta?</span>
          <a routerLink="/auth/login">Inicia sesión</a>
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
export class RegisterComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  nombre = '';
  email = '';
  password = '';
  loading = false;
  errorMessage = '';

  onSubmit(): void {
    if (!this.nombre || !this.email || !this.password) {
      this.errorMessage = 'Todos los campos son obligatorios';
      return;
    }

    this.loading = true;
    this.errorMessage = '';

    this.authService.register({
      nombre: this.nombre,
      email: this.email,
      password: this.password
    }).subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['/catalogo']);
      },
      error: (err) => {
        this.loading = false;
        this.errorMessage = err.error?.message || 'Error al registrar la cuenta.';
      }
    });
  }
}
