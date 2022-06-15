import supertest from "supertest";
import { categorysApis } from "../../constants/testing";
import app from "../../index";

const req = supertest(app);

describe("Category Endpoint:", async () => {
  categorysApis.map((api) => {
    it(`${api.name} endpoint should return status code of ${api.code}, ${
      api.msg
    } ${
      api.auth
        ? "request headers missing token [token required]!"
        : "[Token isn't required!]"
    } `, async () => {
      const res = await req[api.method](api.path);
      expect(res.status).toBe(api.code);
    });
  });
});
