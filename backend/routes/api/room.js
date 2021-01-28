const Router = require('express-promise-router')
const { Room } = require('../../db');
const auth = require('../../auth/auth');

const router = new Router()
module.exports = router


router.get('/', auth ,async (req, res) => {
    
    try{
        const result = await Room.find({}).exec();
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
    // console.count( req.body);
    const {password} = req.query;
    try{
        const result = await Room.findById(req.params.id).select(' +messages').populate({
            path: 'messages',
            populate: { path: 'user' }
          });;
        // if(result.password == password){
        //     result.password="";
            res.json({
                success: true,
                message: 'Command executed.',
                res: result
            });
        // }else{
        //     res.json({
        //         success: false,
        //         message: 'Bad password.'
        //     });
        // }
    }catch(err){
        res.json({
            success: false,
            message: err
        });
    }
});

router.post('/', auth ,async (req, res) => {
    const { name } = req.body;
    try{
        var newRoom = new Room({
            name, //password
        });
        var result = await newRoom.save();
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

router.post('/:id', auth ,async (req, res) => {
    const { message, password } = req.body;
    console.log(req.body)
    try{
        // const pass = await Room.findById(req.params.id).select('+password');
        // if(pass.password == password){
            
            const result = await Room.updateOne(
                { _id: req.params.id }, 
                { $push: { messages : message } }
            );
            console.log(result)
            res.json({
                success: true,
                message: 'Command executed.',
                // res: result
            });
        // }else{
        //     res.json({
        //         success: false,
        //         message: 'Bad password.'
        //     });
        // }
    }catch(err){
        console.error(err)
        res.json({
            success: false,
            message: err
        });
    }
});


router.put('/:id', auth ,async (req, res) => {
    let { _id, name, password } = req.body;
    try{
        
        const result = await Room.replaceOne({ _id: _id }, { name, password });
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
        const result = await Room.deleteOne({ _id: req.params.id });
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