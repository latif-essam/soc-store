import db from "./../database";

export type Product = {
  id?: number;
  name: string;
  price: number;
  quantity: number;
  category: string;
};

export class Products {
  //   get all products
  async index(): Promise<Product[] | undefined> {
    try {
      const conn = await db.connect();
      const sql = "SELECT * FROM  products";

      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (error) {
      console.log({ error });
      throw new Error(
        "error getting products from products table error: " + error
      );
    }
  }

  // get product by id

  async show(id: number): Promise<Product | undefined> {
    try {
      const conn = await db.connect();
      const sql = "SELECT * FROM  products WHERE id=$1";

      const result = await conn.query(sql, [id]);
      conn.release();

      return result.rows[0];
    } catch (error) {
      console.log({ error });
      throw new Error(
        "error getting Product from products table error: " + error
      );
    }
  }
  // craete new Product
  async create(p: Product): Promise<Product | undefined> {
    try {
      const conn = await db.connect();
      const sql =
        "INSERT INTO products (name,price,quantity,category) VALUES($1,$2,$3,$4) RETURNING *";

      const result = await conn.query(sql, [
        p.name,
        p.price,
        p.quantity,
        p.category,
      ]);
      conn.release();

      return result.rows[0];
    } catch (error) {
      console.log({ error });
      throw new Error("error creating new Product, error: " + error);
    }
  }

  // update Product info:
  async update(p: Product): Promise<Product | undefined> {
    try {
      const conn = await db.connect();
      const sql =
        "UPDATE products SET name=$1, price=$2, quantity=$3, category=$4 WHERE id=$5 RETURNING *";

      const result = await conn.query(sql, [
        p.name,
        p.price,
        p.quantity,
        p.category,
        p.id,
      ]);
      conn.release();

      return result.rows[0];
    } catch (error) {
      console.log({ error });
      throw new Error("error updating  Product" + p.name + " error: " + error);
    }
  }
  // delete Product
  async destroy(id: number): Promise<Product | undefined> {
    try {
      const conn = await db.connect();
      const sql = "DELETE FROM products WHERE id=$1 RETURNING *";

      const result = await conn.query(sql, [id]);
      conn.release();

      return result.rows[0];
    } catch (error) {
      console.log({ error });
      throw new Error("error deleting product, error: " + error);
    }
  }
}
