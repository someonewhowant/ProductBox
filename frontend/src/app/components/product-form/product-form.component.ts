import { Component, OnInit, inject, signal, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="form-container">
      <h2>{{ isEdit() ? 'Edit' : 'Add' }} Product</h2>
      <form [formGroup]="productForm" (ngSubmit)="onSubmit()">
        <div class="field">
          <label>Name</label>
          <input formControlName="name">
        </div>
        <div class="field">
          <label>Description</label>
          <textarea formControlName="description"></textarea>
        </div>
        <div class="field">
          <label>Price</label>
          <input type="number" formControlName="price">
        </div>
        <div class="actions">
          <button type="button" (click)="goBack()">Cancel</button>
          <button type="submit" [disabled]="productForm.invalid">{{ isEdit() ? 'Update' : 'Create' }}</button>
        </div>
      </form>
    </div>
  `,
  styles: [`
    .form-container { max-width: 600px; margin: 20px auto; padding: 20px; border: 1px solid #ccc; border-radius: 8px; }
    .field { margin-bottom: 15px; display: flex; flex-direction: column; }
    .actions { display: flex; gap: 10px; }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private service = inject(ProductService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  isEdit = signal(false);
  productId = signal<string | null>(null);

  productForm = this.fb.group({
    name: ['', Validators.required],
    description: [''],
    price: [0, [Validators.required, Validators.min(0.01)]]
  });

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit.set(true);
      this.productId.set(id);
      this.service.getById(id).subscribe(p => this.productForm.patchValue(p));
    }
  }

  onSubmit() {
    const val = this.productForm.value as Product;
    const obs = this.isEdit() ? this.service.update(this.productId()!, val) : this.service.create(val);
    obs.subscribe(() => this.goBack());
  }

  goBack() { this.router.navigate(['/']); }
}
