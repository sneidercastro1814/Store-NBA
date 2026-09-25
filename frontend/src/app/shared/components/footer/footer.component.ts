import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <footer class="footer-wrapper">
      <div class="container footer-grid">
        <div class="footer-brand">
          <div class="footer-logo">
            <i class="ri-basketball-line"></i>
            <span>HOOP<span class="red-text">STORE</span></span>
          </div>
          <p class="brand-desc">
            Distribuidor autorizado de balones oficiales Wilson NBA, Molten FIBA World Cup y Spalding EuroLeague. La mayor selección de piezas de colección y juego profesional.
          </p>
          <div class="social-links">
            <a href="#" aria-label="Instagram"><i class="ri-instagram-line"></i></a>
            <a href="#" aria-label="Twitter"><i class="ri-twitter-x-line"></i></a>
            <a href="#" aria-label="YouTube"><i class="ri-youtube-line"></i></a>
            <a href="#" aria-label="TikTok"><i class="ri-tiktok-line"></i></a>
          </div>
        </div>

        <div class="footer-col">
          <h4>Ligas Oficiales</h4>
          <ul>
            <li><a href="#">NBA (National Basketball Association)</a></li>
            <li><a href="#">FIBA World Cup & Basketball Champions</a></li>
            <li><a href="#">EuroLeague Basketball</a></li>
            <li><a href="#">WNBA Official Collection</a></li>
          </ul>
        </div>

        <div class="footer-col">
          <h4>Marcas y Materiales</h4>
          <ul>
            <li><a href="#">Wilson Sporting Goods</a></li>
            <li><a href="#">Molten Official Game Balls</a></li>
            <li><a href="#">Spalding TF Heritage</a></li>
            <li><a href="#">Guía de tallas y materiales (Cuero vs Composite)</a></li>
          </ul>
        </div>

        <div class="footer-col">
          <h4>Garantía y Seguridad</h4>
          <div class="trust-badge">
            <i class="ri-shield-check-line"></i>
            <div>
              <strong>100% Auténticos</strong>
              <p>Sellos y números de serie oficiales</p>
            </div>
          </div>
          <div class="trust-badge">
            <i class="ri-truck-line"></i>
            <div>
              <strong>Envío Asegurado</strong>
              <p>Embalaje protector para balones de juego</p>
            </div>
          </div>
        </div>
      </div>

      <div class="footer-bottom">
        <div class="container bottom-content">
          <p>© 2026 HoopStore Inc. Todos los derechos reservados. Inspirado en la NBA.</p>
          <div class="bottom-links">
            <a href="#">Términos</a>
            <a href="#">Privacidad</a>
            <a href="#">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  `,
  styles: [`
    .footer-wrapper {
      background: #060911;
      border-top: 1px solid var(--border-color);
      margin-top: 5rem;
      padding-top: 4rem;
    }

    .footer-grid {
      display: grid;
      grid-template-columns: 2fr 1fr 1fr 1.5fr;
      gap: 3rem;
      padding-bottom: 3.5rem;

      @media (max-width: 992px) {
        grid-template-columns: 1fr 1fr;
      }

      @media (max-width: 576px) {
        grid-template-columns: 1fr;
      }
    }

    .footer-logo {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-family: var(--font-heading);
      font-size: 1.5rem;
      font-weight: 900;
      color: #fff;
      margin-bottom: 1rem;

      i {
        color: var(--nba-blue);
      }
      .red-text {
        color: var(--nba-red);
      }
    }

    .brand-desc {
      color: var(--text-secondary);
      font-size: 0.9rem;
      line-height: 1.6;
      margin-bottom: 1.5rem;
    }

    .social-links {
      display: flex;
      gap: 0.75rem;

      a {
        width: 36px;
        height: 36px;
        border-radius: 8px;
        background: rgba(255, 255, 255, 0.05);
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--text-secondary);
        font-size: 1.1rem;
        transition: all var(--transition-fast);

        &:hover {
          background: var(--nba-blue);
          color: #fff;
          transform: translateY(-2px);
        }
      }
    }

    .footer-col {
      h4 {
        color: #fff;
        font-size: 1rem;
        margin-bottom: 1.25rem;
        position: relative;
        padding-bottom: 0.5rem;

        &::after {
          content: '';
          position: absolute;
          left: 0;
          bottom: 0;
          width: 30px;
          height: 2px;
          background: var(--nba-blue);
        }
      }

      ul {
        list-style: none;

        li {
          margin-bottom: 0.75rem;

          a {
            color: var(--text-secondary);
            font-size: 0.88rem;
            transition: color var(--transition-fast);

            &:hover {
              color: #fff;
              padding-left: 4px;
            }
          }
        }
      }
    }

    .trust-badge {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      margin-bottom: 1rem;
      background: rgba(255, 255, 255, 0.03);
      padding: 0.75rem;
      border-radius: 8px;
      border: 1px solid rgba(255, 255, 255, 0.05);

      i {
        font-size: 1.5rem;
        color: var(--nba-blue);
      }

      strong {
        font-size: 0.88rem;
        color: #fff;
        display: block;
      }

      p {
        font-size: 0.75rem;
        color: var(--text-muted);
      }
    }

    .footer-bottom {
      border-top: 1px solid rgba(255, 255, 255, 0.05);
      padding: 1.5rem 0;
    }

    .bottom-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 0.82rem;
      color: var(--text-muted);

      @media (max-width: 576px) {
        flex-direction: column;
        gap: 0.75rem;
      }
    }

    .bottom-links {
      display: flex;
      gap: 1.5rem;

      a:hover {
        color: #fff;
      }
    }
  `]
})
export class FooterComponent {}
