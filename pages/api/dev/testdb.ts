import { NextApiRequest, NextApiResponse } from "next";
import db from "../../../util/db";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { data, error } = await db
            .from('products')
            .select('*')
            .limit(1)
            .single();

        if (error) {
            console.error('Supabase error:', error);
            res.status(400).json({ error: error.message });
        } else if (data) {
            res.status(200).json(data);
        } else {
            res.status(404).json({ message: 'No data found' });
        }
    } catch (error: any) {
        console.error('Internal error:', error);
        res.status(500).json({ error: error.message });
    }
}
