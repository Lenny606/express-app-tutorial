import express from 'express';
import {query, validationResult, body, matchedData, checkSchema} from 'express-validator'
import {createUserValidation} from "../schemaValidator/schemaValidator.js";
import cookieParser from "cookie-parser";
import session from "express-session";
import routes from "../routes/rootRouter.mjs"

const app = express();
app.use(express.json()); //native json parser
app.use(cookieParser())
app.use(session({
    secret: "some secret",
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: 60000 * 60
    }
}))

const PORT = process.env.PORT || 3000;

//MW
const loggingMiddleware = (req, res, next) => {
    console.log("Request received");
    next();
}
app.use(routes)


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})