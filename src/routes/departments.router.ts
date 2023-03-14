import express, { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { collections } from "../services/database.service";

export const departmentsRouter = express.Router();

departmentsRouter.use(express.json());

departmentsRouter.get("/", async (_req: Request, res: Response) => {
    try {
        // Call find with an empty filter object, meaning it returns all documents in the collection. Saves as Department array to take advantage of types
        const departments = await collections.departments.find({}).toArray();

        res.status(200).send(departments);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Example route: http://localhost:8080/departments/640a109244fa7ab0e887afae -- Will return Marketing
departmentsRouter.get("/:id", async (req: Request, res: Response) => {
    const id = req?.params?.id;

    try {
        // _id in MongoDB is an objectID type so we need to find our specific document by querying
        const query = { _id: new ObjectId(id) };
        const department = await collections.departments.findOne(query);

        if (department) {
            res.status(200).send(department);
        }
    } catch (error) {
        res.status(404).send(`Unable to find matching document with id: ${req.params.id}`);
    }
});

departmentsRouter.post("/", async (req: Request, res: Response) => {
    try {
        const newDepartment = req.body;
        const result = await collections.departments.insertOne(newDepartment);

        result
            ? res.status(201).send(`Successfully created a new department with id ${result.insertedId}`)
            : res.status(500).send("Failed to create a new department.");
    } catch (error) {
        console.error(error);
        res.status(400).send(error.message);
    }
});

departmentsRouter.put("/:id", async (req: Request, res: Response) => {
    const id = req?.params?.id;

    try {
        const updatedDepartment = req.body;
        const query = { _id: new ObjectId(id) };
        // $set adds or updates all fields
        const result = await collections.departments.updateOne(query, { $set: updatedDepartment });

        result
            ? res.status(200).send(`Successfully updated department with id ${id}`)
            : res.status(304).send(`Department with id: ${id} not updated`);
    } catch (error) {
        console.error(error.message);
        res.status(400).send(error.message);
    }
});

departmentsRouter.delete("/:id", async (req: Request, res: Response) => {
    const id = req?.params?.id;

    try {
        const query = { _id: new ObjectId(id) };
        const result = await collections.departments.deleteOne(query);

        if (result && result.deletedCount) {
            res.status(202).send(`Successfully removed department with id ${id}`);
        } else if (!result) {
            res.status(400).send(`Failed to remove department with id ${id}`);
        } else if (!result.deletedCount) {
            res.status(404).send(`Department with id ${id} does not exist`);
        }
    } catch (error) {
        console.error(error.message);
        res.status(400).send(error.message);
    }
});