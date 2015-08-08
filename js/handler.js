var parse = require('./parseclient');

function isNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

function isLocationValid(lat, lng) {
    return (isNumber(lat) && isNumber(lng)) && !(lat < -90 || lat > 90 || lng < -180 || lng > 180);
}

module.exports = {
    index: function(req, res) {
        res.end();
    },

    addCrime: function(req, res) {
        var lat = parseFloat(req.body.latitude);
        var lng = parseFloat(req.body.longitude);
        var crimeType = req.body.type;
        var crime = {latitude: lat, longitude: lng, type: crimeType};

        if(!isLocationValid(lat, lng)) {
            res.status(400);
            res.send({success: false, code: 400, message: "Invalid latitude or longitude"});
            return;
        }

        parse.addCrime(crime, {
            success: function(o) {
                res.status(200);
                res.send({success: true, message: "success"});
            },

            error: function(o, e) {
                res.status(500);
                res.send({success: false, message: e});
            }
        });
    },

    getCrimes: function(req, res) {
        var lat = parseFloat(req.query.latitude);
        var lng = parseFloat(req.query.longitude);
        var range = parseFloat(req.query.range);

        // Validate
        if(!isLocationValid(lat, lng) || !isNumber(range) || range <= 0) {
            res.status(400);
            res.send({success: false, code: 400, message: "Invalid latitude, longitude, or range"});
            return;
        }

        parse.getCrimes(lat, lng, range, {
            success: function(crimeArray) {
                res.status(200);
                res.send({success: true, code: 200, crimes: crimeArray});
            },

            error: function(e) {
                res.status(400);
                res.send({success: false, message: e});
            }
        });
    }
};
