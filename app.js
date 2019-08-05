var db = firebase.firestore();
var collection = db.collection("mentors/");

function getQueriesForDocumentsAround(ref, center, radiusInKm) {
    var geohashesToQuery = geohashQueries([center.lat, center.lon], radiusInKm * 1000);
    console.log(JSON.stringify(geohashesToQuery));
    return geohashesToQuery.map(function (location) {
        return ref.where("g", ">=", location[0]).where("g", "<=", location[1]);
    });
}

function calc(center, MAX_DISTANCE) {
    var queries = getQueriesForDocumentsAround(collection, center, MAX_DISTANCE);
    queries.forEach(function (query) {
        query.get().then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                var data = doc.data();
                console.log(data);
            });
        });
    });
}

const mist = {
    lat: 23.8376219,
    lon: 90.3723357
}

const airport = {
    lat: 23.8687432,
    lon: 90.3770778
}

const gazipur = {
    lat: 23.9947076,
    lon: 90.4001571
}

calc(gazipur, 5);


