import supertest from "supertest";
import { apis, staticProduct } from "../constants/testing";
import app from "../index";
import { Products } from "../models/product";
import { Users } from "../models/user";
import { staticUser } from "./../constants/testing";

const req = supertest(app);
const userStore = new Users();
const productStore = new Products();
const endpoint = "/api/users";
describe("Main: Testing Endpoints", async () => {
  // beforeAll(
  //   async () => {
  //   const users = await userStore.index();
  //   users?.map((user) => userStore.destroy(user.id as unknown as number));
  //   userStore.create(staticUser);

  //   const products = await productStore.index();
  //   products?.map((p) => productStore.destroy(p.id as unknown as number));
  //   productStore.create(staticProduct);
  // });
  it("should display response at /", async () => {
    const res = await req.get("/");
    expect(res.status).toBe(200);
  });

  it("should return a response of 201 when go to =>> /api/users", async () => {
    const res = await req.post("/api/users");
    expect(res.status).toBe(201);
  });
  it("should return a response of 201 when creating new user at =>> /api/users", async () => {
    const res = await req.post("/api/users").send(staticUser);
    console.log("res.body", res.body);
    expect(res.status).toBe(201);
    expect(res.body.token).toBeDefined();
  });
  it("auth endpoint should return a response status of 200 when visiting /api/auth", async () => {
    const res = await req
      .post("/api/auth")
      .send({ username: staticUser.username, password: staticUser.password });
    expect(res.status).toBe(200);
  });
  // crud operation
  apis.map((api, index) =>
    it(`should return ${
      index < 4 ? "a list of" : " "
    } ${api} when visiting /api/${api} route`, async () => {
      const res = await req.get(`/api/${api}`);
      expect(res.status).toBe(200);
    })
  );
  it("should return a response of 201 when creating new product at =>> /api/products", async () => {
    const res = await req.post("/api/products").send(staticProduct);
    console.log("res.body", res.body);
    expect(res.status).toBe(201);
    // expect(res.body.token).toBeDefined();
  });
  it("should return a product when visiting /api/products/:id", async () => {
    const products = await productStore.index();
    const res = await req.get(`/api/products/${products?.[0].id}`);
    expect(res.status).toBe(200);
  });

  // afterAll(async () => {
  //   const users = await userStore.index();

  //   const products = await productStore.index();
  //   return Promise.all([users, products]).then(([users, products]) => {
  //     users?.map(
  //       async (user) => await userStore.destroy(user.id as unknown as number)
  //     );
  //     products?.map(
  //       async (p) => await productStore.destroy(p.id as unknown as number)
  //     );
  //   });
  // });
});
