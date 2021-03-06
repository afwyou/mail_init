var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer')
var csrf = require('csurf')
var csrfProtection = csrf({ cookie: true })//我要使用她的功能
require('dotenv').config()
router.get('/', csrfProtection, function (req, res) {
    //console.log(req.csrfToken())
    res.render('contact', {
        csrfToken: req.csrfToken(),
        errors: req.flash('errors')
    });//把參數帶入
});
router.get('/review', function (req, res) {
    res.render('contactReview');
});
router.post('/post', csrfProtection, function (req, res) {
    if (req.body.username === '') {
        req.flash('errors', '姓名不可以為空')
        res.redirect('/contact')
    }
    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: process.env.gmailUser,
            pass: process.env.gmailPass
        }
    })
    var mailOptions = {
        from: '"六角學院"<service@hexschool.com>',
        to: 'afwyousenge@gmail.com',
        subject: req.body.username + '記了一封信',
        text: req.body.description
    }
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            return console.log(error)
        }
        res.redirect('review')
    })
});
module.exports = router;
