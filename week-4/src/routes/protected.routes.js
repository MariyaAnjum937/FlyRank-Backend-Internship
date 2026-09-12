const express = require('express');
const router = express.Router();

// ====================
// STAGE 2 - PROTECTED ROUTE
// ====================

router.get('/profile', (req, res)=>{
    const authHeader = req.headers.authorization;
    if(!authHeader){
        return res.status(401).json({
            error : 'Access token required'
        });
    }
    if(!authHeader.startsWith("Bearer ")){
        return res.status(401).json({
            error : 'Access token required'
        });
    }

    const token = authHeader.split(" ")[1];

    if(!token){
        return res.status(401).json({
            error : 'Access token required'
        })
    }

    return res.status(200).json({
        message : 'Access token recieved'
    });
})

module.exports = router;