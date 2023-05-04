const express = require('express');
const router = express.Router();
const subscribers = require('../models/subscribers');

router.route('/')
    .get(async (req, res) => {
        try{
            const s = await subscribers.find();
            res.json(s);
        }catch(err){
            res.status(500).json({message: err.message});
            //Không phải lỗi người dùng hay khách hàng
            //Lỗi 500 là do CSDL có vấn đề
        }   
    })
    .post(async (req, res) =>{
        const s = new subscribers({
            name: req.body.name,
            subscribersToChannel: req.body.subscribersToChannel,
        })
        try{
            const newS = await s.save();
            res.status(201).json(newS);
        }catch(err){
            //Lỗi 400 là do người dùng nhập vào nha
            res.status(400).json({message: err.message});
        }
    })
router.route('/:id')
    .get(getsubscriber, (req,res) =>{
        res.send(res.subscriber);
    })
    .patch(getsubscriber, async (req,res) => {
        if(req.body.name!=null){
            res.subscriber.name = req.body.name;
        }
        if(req.body.subscribersToChannel!=null){
            res.subscriber.subscribersToChannel = req.body.subscribersToChannel;
        }
        try{
            const updatedSub = await res.subscriber.save();
            res.json(updatedSub);
        }catch(err){
            res.status(400).json({message: err.message});
        }
    })
    .delete(getsubscriber, async (req, res) =>{
        try{
            await res.subscriber.deleteOne();
            res.json({message:"deleted"});
        }catch(err){
            res.status(500).json({err: err.message})
        }
    })
async function getsubscriber(req, res, next){
    let subscriber
    try{
        subscriber = await subscribers.findById(req.params.id);
        if(subscriber==null){
            //Lỗi 404 không tìm thấy
            return res.status(404).json({message: "Không tìm thấy"});
        }
    }catch(err){
        return res.status(500).json({err: err.message});
    }
    res.subscriber = subscriber;
    next();
}
module.exports = router;