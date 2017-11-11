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
    genrePref: 18, //user's preference
    dinnerOptions: [], //list of options from API
    movieOptions: [], //list of options from API
    dinnerDecision: null, //final choice
    movieDecision: null, //final choice
}

//Use these arrays to  validate user input
var validationData = {
    cuisines: ["african", "american", "amish", "argentine", "armenian", "asian", "bbq", "bagels", "bakery", "bar food", "belgian", "beverages", "brazilian", "breakfast", "british", "burger", "cafe", "cajun", "california", "cantonese", "caribbean", "chinese", "coffee and tea", "colombian", "cuban", "deli", "desserts", "dim sum", "diner", "donuts", "drinks only", "eastern european", "ethiopian", "european", "fast food", "filipino", "fish and chips", "french", "frozen yogurt", "fusion", "german", "greek", "healthy food", "ice cream", "indian", "international", "irish", "italian", "jamaican", "japanese", "kebab", "korean", "latin american", "lebanese", "mediterranean", "mexican", "middle eastern", "mongolian", "moroccan", "nepalese", "pakistani", "peruvian", "pizza", "pub food", "ramen", "salad", "sandwich", "seafood", "soul food", "south american", "south indian", "southern", "southwestern", "spanish", "steak", "sushi", "taco", "tapas", "tea", "teriyaki", "tex-mex", "thai", "turkish", "vegetarian", "venezuelan", "vietnamese"],
    genres: [{
            "id": 28,
            "name": "Action"
        },
        {
            "id": 12,
            "name": "Adventure"
        },
        {
            "id": 16,
            "name": "Animation"
        },
        {
            "id": 35,
            "name": "Comedy"
        },
        {
            "id": 80,
            "name": "Crime"
        },
        {
            "id": 99,
            "name": "Documentary"
        },
        {
            "id": 18,
            "name": "Drama"
        },
        {
            "id": 10751,
            "name": "Family"
        },
        {
            "id": 14,
            "name": "Fantasy"
        },
        {
            "id": 36,
            "name": "History"
        },
        {
            "id": 27,
            "name": "Horror"
        },
        {
            "id": 10402,
            "name": "Music"
        },
        {
            "id": 9648,
            "name": "Mystery"
        },
        {
            "id": 10749,
            "name": "Romance"
        },
        {
            "id": 878,
            "name": "Science Fiction"
        },
        {
            "id": 10770,
            "name": "TV Movie"
        },
        {
            "id": 53,
            "name": "Thriller"
        },
        {
            "id": 10752,
            "name": "War"
        },
        {
            "id": 37,
            "name": "Western"
        }
    ]
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

var movieQuery = function(genre) {
    var apikey = 'd928a0b7d0a845298ec26a9121d6724f';
    var base = 'https://api.themoviedb.org/3';
    var endpoint = '/discover/movie?';    
    // var url = base + endpoint + 'with_genres=' + genre + '&apikey=' + apikey;
    var url = base + endpoint + 'api_key='+apikey+'&language=en-US&sort_by=popularity.desc&page=1&with_genres='+genre;
    $.ajax({
        crossDomain: true,
        url: url,
        method: 'GET'
    }).done(function(data) {
        console.log(url);
        console.log(data)
    });
}

movieQuery(userData.genrePref)






// --------------------------------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------
// 
// Brea's working area
// 
// --------------------------------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------


console.log(createTableRowMovie("choiceID", "Showtime At the Movies", ["7:30 PM", "8:15 PM", "9:45 PM", "10:35 PM"], "405 Watch This Way", "5.9"));
console.log(createTableRowRestaruant("restaurantID", "Chow Down Here", "$$", "350 Dinner Way", "4.5"));

// ---------------------------------------------------------------------------------------------------------------
// Create & Format table row data for movie API data
// arguments: movie name, times, location, miles away
// returns: html setup of the new table row with the table data passed in the arugments section
// ---------------------------------------------------------------------------------------------------------------
function createTableRowMovie(id, name, timesArray, location, milesAway) {

    var timesHTMLList = "<ul>";

    for (var i = 0; i < timesArray.length; i++) {

        timesHTMLList += `<li>${timesArray[i]}</li>`;
    }

    timesArray += "</ul>";

    // use ` instead of ' or " to be able to add the variable names into the string and it interpret them for the values passed in
    return `
        <tr id='${id}'>
            <td>${name}</td>
            <td>${timesHTMLList}</td>
            <td>${location}</td>
            <td>${milesAway}</td>
        </tr>
    `;

}

// ---------------------------------------------------------------------------------------------------------------
// Create & Format table row data for resturant API data
// arguments: restauratn name, price range, location (address), miles away
// returns: html setup of the new table row with the table data passed in the arugments section
// ---------------------------------------------------------------------------------------------------------------
function createTableRowRestaruant(id, name, price, location, milesAway) {

    // use ` instead of ' or " to be able to add the variable names into the string and it interpret them for the values passed in
    return `
        <tr id='${id}'>
            <td>${name}</td>
            <td>${price}</td>
            <td>${location}</td>
            <td>${milesAway}</td>
        </tr>
    `;

}





// --------------------------------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------
// 
// End of Brea's working area
//
// --------------------------------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------