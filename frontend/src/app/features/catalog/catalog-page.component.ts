import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BalonService } from '../../core/services/balon.service';
import { CartService } from '../../core/services/cart.service';
import { Balon, BalonFilters } from '../../core/models/balon.model';
import { Liga } from '../../core/models/liga.model';
import { Equipo } from '../../core/models/equipo.model';
import { ProductModalComponent } from './product-modal.component';

@Component({
  selector: 'app-catalog-page',
  standalone: true,
  imports: [CommonModule, FormsModule, ProductModalComponent],
  template: `
    <!-- Hero Banner (NBA Inspired) -->
    <section class="hero-section">
      <div class="container hero-container">
        <div class="hero-content">
          <div class="hero-badge">
            <span class="nba-flag"></span> TEMPORADA OFICIAL 2024-2025
          </div>
          <h1 class="hero-title">
            EL TOQUE DE LOS <span class="gradient-text">CAMPEONES</span>
          </h1>
          <p class="hero-subtitle">
            Balones de cuero genuino Horween y microfibra composite aprobados por la NBA, FIBA y EuroLeague. Diseñados para el tiro perfecto.
          </p>
          <div class="hero-actions">
            <button class="btn-primary" (click)="filterByLeague(1)">
              <i class="ri-fire-line"></i> Colección NBA Wilson
            </button>
            <button class="btn-outline" (click)="resetFilters()">
              <i class="ri-refresh-line"></i> Ver Todos los Balones
            </button>
          </div>
        </div>

        <div class="hero-visual">
          <div class="glow-sphere"></div>
          <img
            src="https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=800&q=80"
            alt="Wilson NBA Official Game Ball"
            class="hero-ball-img"
          />
          <div class="hero-floating-card">
            <span class="floating-label">BALÓN OFICIAL</span>
            <strong>Wilson NBA Horween</strong>
            <span class="floating-price">\$199.99 USD</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Catalog Content -->
    <main class="container catalog-layout">
      <!-- Top Filters & Search -->
      <section class="filter-header-bar">
        <!-- Search bar -->
        <div class="search-box">
          <i class="ri-search-line"></i>
          <input
            type="text"
            placeholder="Buscar por balón, equipo, franquicia..."
            [(ngModel)]="searchTerm"
            (input)="applyFilters()"
          />
          @if (searchTerm) {
            <button class="clear-search" (click)="searchTerm = ''; applyFilters()">
              <i class="ri-close-circle-fill"></i>
            </button>
          }
        </div>

        <!-- Sorting -->
        <div class="sort-box">
          <span class="sort-label"><i class="ri-sort-desc"></i> Ordenar:</span>
          <select [(ngModel)]="sortBy" (change)="applyFilters()">
            <option value="featured">Destacados</option>
            <option value="price-asc">Precio: Menor a Mayor</option>
            <option value="price-desc">Precio: Mayor a Menor</option>
            <option value="year-desc">Edición más reciente</option>
          </select>
        </div>
      </section>

      <!-- League Pills Filter Bar -->
      <section class="leagues-filter-row">
        <button
          class="league-chip"
          [class.active]="selectedLigaId === null"
          (click)="filterByLeague(null)"
        >
          Todos ({{ balones().length }})
        </button>
        @for (liga of ligas(); track liga.id) {
          <button
            class="league-chip"
            [class.active]="selectedLigaId === liga.id"
            (click)="filterByLeague(liga.id)"
          >
            <span class="chip-dot" [ngClass]="'dot-' + liga.nombre.toLowerCase()"></span>
            {{ liga.nombre }}
          </button>
        }
      </section>

      <!-- Main Catalog Grid Area -->
      <div class="catalog-grid-wrapper">
        <!-- Filter Sidebar -->
        <aside class="filter-sidebar glass-panel">
          <div class="sidebar-header">
            <h3><i class="ri-filter-3-line"></i> Filtros</h3>
            @if (hasActiveFilters()) {
              <button class="reset-link" (click)="resetFilters()">Limpiar</button>
            }
          </div>

          <!-- Team Filter -->
          <div class="filter-group">
            <label class="group-title">Equipo / Franquicia</label>
            <select [(ngModel)]="selectedEquipoId" (change)="applyFilters()" class="filter-select">
              <option [ngValue]="null">Todos los equipos</option>
              @for (equipo of equipos(); track equipo.id) {
                <option [ngValue]="equipo.id">{{ equipo.nombre }}</option>
              }
            </select>
          </div>

          <!-- Year / Edition Filter -->
          <div class="filter-group">
            <label class="group-title">Año / Edición</label>
            <div class="radio-options">
              <label class="radio-item">
                <input type="radio" name="anio" [value]="null" [(ngModel)]="selectedAnio" (change)="applyFilters()" />
                <span>Cualquier Edición</span>
              </label>
              <label class="radio-item">
                <input type="radio" name="anio" [value]="2024" [(ngModel)]="selectedAnio" (change)="applyFilters()" />
                <span>Edición 2024</span>
              </label>
              <label class="radio-item">
                <input type="radio" name="anio" [value]="2023" [(ngModel)]="selectedAnio" (change)="applyFilters()" />
                <span>Edición 2023</span>
              </label>
            </div>
          </div>

          <!-- Brand Filter -->
          <div class="filter-group">
            <label class="group-title">Marca Fabricante</label>
            <div class="brand-pills">
              <button
                class="brand-pill"
                [class.active]="selectedMarca === 'Wilson'"
                (click)="toggleBrand('Wilson')"
              >Wilson</button>
              <button
                class="brand-pill"
                [class.active]="selectedMarca === 'Molten'"
                (click)="toggleBrand('Molten')"
              >Molten</button>
              <button
                class="brand-pill"
                [class.active]="selectedMarca === 'Spalding'"
                (click)="toggleBrand('Spalding')"
              >Spalding</button>
            </div>
          </div>
        </aside>

        <!-- Product Cards Grid -->
        <section class="products-area">
          @if (filteredBalones().length === 0) {
            <div class="no-products glass-panel">
              <i class="ri-basketball-line no-icon"></i>
              <h3>No se encontraron balones</h3>
              <p>Intenta ajustar o reiniciar los filtros de búsqueda.</p>
              <button class="btn-primary" (click)="resetFilters()">Restablecer Filtros</button>
            </div>
          } @else {
            <div class="product-cards-grid">
              @for (balon of filteredBalones(); track balon.id) {
                <div class="product-card glass-panel">
                  <!-- Media Box -->
                  <div class="card-media">
                    <span class="badge" [ngClass]="{
                      'badge-nba': balon.ligaNombre === 'NBA',
                      'badge-fiba': balon.ligaNombre === 'FIBA',
                      'badge-euroleague': balon.ligaNombre === 'EuroLeague'
                    }">{{ balon.ligaNombre || 'OFICIAL' }}</span>

                    @if (balon.equipoNombre) {
                      <span class="card-team-tag">{{ balon.equipoNombre }}</span>
                    }

                    <img [src]="balon.imagenUrl" [alt]="balon.nombre" loading="lazy" />
                    
                    <button class="quick-view-btn" (click)="openQuickView(balon)">
                      <i class="ri-eye-line"></i> Vista Rápida
                    </button>
                  </div>

                  <!-- Details Box -->
                  <div class="card-body">
                    <div class="meta-row">
                      <span class="brand-tag">{{ balon.marca }}</span>
                      <span class="year-tag">{{ balon.anioEdicion }}</span>
                    </div>

                    <h3 class="product-name" (click)="openQuickView(balon)">{{ balon.nombre }}</h3>

                    <div class="material-info">
                      <i class="ri-medal-line"></i>
                      <span>{{ balon.material }}</span>
                    </div>

                    <div class="card-footer-row">
                      <div class="price-container">
                        <span class="currency-symbol">\$</span>
                        <span class="price-number">{{ balon.precio.toFixed(2) }}</span>
                      </div>

                      <button class="btn-cart-add" (click)="cartService.addToCart(balon)" title="Añadir al carrito">
                        <i class="ri-shopping-cart-2-line"></i>
                        <span>Añadir</span>
                      </button>
                    </div>
                  </div>
                </div>
              }
            </div>
          }
        </section>
      </div>
    </main>

    <!-- Quick View Modal -->
    <app-product-modal [balon]="modalBalon" (close)="modalBalon = null"></app-product-modal>
  `,
  styles: [`
    /* Hero Styles */
    .hero-section {
      background: radial-gradient(circle at 60% 40%, rgba(0, 107, 182, 0.25) 0%, transparent 60%);
      padding: 4.5rem 0 3.5rem;
      border-bottom: 1px solid var(--border-color);
      position: relative;
      overflow: hidden;
    }

    .hero-container {
      display: grid;
      grid-template-columns: 1.2fr 1fr;
      align-items: center;
      gap: 3rem;

      @media (max-width: 992px) {
        grid-template-columns: 1fr;
        text-align: center;
      }
    }

    .hero-content {
      display: flex;
      flex-direction: column;
      gap: 1.25rem;

      @media (max-width: 992px) {
        align-items: center;
      }
    }

    .hero-badge {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      background: rgba(255, 255, 255, 0.06);
      border: 1px solid var(--border-color);
      padding: 0.35rem 0.85rem;
      border-radius: 9999px;
      font-size: 0.78rem;
      font-weight: 700;
      color: #94a3b8;
      letter-spacing: 0.08em;
    }

    .nba-flag {
      width: 12px;
      height: 12px;
      border-radius: 2px;
      background: linear-gradient(90deg, var(--nba-blue) 50%, var(--nba-red) 50%);
    }

    .hero-title {
      font-size: 3.2rem;
      line-height: 1.08;
      font-weight: 900;
      letter-spacing: -0.03em;
      color: #fff;

      @media (max-width: 576px) {
        font-size: 2.4rem;
      }

      .gradient-text {
        background: linear-gradient(135deg, #60a5fa 0%, #ffffff 50%, #f87171 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
    }

    .hero-subtitle {
      font-size: 1.08rem;
      color: var(--text-secondary);
      line-height: 1.6;
      max-width: 520px;
    }

    .hero-actions {
      display: flex;
      gap: 1rem;
      flex-wrap: wrap;

      @media (max-width: 992px) {
        justify-content: center;
      }
    }

    .hero-visual {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;

      .glow-sphere {
        position: absolute;
        width: 320px;
        height: 320px;
        background: radial-gradient(circle, var(--nba-blue-glow) 0%, transparent 70%);
        filter: blur(40px);
        z-index: 1;
      }

      .hero-ball-img {
        position: relative;
        z-index: 2;
        width: 380px;
        height: 380px;
        object-fit: cover;
        border-radius: 50%;
        box-shadow: 0 20px 50px rgba(0, 0, 0, 0.7);
        border: 4px solid rgba(255, 255, 255, 0.1);
        animation: floatBall 4s ease-in-out infinite;

        @media (max-width: 576px) {
          width: 260px;
          height: 260px;
        }
      }

      @keyframes floatBall {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-12px); }
      }

      .hero-floating-card {
        position: absolute;
        bottom: 15px;
        right: 20px;
        z-index: 3;
        background: rgba(18, 26, 45, 0.9);
        backdrop-filter: blur(12px);
        border: 1px solid var(--border-color);
        padding: 0.85rem 1.25rem;
        border-radius: 12px;
        display: flex;
        flex-direction: column;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);

        .floating-label {
          font-size: 0.65rem;
          font-weight: 800;
          color: var(--nba-red);
          letter-spacing: 0.1em;
        }

        strong {
          font-size: 0.95rem;
          color: #fff;
        }

        .floating-price {
          font-weight: 800;
          color: #38bdf8;
          font-size: 0.9rem;
        }
      }
    }

    /* Catalog Area */
    .catalog-layout {
      padding-top: 3rem;
    }

    .filter-header-bar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 1.5rem;
      margin-bottom: 1.5rem;
      flex-wrap: wrap;
    }

    .search-box {
      flex: 1;
      min-width: 280px;
      display: flex;
      align-items: center;
      background: var(--bg-card);
      border: 1px solid var(--border-color);
      border-radius: 12px;
      padding: 0.65rem 1rem;
      gap: 0.6rem;

      i {
        font-size: 1.1rem;
        color: var(--text-muted);
      }

      input {
        background: transparent;
        border: none;
        outline: none;
        color: #fff;
        font-size: 0.95rem;
        width: 100%;
        font-family: var(--font-body);

        &::placeholder {
          color: var(--text-muted);
        }
      }

      .clear-search {
        background: transparent;
        color: var(--text-muted);
        font-size: 1.1rem;

        &:hover {
          color: #fff;
        }
      }
    }

    .sort-box {
      display: flex;
      align-items: center;
      gap: 0.6rem;

      .sort-label {
        font-size: 0.88rem;
        color: var(--text-secondary);
        font-weight: 600;
      }

      select {
        background: var(--bg-card);
        border: 1px solid var(--border-color);
        color: #fff;
        padding: 0.65rem 1rem;
        border-radius: 10px;
        outline: none;
        font-family: var(--font-heading);
        font-weight: 600;
        font-size: 0.9rem;
        cursor: pointer;
      }
    }

    .leagues-filter-row {
      display: flex;
      gap: 0.75rem;
      margin-bottom: 2rem;
      overflow-x: auto;
      padding-bottom: 0.5rem;

      .league-chip {
        background: rgba(255, 255, 255, 0.04);
        border: 1px solid var(--border-color);
        color: var(--text-secondary);
        padding: 0.55rem 1.25rem;
        border-radius: 9999px;
        font-size: 0.88rem;
        font-weight: 700;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        white-space: nowrap;

        &:hover {
          border-color: rgba(255, 255, 255, 0.25);
          color: #fff;
        }

        &.active {
          background: linear-gradient(135deg, var(--nba-blue) 0%, #004d80 100%);
          color: #fff;
          border-color: transparent;
          box-shadow: 0 4px 14px rgba(0, 107, 182, 0.4);
        }

        .chip-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;

          &.dot-nba { background: #38bdf8; }
          &.dot-fiba { background: #f87171; }
          &.dot-euroleague { background: #fbbf24; }
          &.dot-wnba { background: #fb923c; }
        }
      }
    }

    /* Main Grid Structure */
    .catalog-grid-wrapper {
      display: grid;
      grid-template-columns: 280px 1fr;
      gap: 2rem;
      align-items: start;

      @media (max-width: 900px) {
        grid-template-columns: 1fr;
      }
    }

    /* Sidebar */
    .filter-sidebar {
      padding: 1.5rem;

      .sidebar-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1.5rem;
        padding-bottom: 0.75rem;
        border-bottom: 1px solid var(--border-color);

        h3 {
          font-size: 1.05rem;
          color: #fff;
          display: flex;
          align-items: center;
          gap: 0.4rem;
        }

        .reset-link {
          background: transparent;
          color: var(--nba-red);
          font-size: 0.8rem;
          font-weight: 700;
          text-decoration: underline;
        }
      }

      .filter-group {
        margin-bottom: 1.75rem;

        .group-title {
          display: block;
          font-size: 0.82rem;
          font-weight: 700;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 0.75rem;
        }

        .filter-select {
          width: 100%;
          background: rgba(0, 0, 0, 0.3);
          border: 1px solid var(--border-color);
          color: #fff;
          padding: 0.65rem 0.85rem;
          border-radius: 8px;
          outline: none;
          font-family: var(--font-body);
        }

        .radio-options {
          display: flex;
          flex-direction: column;
          gap: 0.6rem;

          .radio-item {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            font-size: 0.88rem;
            color: var(--text-secondary);
            cursor: pointer;

            &:hover {
              color: #fff;
            }

            input {
              accent-color: var(--nba-blue);
            }
          }
        }

        .brand-pills {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;

          .brand-pill {
            background: rgba(255, 255, 255, 0.05);
            border: 1px solid var(--border-color);
            color: var(--text-secondary);
            padding: 0.35rem 0.75rem;
            border-radius: 6px;
            font-size: 0.82rem;
            font-weight: 600;

            &.active {
              background: var(--nba-red);
              color: #fff;
              border-color: var(--nba-red);
            }
          }
        }
      }
    }

    /* Cards Grid */
    .product-cards-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 1.5rem;
    }

    .product-card {
      overflow: hidden;
      display: flex;
      flex-direction: column;
      transition: all var(--transition-normal);

      &:hover {
        transform: translateY(-6px);
        box-shadow: 0 16px 36px rgba(0, 107, 182, 0.25);
        border-color: var(--border-hover);

        .card-media img {
          transform: scale(1.06);
        }

        .quick-view-btn {
          opacity: 1;
          transform: translateY(0);
        }
      }
    }

    .card-media {
      position: relative;
      height: 240px;
      overflow: hidden;
      background: #060a14;
      display: flex;
      align-items: center;
      justify-content: center;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
      }

      .badge {
        position: absolute;
        top: 12px;
        left: 12px;
        z-index: 2;
      }

      .card-team-tag {
        position: absolute;
        top: 12px;
        right: 12px;
        z-index: 2;
        background: rgba(0, 0, 0, 0.6);
        backdrop-filter: blur(6px);
        border: 1px solid rgba(255, 255, 255, 0.2);
        color: #fff;
        font-size: 0.72rem;
        font-weight: 700;
        padding: 0.2rem 0.55rem;
        border-radius: 6px;
      }

      .quick-view-btn {
        position: absolute;
        bottom: 12px;
        left: 50%;
        transform: translateX(-50%) translateY(10px);
        opacity: 0;
        background: rgba(10, 15, 29, 0.85);
        backdrop-filter: blur(8px);
        border: 1px solid rgba(255, 255, 255, 0.2);
        color: #fff;
        padding: 0.45rem 0.9rem;
        border-radius: 8px;
        font-size: 0.8rem;
        font-weight: 600;
        display: flex;
        align-items: center;
        gap: 0.35rem;
        transition: all var(--transition-fast);
        z-index: 3;

        &:hover {
          background: var(--nba-blue);
        }
      }
    }

    .card-body {
      padding: 1.25rem;
      display: flex;
      flex-direction: column;
      flex: 1;

      .meta-row {
        display: flex;
        justify-content: space-between;
        margin-bottom: 0.4rem;

        .brand-tag {
          font-size: 0.75rem;
          font-weight: 800;
          color: var(--nba-blue);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .year-tag {
          font-size: 0.75rem;
          color: var(--text-muted);
          font-weight: 600;
        }
      }

      .product-name {
        font-size: 1.05rem;
        color: #fff;
        font-weight: 700;
        line-height: 1.35;
        margin-bottom: 0.5rem;
        cursor: pointer;

        &:hover {
          color: #60a5fa;
        }
      }

      .material-info {
        display: flex;
        align-items: center;
        gap: 0.35rem;
        font-size: 0.78rem;
        color: var(--text-secondary);
        margin-bottom: 1.25rem;

        i {
          color: var(--court-wood);
        }
      }

      .card-footer-row {
        margin-top: auto;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .price-container {
          display: flex;
          align-items: baseline;

          .currency-symbol {
            font-size: 0.88rem;
            font-weight: 700;
            color: #fff;
          }

          .price-number {
            font-family: var(--font-heading);
            font-size: 1.35rem;
            font-weight: 900;
            color: #fff;
          }
        }

        .btn-cart-add {
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid var(--border-color);
          color: #fff;
          padding: 0.55rem 0.95rem;
          border-radius: 8px;
          font-size: 0.85rem;
          font-weight: 700;
          display: flex;
          align-items: center;
          gap: 0.4rem;

          &:hover {
            background: var(--nba-red);
            border-color: var(--nba-red);
            transform: scale(1.04);
            box-shadow: 0 4px 14px rgba(201, 8, 42, 0.5);
          }
        }
      }
    }

    .no-products {
      padding: 4rem 2rem;
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1rem;

      .no-icon {
        font-size: 4rem;
        color: var(--text-muted);
      }

      h3 {
        font-size: 1.4rem;
        color: #fff;
      }

      p {
        color: var(--text-secondary);
        max-width: 320px;
      }
    }
  `]
})
export class CatalogPageComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private balonService = inject(BalonService);
  cartService = inject(CartService);

  balones = signal<Balon[]>([]);
  filteredBalones = signal<Balon[]>([]);
  ligas = signal<Liga[]>([]);
  equipos = signal<Equipo[]>([]);

  selectedLigaId: number | null = null;
  selectedEquipoId: number | null = null;
  selectedAnio: number | null = null;
  selectedMarca: string | null = null;
  searchTerm = '';
  sortBy: 'featured' | 'price-asc' | 'price-desc' | 'year-desc' = 'featured';

  modalBalon: Balon | null = null;

  ngOnInit(): void {
    this.loadCatalog();
    this.loadMetadata();

    this.route.queryParams.subscribe(params => {
      if (params['ligaId']) {
        this.selectedLigaId = Number(params['ligaId']);
        this.applyFilters();
      }
    });
  }

  loadCatalog(): void {
    this.balonService.getBalones().subscribe(data => {
      this.balones.set(data);
      this.applyFilters();
    });
  }

  loadMetadata(): void {
    this.balonService.getLigas().subscribe(ligas => this.ligas.set(ligas));
    this.balonService.getEquipos().subscribe(equipos => this.equipos.set(equipos));
  }

  filterByLeague(ligaId: number | null): void {
    this.selectedLigaId = ligaId;
    this.applyFilters();
  }

  toggleBrand(marca: string): void {
    this.selectedMarca = this.selectedMarca === marca ? null : marca;
    this.applyFilters();
  }

  applyFilters(): void {
    const filters: BalonFilters = {
      ligaId: this.selectedLigaId,
      equipoId: this.selectedEquipoId,
      anioEdicion: this.selectedAnio,
      marca: this.selectedMarca,
      searchTerm: this.searchTerm,
      sortBy: this.sortBy
    };

    this.balonService.getBalones(filters).subscribe(res => {
      this.filteredBalones.set(res);
    });
  }

  resetFilters(): void {
    this.selectedLigaId = null;
    this.selectedEquipoId = null;
    this.selectedAnio = null;
    this.selectedMarca = null;
    this.searchTerm = '';
    this.sortBy = 'featured';
    this.applyFilters();
  }

  hasActiveFilters(): boolean {
    return !!(this.selectedLigaId || this.selectedEquipoId || this.selectedAnio || this.selectedMarca || this.searchTerm);
  }

  openQuickView(balon: Balon): void {
    this.modalBalon = balon;
  }
}
