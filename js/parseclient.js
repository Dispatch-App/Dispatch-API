var Parse = require('Parse').Parse;
var credentials = require('./credentials');

Parse.initialize(credentials.applicationId, credentials.clientKey);

module.exports = {
    getCrimes: function(lat, lng, range, callbacks) {
        var query = new Parse.Query("Crime");
        query.withinMiles("location", new Parse.GeoPoint(lat, lng), range);
        query.find({
            success: function(crimes) {
                callbacks.success(crimes);
            },

            error: function(e) {
                callbacks.error(e);
            }
        });
    },

    addCrime: function(crime, callbacks) {
        var crimeObj = new Parse.Object("Crime");
        crimeObj.set("location", new Parse.GeoPoint(crime.latitude, crime.longitude));
        crimeObj.set("type", crime.type);
        crimeObj.save(null, {
            success: function(object) {
                callbacks.success(object);
            },

            error: function(object, err) {
                callbacks.error(object, err);
            }
        });
    }
};
