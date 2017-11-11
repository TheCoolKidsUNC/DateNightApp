//Get users' lat and long
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
        console.log(position);
        userData.lat = position.coords.latitude;
        userData.long = position.coords.longitude;
    })
}

//Form will add these values
var userData = {
    city: null,
    zipCode: null,
    long: -78.638179, //TEST DATA 
    lat: 35.779590, //TEST DATA
    cuisinePref: 'mexican', //TEST DATA - user's preference
    genrePref: null, //user's preference
    dinnerOptions: [], //list of options from API
    movieOptions: [], //list of options from API
    dinnerDecision: null, //final choice
    movieDecision: null, //final choice
}

//Use these arrays to  validate user input
var validationData = {
    cuisines: ["african", "american", "amish", "argentine", "armenian", "asian", "bbq", "bagels", "bakery", "bar food", "belgian", "beverages", "brazilian", "breakfast", "british", "burger", "cafe", "cajun", "california", "cantonese", "caribbean", "chinese", "coffee and tea", "colombian", "cuban", "deli", "desserts", "dim sum", "diner", "donuts", "drinks only", "eastern european", "ethiopian", "european", "fast food", "filipino", "fish and chips", "french", "frozen yogurt", "fusion", "german", "greek", "healthy food", "ice cream", "indian", "international", "irish", "italian", "jamaican", "japanese", "kebab", "korean", "latin american", "lebanese", "mediterranean", "mexican", "middle eastern", "mongolian", "moroccan", "nepalese", "pakistani", "peruvian", "pizza", "pub food", "ramen", "salad", "sandwich", "seafood", "soul food", "south american", "south indian", "southern", "southwestern", "spanish", "steak", "sushi", "taco", "tapas", "tea", "teriyaki", "tex-mex", "thai", "turkish", "vegetarian", "venezuelan", "vietnamese"],
    genres: ["action", "adventure", "animation", "comedy", "crime", "documentary", "drama", "family", "fantasy", "history", "horror", "music", "musical", "mystery", "romance", "sci-fi", "thriller", "war", "western"],
}

//Take an array and X number of items; return an array of X random items from the array
//We can use this to get X random items from the Movie and Dinner APIs
var testArray = ["a", "b", "c", "d", "e"];

var randomizeArray = function(array, num) {
    var oldArr = array;
    var newArr = [];
    for (var i = 0; i < num; i++) {
        var index = Math.floor(Math.random() * array.length);
        var newItem = oldArr.splice(index, 1);
        newArr.push(newItem[0]);        
    }
   return newArr;
}
//

//get data from Zomato
var dinnerQuery = function(cuisine, long, lat) {
    var apikey = '5102e337643a0e5250051310c79d40d6';
    var base = 'https://developers.zomato.com/api/v2.1';
    var endpoint = '/search?';
    var url = base + endpoint + 'q=' + cuisine + '&lat=' + lat + '&long=' + long + '&apikey=' + apikey;
    $.ajax({
        url: url,
        method: 'GET'
    }).done(function(data) {        
        userData.movieOptions = randomizeArray(data.restaurants, 3);
        console.log(userData.movieOptions);
    })
}

//test
dinnerQuery(userData.cuisinePref, userData.long, userData.lat);