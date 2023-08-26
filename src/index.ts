


import express from "express";
import { provinceRouter } from "./routers/province-router";
import { configDotenv } from "dotenv";

const app = express();
const PORT = 5000;

configDotenv()

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get('/', (req, res) => {
    return res.send("Hello");
})

// province router
app.use('/api/v1/provinces', provinceRouter);

// not found
app.use((req,res) =>{
    return res.status(404).send("404 not found")
})

app.listen(PORT, ()=> {
    console.log(`express: listening on port ${PORT}`);
});