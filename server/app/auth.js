'use strict'

const jwt = require('jsonwebtoken');
const secret = "some secret"; // Read from config

const generateAuthToken = (userId) => {
    return jwt.sign({id : userId},secret, {expiresIn : 24 * 60 * 60});
}

const verifyAuthToken = (req, res, next) => {
    let authToken = req.headers['x-access-token'];
    if(!authToken){
        console.error('authToken not available in req');
        return res.status(401).send('authToken not available in req');
    }
    jwt.verify(authToken, secret, (error, data) => {
        if(error){
            console.error(`Unauthorized access ${error}`);
            return res.status(402).send(`Unauthorized access ${error}`);
        }
        console.log(`Authorized ${data}`);
        next();
    })
}

module.exports = {
    generateAuthToken,
    verifyAuthToken
}
