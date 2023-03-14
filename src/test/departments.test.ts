import express from "express";
import 'mocha';

const app = express();

describe('departments', () =>{
   it('should find all departments', () => {
      return app.get('departments')
               
   });
});