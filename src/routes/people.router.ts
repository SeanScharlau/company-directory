import express, { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { collections } from "../services/database.service";

export const peopleRouter = express.Router();

peopleRouter.use(express.json());

peopleRouter.get("/", async (_req: Request, res: Response) => {
    try {
        // Call find with an empty filter object, meaning it returns all documents in the collection. Saves as Person array to take advantage of types
        const people = await collections.people.find({}).toArray();

        res.status(200).send(people);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Example route: http://localhost:8080/people/640a105044fa7ab0e8876271 -- Will Return Kody Conn
peopleRouter.get("/:id", async (req: Request, res: Response) => {
    const id = req?.params?.id;

    try {
        // _id in MongoDB is an objectID type so we need to find our specific document by querying
        const query = { _id: new ObjectId(id) };
        const person = await collections.people.findOne(query);

        if (person) {
            res.status(200).send(person);
        }
    } catch (error) {
        res.status(404).send(`Unable to find matching document with id: ${req.params.id}`);
    }
});

peopleRouter.post("/", async (req: Request, res: Response) => {
    try {
        const newPerson = req.body;
        const result = await collections.people.insertOne(newPerson);

        result
            ? res.status(201).send(`Successfully created a new person with id ${result.insertedId}`)
            : res.status(500).send("Failed to create a new person.");
    } catch (error) {
        console.error(error);
        res.status(400).send(error.message);
    }
});

peopleRouter.put("/:id", async (req: Request, res: Response) => {
    const id = req?.params?.id;

    try {
        const updatedPerson = req.body;
        const query = { _id: new ObjectId(id) };
        // $set adds or updates all fields
        const result = await collections.people.updateOne(query, { $set: updatedPerson });

        result
            ? res.status(200).send(`Successfully updated person with id ${id}`)
            : res.status(304).send(`Person with id: ${id} not updated`);
    } catch (error) {
        console.error(error.message);
        res.status(400).send(error.message);
    }
});

peopleRouter.delete("/:id", async (req: Request, res: Response) => {
    const id = req?.params?.id;

    try {
        const query = { _id: new ObjectId(id) };
        const result = await collections.people.deleteOne(query);

        if (result && result.deletedCount) {
            res.status(202).send(`Successfully removed person with id ${id}`);
        } else if (!result) {
            res.status(400).send(`Failed to remove person with id ${id}`);
        } else if (!result.deletedCount) {
            res.status(404).send(`Person with id ${id} does not exist`);
        }
    } catch (error) {
        console.error(error.message);
        res.status(400).send(error.message);
    }
});