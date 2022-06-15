import { Order, Orders } from "../../models/order";
import { Users } from "../../models/user";
import { crud, staticOrder, staticUser } from "./../../constants/testing";

const orderStore = new Orders();
const userStore = new Users();

describe("Order Model", () => {
  beforeAll(async () => {
    await userStore.create(staticUser);
  });

  crud.map((method) =>
    it(`Should have ${method} Method`, () => {
      expect(orderStore[method]).toBeDefined();
    })
  );

  it("Create Method should return a created Order", async () => {
    const product = await orderStore.create({
      ...staticOrder,
      user_id: 1,
    });
    expect(product?.user_id).toEqual(1);
  });

  it("Index Method should return a list of orders done by a user", async () => {
    const orderProducts: Order[] | undefined = await orderStore.index(1);
    expect(orderProducts?.length).toBeGreaterThan(0);
  });

  it("Show Method should return a single  Order", async () => {
    const order: Order | undefined = await orderStore.show(1);
    expect(order?.id).toEqual(1);
  });

  it("Update Method should return a new updated Order", async () => {
    const updatedOrder: Order | undefined = await orderStore.update({
      id: 1,
      user_id: 1,
      status: "completed",
    });
    expect(updatedOrder?.status).toEqual("completed");
  });

  it("Delete Method should return a deleted Order", async () => {
    const deletedOrder: Order | undefined = await orderStore.destroy(1);
    expect(deletedOrder?.id).toEqual(1);
  });
});
