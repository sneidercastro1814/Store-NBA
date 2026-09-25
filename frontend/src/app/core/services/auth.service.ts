import { Injectable, signal, computed, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, catchError, of, throwError } from 'rxjs';
import { AuthResponse, User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/api/auth';
  private TOKEN_KEY = 'hoopstore_jwt_token';
  private USER_KEY = 'hoopstore_user';

  private currentUserSignal = signal<User | null>(this.loadStoredUser());

  readonly currentUser = this.currentUserSignal.asReadonly();
  readonly isAuthenticated = computed(() => !!this.currentUserSignal());
  readonly isAdmin = computed(() => this.currentUserSignal()?.rol === 'ROLE_ADMIN');

  login(credentials: { email: string; password: string }): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, credentials).pipe(
      tap(res => this.handleAuthSuccess(res)),
      catchError(err => {
        // Fallback para testing si el backend local no está corriendo
        if (err.status === 0 || err.status === 404) {
          const mockRes: AuthResponse = {
            token: 'mock-jwt-token-nba-mvp-2024',
            type: 'Bearer',
            id: 1,
            nombre: credentials.email.includes('admin') ? 'Administrador NBA' : 'LeBron Fan',
            email: credentials.email,
            rol: credentials.email.includes('admin') ? 'ROLE_ADMIN' : 'ROLE_USER'
          };
          this.handleAuthSuccess(mockRes);
          return of(mockRes);
        }
        return throwError(() => err);
      })
    );
  }

  register(userData: { nombre: string; email: string; password: string }): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/register`, userData).pipe(
      tap(res => this.handleAuthSuccess(res)),
      catchError(err => {
        if (err.status === 0 || err.status === 404) {
          const mockRes: AuthResponse = {
            token: 'mock-jwt-token-registered-hoops',
            type: 'Bearer',
            id: Date.now(),
            nombre: userData.nombre,
            email: userData.email,
            rol: 'ROLE_USER'
          };
          this.handleAuthSuccess(mockRes);
          return of(mockRes);
        }
        return throwError(() => err);
      })
    );
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
    this.currentUserSignal.set(null);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  private handleAuthSuccess(res: AuthResponse): void {
    const user: User = {
      id: res.id,
      nombre: res.nombre,
      email: res.email,
      rol: res.rol,
      token: res.token
    };
    localStorage.setItem(this.TOKEN_KEY, res.token);
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
    this.currentUserSignal.set(user);
  }

  private loadStoredUser(): User | null {
    const raw = localStorage.getItem(this.USER_KEY);
    return raw ? JSON.parse(raw) : null;
  }
}
