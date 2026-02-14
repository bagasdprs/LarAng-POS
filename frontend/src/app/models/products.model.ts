export interface Product {
  id: string;
  name: string;
  category: string; // 'Beverage', 'Food', 'Snacks', 'Dessert'
  price: number;
  stock: number;
  image: string;
  status: 'In Stock' | 'Low Stock' | 'Out of Stock';
}