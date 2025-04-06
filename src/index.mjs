import express from 'express';
import {query, validationResult, body, matchedData, checkSchema} from 'express-validator'
import {createUserValidation} from "./schemaValidator/schemaValidator.js";
import cookieParser from "cookie-parser";
import session from "express-session";
import routes from "./routes/rootRouter.mjs"
import {mockUsers} from './data/mockUsers.mjs';
import passport from 'passport';
import './strategies/local-strategy.mjs' //import default from file
import db from './database/db.mjs';

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

app.use(passport.initialize());
app.use(passport.session()); //uses express-session to work with User

const PORT = process.env.PORT || 3000;

//MW
const loggingMiddleware = (req, res, next) => {
    console.log("Request received");
    next();
}
app.use(routes)

// Authentication endpoint
// Validates user credentials and creates a session if valid
// Request body should contain username and password
// Returns 401 if credentials are invalid
// Sets user data in session if authentication successful
// app.post("/api/auth", (req, res) => {
//     const { body: {username, password}} = req;
//     const user = mockUsers.find(user => user.username === username && user.password === password);
//     if (!user) {
//         return res.status(401).json({message: "Invalid credentials"});
//     }
//     req.session.user = user;
//     return res.status(200).send(user)
// })

//AUTH WITH PASSPORT
app.post("/api/auth", passport.authenticate('local'), (req, res) => {
    res.status(200);
})

app.post('/api/auth/logout', (req, res) => {
    if (!req.user) {
        return res.status(401).json({message: "Unauthorized"});
    }
    req.logout((err) => {
        if (err) {
            return res.status(500).json({message: "Internal server error"});
        }
        return res.status(200).send({message: "Logged out"});
    });

})


app.get("/api/auth/status", (req, res) => {
    const {session: {user}} = req;
    if (!user) {
        return res.status(401).json({message: "Unauthorized"});
    }
    return res.status(200).send(user);
})

app.post("/api/cart", (req, res) => {
    if (!req.session.user) {
        return res.status(401).json({message: "Unauthorized"});
    }
    const {body: {productId, quantity}} = req;
    const {cart} = req.session
    if (cart) {
        cart.push({productId, quantity})
    } else {
        req.session.cart = [{productId, quantity}]
    }
    return res.status(201).send(req.session.cart)
})
app.get("/api/cart", (req, res) => {
    const {session: {user}} = req;
    if (!user) {
        return res.status(401).json({message: "Unauthorized"});
    }
    const {session: {cart}} = req;
    if (!cart) {
        return res.status(200).json({cart: []})
    }
    return res.status(200).json({cart})
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})