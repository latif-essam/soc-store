import db from "./../database";

export type OrderProduct = {
  id?: number;
  prodcut_id: number;
  order_id: number;
  user_id: number;
  product_quantity: number;
};

export class OrderProducts {
  async addProductsToOrder(
    ops: OrderProduct
  ): Promise<OrderProduct | undefined> {
    // check the status of the order
    try {
      const conn = await db.connect();
      const sql = "SELECT * FROM orders WHERE id=$1";

      const result = await conn.query(sql, [ops.order_id]);
      const order = result.rows[0];
      conn.release();

      if (order.status === "complete") {
        throw new Error(
          `Error adding produc: ${ops.prodcut_id} to order: ${ops.order_id}  as order's status is ${order.status}`
        );
      }
    } catch (error) {
      throw new Error(`Error adding producs to order, error: ${error}`);
    }
    // add products to orderProducts table
    try {
      const conn = await db.connect();
      const sql =
        "INSERT INTO order_products (  prodcut_id,  order_id,  user_id,  product_quantity)";

      const result = await conn.query(sql, [
        ops.prodcut_id,
        ops.order_id,
        ops.user_id,
        ops.product_quantity,
      ]);

      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`Error adding producs to order, error: ${error}`);
    }
  }
}
