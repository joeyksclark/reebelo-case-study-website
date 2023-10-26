import { getAllOrders } from '../../../util/orderUtils';
import { findProductById } from "../../../util/productUtils";
import { ApiResponse, Order, OrderItem } from "../../../util/types";

import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse<ApiResponse<Order>>) {
    try {
        if (req.method === 'GET') {
            // Get all orders
            res.status(200).json(getAllOrders());
        } else if (req.method === 'POST') {
            // Create an order
            createOrder(req, res);
        } else {
            // Method Not Allowed
            res.status(405).end();
        }
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
}

const validateInput = (customerName: string, orderItems: OrderItem[]) => {
    if (!customerName || !orderItems) {
        throw new Error('Invalid input data');
    }
}

const createOrder = (req: NextApiRequest, res: NextApiResponse<ApiResponse<Order>>) => {
    try {
        const { customerName, orderItems } = req.body;
        validateInput(customerName, orderItems);

        let orders = getAllOrders();
        const newOrder: Order = {
            orderId: orders.length + 1,
            orderItems: orderItems,
            customerName: customerName,
            totalPrice: calculateTotalCost(orderItems),
            status: "Processing",
            shipping: {}
        };
        orders.push(newOrder);

        res.status(201).json(newOrder);
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
};

const calculateTotalCost = (orderItems: OrderItem[]): number => {
    let totalCost = 0;

    orderItems.forEach((orderItem) => {
        const { productId, orderQuantity } = orderItem;
        const product = findProductById(productId);
        if (product) {
            if (orderQuantity <= product.stockQuantity) {
                totalCost += product.price * orderQuantity;
            } else {
                throw new Error(`Not enough of ${product.name} in stock. ` +
                    `You ordered ${orderQuantity}, but there are only ${product.stockQuantity}.`)
            }
        } else {
            throw new Error(`The product ordered does not exist (productId: ${productId}).`)
        }
    });

    return totalCost;
}
