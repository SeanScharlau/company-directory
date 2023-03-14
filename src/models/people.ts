// External dependencies
import { ObjectId } from "mongodb";

// Class Implementation
export default class People {
    constructor(
        public employeeID: string,
        public firstName: string, 
        public lastName: string, 
        public jobTitle: string, 
        public departmentId: string, 
        public managerId: string,         
        public id?: ObjectId
    ) {}
}