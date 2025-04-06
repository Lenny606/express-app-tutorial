import mongoose from 'mongoose';

const discordUserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    discordId : {
        type: String,
        required: true,
        unique: true,
    }
});

export const DiscordUser = mongoose.model('DiscordUser', discordUserSchema);