const express = require('express')
let router = express.Router();
const jwt = require('jsonwebtoken');
const UserService = require('../services/user-service')
require('dotenv').config({path: __dirname + '/.env'});


router.route('/')
    .get( async (req, res) => {
        try {
            const users = await UserService.getAllUsers();
            res.status(200).json(users);
        } catch (error) {
            
        }
    })

module.exports = router;