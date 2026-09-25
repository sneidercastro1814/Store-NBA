import { Injectable, signal, computed } from '@angular/core';
import { Balon } from '../models/balon.model';
import { CartItem } from '../models/cart.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private readonly STORAGE_KEY = 'hoopstore_cart';
  private cartItemsSignal = signal<CartItem[]>(this.loadCartFromStorage());
  private isDrawerOpenSignal = signal<boolean>(false);

  readonly items = this.cartItemsSignal.asReadonly();
  readonly isDrawerOpen = this.isDrawerOpenSignal.asReadonly();

  readonly totalUnits = computed(() =>
    this.cartItemsSignal().reduce((acc, item) => acc + item.cantidad, 0)
  );

  readonly totalPrice = computed(() =>
    this.cartItemsSignal().reduce((acc, item) => acc + item.subtotal, 0)
  );

  addToCart(balon: Balon, cantidad: number = 1): void {
    const current = this.cartItemsSignal();
    const existingIndex = current.findIndex(i => i.balon.id === balon.id);

    if (existingIndex > -1) {
      const updated = [...current];
      const item = updated[existingIndex];
      const newCant = Math.min(item.cantidad + cantidad, balon.stock);
      updated[existingIndex] = {
        ...item,
        cantidad: newCant,
        subtotal: newCant * item.balon.precio
      };
      this.updateCart(updated);
    } else {
      const newItem: CartItem = {
        balon,
        cantidad: Math.min(cantidad, balon.stock),
        subtotal: balon.precio * cantidad
      };
      this.updateCart([...current, newItem]);
    }
    this.openDrawer();
  }

  updateQuantity(balonId: number, nuevaCantidad: number): void {
    if (nuevaCantidad <= 0) {
      this.removeFromCart(balonId);
      return;
    }
    const updated = this.cartItemsSignal().map(item => {
      if (item.balon.id === balonId) {
        const cant = Math.min(nuevaCantidad, item.balon.stock);
        return {
          ...item,
          cantidad: cant,
          subtotal: cant * item.balon.precio
        };
      }
      return item;
    });
    this.updateCart(updated);
  }

  removeFromCart(balonId: number): void {
    const updated = this.cartItemsSignal().filter(i => i.balon.id !== balonId);
    this.updateCart(updated);
  }

  clearCart(): void {
    this.updateCart([]);
  }

  openDrawer(): void {
    this.isDrawerOpenSignal.set(true);
  }

  closeDrawer(): void {
    this.isDrawerOpenSignal.set(false);
  }

  toggleDrawer(): void {
    this.isDrawerOpenSignal.update(val => !val);
  }

  private updateCart(items: CartItem[]): void {
    this.cartItemsSignal.set(items);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(items));
  }

  private loadCartFromStorage(): CartItem[] {
    const saved = localStorage.getItem(this.STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  }
}
