export interface Product {
    id?: string;
    name: string;
    price: number;
    discount: number;
    description?: string;
}

export interface ProductState {
    list: Product[];
    loading: boolean;
    error: string | null;
}