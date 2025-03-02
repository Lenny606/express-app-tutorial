import {Router} from 'express'
import {query, validationResult, body, matchedData, checkSchema} from 'express-validator'
import {createUserValidation} from "../schemaValidator/schemaValidator.js";

const usersRouter = Router()


// GET /users
usersRouter.post("/api/users", checkSchema(createUserValidation),
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
usersRouter.get('/api/users/:id?filter=&value=',
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

        //cookies
        const cookie = req.headers.cookie //not parsed from header
        const cookieParsed = req.cookies // parsed with MW
        const cookieSigned = req.signedCookies // parsed with MW cookieParser('secret')
        response.cookie("id", 12135, {maxAge: 3600})
        return response.status(200).send({msg: "test", param: parsedId})
    })

export default usersRouter