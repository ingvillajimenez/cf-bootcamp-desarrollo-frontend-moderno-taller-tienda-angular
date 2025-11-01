export interface ProductInterface {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    // Objeto anidado
    rate: number;
    count: number;
  };
}
