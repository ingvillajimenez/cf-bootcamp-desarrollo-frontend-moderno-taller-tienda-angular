import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router'; // Importa ActivatedRoute y RouterLink
import { Product as ProductService } from '../../services/product'; // Ajusta rutas
import { CommonModule } from '@angular/common'; // Para @if y pipes
import { switchMap, catchError, tap } from 'rxjs/operators'; // EMPTY para manejo de errores
import { EMPTY } from 'rxjs'; // EMPTY para manejo de errores
import { toSignal } from '@angular/core/rxjs-interop';
import { Title } from '@angular/platform-browser'; // Para cambiar el titulo de la pagina dinamicamente
import { ProductInterface } from '../../models/product.model'; // Importa la interfaz

import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms'; // 1. Importa cosas de Forms

@Component({
  selector: 'app-product-detail',
  imports: [CommonModule, RouterLink, ReactiveFormsModule], // 2. Agrega ReactiveFormsModule
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.css',
})
export class ProductDetail {
  private route = inject(ActivatedRoute); // Inyecta ActivatedRoute para leer parametros de URL
  private productService = inject(ProductService);
  private titleService = inject(Title); // Inyecta Title para cambiar el titulo del navegador

  private fb = inject(FormBuilder); // 3. Inyecta FormBuilder

  // 4. Define el FormGroup para el formulario de reseña
  reviewForm = this.fb.group({
    // Define un control llamado 'comment'
    comment: [
      '', // Valor inicial vacio
      [
        // Array de validadores
        Validators.required, // Es obligatorio
        Validators.minLength(10), // Debe tener al menos 10 caracteres
      ],
    ],
  });

  // 5. Metodo para manejar el envio del formulario
  onSubmitReview() {
    // Marca todos los campos como 'touched' para mostrar errores si es necesario
    this.reviewForm.markAllAsTouched();

    if (this.reviewForm.valid) {
      console.log('Formulario de reseña valido. Enviando: ', this.reviewForm.value);
      // Aqui iria la logica para enviar la reseña a un backend
      alert(`Gracias por tu reseña!\nComentario: ${this.reviewForm.value.comment}`);
      this.reviewForm.reset(); // Limpia el formulario despues de enviarlo
    } else {
      console.error('El formulario de reseña es invalido');
    }
  }

  // 6. Getter para acceder facilmente al control 'comment' en el template
  get commentControl() {
    return this.reviewForm.get('comment');
  }

  // Creamos un Observable que:
  // 1. Escucha cambios en los parametros de la ruta (paramMap)
  // 2. Extrae el 'id'
  // 3. Usa switchMap para cancelar peticiones anteriores si el ID cambia rapidamente
  // y llama a getProductById con el nuevo ID
  // 4. Maneja el error si el producto no se encuentra o falla la API
  private productData$ = this.route.paramMap.pipe(
    switchMap((params) => {
      const id = params.get('id');

      if (!id) {
        console.log('ID de producto no encontrado en la ruta');
        // Podrias redirigir a /not-found aqui si quisieras
        return EMPTY; // Retorna un observable vacio si no hay ID
      }

      return this.productService.getProductById(id).pipe(
        tap((product) => {
          // Cambia el titulo de la pestaña del navegador solo si product existe
          const title = product && product.title ? product.title : 'Producto';
          this.titleService.setTitle(`${title} - Mini Tienda`);
        }),
        catchError((err) => {
          console.error('Error al cargar producto: ', err);
          // Podrias redirigin a /not-found o mostrar un mensaje
          this.titleService.setTitle('Producto no encontrado - Mini Tienda');
          return EMPTY; // Retorna vacio para que el signal quede undefined
        })
      );
    })
  );

  // Convertimos el observable del producto a un Signal
  // Sera undefined hasta que lleguen los datos, o si hubo un error
  public product = toSignal<ProductInterface | undefined>(this.productData$);
}
