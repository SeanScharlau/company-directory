// External dependencies
import { ObjectId } from "mongodb";

// Class Implementation
export default class Department {
    constructor(
        public name: string, 
        public departmentID: string,
        public id?: ObjectId
    ) {}
}