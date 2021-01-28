const Router = require('express-promise-router')
const { User } = require('../../db');
const auth = require('../../auth/auth');
const hash = require('../../auth/hash');
const router = new Router()
module.exports = router


router.get('/', auth ,async (req, res) => {
    
    try{
        const result = await User.find({}).exec();
        res.json({
            success: true,
            message: 'Command executed.',
            res: result
        });
    }catch(err){
        res.json({
            success: false,
            message: err
        });
    }
});

router.get('/:id', auth ,async (req, res) => {
    try{
        const result = await User.findById(req.params.id);
        res.json({
            success: true,
            message: 'Command executed.',
            res: result
        });
    }catch(err){
        res.json({
            success: false,
            message: err
        });
    }
});

router.post('/', auth ,async (req, res) => {
    const { name, password } = req.body;
    try{
        var newUser = new User({
            name, password : await hash(password)
        });
        var result = await newUser.save();
        res.json({
            success: true,
            message: 'Command executed.',
            res: result
        });
    }catch(err){
        res.json({
            success: false,
            message: err
        });
    }
});

router.put('/:id', auth ,async (req, res) => {
    let { _id, name, password } = req.body;
    try{
        const result = await User.replaceOne({ _id: _id }, { name, password });
        res.json({
            success: true,
            message: 'Command executed.',
            res: result
        });
    }catch(err){
        res.json({
            success: false,
            message: err
        });
    }
});

router.delete('/:id', auth ,async (req, res) => {
    try{
        const result = await User.deleteOne({ _id: req.params.id });
        res.json({
            success: true,
            message: 'Command executed.',
            res: result
        });
    }catch(err){
        res.json({
            success: false,
            message: err
        });
    }
});