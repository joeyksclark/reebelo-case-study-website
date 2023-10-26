import { Order, OrderDAO, OrderItem, OrderItemDAO, ShippingInfo } from "./types";
import { getProduct, findProductById } from "./productUtils";

import db from "./db";

export const getAllOrders = async (): Promise<Order[]> => {
    try {
        const orderDAOs: OrderDAO[] = await getAllOrderDAOs();
        const orderItemDAOs: OrderItemDAO[] = await getAllOrderItemDAOs();

        // Create a map to group order items by orderId
        const orderItemsMap: Record<number, OrderItem[]> = {};
        orderItemDAOs.forEach((orderItemDAO) => {
            const { orderId, productId, orderQuantity } = orderItemDAO;
            if (!orderItemsMap[orderId]) {
                orderItemsMap[orderId] = [];
            }
            orderItemsMap[orderId].push({ productId, orderQuantity });
        });

        return orderDAOs.map((orderDAO: OrderDAO) => ({
            orderId: orderDAO.orderId,
            orderItems: orderItemsMap[orderDAO.orderId],
            customerName: orderDAO.customerName,
            totalPrice: orderDAO.totalPrice,
            status: orderDAO.status,
            shipping: {
                trackingCompany: orderDAO.shippingTrackingCompany,
                trackingNumber: orderDAO.shippingTrackingNumber,
            },
        }));
    } catch (error: any) {
        throw new Error(`Error retrieving orders: ${error.message}`);
    }
};

const getAllOrderDAOs = async (): Promise<OrderDAO[]> => {
    const {data, error} = await db
        .from("orders")
        .select("*");

    if (error) {
        throw new Error(`Error fetching orders: ${error.message}`);
    }

    return data as OrderDAO[];
};

const getAllOrderItemDAOs = async (): Promise<OrderItemDAO[]> => {
    const {data, error} = await db
        .from("order_items")
        .select("*");

    if (error) {
        throw new Error(`Error fetching order_items: ${error.message}`);
    }

    return data as OrderItemDAO[];
};

const findOrderDAOById = async (orderId: number): Promise<OrderDAO | undefined> => {
    const {data, error} = await db
        .from("orders")
        .select("*")
        .eq("orderId", orderId)
        .single();

    if (error) {
        throw new Error(`Error finding product: ${error.message}`);
    }

    return data as OrderDAO | undefined;
};

export const getOrder = async (orderId: number): Promise<Order> => {
    const orderDAO = await findOrderDAOById(orderId)
    const orderItems = await getOrderItems(orderId);

    if (orderDAO) {
        return {
            orderId: orderId,
            orderItems: orderItems,
            customerName: orderDAO.customerName,
            totalPrice: orderDAO.totalPrice,
            status: orderDAO.status,
            shipping: {
                trackingCompany: orderDAO.shippingTrackingCompany,
                trackingNumber: orderDAO.shippingTrackingNumber
            }
        };
    } else {
        throw new Error(`Order with ID ${orderId} doesn't exist.`)
    }
};

export const createOrder = async (customerName: string, orderItems: OrderItem[]): Promise<Order> => {
    try {
        // Also very basic stock quantity validation
        const totalPrice = await calculateTotalCost(orderItems);

        const { data, error } = await db
            .from("orders")
            .insert([
                {
                    customerName,
                    totalPrice,
                    status: "Processing",
                    shippingTrackingCompany: "",
                    shippingTrackingNumber: "",
                }
            ])
            .select();

        if (error || !data || data.length === 0) {
            throw new Error(`Order creation failed: ${error?.message}`);
        }

        const orderId = data[0].orderId;

        await insertOrderItems(orderId, orderItems);
        for (const orderItem of orderItems) {
            await updateProductStock(orderItem.productId, orderItem.orderQuantity);
        }

        const newOrder: Order = {
            orderId,
            orderItems,
            customerName,
            totalPrice,
            status: "Processing",
            shipping: {
                trackingCompany: "",
                trackingNumber: "",
            },
        };

        return newOrder;
    } catch (error: any) {
        throw new Error(`Error creating order: ${error.message}`);
    }
};

const insertOrderItems = async (orderId: number, orderItems: OrderItem[]): Promise<void> => {
    const orderItemsData: OrderItemDAO[] = orderItems.map((orderItem) => ({
        orderId,
        productId: orderItem.productId,
        orderQuantity: orderItem.orderQuantity,
    }));

    const { data, error } = await db
        .from("order_items")
        .insert(orderItemsData)
        .select();

    if (error || !data || data.length === 0) {
        throw new Error(`OrderItem creation failed: ${error?.message}`);
    }
};

const updateProductStock = async (productId: number, orderQuantity: number): Promise<void> => {
    const product = await getProduct(productId);

    if (product) {
        const newStockQuantity = product.stockQuantity - orderQuantity;

        const { data, error } = await db
            .from("products")
            .update({ stockQuantity: newStockQuantity })
            .eq("productId", productId)
            .select();

        if (error || !data || data.length === 0) {
            throw new Error(`Stock update failed: ${error?.message}`);
        }
    }
};


const calculateTotalCost = async (orderItems: OrderItem[]): Promise<number> => {
    let totalCost = 0;

    for (const orderItem of orderItems) {
        const { productId, orderQuantity } = orderItem;
        const product = await findProductById(productId);
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
    }

    return totalCost;
}

export const updateOrder = async (orderId: number, status: string, shippingInfo: ShippingInfo): Promise<Order> => {
    // Check if the order exists
    const order = await getOrder(orderId);

    const { data, error } = await db
        .from("orders")
        .update({
            status,
            shippingTrackingCompany: shippingInfo.trackingCompany,
            shippingTrackingNumber: shippingInfo.trackingNumber,
        })
        .eq("orderId", orderId)
        .select();

    if (error || !data || data.length === 0) {
        throw new Error(`Order update failed: ${error?.message}`);
    }

    const orderItems = await getOrderItems(orderId);
    const updatedOrder: Order = {
        orderId,
        orderItems,
        customerName: order.customerName,
        totalPrice: order.totalPrice,
        status,
        shipping: {
            trackingCompany: shippingInfo.trackingCompany,
            trackingNumber: shippingInfo.trackingNumber,
        },
    };

    return updatedOrder;
};


export const getOrderItems = async (orderId: number): Promise<OrderItem[]> => {
    const { data, error } = await db
        .from("order_items")
        .select("productId, orderQuantity")
        .eq("orderId", orderId);

    if (error) {
        throw new Error(`Error retrieving OrderItems: ${error.message}`);
    }

    return data as OrderItem[] | [];
};

