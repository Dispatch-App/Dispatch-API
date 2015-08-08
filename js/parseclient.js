var Parse = require('Parse').Parse;
var credentials = require('./credentials');

Parse.initialize(credentials.applicationId, credentials.clientKey);

module.exports = {
    getCrimes: function(lat, lng, rad, callback) {
        var query = new Parse.Query("Crime");
        query.withinMiles("location", new Parse.GeoPoint(lat, lng), rad);
        query.find({
            success: function(crimes) {
                callback(crimes);
            }
        });
    },

    addCrime: function(crime) {
        var crimeObj = new Parse.Object("Crime");
        crimeObj.set("location", new Parse.GeoPoint(crime.latitude, crime.longitude));
        crimeObj.set("type", crime.type);
        crimeObj.save();
    }
};
