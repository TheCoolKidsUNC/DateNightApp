//Get users' lat and long
// Commented this out because it's annoying. Have hard typed latt and long in userData for testing.
// if (navigator.geolocation) {
//     navigator.geolocation.getCurrentPosition(function(position) {
//         console.log(position);
//         userData.lat = position.coords.latitude;
//         userData.long = position.coords.longitude;
//     })
// }

//Form will add these values
var userData = {
    city: null,
    zipCode: null,
    long: -78.638179, //TEST DATA 
    lat: 35.779590, //TEST DATA
    cuisinePref: 'mexican', //TEST DATA - user's preference
    genrePref: 28, //user's preference
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
            "name": "action"
        },
        {
            "id": 12,
            "name": "adventure"
        },
        {
            "id": 16,
            "name": "animation"
        },
        {
            "id": 35,
            "name": "comedy"
        },
        {
            "id": 80,
            "name": "crime"
        },
        {
            "id": 99,
            "name": "documentary"
        },
        {
            "id": 18,
            "name": "drama"
        },
        {
            "id": 10751,
            "name": "family"
        },
        {
            "id": 14,
            "name": "fantasy"
        },
        {
            "id": 36,
            "name": "history"
        },
        {
            "id": 27,
            "name": "horror"
        },
        {
            "id": 10402,
            "name": "music"
        },
        {
            "id": 9648,
            "name": "mystery"
        },
        {
            "id": 10749,
            "name": "romance"
        },
        {
            "id": 878,
            "name": "science Fiction"
        },
        {
            "id": 10770,
            "name": "tv movie"
        },
        {
            "id": 53,
            "name": "thriller"
        },
        {
            "id": 10752,
            "name": "war"
        },
        {
            "id": 37,
            "name": "western"
        }
    ]
}


//Take an array and X number of items; return an array of X random items from the array
//We can use this to get X random items from the Movie and Dinner APIs
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
        userData.dinnerOptions = randomizeArray(data.restaurants, 3);
        putRestaurantAPIDataIntoTableDiv();
    })
}

// note the movies pull from TV series movies too. Also the date range function isn't live updates
var movieQuery = function(genre) {
    var apikey = 'd928a0b7d0a845298ec26a9121d6724f';
    var base = 'https://api.themoviedb.org/3';  
    var endpoint = '/discover/movie?';
    var theater = ' &with_release_type=3';
    var releaseDate = '&primary_release_date.gte=2017-10-10&primary_release_date.lte=2017-10-30';
    // var url = base + endpoint + 'with_genres=' + genre + '&apikey=' + apikey;
    var url = base + endpoint + 'api_key=' + apikey + '&language=en-US&sort_by=popularity.desc&page=1&with_genres=' + genre + releaseDate + theater;
    $.ajax({
        crossDomain: true,
        url: url,
        method: 'GET'
    }).done(function(data) {

        userData.movieOptions = randomizeArray(data.results, 3);
        console.log(data.results);
    });
}   

// this part is what gets the ID number for the genre because the API assigns a ID number to each name
var genreNumber = function (name) {
	for (var i = 0; i < validationData.genres.length; i++) {
		validationData.genres[i]
		if (validationData.genres[i].name == name){
			userData.genrePref = validationData.genres[i].id;
			console.log(userData.genrePref);
		}
	}
}
	// genreNumber("crime");  FOR testing of calls
// These calls are for testing purposes
// They need to be triggered by the submit button eventually
dinnerQuery(userData.cuisinePref, userData.long, userData.lat);
movieQuery(userData.genrePref);

$("#zip-input").on("click", function() {
    var zip = $("#zip-input").val().trim();
    console.log(zip);
});

(function() {
    $('form > input').keyup(function() {

        var empty = false;
        $('form > input').each(function() {
            if ($(this).val() == '') {
                empty = true;
            }
        });

        if (empty) {
            $('#submit').attr('disabled', 'disabled');
        } else {
            $('#submit').removeAttr('disabled');
        }
    });
})

$("#add-new-genre").on("click", function(event) {
    event.preventDefault();

    // This line grabs the input from the textbox
    var userGenre = $("#movie-user-input-genre").val().trim();
    console.log(userGenre)
    $("#movie-genre-list > select").append("<option>" + userGenre + "</option>");

});

$("#add-new-food-type").on("click", function(event) {
    event.preventDefault();

    // This line grabs the input from the textbox
    var userFood = $("#food-type-user-input").val().trim();
    console.log(userFood)
    $("#resturant-type-list > select").append("<option>" + userFood + "</option>");

});




// ---------------------------------------------------------------------------------------------------------------
// Grab restaurant API data and put it in the table
// arguments: none
// returns: nothing
// ---------------------------------------------------------------------------------------------------------------
function putRestaurantAPIDataIntoTableDiv() {

    var restName;
    var restPrice;
    var restLocation;
    var restRating;

    for (var i = 0; i < userData.dinnerOptions.length; i++) {

        restName = userData.dinnerOptions[i].restaurant.name;
        restPrice = userData.dinnerOptions[i].restaurant.price_range;
        restLocation = userData.dinnerOptions[i].restaurant.location.address;
        restRating = userData.dinnerOptions[i].restaurant.user_rating.aggregate_rating;

        var newRestaurantRow = createTableRowRestaurant(i, restName, restPrice, restLocation, restRating);
     
        $("#restaurant-choices-list > tbody").append(newRestaurantRow);
    }

}


// ---------------------------------------------------------------------------------------------------------------
// Create & Format table row data for movie API data
// arguments: movie name, times, location, rating
// returns: html setup of the new table row with the table data passed in the arugments section
// ---------------------------------------------------------------------------------------------------------------
function createTableRowMovie(id, name, timesArray, location, rating) {

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
            <td>${rating}</td>
        </tr>
    `;

}

// ---------------------------------------------------------------------------------------------------------------
// Create & Format table row data for restaurant API data
// arguments: restaurant name, price range, location (address), rating
// returns: html setup of the new table row with the table data passed in the arugments section
// ---------------------------------------------------------------------------------------------------------------
function createTableRowRestaurant(id, name, price, location, rating) {

    // use ` instead of ' or " to be able to add the variable names into the string and it interpret them for the values passed in
    return `
        <tr id='${id}'>
            <td>${name}</td>
            <td>${price}</td>
            <td>${location}</td>
            <td>${rating}</td>
        </tr>
    `;

}