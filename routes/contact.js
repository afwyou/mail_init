var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer')
var csrf = require('csurf')
var csrfProtection = csrf({ cookie: true })//我要使用她的功能
router.get('/', csrfProtection, function (req, res) {
    //console.log(req.csrfToken())
    res.render('contact', { csrfToken: req.csrfToken() });//把參數帶入
});
router.get('/review', function (req, res) {
    res.render('contactReview');
});
router.post('/post', csrfProtection, function (req, res) {
    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'hexschooltest6@gmail.com',
            pass: 'edith1004'
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
