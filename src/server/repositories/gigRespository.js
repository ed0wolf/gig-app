var fs = require('fs');
var path = require('path');
var moment = require('moment');

var allGigs = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../../../database/gigs.json')));

var getCountry = (gig) => { 
    if(gig.venue && gig.venue.country) {
        return gig.venue.country["@name"];
    };
    return 'unknown';
};
var getYear = (gig) => moment(gig["@eventDate"], 'DD-MM-YYYY').year();

module.exports.getGigFiltersForArtist = (artistId) => {
    return new Promise((success, error) => {
        var filters = {
            country: {},
            year: {}
        };

        for(var gig in allGigs.filter(x => x.artist['@mbid'] === artistId)) {
            filters.country[getCountry(gig)] = null;
            filters.year[getYear(gig)] = null;
        }

        success({
            country: Object.keys(filters.country),
            year: Object.keys(filters.year)
        });
    });
}