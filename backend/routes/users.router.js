const express = require('express');
const router = express.Router();

const UserModal = require('../models/users.model'); 


router.get('/',async (req, res) => {
    const totalRecords = await UserModal.find({}).count();
    const perPage = parseInt(req.query.perPage);
    const pageNumber = parseInt(req.query.pageNo);
    const avg = totalRecords / perPage;
    let offset = 0;
    let limit = 0;
    if(pageNumber === 1){
         limit = perPage;
         offset = 0
    } else if (pageNumber !== 1) {
        limit = perPage;
        offset = parseInt(pageNumber) * parseInt(perPage) - parseInt(perPage);
    } else {
        limit = 0;
    }
    const rs = await UserModal.find({}).skip(offset).limit(perPage);
    res.send({totalRecords, offset, perPage, pageNumber, avg, data: rs});
});

router.get('/:id',async (req, res) => {
    const rs = await UserModal.findById({_id: req.params.id});
    res.send(rs);
});

router.post('/',async (req, res) => {
    const User = new UserModal({
        username: req.body.userState.username,
        firstName: req.body.userState.firstName,
        lastName: req.body.userState.lastName,
        isActive: req.body.userState.isActive
    });

    const rs = await User.save();

    if(!rs){
        res.send('error');
    } else {
        res.send('success');
    }
});

router.put('/:id', async (req, res) => {

    const usersUpdate = {
        username: req.body.userState.username,
        firstName: req.body.userState.firstName,
        lastName: req.body.userState.lastName,
        isActive: req.body.userState.isActive
    }

    const rs = await UserModal.findByIdAndUpdate(req.params.id, usersUpdate);

    if(!rs){
        res.send('error');
    } else {
        res.send('success');
    }
});

router.delete('/:id', async (req, res) => {
    const rs = await UserModal.deleteOne({_id: req.params.id});

    if(!rs){
        res.send('error');
    } else {
        res.send('success');
    }
});

module.exports = router;