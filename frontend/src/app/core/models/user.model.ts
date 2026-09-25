export interface User {
  id: number;
  nombre: string;
  email: string;
  rol: string;
  token?: string;
}

export interface AuthResponse {
  token: string;
  type: string;
  id: number;
  nombre: string;
  email: string;
  rol: string;
}
