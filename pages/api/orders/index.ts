import { getAllOrders, createOrder } from '../../../util/orderUtils';
import { ApiResponse, Order } from "../../../util/types";

import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse<ApiResponse<Order>>) {
    try {
        if (req.method === 'GET') {
            // Get all orders
            const orders = await getAllOrders();
            res.status(200).json(orders);
        } else if (req.method === 'POST') {
            // Create an order
            const { customerName, orderItems } = req.body;
            const newOrder = await createOrder(customerName, orderItems);
            res.status(201).json(newOrder);
        } else {
            // Method Not Allowed
            res.status(405).end();
        }
    } catch (error: any) {
        res.status(400).json({error: error.message});
    }
}
