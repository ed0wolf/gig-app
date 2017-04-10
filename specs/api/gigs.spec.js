var frisby = require('frisby');

frisby.create('Getting artists gig filters for an artist that does not exist it should return a 404')
    .get('http://localhost:3000/api/gigs/1231kj2h31jh23/filters')
    .expectStatus(404)
    .toss();

frisby.create('Getting artists gig filters for an artist does exist it should return the filters')
    .get('http://localhost:3000/api/gigs/ada7a83c-e3e1-40f1-93f9-3e73dbc9298a/filters')
    .expectStatus(200)
    .expectHeaderContains('content-type', 'application/json')
    .expectJSONTypes('data', {
        countries: Array,
        years: Array
    })
    .toss();

frisby.create('Getting gigs with country query it should only return gigs that satisfy that query')//these tests arent really testing that anything is actually being filtered.
    .get('http://localhost:3000/api/gigs/a74b1b7f-71a5-4011-9441-d0b5e4122711?country=Mexico')
    .expectStatus(200)
    .expectHeaderContains('content-type', 'application/json')
    .expectBodyContains('"@name":"Mexico"')
    .toss();

frisby.create('Getting gigs with year query it should only return gigs that satisfy that query')
    .get('http://localhost:3000/api/gigs/a74b1b7f-71a5-4011-9441-d0b5e4122711?year=2016')
    .expectStatus(200)
    .expectHeaderContains('content-type', 'application/json')
    .expectBodyContains('@eventDate":"07-10-2016"')
    .toss();

frisby.create('Getting gigs with an year query that nothing matches should return and empty array')
    .get('http://localhost:3000/api/gigs/a74b1b7f-71a5-4011-9441-d0b5e4122711?year=2018')
    .expectStatus(200)
    .expectHeaderContains('content-type', 'application/json')
    .expectJSON({"data":[]})
    .toss();

frisby.create('Getting gigs with an country query that nothing matches should return and empty array')
    .get('http://localhost:3000/api/gigs/a74b1b7f-71a5-4011-9441-d0b5e4122711?country=Mars')
    .expectStatus(200)
    .expectHeaderContains('content-type', 'application/json')
    .expectJSON({"data":[]})
    .toss();