export interface Product {
  id: string;
  name: string;
  price: number;
  discount?: number;
}

export interface InvoiceItem extends Product {
  quantity: number;
  amount: number;
}