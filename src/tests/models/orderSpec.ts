import { Order, Orders } from "../../models/order";
import { User, Users } from "../../models/user";
import { crud } from "./../../constants/testing";

const orderStore = new Orders();
const userStore = new Users();

describe("Order Model", () => {
  const staticOrder: Order = {
    status: "active",
    user_id: 1,
  };
  const staticUser: User = {
    first_name: "latif",
    last_name: "essam",
    username: "lolpop",
    password: "lolpop123",
  };

  beforeAll(async () => {
    // remove all users
    const users = await userStore.index();
    users?.map((user) => userStore.destroy(user.id as unknown as number));

    // remove all Orders
    const orders = await orderStore.index();
    orders?.map((order) => orderStore.destroy(order.id as unknown as number));
  });

  crud.map((method) =>
    it(`Should have ${method} Method`, () => {
      expect(orderStore[method]).toBeDefined();
    })
  );

  it("Create Method should return a created Order", async () => {
    // first: create a user
    const user = await userStore.create(staticUser);

    const product = await orderStore.create({
      ...staticOrder,
      user_id: user?.id as unknown as number,
    });
    expect(product?.user_id).toEqual(user?.id as unknown as number);
  });

  it("Index Method should return a list of orders", async () => {
    const products: Order[] | undefined = await orderStore.index();

    expect(products?.length).toBeGreaterThan(0);
  });

  it("Show Method should return a single  Order", async () => {
    const orders: Order[] | undefined = await orderStore.index();

    const order: Order | undefined = await orderStore.show(
      orders?.[0].id as unknown as number
    );
    expect(order?.status).toEqual(staticOrder.status);
  });
});
