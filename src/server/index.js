var express = require('express');
var app = express();

var artistRepository = require('./repositories/artistRepository');
var gigRepository = require('./repositories/gigRespository');

app.use(express.static(`${__dirname}/../static`))

app.get('/', (req, res) => {
  res.sendFile('../static/index.html', { root: __dirname });
});

var handleRetrievalResponse = (promise, res) => {
  return promise.then(data => {
    res.send({ data: data });
  }).catch(err => {
    console.error(err)    
    res.status(500);
    res.end();
  });
}

app.get('/api/artists', (req, res) => {
  handleRetrievalResponse(artistRepository.getAllArtists(), res);
});

app.get('/api/artists/:id', (req, res) => {
  handleRetrievalResponse(artistRepository.getArtisById(req.params.id), res);
});

app.get('/api/gigs/:artistId/filters', (req, res) => {
  handleRetrievalResponse(gigRepository.getGigFiltersForArtist(req.params.artistId), res);
});

app.get('/api/gigs/:artistId', (req, res) => {
  handleRetrievalResponse(gigRepository.getGigsMatchingFilters(req.params.artistId, req.query), res);
});

app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});