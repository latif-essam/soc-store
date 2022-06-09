import db from "./../database";

export type Order = {
  id?: number;
  user_id: number;
  status: string;
};

export class Orders {
  //   get all orders
  async index(): Promise<Order[] | undefined> {
    try {
      const conn = await db.connect();
      const sql = "SELECT * FROM  orders";

      const result = await conn.query(sql);
      conn.release();

      return result.rows;
    } catch (error) {
      console.log({ error });
      throw new Error("Error getting orders from orders table error: " + error);
    }
  }

  // get Order by id

  async show(id: number): Promise<Order | undefined> {
    try {
      const conn = await db.connect();
      const sql = "SELECT * FROM  orders WHERE id=$1";

      const result = await conn.query(sql, [id]);
      conn.release();

      return result.rows[0];
    } catch (error) {
      console.log({ error });
      throw new Error("Error getting Order from orders table error: " + error);
    }
  }
  // craete new Order
  async create(o: Order): Promise<Order | undefined> {
    try {
      const conn = await db.connect();
      const sql =
        "INSERT INTO orders (status,user_id) VALUES($1,$2) RETURNING *";

      const result = await conn.query(sql, [o.status, o.user_id]);
      conn.release();

      return result.rows[0];
    } catch (error) {
      console.log({ error });
      throw new Error("Error creating new Order, error: " + error);
    }
  }

  // update Order info:
  async update(o: Order): Promise<Order | undefined> {
    try {
      const conn = await db.connect();
      const sql = "UPDATE orders SET status=$1 WHERE id=$2 RETURNING *";

      const result = await conn.query(sql, [o.status, o.id]);
      conn.release();

      return result.rows[0];
    } catch (error) {
      console.log({ error });
      throw new Error("Error updating  Order" + o.id + " error: " + error);
    }
  }
  // delete Order
  async destroy(id: number): Promise<Order | undefined> {
    try {
      const conn = await db.connect();
      const sql = "DELETE FROM orders WHERE id=$1 RETURNING *";

      const result = await conn.query(sql, [id]);
      conn.release();

      return result.rows[0];
    } catch (error) {
      console.log({ error });
      throw new Error("Error deleting Order, error: " + error);
    }
  }
}
