const Router = require('express-promise-router')
const { Message } = require('../../db');
const auth = require('../../auth/auth');

const router = new Router()
module.exports = router


router.get('/', auth ,async (req, res) => {
    
    try{
        const result = await Message.find({}).exec();
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
        const result = await Message.findById(req.params.id);
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
    const { user, room, content } = req.body;
    try{
        var newMessage = new Message({
            user, room, content
        });
        var result = await newMessage.save();
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
    let { _id, user, room, content } = req.body;
    try{
        const result = await Message.replaceOne({ _id: _id }, { user, room, content });
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
        const result = await Message.deleteOne({ _id: req.params.id });
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