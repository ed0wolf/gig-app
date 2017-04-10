var fs = require('fs');
var path = require('path');
var moment = require('moment');

var allGigs = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../../../database/gigs.json')));

var getArtistId = gig => gig.artist['@mbid'];
var getCountry = gig => gig.venue.city.country["@name"];
var getYear = gig => moment(gig["@eventDate"], 'DD-MM-YYYY').year();

module.exports.getGigFiltersForArtist = (artistId) => {
    return new Promise((success, error) => {
        var filters = {
            country: {},
            year: {}
        };

        allGigs.filter(x => getArtistId(x) === artistId).forEach(function(gig) {
            filters.country[getCountry(gig)] = null;
            filters.year[getYear(gig)] = null;
        });

        success({
            country: Object.keys(filters.country),
            year: Object.keys(filters.year)
        });
    });
}

module.exports.getGigsMatchingFilters = (artistId, filters) => {
    return new Promise((success, error) => {
        var filterPredicates = [];
        if(filters.country) {
            filterPredicates.push(gig => getCountry(gig) === filters.country);
        }
        if(filters.year) {
            filterPredicates.push(gig => getYear(gig).toString() === filters.year);
        }

        var matchedGigs = allGigs.filter(x => getArtistId(x) === artistId && filterPredicates.every(pred => pred(x)));

        success(matchedGigs);
    });
};