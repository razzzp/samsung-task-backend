
import { configDotenv } from "dotenv";
configDotenv()

import express, { Errback, NextFunction, Request, Response } from "express";
import { provinceRouter } from "./routers/province-router";
import { kabupatenRouter } from "./routers/kabupaten-router";
import e from "express";
import { ControllerError } from "./controllers/controller";
import { DataValidationError } from "./validators/data-validator";
import { RepoObjectNotFoundError, RepoParamError } from "./repositories/repo";
import cors from "cors";


const app = express();
const PORT = 5000;

app.use(cors({
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}))
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get('/', (req, res) => {
    return res.send("Hello");
})

// province router
app.use('/api/v1/provinces', provinceRouter);
//kabu paten router
app.use('/api/v1/kabupaten', kabupatenRouter);

// not found
app.use((req,res) =>{
    return res.status(404).send("404 not found")
})


// set error status codes
app.use((err: any, req : Request, res: Response, next: NextFunction) => {
    if (err instanceof ControllerError 
        || err instanceof DataValidationError
        || err instanceof RepoObjectNotFoundError
        || err instanceof RepoParamError){
        (err as any).status = 400;
        return next(err);
    }
})

// error handler
app.use((err: any, req : Request, res: Response, next: NextFunction) => {
    if(res.headersSent){
        return next(err);
    }
    console.error(err.stack)
    return res.status(err.status? err.status : 500).send({
        error: err.message
    });
})

app.listen(PORT, ()=> {
    console.log(`express: listening on port ${PORT}`);
});