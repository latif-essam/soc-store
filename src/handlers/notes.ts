import express, { Request, Response } from "express";

import { NotesTable, Note } from "../models/notes";

const store = new NotesTable();

const index = async (_req: Request, res: Response) => {
  const notes = await store.index();
  res.json(notes);
};
const show = async (req: Request, res: Response) => {
  try {
    const note = await store.show(req.body.id);
    res.json(note);
  } catch (error) {
    res.json(error);
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const note: Note = {
      content: req.body.content,
      important: req.body.important,
    };
    const newNote = await store.create(note);
    res.send(newNote);
  } catch (error) {
    res.status(400).json(error);
  }
};

const destroy = async (req: Request, res: Response) => {
  try {
    const deleted = await store.delete(req.body.id);
    res.json(deleted);
  } catch (error) {
    res.json(error);
  }
};

const noteRoutes = (app: express.Application) => {
  app.get("/notes", index);
  app.get("/notes/:id", show);
  app.delete("/notes", destroy);
  app.post("/notes", create);
};
export default noteRoutes;
