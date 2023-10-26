import { NextApiRequest, NextApiResponse } from 'next';
import { getOrder, updateOrder } from "../../../util/orderUtils";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        if (req.method === 'GET') {
            // Get order by id
            const orderId = parseInt(req.query.orderId as string, 10);
            const order = await getOrder(orderId);
            res.status(200).json(order);
        } else if (req.method == 'PUT') {
            // Update product by id
            const orderId = parseInt(req.query.orderId as string, 10);
            const order = await updateOrder(orderId, req.body.status, req.body.shipping);
            res.status(200).json(order);
        } else {
            // Method Not Allowed
            res.status(405).end();
        }
    } catch (error: any) {
        res.status(400).json({error: error.message});
    }
}