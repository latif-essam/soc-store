import supertest from "supertest";
import { userApis } from "../../constants/testing";
import app from "./../../index";

const req = supertest(app);

describe("User Endpoint:", async () => {
  userApis.map((api) => {
    it(`${api.name} endpoint should return status of ${api.code}, ${api.msg} ${
      api.auth ? "[unAuthorized]" : "Token not required!"
    } `, async () => {
      const res = await req[api.method](api.path);
      expect(res.status).toBe(api.code);
    });
  });
});
