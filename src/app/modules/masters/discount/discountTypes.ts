export interface DiscountType {
    id?: string;
    name: string;
    percentage: number;
}

export interface DiscountState {
    list: DiscountType[];
    loading: boolean;
    error?: string;
}