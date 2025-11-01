import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, catchError, throwError } from 'rxjs'; // Importa operadores RxJS
import { ProductInterface } from '../models/product.model'; // Asegurate que la ruta sea correcta

@Injectable({
  providedIn: 'root',
})
export class Product {
  // inject() es la forma moderna de inyectar
  private http = inject(HttpClient);
  private apiUrl = 'https://fakestoreapi.com/products';

  // Obtiene TODOS los productos
  getProducts(): Observable<ProductInterface[]> {
    console.log('Servicio: Llamando a getProducts...');

    return this.http.get<ProductInterface[]>(this.apiUrl).pipe(
      tap((products) => console.log(`Servicio: Obtenidos ${products.length} productos`)),
      catchError(this.handleError) // Añade manejo de errores basico
    );
  }

  // Obtiene UN producto por su ID
  getProductById(id: string | number): Observable<ProductInterface> {
    console.log(`Servicio: Llamando a getProductById con ID: ${id}`);

    return this.http.get<ProductInterface>(`${this.apiUrl}/${id}`).pipe(
      tap((product) => console.log(`Servicio: Obtenido producto`, product)),
      catchError(this.handleError) // Añade manejo de errores basico
    );
  }

  private handleError(error: any): Observable<never> {
    console.error('Error en el servicio de productos:', error);

    // Podrias formatear el error o loggearlo en un sistema externo
    return throwError(
      () => new Error('Algo salio mal al obtener los datos; por favor intenta mas tarde.')
    );
  }
}
