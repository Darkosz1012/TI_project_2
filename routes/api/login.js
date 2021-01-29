const Router = require('express-promise-router')
const verify = require('../../auth/verify');
const jwt = require("jsonwebtoken");
const {User} = require('../../db');

const router = new Router()
module.exports = router

router.post('/', async (req, res) => {
    const { username, password } = req.body
    try{
        const result = await User.findOne({ username }).select('+password').exec();
        if (verify(password, result.password)) {
            const token = {
                "accessToken": jwt.sign({ username: result.username, id: result._id }, process.env.ACCESS_TOKEN_SECRET,{ expiresIn: '1m' }),
                "refreshToken": jwt.sign({ username: result.username, id: result._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' })
            }
            res.json({
                success: true,
                message: 'Authentication succeed',
                token: token
            });
        } else {
            res.json({
                success: false,
                message: 'Username or password incorrect'
            });
        }
    }catch(err){
        res.json({
            success: false,
            message: err
        });
    }

})