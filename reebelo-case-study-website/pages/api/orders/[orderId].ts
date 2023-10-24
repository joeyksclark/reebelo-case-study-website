import { NextApiRequest, NextApiResponse } from 'next';
import { findOrderById } from "../orderUtils";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        if (req.method === 'GET') {
            getOrder(req, res);
        } else if (req.method == 'PUT') {
            updateOrder(req, res);
        } else {
            // Method Not Allowed
            res.status(405).end();
        }
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
}

const getOrder = (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const orderId = parseInt(req.query.orderId as string, 10);
        const existingOrder = findOrderById(orderId);

        if (existingOrder) {
            res.status(200).json(existingOrder);
        } else {
            res.status(404).end();
        }

    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

const updateOrder = (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const { status, shipping } = req.body;

        const orderId = parseInt(req.query.orderId as string, 10);
        const existingOrder = findOrderById(orderId);

        if (existingOrder) {
            existingOrder.status = status;
            existingOrder.shipping = shipping;

            res.status(200).json(existingOrder);
        } else {
            res.status(404).json({ error: 'Order not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};
