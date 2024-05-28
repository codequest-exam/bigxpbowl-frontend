export interface Product {
  id?: number;
  name: string;
  price: number;
}
export interface ProductFormData {
  id?: number;
  name: string;
  price: number;

  [key: string]: string | number | undefined;
}
