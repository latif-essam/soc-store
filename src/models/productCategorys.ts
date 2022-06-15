import db from "./../database";

export type ProductCategory = {
  prodcut_id: number;
  category_id: number;
};

export class ProductCategorys {
  async addProductToCategorys(
    category_id: number,
    prodcut_id: number
  ): Promise<ProductCategory | undefined> {
    // add products to orderProducts table
    try {
      const conn = await db.connect();
      const sql =
        "INSERT INTO product_categorys (prodcut_id, category_id) VALUES($1,$2) RETURNING *";

      const result = await conn.query(sql, [prodcut_id, category_id]);

      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`Error adding product to Categorys, error: ${error}`);
    }
  }

  async getCategoryProducts(
    category_id: number
  ): Promise<ProductCategory | undefined> {
    // add products to orderProducts table
    try {
      const conn = await db.connect();
      const sql =
        "SELECT * FROM products INNER JOIN product_categorys ON products.id = product_categorys.prodcut_id WHERE category_id=$1";

      const result = await conn.query(sql, [category_id]);

      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`Error adding product to Categorys, error: ${error}`);
    }
  }
}
