var frisby = require('frisby');

frisby.create('Getting all artists')
    .get('http://localhost:3000/api/artists')
    .expectStatus(200)
    .expectHeaderContains('content-type', 'application/json')
    .expectJSONTypes('data', Array)
    .toss();

frisby.create('Getting single artist that doesnt exist')
    .get('http://localhost:3000/api/artists/123qri3j')
    .expectStatus(404)
    .toss();

frisby.create('Getting single artist that does exist')
    .get('http://localhost:3000/api/artists/ada7a83c-e3e1-40f1-93f9-3e73dbc9298a')
    .expectStatus(200)
    .expectHeaderContains('content-type', 'application/json')
    .expectJSONTypes('data', {
        name: String,
        id: String
    })
    .toss();