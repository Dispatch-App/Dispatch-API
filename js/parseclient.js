var Parse = require('Parse').Parse;
var credentials = require('./credentials');

Parse.initialize(credentials.applicationId, credentials.clientKey);

module.exports = {
    getCrimes: function(lat, lng, range, callback) {
        var query = new Parse.Query("Crime");
        query.withinMiles("location", new Parse.GeoPoint(lat, lng), range);
        query.find({
            success: function(crimes) {
                callback(crimes);
            },

            error: function(e) {
                callback(e);
            }
        });
    },
    
    addCrime: function(crime, callback) {
        var crimeObj = new Parse.Object("Crime");
        crimeObj.set("location", new Parse.GeoPoint(crime.latitude, crime.longitude));
        crimeObj.set("type", crime.type);
        crimeObj.save(null, {
            success: function(object) {
                callback({code: 200, message: "success"});
            },

            error: function(object, err) {
                callback({code: 500, error: err});
            }
        });
    }
};
