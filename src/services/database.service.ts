// External Dependencies
import * as mongoDB from "mongodb";
import * as dotenv from "dotenv";

// Global Variables
export const collections: { departments?: mongoDB.Collection, people?: mongoDB.Collection } = {}

// Initialize Connection
export async function connectToDatabase () {
    dotenv.config();
 
    const client: mongoDB.MongoClient = new mongoDB.MongoClient(process.env.DB_CONN_STRING);            
    await client.connect();        
    const db: mongoDB.Db = client.db(process.env.DB_NAME);

    const departmentsCollection: mongoDB.Collection = db.collection('departments');
    const peopleCollection: mongoDB.Collection = db.collection('people');
 
    collections.departments = departmentsCollection;
    collections.people = peopleCollection;
       
    console.log(`Successfully connected to database: ${db.databaseName} and collection: ${departmentsCollection.collectionName}`);
    console.log(`Successfully connected to database: ${db.databaseName} and collection: ${peopleCollection.collectionName}`);
 }