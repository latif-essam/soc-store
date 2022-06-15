import supertest from "supertest";
import { productsApis } from "../../constants/testing";
import app from "../../index";

const req = supertest(app);

describe("Product Endpoint:", async () => {
  productsApis.map((api) => {
    it(`${api.name} endpoint should return status code of ${api.code}, ${
      api.msg
    } ${
      api.auth ? "[token is required]!" : "Token isn't required!"
    } `, async () => {
      const res = await req[api.method](api.path);
      expect(res.status).toBe(api.code);
    });
  });
});
