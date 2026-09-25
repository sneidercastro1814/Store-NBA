import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';
import { Balon, BalonFilters } from '../models/balon.model';
import { Liga } from '../models/liga.model';
import { Equipo } from '../models/equipo.model';

@Injectable({
  providedIn: 'root'
})
export class BalonService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/api';

  private mockBalones: Balon[] = [
    {
      id: 1,
      nombre: 'Wilson Official NBA Game Ball',
      marca: 'Wilson',
      descripcion: 'El balón oficial de la NBA en 100% auténtico cuero genuino Horween. Utilizado por las superestrellas en cada partido oficial.',
      precio: 199.99,
      stock: 25,
      talla: 'Talla 7 (Oficial)',
      material: 'Cuero Genuino Horween',
      anioEdicion: 2024,
      imagenUrl: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=800&q=80',
      ligaId: 1,
      ligaNombre: 'NBA',
      ligaLogo: 'https://cdn.nba.com/logos/leagues/L/nba.svg'
    },
    {
      id: 2,
      nombre: 'Wilson NBA Authentic Series Indoor/Outdoor',
      marca: 'Wilson',
      descripcion: 'Cubierta Pure Feel con agarre profesional y durabilidad en pistas interiores y exteriores.',
      precio: 69.95,
      stock: 40,
      talla: 'Talla 7 (Oficial)',
      material: 'Cuero Composite Pure Feel',
      anioEdicion: 2024,
      imagenUrl: 'https://images.unsplash.com/photo-1519861531473-9200262188bf?auto=format&fit=crop&w=800&q=80',
      ligaId: 1,
      ligaNombre: 'NBA'
    },
    {
      id: 3,
      nombre: 'Wilson NBA City Edition - Los Angeles Lakers',
      marca: 'Wilson',
      descripcion: 'Edición conmemorativa Lakers con los colores púrpura y oro legendarios y escudo de la franquicia.',
      precio: 49.99,
      stock: 30,
      talla: 'Talla 7 (Oficial)',
      material: 'Composite All-Surface',
      anioEdicion: 2024,
      imagenUrl: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&w=800&q=80',
      ligaId: 1,
      ligaNombre: 'NBA',
      equipoId: 1,
      equipoNombre: 'Los Angeles Lakers',
      equipoCiudad: 'Los Angeles'
    },
    {
      id: 4,
      nombre: 'Wilson NBA City Edition - Boston Celtics',
      marca: 'Wilson',
      descripcion: 'Celebrando el campeonato número 18 de la franquicia verde con diseño de trébol y agarre premium.',
      precio: 49.99,
      stock: 35,
      talla: 'Talla 7 (Oficial)',
      material: 'Composite All-Surface',
      anioEdicion: 2024,
      imagenUrl: 'https://images.unsplash.com/photo-1519766304817-4f37bda74a29?auto=format&fit=crop&w=800&q=80',
      ligaId: 1,
      ligaNombre: 'NBA',
      equipoId: 2,
      equipoNombre: 'Boston Celtics',
      equipoCiudad: 'Boston'
    },
    {
      id: 5,
      nombre: 'Wilson NBA Golden State Warriors Tribute',
      marca: 'Wilson',
      descripcion: 'Edición The Bay con tonos azul y oro brillante de Stephen Curry y la dinastía Warrior.',
      precio: 44.95,
      stock: 20,
      talla: 'Talla 7 (Oficial)',
      material: 'Composite All-Surface',
      anioEdicion: 2023,
      imagenUrl: 'https://images.unsplash.com/photo-1518407613690-d9fc990e795f?auto=format&fit=crop&w=800&q=80',
      ligaId: 1,
      ligaNombre: 'NBA',
      equipoId: 3,
      equipoNombre: 'Golden State Warriors',
      equipoCiudad: 'San Francisco'
    },
    {
      id: 6,
      nombre: 'Wilson NBA Chicago Bulls Retro Edition',
      marca: 'Wilson',
      descripcion: 'Homenaje a la era de los 90 con acabados en rojo intenso y logotipo histórico de los Bulls.',
      precio: 45.00,
      stock: 28,
      talla: 'Talla 7 (Oficial)',
      material: 'Composite High-Grip',
      anioEdicion: 2023,
      imagenUrl: 'https://images.unsplash.com/photo-1608245449230-4ac19066d2d0?auto=format&fit=crop&w=800&q=80',
      ligaId: 1,
      ligaNombre: 'NBA',
      equipoId: 4,
      equipoNombre: 'Chicago Bulls',
      equipoCiudad: 'Chicago'
    },
    {
      id: 7,
      nombre: 'Molten BG5000 FIBA World Cup Official',
      marca: 'Molten',
      descripcion: 'El balón oficial de la Copa del Mundo FIBA y Juegos Olímpicos. 12 paneles en cuero natural hidrófugo.',
      precio: 185.00,
      stock: 18,
      talla: 'Talla 7 (Oficial)',
      material: 'Cuero Natural Premium',
      anioEdicion: 2024,
      imagenUrl: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=800&q=80',
      ligaId: 2,
      ligaNombre: 'FIBA'
    },
    {
      id: 8,
      nombre: 'Molten BG3800 FIBA Approved Indoor/Outdoor',
      marca: 'Molten',
      descripcion: 'Balón de alta resistencia para entrenamiento y ligas federadas con homologación FIBA.',
      precio: 59.50,
      stock: 32,
      talla: 'Talla 7 (Oficial)',
      material: 'Cuero Sintético de Alta Densidad',
      anioEdicion: 2023,
      imagenUrl: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=800&q=80',
      ligaId: 2,
      ligaNombre: 'FIBA'
    },
    {
      id: 9,
      nombre: 'Spalding TF-1000 Legacy EuroLeague Official',
      marca: 'Spalding',
      descripcion: 'El balón de las grandes noches europeas de la EuroLeague. Microfibra ZK con avanzada absorción.',
      precio: 119.00,
      stock: 22,
      talla: 'Talla 7 (Oficial)',
      material: 'Microfibra ZK Composite',
      anioEdicion: 2024,
      imagenUrl: 'https://images.unsplash.com/photo-1519861531473-9200262188bf?auto=format&fit=crop&w=800&q=80',
      ligaId: 3,
      ligaNombre: 'EuroLeague'
    },
    {
      id: 10,
      nombre: 'Spalding Real Madrid EuroLeague Edition',
      marca: 'Spalding',
      descripcion: 'Edición oficial del Real Madrid de Baloncesto con escudo serigrafiado para competiciones europeas.',
      precio: 55.00,
      stock: 24,
      talla: 'Talla 7 (Oficial)',
      material: 'Composite Indoor',
      anioEdicion: 2024,
      imagenUrl: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&w=800&q=80',
      ligaId: 3,
      ligaNombre: 'EuroLeague',
      equipoId: 5,
      equipoNombre: 'Real Madrid Baloncesto',
      equipoCiudad: 'Madrid'
    },
    {
      id: 11,
      nombre: 'Wilson WNBA Official Game Ball',
      marca: 'Wilson',
      descripcion: 'Balón oficial de la WNBA con franjas blancas y anaranjadas. Acabado Micro-Touch exclusivo.',
      precio: 129.99,
      stock: 15,
      talla: 'Talla 6 (Oficial Femenil)',
      material: 'Micro-Touch Composite',
      anioEdicion: 2024,
      imagenUrl: 'https://images.unsplash.com/photo-1519766304817-4f37bda74a29?auto=format&fit=crop&w=800&q=80',
      ligaId: 4,
      ligaNombre: 'WNBA'
    }
  ];

  private mockLigas: Liga[] = [
    { id: 1, nombre: 'NBA', paisRegion: 'USA' },
    { id: 2, nombre: 'FIBA', paisRegion: 'Internacional' },
    { id: 3, nombre: 'EuroLeague', paisRegion: 'Europa' },
    { id: 4, nombre: 'WNBA', paisRegion: 'USA' }
  ];

  private mockEquipos: Equipo[] = [
    { id: 1, nombre: 'Los Angeles Lakers', ciudad: 'Los Angeles', liga: { id: 1, nombre: 'NBA' } },
    { id: 2, nombre: 'Boston Celtics', ciudad: 'Boston', liga: { id: 1, nombre: 'NBA' } },
    { id: 3, nombre: 'Golden State Warriors', ciudad: 'San Francisco', liga: { id: 1, nombre: 'NBA' } },
    { id: 4, nombre: 'Chicago Bulls', ciudad: 'Chicago', liga: { id: 1, nombre: 'NBA' } },
    { id: 5, nombre: 'Real Madrid Baloncesto', ciudad: 'Madrid', liga: { id: 3, nombre: 'EuroLeague' } }
  ];

  getBalones(filters?: BalonFilters): Observable<Balon[]> {
    let params = new HttpParams();
    if (filters?.ligaId) params = params.set('ligaId', filters.ligaId.toString());
    if (filters?.equipoId) params = params.set('equipoId', filters.equipoId.toString());
    if (filters?.anioEdicion) params = params.set('anio', filters.anioEdicion.toString());
    if (filters?.marca) params = params.set('marca', filters.marca);

    return this.http.get<Balon[]>(`${this.apiUrl}/balones`, { params }).pipe(
      catchError(() => {
        // Filtrado local sobre mock
        let result = [...this.mockBalones];
        if (filters?.ligaId) result = result.filter(b => b.ligaId === filters.ligaId);
        if (filters?.equipoId) result = result.filter(b => b.equipoId === filters.equipoId);
        if (filters?.anioEdicion) result = result.filter(b => b.anioEdicion === filters.anioEdicion);
        if (filters?.marca) result = result.filter(b => b.marca.toLowerCase() === filters.marca?.toLowerCase());
        if (filters?.searchTerm) {
          const term = filters.searchTerm.toLowerCase();
          result = result.filter(b => b.nombre.toLowerCase().includes(term) || b.descripcion.toLowerCase().includes(term));
        }

        if (filters?.sortBy === 'price-asc') result.sort((a, b) => a.precio - b.precio);
        else if (filters?.sortBy === 'price-desc') result.sort((a, b) => b.precio - a.precio);
        else if (filters?.sortBy === 'year-desc') result.sort((a, b) => b.anioEdicion - a.anioEdicion);

        return of(result);
      })
    );
  }

  getBalonById(id: number): Observable<Balon> {
    return this.http.get<Balon>(`${this.apiUrl}/balones/${id}`).pipe(
      catchError(() => {
        const item = this.mockBalones.find(b => b.id === id) || this.mockBalones[0];
        return of(item);
      })
    );
  }

  getLigas(): Observable<Liga[]> {
    return this.http.get<Liga[]>(`${this.apiUrl}/ligas`).pipe(
      catchError(() => of(this.mockLigas))
    );
  }

  getEquipos(): Observable<Equipo[]> {
    return this.http.get<Equipo[]>(`${this.apiUrl}/equipos`).pipe(
      catchError(() => of(this.mockEquipos))
    );
  }
}
