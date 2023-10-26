export type ApiResponse<T> = T | T[] | { error: string };

export interface Product {
    productId: number;
    name: string;
    price: number;
    stockQuantity: number;
}

export interface Order {
    orderId: number;
    orderItems: OrderItem[];
    customerName: string;
    totalPrice: number;
    status: string;
    shipping?: ShippingInfo;
}

export interface OrderItem {
    productId: number;
    orderQuantity: number;
}

export interface ShippingInfo {
    trackingCompany?: string;
    trackingNumber?: string;
}
