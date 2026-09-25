import { Liga } from './liga.model';

export interface Equipo {
  id: number;
  nombre: string;
  ciudad: string;
  conferencia?: string;
  logoUrl?: string;
  liga?: Liga;
}
