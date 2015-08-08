var router = require('express').Router();
var handler = require('./handler');

router.get('/addCrime', handler.addCrime);
router.get('/getCrimes', handler.getCrimes);

module.exports = router;
