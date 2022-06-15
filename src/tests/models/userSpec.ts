import { User, Users } from "../../models/user";
import { crud, staticUser } from "./../../constants/testing";

const store = new Users();

describe("User Model", () => {
  beforeAll(async () => {
    // remove all users
    const users = await store.index();
    users?.map(
      async (user) => await store.destroy(user.id as unknown as number)
    );
  });

  crud.map((method) =>
    it(`Should have ${method} Method`, () => {
      expect(store[method]).toBeDefined();
    })
  );

  it("Should have authenticate Method", () => {
    expect(store.authenticate).toBeDefined();
  });

  it("Create Method should return a user", async () => {
    const user = await store.create(staticUser);

    expect(staticUser?.username).toEqual(user?.username as unknown as string);
  });

  it("Index Method should return a list of users", async () => {
    const users: User[] | undefined = await store.index();

    expect(users?.length).toBeGreaterThan(0);
  });
  it("Show Method should return a single  user", async () => {
    const users: User[] | undefined = await store.index();
    const user: User | undefined = await store.show(
      users?.[0].id as unknown as number
    );
    expect(user?.first_name).toEqual(staticUser.first_name);
  });

  it("Update Method should return an Updated user", async () => {
    // get the user
    const users: User[] | undefined = await store.index();
    const user: User | undefined = users?.[0];

    const updatedUser: User | undefined = await store.update({
      ...user,
      last_name: "Khaliel",
    } as User);

    expect(updatedUser?.last_name).toEqual("Khaliel");
  });

  it("Destroy Method should return The deleted user", async () => {
    // get user id
    const users: User[] | undefined = await store.index();
    const user: User | undefined = await store.show(
      users?.[0].id as unknown as number
    );

    const deletedUser: User | undefined = await store.destroy(
      user?.id as unknown as number
    );

    expect(deletedUser?.username).toEqual(staticUser.username);
  });
});
