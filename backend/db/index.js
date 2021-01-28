// const { Pool } = require('pg')
// const pool = new Pool()
// module.exports = {
//   query: (text, params) => pool.query(text, params)
// }


var mongoose = require('mongoose');
mongoose.connect('mongodb+srv://adminin:adminin@cluster0.qw89z.mongodb.net/TI?retryWrites=true&w=majority',{useNewUrlParser: true,useUnifiedTopology: true });


// Create User Schema
const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        index: true,
        unique: true 
    },
    password: {
        type: String,
        select: false
    }
});
// Create Post Schema
const RoomSchema = new mongoose.Schema({
    name: {
        type: String,
        index: true, 
        unique: true 
    },
    password: {
        type: String,
        select: false
    },
    messages:{
        type:[
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            },
            date: { type: Date, default: Date.now },
            content: String
        }],
        select: false
    }
});

// const MessageSchema = new mongoose.Schema({
    
//     room: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'Room'
//     },
//     date: { type: Date, default: Date.now },
//     content: String
// });
// We then need to create models to use it
module.exports={
    User : mongoose.model("User", UserSchema),
    Room : mongoose.model("Room", RoomSchema),
    // Message : mongoose.model("Message", MessageSchema)
}