import db from "./../database";

export type ProductCategory = {
  prodcut_id: number;
  category_id: number;
};

export class ProductCategorys {
  async addProductToCategorys(
    pcs: ProductCategory
  ): Promise<ProductCategory | undefined> {
    // add products to orderProducts table
    try {
      const conn = await db.connect();
      const sql =
        "INSERT INTO product_categorys (prodcut_id, category_id) VALUES($1,$2) RETURNING *";

      const result = await conn.query(sql, [pcs.prodcut_id, pcs.category_id]);

      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`Error adding product to Categorys, error: ${error}`);
    }
  }
}
