var parse = require('./parseclient');

module.exports = {
    addCrime: function(req, res) {
        parse.addCrime({latitude: 23, longitude: 21});
        res.send('addCrime');
    },

    getCrimes: function(req, res) {
        parse.getCrimes(22, 22, 100, function(crimes) {
            res.send(crimes);
        });
    }
};
