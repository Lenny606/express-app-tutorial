import express from 'express';
import {query, validationResult, body, matchedData, checkSchema} from 'express-validator'
import {createUserValidation} from "../schemaValidator/schemaValidator.js";
import usersRouter from "../routes/users.mjs"

const app = express();
app.use(express.json()); //native parser
const PORT = process.env.PORT || 3000;

//MW
const loggingMiddleware = (req, res, next) => {
    console.log("Request received");
    next();
}
app.use(usersRouter)


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})