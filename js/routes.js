var router = require('express').Router();
var handler = require('./handler');

router.get('/', handler.index);
router.post('/addCrime', handler.addCrime);
router.get('/getCrimes', handler.getCrimes);

module.exports = router;
