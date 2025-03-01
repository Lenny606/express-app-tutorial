import express from 'express';
import {query, validationResult, body, matchedData, checkSchema} from 'express-validator'
import {createUserValidation} from "../schemaValidator/schemaValidator.js";

const app = express();
app.use(express.json()); //native parser
const PORT = process.env.PORT || 3000;

//MW
const loggingMiddleware = (req, res, next) => {
    console.log("Request received");
    next();
}


//GET
app.get('/api/users/:id?filter=&value=',
    query('filter').isString().notEmpty().isLength({min: 3}).withMessage("Filter validation"),
    (req, res) => {

        const parsedId = parseInt(req.params.id)
        const {query: {filter, value}} = req

        //query params validation + filter logic
        //validator is attached in req
        const result = validationResult(req)
        if (!result.isEmpty()) {
            return res.status(400).json({errors: result.array()})
        }
        if (isNaN(parsedId)) {
            return res.status(400).send({msg: "Invalid id"})
        }
        //find resource

        return response.status(200).send({msg: "test", param: parsedId})
    })

app.post(
    '/api/users', checkSchema(createUserValidation),
    (req, res) => {
        const {body} = req
        //logic

        //validation
        const result = validationResult(req)
        if (!result.isEmpty()) {
            return res.status(400).json({errors: result.array()})
        }
        const data = matchedData(req)

        const resource = {}
        return response.status(201).send({msg: "test", data: resource})
    })

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})