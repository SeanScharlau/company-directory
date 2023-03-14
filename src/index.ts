import express from "express";
import { connectToDatabase } from "./services/database.service"
import { departmentsRouter } from "./routes/departments.router";
import { peopleRouter } from "./routes/people.router";

const app = express();
const port = 8080; // default port to listen

connectToDatabase()
    .then(() => {
        app.use("/departments", departmentsRouter);
        app.use("/people", peopleRouter);

        app.listen(port, () => {
            console.log(`Server started at http://localhost:${port}`);
        });
    })
    .catch((error: Error) => {
        console.error("Database connection failed", error);
        process.exit();
    });
