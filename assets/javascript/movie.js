//Form will add these values
var userData = {
    city: null,
    zipcode: null,
    long: -78.638179,
    lat: 35.779590,
    genrePref: 'horror',
    movieOptions: [],
    movieDecision: [],
}
conosole.log(userData);
//Use these arrays to  validate user input
var movieValidation = {
    genres: ['action', 'adventure', 'horror', 'scary', 'comedy', 'romance', 'chick flick', 'historical', 'western', 'sci-fi', 'war', ]
}

var movieQuery = function(genres, long, lat) {
        var apikey = '40e9cece';
        var base = 'https://www.omdbapi.com/?t=';
        var endpoint = '/search?';
        var url = base + endpoint + 'q=' + genres + '&lat=' + lat + '&long=' + long + '&apikey=' + apikey;
        $.ajax({
                url: url,
                method: 'GET'
            }).done(function(data) {
                    console.log(url);
                    console.log(data)


                    // Here is your key: d0e5a2c5

                    // Please append it to all of your API requests,

                    // OMDb API: http://www.omdbapi.com/?i=tt3896198&apikey=d0e5a2c5


                    // var queryURL = "https://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=40e9cece";