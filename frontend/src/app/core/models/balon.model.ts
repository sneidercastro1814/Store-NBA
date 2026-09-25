import { Liga } from './liga.model';
import { Equipo } from './equipo.model';

export interface Balon {
  id: number;
  nombre: string;
  marca: 'Wilson' | 'Spalding' | 'Molten' | string;
  descripcion: string;
  precio: number;
  stock: number;
  talla: string;
  material: string;
  anioEdicion: number;
  imagenUrl: string;
  ligaId?: number;
  ligaNombre?: string;
  ligaLogo?: string;
  equipoId?: number;
  equipoNombre?: string;
  equipoCiudad?: string;
  equipoLogo?: string;
  liga?: Liga;
  equipo?: Equipo;
}

export interface BalonFilters {
  ligaId?: number | null;
  equipoId?: number | null;
  anioEdicion?: number | null;
  marca?: string | null;
  searchTerm?: string;
  sortBy?: 'featured' | 'price-asc' | 'price-desc' | 'year-desc';
}
