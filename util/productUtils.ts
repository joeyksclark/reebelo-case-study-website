import { Product } from "./types";
import db from "./db";

export const getAllProducts = async (): Promise<Product[]> => {
    const { data, error } = await db
        .from("products")
        .select("*");

    if (error) {
        throw new Error(`Error fetching products: ${error.message}`);
    }

    return data as Product[];
};

export const findProductById = async (productId: number): Promise<Product | undefined> => {
    const { data, error } = await db
        .from("products")
        .select("*")
        .eq("productId", productId)
        .single();

    if (error) {
        throw new Error(`Error finding product: ${error.message}`);
    }

    return data as Product | undefined;
};

export const getProduct = async (productId: number): Promise<Product> => {
    const product = await findProductById(productId);

    if (!product) {
        throw new Error(`Product with ID ${productId} doesn't exist.`);
    }

    return product;
};

export const createProduct = async (name: string, price: number, stockQuantity: number): Promise<Product> => {
    const { data, error } = await db
        .from('products')
        .insert([
            {
                name: name,
                price: price,
                stockQuantity: stockQuantity},
        ])
        .select();

    if (error || !data || data.length === 0) {
        throw new Error(`Product creation failed: ${error?.message}`);
    }

    return data[0] as Product;
};

export const updateProduct = async (productId: number, name: string, price: number, stockQuantity: number): Promise<Product> => {
    // Check if product exists
    await getProduct(productId);

    const { data, error } = await db
        .from('products')
        .update({
            name: name,
            price: price,
            stockQuantity: stockQuantity
        })
        .eq('productId', productId)
        .select()

    if (error) {
        throw new Error(`Error updating product: ${error.message}`);
    }

    if (!data || data.length === 0) {
        throw new Error(`Product with ID ${productId} doesn't exist.`);
    }

    return data[0] as Product;
};
