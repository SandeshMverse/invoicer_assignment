export interface Discount {
    id?: string;
    name: string;
    percentage: number;
}

export interface DiscountState {
    list: Discount[];
    loading: boolean;
}