import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/product.model';
import { tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private http = inject(HttpClient);
  private apiUrl = '/api/products';

  #products = signal<Product[]>([]);
  products = this.#products.asReadonly();

  loadAll() {
    this.http.get<Product[]>(this.apiUrl).subscribe(data => this.#products.set(data));
  }

  getById(id: string) {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }

  create(product: Product) {
    return this.http.post<Product>(this.apiUrl, product)
      .pipe(tap(newP => this.#products.update(ps => [...ps, newP])));
  }

  update(id: string, product: Product) {
    return this.http.put<Product>(`${this.apiUrl}/${id}`, product)
      .pipe(tap(upd => this.#products.update(ps => ps.map(p => p.id === id ? upd : p))));
  }

  delete(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`)
      .pipe(tap(() => this.#products.update(ps => ps.filter(p => p.id !== id))));
  }
}
