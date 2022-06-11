import supertest from "supertest";
import { apis } from "../constants/testing";
import app from "../index";

const req = supertest(app);

describe("Main: Testing Endpoints", async () => {
  it("should display response at /", async () => {
    const res = await req.get("/");
    expect(res.status).toBe(200);
  });

  apis.map((api) =>
    it(`should return a list of ${api} when visiting /api/${api} route`, async () => {
      const res = await req.get(`/api/${api}`);
      expect(res.status).toBe(200);
    })
  );
});
