## Introduction

This is a GraphQL Server solution that will return data about users found in a directory database.  The database is being hosted on a MongoDB Atlas instance and includes two collections: Departments and People.

## Build Instructions
Create a clone of this repository and run npm start.
This will create an Express server at the port defined in the .env file.
As an example/test, you should be able to access either http://localhost:8080/departmnets or http://localhost:8080/people after running npm start.
These will list either all department data or all people data respectively.

## Folder Structure
└───src
    ├───models 
    ├───routes
    ├───services
    └───test

### models
This folder includes a graphql model file for each collection

### routes
This folder includes a router file for each collection.  The router files define the CRUD operations using standard REST API commands.  It is important to note that ALL GraphQL commands are still sent via a GET request; the use of the terms "POST, PUT, DELETE" are used for easier digestion/reference to REST API.

### services
This folder contains our database connection files

### test
This folder will contain all spec files for mocha related tests

## Supported CRUD Operations
Both departments and people have supported operations for GET, POST, PUT, and DELETE as defined in the 

## Examples
http://localhost:8080/departments
This will list out all available departments

http://localhost:8080/departments/640a109244fa7ab0e887afae
This will return the Marketing department

http://localhost:8080/people/
This will list out all available people

http://localhost:8080/people/640a105044fa7ab0e8876271
This will return the person Kody Conn