import { Balon } from './balon.model';

export interface CartItem {
  balon: Balon;
  cantidad: number;
  subtotal: number;
}
