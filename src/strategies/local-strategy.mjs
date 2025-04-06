import passport from 'passport';
import {Strategy} from 'passport-local';
import {mockUsers} from "../data/mockUsers.mjs";

//passport would look in post request for these login variables
//if username is not used for auth, set variable as 1st argmunet as options
// {usernameField: 'email'}
export default passport.use(new Strategy(
    (username, password, done) => {
        console.log(username, password);
        try {
            const finduser = mockUsers.find(user => user.username === username && user.password === password);
            if (!finduser) {
                throw new Error('Invalid username or password');
            }
            done(null, finduser);
        } catch (e) {
            done(e, null)
        }
    }
))


//serialize validated user and pass his id to sessionID
passport.serializeUser((user, done) => {
    done(null, user.id);
})

//takes id from session and finds user, then attach him to request
passport.deserializeUser((id, done) => {
    try {
        const finduser = mockUsers.find(user => user.id === id);
        if (!finduser) {
            throw new Error('User not found');
        }
        done(null, finduser);
    } catch (e) {
            done(e, null)
    }
})