
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
        console.log(url);
        console.log(data);
    });

    }).done(function(data) {        
        userData.dinnerOptions = randomizeArray(data.restaurants, 3);


// ----------------------------------------------------------
        console.log(userData.dinnerOptions);

        // added grab api data for table row creation here
        putRestaurantAPIDataIntoTableDiv();
    })

}

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


//test
dinnerQuery(userData.cuisinePref, userData.long, userData.lat);





// ----------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------
// 
// Brea's working area
// 
// --------------------------------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------


// ---------------------------------------------------------------------------------------------------------------
// Grab restaurant API data and put it in the table
// arguments: none
// returns: nothing
// ---------------------------------------------------------------------------------------------------------------
function putRestaurantAPIDataIntoTableDiv () {

    var restName;
    var restPrice;
    var restLocation;
    var restRating;

    for (var i = 0; i < userData.dinnerOptions.length; i++) {

        // console.log(userData.dinnerOptions[i]);

        restName = userData.dinnerOptions[i].restaurant.name;
        restPrice = userData.dinnerOptions[i].restaurant.price_range;
        restLocation = userData.dinnerOptions[i].restaurant.location.address;
        restRating = userData.dinnerOptions[i].restaurant.user_rating.aggregate_rating;


        // console.log("restaurant name =", restName);
        // console.log("restaurant price range =", restPrice);
        // console.log("restaurant location =", restLocation);
        // console.log("restaurant Rating =", restRating);

        var newRestaurantRow = createTableRowRestaurant(i, restName, restPrice, restLocation, restRating);

        // console.log(newRestaurantRow);

        // console.log($("#restaurant-choices-list").text());

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





// --------------------------------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------
// 
// End of Brea's working area
//
// --------------------------------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------


