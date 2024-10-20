// OAuth stuff below
const express = require("express");
const router = express.Router();
const dotenv = require("dotenv");
dotenv.config();
const {OAuth2Client} = require("google-auth-library");
const URL = "http://127.0.0.1:3000/oauth";


router.post('/', async function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "http://localhost:5173");
    res.header('Referrer-Policy', 'no-referrer-when-downgrade');

    const redirectURL = URL;

    const oAuth2Client = new OAuth2Client(
        process.env.CLIENT_ID,
        process.env.CLIENT_SECRET,
        redirectURL
    );

    const authorizeURL = oAuth2Client.generateAuthUrl({
        access_type:'offline', // offline for testing
        scope: 'https://www.googleapis.com/auth/userinfo.profile openid',
        prompt: 'consent'
    })
    res.json({url: authorizeURL})
});

module.exports = router;