import express from 'express';

const app = express();
const PORT = process.env.PORT || 3000;


//GET
app.get('/api/users/:id?filter=&value=', (req, res) => {

    const parsedId = parseInt(req.params.id)
    const {query: {filter, value}} = req

//query params validation + filter logic


    if (isNaN(parsedId)) {
        return res.status(400).send({msg: "Invalid id"})
    }
//find resource
    response.status(200).send({msg: "test", param: parsedId})
})


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})