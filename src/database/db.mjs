import mongoose from 'mongoose';

const db = mongoose.connect('mongodb://localhost:27017/express-tutorial');

db.then(() => console.log('Connected to database'))
    .catch(err => console.log(err));

export default db