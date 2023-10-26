// TODO Mocked order data (replace with actual database or data source)
let orders = [
    {
        orderId: 1,
        orderItems: [
            { productId: 1, orderQuantity: 2 },
            { productId: 2, orderQuantity: 1 }
        ],
        customerName: "Joey",
        totalPrice: 0,
        status: "Processing",
        shipping: {},
    },
    {
        orderId: 2,
        orderItems: [
            { productId: 1, orderQuantity: 2 },
            { productId: 2, orderQuantity: 1 }
        ],
        customerName: "Nina",
        totalPrice: 0,
        status: "Shipped",
        shipping: {
            trackingCompany: "SendAirway",
            trackingNumber: "SE789012"
        },
    },
    {
        orderId: 3,
        orderItems: [
            { productId: 1, orderQuantity: 3 },
            { productId: 2, orderQuantity: 2 }
        ],
        customerName: "Marika",
        totalPrice: 0,
        status: "Delivered",
        shipping: {
            trackingCompany: "ShipExpress",
            trackingNumber: "SE789012"
        },
    },
    {
        orderId: 4,
        orderItems: [
            { productId: 1, orderQuantity: 1 }
        ],
        customerName: "Caitlin",
        totalPrice: 0,
        status: "Canceled",
        shipping: {
            trackingCompany: "iShipFast",
            trackingNumber: "5819057849302"
        },
    },
];

export const getAllOrders = () => {
    return orders;
}

export const findOrderById = (orderId: number) => {
    return orders.find((order) => order.orderId === orderId);
};
