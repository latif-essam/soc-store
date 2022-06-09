import db from "./../database";

export type Category = {
  id?: number;
  name: string;
};

export class Categorys {
  //   get all categorys
  async index(): Promise<Category[] | undefined> {
    try {
      const conn = await db.connect();
      const sql = "SELECT * FROM  categorys";

      const result = await conn.query(sql);
      conn.release();

      return result.rows;
    } catch (error) {
      console.log({ error });
      throw new Error(
        "Error getting categorys from categorys table error: " + error
      );
    }
  }

  // get Category by id

  async show(id: number): Promise<Category | undefined> {
    try {
      const conn = await db.connect();
      const sql = "SELECT * FROM  categorys WHERE id=$1";

      const result = await conn.query(sql, [id]);
      conn.release();

      return result.rows[0];
    } catch (error) {
      console.log({ error });
      throw new Error(
        "Error getting Category from categorys table error: " + error
      );
    }
  }
  // craete new Category
  async create(c: Category): Promise<Category | undefined> {
    try {
      const conn = await db.connect();
      const sql = "INSERT INTO categorys (name) VALUES($1) RETURNING *";

      const result = await conn.query(sql, [c.name]);
      conn.release();

      return result.rows[0];
    } catch (error) {
      console.log({ error });
      throw new Error("Error creating new Category, error: " + error);
    }
  }

  // update Category info:
  async update(c: Category): Promise<Category | undefined> {
    try {
      const conn = await db.connect();
      const sql = "UPDATE categorys SET name=$1 WHERE id=$2 RETURNING *";

      const result = await conn.query(sql, [c.name, c.id]);
      conn.release();

      return result.rows[0];
    } catch (error) {
      console.log({ error });
      throw new Error("Error updating  Category" + c.name + " error: " + error);
    }
  }
  // delete Category
  async destroy(id: number): Promise<Category | undefined> {
    try {
      const conn = await db.connect();
      const sql = "DELETE FROM categorys WHERE id=$1 RETURNING *";

      const result = await conn.query(sql, [id]);
      conn.release();

      return result.rows[0];
    } catch (error) {
      console.log({ error });
      throw new Error("Error deleting Category, error: " + error);
    }
  }

  //   async addCategoryToProduct(
  //     categoryId: string,
  //     productId: string
  //   ): Promise<object> {
  //     try {
  //       const sql =
  //         "INSERT INTO product_categorys (category_id, product_id) VALUES ($1, $2) RETURNING *";
  //       const conn = await Client.connect();
  //       const result = await conn.query(sql, [categoryId, productId]);
  //       conn.release();

  //       const Category = result.rows[0];

  //       return Category;
  //     } catch (err) {
  //       throw new Error(
  //         `Could not add category ${categoryId} to product ${productId}. Error:${err}`
  //       );
  //     }
  //   }
}
