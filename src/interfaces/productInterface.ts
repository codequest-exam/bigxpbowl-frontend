export interface Product {
  id?: number;
  name: string;
  price: number;
  imgURL: string;
}
export interface ProductFormData {
  id?: number;
  name: string;
  price: number;
  imgURL: string;

  [key: string]: string | number | undefined;
}
