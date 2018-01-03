var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', {title: 'Express'});
});

router.get('/test-api', function(req, res, next) {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({
        message: 'hello 4',
    }));
});

module.exports = router;
