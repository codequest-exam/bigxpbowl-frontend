export interface Equipment {
  id: number;
  name: string;
  stock: number;
}
export interface EquipmentFormData {
  id?: number;
  name: string;
  stock: number;

  [key: string]: string | number | undefined;
}
