import { NotesTable, Note } from "../../models/notes";
const N: Note = {
  content: "lol po p ds",
  important: false,
};
const store = new NotesTable();

describe("Notes Table Model", () => {
  it("should have an index method", () => {
    expect(store.index).toBeDefined();
  });
  it("index method should return a list of notes ", async () => {
    const result = await store.index();
    console.log(result);
    // expect(result).toEqual(W);
  });
});
