import { Component, OnInit, inject, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, RouterLink, CurrencyPipe],
  template: `
    <div class="container">
      <div class="header">
        <h1>Product Box</h1>
        <button [routerLink]="['/add']" class="btn-add">Add New Product</button>
      </div>
      <div class="grid">
        @for (product of products(); track product.id) {
          <div class="card">
            <h3>{{ product.name }}</h3>
            <p>{{ product.description }}</p>
            <div class="price">{{ product.price | currency }}</div>
            <div class="actions">
              <button [routerLink]="['/edit', product.id]">Edit</button>
              <button (click)="onDelete(product.id!)" class="btn-delete">Delete</button>
            </div>
          </div>
        }
      </div>
    </div>
  `,
  styles: [`
    .container { padding: 20px; max-width: 1200px; margin: 0 auto; }
    .header { display: flex; justify-content: space-between; align-items: center; }
    .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 20px; margin-top: 20px; }
    .card { border: 1px solid #ddd; padding: 15px; border-radius: 8px; background: #fff; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
    .price { font-weight: bold; color: #2c3e50; margin: 10px 0; font-size: 1.2em; }
    .btn-add { background: #27ae60; color: white; padding: 10px 20px; border: none; border-radius: 4px; cursor: pointer; }
    .btn-delete { color: #e74c3c; margin-left: 10px; }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductListComponent implements OnInit {
  service = inject(ProductService);
  products = this.service.products;

  ngOnInit() { this.service.loadAll(); }
  onDelete(id: string) { if(confirm('Are you sure?')) this.service.delete(id).subscribe(); }
}
