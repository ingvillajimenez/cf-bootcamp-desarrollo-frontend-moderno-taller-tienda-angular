import { Routes } from '@angular/router';

// Importa tus componentes de pagina
import { Home } from './pages/home/home';
import { ProductList } from './pages/product-list/product-list';
import { ProductDetail } from './pages/product-detail/product-detail';
import { NotFound } from './pages/not-found/not-found';

export const routes: Routes = [
  // Ruta raiz ('/') -> Muestra Home
  { path: '', component: Home, title: 'Inicio - Mini Tienda' },

  // Ruta '/products' -> Muestra ProductList
  { path: 'products', component: ProductList, title: 'Productos - Mini Tienda' },

  // Ruta '/product/:id' -> Muestra ProductDetail
  // ':id' es un PARAMETRO de ruta. Capturara el ID del producto de la URL.
  { path: 'product/:id', component: ProductDetail, title: 'Detalle Producto' },

  // Ruta comodin ('**') -> Muestra NotFound si ninguna otra ruta coincide
  { path: '**', component: NotFound, title: '404 - No encontrado' },
];
