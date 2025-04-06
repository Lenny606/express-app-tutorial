import passport from 'passport';
import {Strategy} from 'passport-discord';
import {DiscordUser} from "../schemas/discord-user.schema.js";

//needs cleintId ,secret, redierdUrl
passport.use(new Strategy({
        clientID: '882031555513600000',
        clientSecret: '<KEY>',
        callbackURL: 'http://localhost:3000/api/auth/discord/callback',
        scope: ['identify']
    },
    async (accessToken, refreshToken, profile, done) => {

        try {
            const finduser = await DiscordUser.findOne({ discordId: profile.id });
            if (!finduser) {

                const newUser = new DiscordUser({
                    username: profile.username,
                    discordId: profile.id
                })

                await newUser.save();
                return done(null, newUser);
            }
            return done(null, finduser);
        } catch (e) {
            return done(e, null)
        }
    }
))

//serialize validated user and pass his id to sessionID
passport.serializeUser((user, done) => {
    done(null, user.id);
})

//takes id from session and finds user, then attach him to request
passport.deserializeUser(async (id, done) => {
    try {
        const finduser = await DiscordUser.findById(id);
        if (!finduser) {
            throw new Error('User not found');
        }
        return done(null, finduser);
    } catch (e) {
        return done(e, null)
    }
})