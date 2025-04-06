import {Router} from 'express'
import {query, validationResult, body, matchedData, checkSchema} from 'express-validator'
import {createUserValidation} from "../schemaValidator/schemaValidator.js";
import {User} from '../schemas/user.schema.js';

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

        //session
        const ses = request.sesion;
        const sid = request.sesion.id;
        request.session.visited = true
        response.cookie("id", 12135, {maxAge: 3600})
        return response.status(200).send({msg: "test", param: parsedId})
    })

usersRouter.post('/api/users/create',
    async (req, res) => {
        try {
            // Validate request data
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({errors: errors.array()});
            }

            // Extract validated data
            const {name, email, password} = matchedData(req);

            // Check if user already exists
            const existingUser = await User.findOne({email});
            if (existingUser) {
                return res.status(400).send({msg: 'User already exists'});
            }

            // Create a new user instance
            const newUser = new User({name, email, password});

            // Save the new user to the database
            await newUser.save();

            return res.status(201).send({msg: 'User created successfully', user: newUser});
        } catch (error) {
            console.error(error);
            return res.status(500).send({msg: 'Internal Server Error'});
        }


    })

export default usersRouter