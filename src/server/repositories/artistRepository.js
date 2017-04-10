var fs = require('fs');
var path = require('path');

var allArtists = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../../../database/artists.json')));

module.exports.getAllArtists = () => {
    return new Promise((success, error) => {
        success(allArtists.map(x => { 
            return { id: x.id, name: x.name };
        }));
    });
}

module.exports.getArtisById = (id) => {
    return new Promise((success, error) => {
        var artist = allArtists.find(x => x.id === id);
        success(artist);
    })
}
