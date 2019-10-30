export interface Product {
    id: string;
    name: string;
    gender: string;
    type: string;
    imgs: string[];
    colors: string[];
    sizes: string[];
    details: string;
    price: number;
    limited?: boolean;
    forward?: string;
    washer_details?: string;
    fabrics?: string;
    sale?: number;
}
