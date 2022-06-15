import supertest from "supertest";
import { categoryProductsApis } from "../../constants/testing";
import app from "../../index";

const req = supertest(app);

describe("Category Products Endpoint:", async () => {
  categoryProductsApis.map((api) => {
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
