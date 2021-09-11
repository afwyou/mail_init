var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer')
router.get('/', function (req, res) {
    res.render('contact');
});
router.get('/review', function (req, res) {
    res.render('contactReview');
});
router.post('/post', function (req, res) {
    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'hexschooltest6@gmail.com',
            pass: 'edith1004'
        }
    })
    var mailOptions = {
        from: '"六角學院"<service@hexschool.com>',
        to: 'hexschooltest6@gmail.com',
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
