const Router = require('express-promise-router')
// const db = require('../../db');
const {User} = require('../../db');
const hash = require('../../auth/hash');
const jwt = require("jsonwebtoken");

const router = new Router()
module.exports = router


router.post('/', async (req, res) => {
    const { username, password } = req.body
    
    try{
        var newUser = new User({
            username, password : await hash(password)
        });
        var result = await newUser.save();
        const token = {
            "accessToken": jwt.sign({ username: result.username, id: result._id }, process.env.ACCESS_TOKEN_SECRET,{ expiresIn: '1m' }),
            "refreshToken": jwt.sign({ username: result.username, id: result._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' })
        }
        res.json({
            success: true,
            message: 'Registration succeed',
            token: token
        });
    }catch(err){
        res.json({
            success: false,
            message: err
        });
    }
});