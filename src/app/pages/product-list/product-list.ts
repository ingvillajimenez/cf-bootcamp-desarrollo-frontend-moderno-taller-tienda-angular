import { Component, inject } from '@angular/core';
import { Product as ProductService } from '../../services/product';
import { CommonModule } from '@angular/common'; // Para las directivas estructuradas @if, @for, etc
import { toSignal } from '@angular/core/rxjs-interop';
import { ProductCard } from '../../components/product-card/product-card';

@Component({
  selector: 'app-product-list',
  imports: [CommonModule, ProductCard],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css',
})
export class ProductList {
  // Inyectamos el servicio de productos
  // inject reemplaza la necesidad de un constructor para la inyeccion de dependencias
  private productService = inject(ProductService);

  // Usamos toSignal para convertir el Observable<Product[]> a un Signal<Product[] | undefined>
  // Angular gestiona la suscripcion y desuscripcion automaticamente
  public products = toSignal(this.productService.getProducts());

  // En el contructor se puede definir la inyeccion de dependencias de servicios
  constructor() {
    // Opcional: Puedes ver el valor inicial (undefined) y luego el array
    console.log('Valor inicial del signal products: ', this.products());
  }
}
