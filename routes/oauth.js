const express = require('express')
let router = express.Router();
const jwt = require('jsonwebtoken');

const OAuthServivce = require('../services/oauth-service')

require('dotenv').config({path: __dirname + '/.env'});

function generateAccesToken(user) {
    return jwt.sign(user,process.env.ACCESS_TOKEN_SECRET, {expiresIn: '30m'});
}

router.route('/token')
    .post(async (req,res) => {
        try {
            const refreshToken = req.body.token
            const tokens = await OAuthServivce.getAllTokens();
            if(!tokens.find(t => t.refreshToken === refreshToken)) return res.sendStatus(403);
            jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
                if (err) return res.sendStatus(403);
                const accessToken = generateAccesToken({username: user.username});
                res.json({accessToken: accessToken});
            })
        } catch (error) {
            return res.status(500).send(`Internal server error: ${error.message}`);
        }
     
    })

router.route('/register')
    .post(async (req, res) => {
        try { 
            await OAuthServivce.registerUser(req.body)
            res.status(201).send('created');
        } catch (error) {
            if (error.name === 'AuthError') {
                res.status(403).send({error: error.message});
            } else {
                res.status(500).send(`Internal Server Error: ${error}`);
            }
           
        }
    })

router.route('/confirm')
    .post(async (req, res) => {
        /* Confirm with email */
    })

router.route('/login')
    .post(async (req, res) => {
        try {
            const authHeader = req.headers.authorization;
            if (authHeader) return res.sendStatus(308);

            console.log(req.body);
            await OAuthServivce.loginUser(req.body);

            const username = req.body.username;
            const tokenUser = {username: username};
            const accessToken = generateAccesToken(tokenUser);
            const refreshToken = jwt.sign(tokenUser, process.env.REFRESH_TOKEN_SECRET)
            
            OAuthServivce.saveToken(refreshToken);
            res.status(200).json({accessToken: accessToken, refreshToken: refreshToken});
        } catch (error) {
            if (error.name === 'AuthError') {
                res.status(403).send({error: error.message});
            } else {
                res.status(500).send(`Internal server error: ${error.message}`);
            }
            
        }
    });

// Delete refresh token from db
router.route('/logout')
    .delete((req, res) => {
        // 
    })


module.exports = router;