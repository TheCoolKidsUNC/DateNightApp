//Form will add these values
var userData = {
    city: null,
    zipCode: null,
    long: null, //TEST DATA 
    lat: null, //TEST DATA
    cuisinePref: null, //TEST DATA - user's preference
    genrePref: null, //user's preference
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
    }, {
        "id": 12,
        "name": "Adventure"
    }, {
        "id": 16,
        "name": "Animation"
    }, {
        "id": 35,
        "name": "Comedy"
    }, {
        "id": 80,
        "name": "Crime"
    }, {
        "id": 99,
        "name": "Documentary"
    }, {
        "id": 18,
        "name": "Drama"
    }, {
        "id": 10751,
        "name": "Family"
    }, {
        "id": 14,
        "name": "Fantasy"
    }, {
        "id": 36,
        "name": "History"
    }, {
        "id": 27,
        "name": "Horror"
    }, {
        "id": 10402,
        "name": "Music"
    }, {
        "id": 9648,
        "name": "Mystery"
    }, {
        "id": 10749,
        "name": "Romance"
    }, {
        "id": 878,
        "name": "Science fiction"
    }, {
        "id": 10770,
        "name": "TV movie"
    }, {
        "id": 53,
        "name": "Thriller"
    }, {
        "id": 10752,
        "name": "War"
    }, {
        "id": 37,
        "name": "Western"
    }]
}

// ---------------------------------------------------------------------------------------------------------------
// Event Handler for on document ready / page load 
// Run dropdown list load function
// arguments: none
// returns: nothing
// ---------------------------------------------------------------------------------------------------------------
$(document).ready(function() {

    // define # of items that will be returned for the dropdown list
    var listLength = 10;

    // create new array w/ a list of 10 random genres
    var genreSelectionList = randomizeArray(validationData.genres, listLength);
    // console.log ("random list generated ", genreSelectionList);

    // add new array items to the dropdown list on the user input form
    for (var i = 0; i < genreSelectionList.length; i++) {

        $("#movie-genre-list > select").append("<option>" + genreSelectionList[i].name + "</option>");

    }

    // create new arrary w/ a list of 10 random food types
    var foodSelectionList = randomizeArray(validationData.cuisines, listLength);
    // console.log("random cuisines list ", foodSelectionList);

    // add new array items to the dropdown list on the user input form
    for (var j = 0; j < foodSelectionList.length; j++) {

        $("#resturant-type-list > select").append("<option>" + foodSelectionList[j] + "</option>");

    }

});


//Take an array and X number of items; return an array of X random items from the array
//We can use this to get X random items from the Movie and Dinner APIs
// var randomizeArray = function(array, num) {
function randomizeArray(array, num) {
    var oldArr = array.slice(0);
    var newArr = [];

    // added validation to check to see if results of API call is less than the # of choices we would like to display
    if (oldArr.length < num) {

        num = oldArr.length;
        console.log("length of array lower than num choices = ", num);
    }

    if (num === 0) {

        // need to ask user to select another choice here if there are no items in the array??

    }

    for (var i = 0; i < num; i++) {
        var index = Math.floor(Math.random() * oldArr.length);
        var newItem = oldArr.splice(index, 1);
        newArr.push(newItem[0]);
    }

    return newArr;

}

//get data from Zomato
// var dinnerQuery = function(cuisine, long, lat) {
function dinnerQuery(cuisine, long, lat) {
    var apikey = '5102e337643a0e5250051310c79d40d6';
    var base = 'https://developers.zomato.com/api/v2.1';
    var endpoint = '/search?';
    var url = base + endpoint + 'q=' + cuisine + '&lat=' + lat + '&lon=' + long + '&apikey=' + apikey;

    console.log("url dinner = ", url);

    $.ajax({
        url: url,
        method: 'GET'
    }).done(function(data) {

        console.log(data);
        userData.dinnerOptions = randomizeArray(data.restaurants, 3);


        // check to see if no results returned from API
        if (userData.dinnerOptions.length === 0) {

            $("#restaurant-list-err").show();        
            $("#restaurant-list-err .notification").html("<span class='error'>We couldn't find any places to eat for you try another cuisine or location.</span>");
            focusError();

        } else {
            putRestaurantAPIDataIntoTableDiv();
            scrollToResults();
        }

    })
}


// var movieQuery = function(genre) {
function movieQuery(genre, long, lat) {
    var apikey = '23n96frwcyfg7jnss9h8ax4';
    var base = 'http://data.tmsapi.com/v1.1';
    var endpoint = '/movies/showings?';
    var startDate = '2017-11-15';
    // var theater = ' &with_release_type=3';
    // var releaseDate = '&primary_release_date.gte=2017-10-10&primary_release_date.lte=2017-10-30';
    // var region = '&region=US';
    // var url = base + endpoint + 'with_genres=' + genre + '&apikey=' + apikey;
    // http://data.tmsapi.com/v1.1/movies/showings?startDate=2017-11-15&lat=35.792752&lng=-78.654058&radius=15&units=mi&imageSize=Md&imageText=true&api_key=x23n96frwcyfg7jnss9h8ax4
    // var url = base + endpoint + 'startDate=' + startDate + '&lat=' + lat + '&lng=' + long + '&radius=15&units=mi&imageSize=Md&imageText=true&'+ 'api_key=' + apikey;
    var url = 'http://data.tmsapi.com/v1.1/movies/showings?startDate=2017-11-15&lat=35.792752&lng=-78.654058&radius=15&units=mi&imageSize=Md&imageText=true&api_key=x23n96frwcyfg7jnss9h8ax4';
    $.ajax({
        crossDomain: true,
        url: url,
        method: 'GET'
    }).done(function(data) {
    	var filteredMovies = [];
    	for (var i = 0; i < data.length-1; i++) {
    		 var genres = data[i].genres;
       		 var check;
       		 if (genres){
       		 check = genres.includes(userData.genrePref);
       		}
       		 if (check === true) {
    		 	filteredMovies.push(data[i]);
       		 }

    	}
    	
        userData.movieOptions = randomizeArray(filteredMovies, 3);

        console.log(userData.movieOptions);


        // check to see if no results returned from API
        if (userData.movieOptions.length === 0) {

            $("#movie-list-err").show();        
            $("#movie-list-err .notification").html("<span class='error'>We couldn't find any movies for you try another genre or location.</span>");
            focusError();

        } else {
            putMovieAPIDataIntoTableDiv();
            scrollToResults();
        }

    });
}


//Use function to validate zip code, and, if valid, convert to lat and long.
// var zipToCoordinates = function(zip) {    
function zipToCoordinates(zip) {
    var url = 'https://api.zippopotam.us/us/' + zip;
    $.ajax({
        url: url,
        method: 'GET',
        error: function() {
            //Here is where we need code to populate the error message saying zip code is invalid;
        $("#form-err").show();        
        $("#form-err .notification").html("<span class='error'>Sorry. That's not a valid zip code.</span>");
        focusError();
        $("#zip-input").focus(function() {
            clearErrors();            
        })
        },
        success: function(data) {
            console.log("zip cordinates completed");
            userData.lat = data.places[0].latitude;
            userData.long = data.places[0].longitude;
            console.log("zipcords = ", userData.lat, userData.long);
        },
        async: false,
    })
}

//Handle click of geolocation button; disable zip code field if successful
$("#geo-input").on("click", function() {
	clearErrors();
    event.preventDefault();
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            userData.lat = position.coords.latitude;
            userData.long = position.coords.longitude;
            $("#zip-input").prop("disabled", true);
            $("#geo-input").text("Got your coordinates!");
        })
    }
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
    var userGenre = $("#movie-user-input-genre").val().trim().toLowerCase();

    //Check to see if user typed genre exists in validation array.
    var genreIsValid = false;
    validationData.genres.forEach(function(item) {
        if (item.name === userGenre) {
            genreIsValid = true;
        }
    })

    if (genreIsValid) {
        //Add choice to the dropdown list
        $("#movie-genre-list > select").prepend("<option>" + userGenre + "</option>");
        $("#movie-genre-list > select > option:eq(0)").attr('selected', true);

    } else {
        //Display error message. Error message will disappear and clear when user clicks in Add Genre box!
        $("#form-err").show('fast');
        $("#form-err .notification").html("<span class='error'>We don't think that's a genre. Try something else.</span>");
        focusError();
        $("#movie-user-input-genre").focus(function() {
            $("#form-err").hide('fast');
            $("#form-err .notification .error").remove();
        })
    }

    $("#movie-user-input-genre").val("");



});

$("#add-new-food-type").on("click", function(event) {
    event.preventDefault();

    // This line grabs the input from the textbox
    var userFood = $("#food-type-user-input").val().trim().toLowerCase();
    if (validationData.cuisines.includes(userFood)) {
        $("#resturant-type-list > select").prepend("<option>" + userFood + "</option>");
        $("#resturant-type-list > select > option:eq(0)").attr('selected', true);
        
    } else {
        $("#form-err").show('fast');
        $("#form-err .notification").html("<span class='error'>We doubt that's a type of food. Try something else?</span>");
        focusError();
        $("#food-type-user-input").focus(function() {
            clearErrors();
        })
    }

    $("#food-type-user-input").val("");

});

// ------------------------------------------------------------
// Scrolls to date details after user selects something from each table
// Used in both click handlers
//---------------------------------------------------------------

function scrollToDetails () {
    console.log('scroll to details logs...')
    console.log(userData.dinnerDecision);
    console.log(userData.movieDecision);
    if (userData.dinnerDecision && userData.movieDecision) {
         console.log('scroll to details fired');
        $('html, body').animate({
            scrollTop: $("#date-details").offset().top
        }, 300);
    }
}


// ---------------------------------------------------------------------------------------------------------------
// Event Handler for Movie Choices Table Row Click
// arguments: event
// returns: nothing
// ---------------------------------------------------------------------------------------------------------------
$("#movie-choices-list").on("click", "tbody > tr", function(e) {

    console.log("movie-choices-list table row clicked");

    // remove all "is-selected" classes from the table rows
    $("#movie-choices-list .is-selected").removeClass("is-selected");

    // add is selected class to the choice made
    $(this).addClass("is-selected");

    // grab array # of the movie choice selected
    var movieChoiceItem = $(this).attr("id");

    // set user Data movie choice information
    userData.movieDecision = userData.movieOptions[movieChoiceItem];

    console.log("final choice info ", userData.movieDecision);
    scrollToDetails();

    // empty the table to start clean if other options have been picked previously
    $("#final-movie-details").empty();

    // set variables for data to be shown in final choice cards/views
    var movTitle = userData.movieDecision.title;
    var movPosterPath = userData.movieDecision.poster_path;
    var movDescription = userData.movieDecision.overview;
    var movReleased = userData.movieDecision.release_date;
    var movTimes = "See Movie Times";

    // create image tag & details for poster to be added to final choice details view
    var movPosterImg = $("<img>");
    movPosterImg.attr("src", "https://image.tmdb.org/t/p/w185" + movPosterPath);
    movPosterImg.addClass("center-img-element");

    // create link to google movie times for local theatres
    var movTimesSearchLink = $("<a>");
    movTimesSearchLink.attr("href", "#");
    movTimesSearchLink.attr("alt", movTitle);
    movTimesSearchLink.attr("target", "_blank");
    movTimesSearchLink.addClass("bold-text");
    movTimesSearchLink.text(movTimes);

    // console.log("poster path = ", movPosterImg.attr("src"));

    // add title to the card title area
    $("#movie-final-pick-title").text(movTitle);

    // append new details for selected movie to the final movie details card area
    $("#final-movie-details").append(movPosterImg);
    $("#final-movie-details").append("<p><strong>Overview: </strong></p>" + "<p>" + movDescription + "</p>");
    $("#final-movie-details").append("<p><strong>Release Date: </strong></p>" + "<p>" + movReleased + "</p>");
    $("#final-movie-details").append("<p><strong>");
    $("#final-movie-details").append(movTimesSearchLink);
    $("#final-movie-details").append("</p></strong>");

});


// ---------------------------------------------------------------------------------------------------------------
// Event Handler for Restaurant Choices Table Row Click
// arguments: event
// returns: nothing
// ---------------------------------------------------------------------------------------------------------------
$("#restaurant-choices-list").on("click", "tbody > tr", function(e) {

    console.log("restaurant-choices-list table row clicked");


    // remove all "is-selected" classes from the table rows
    $("#restaurant-choices-list .is-selected").removeClass("is-selected");

    // add is selected class to the choice made
    $(this).addClass("is-selected");

    // grab array # of the restaurant choice selected
    var restChoiceItem = $(this).attr("id");

    // set user Data restaurant choice information
    userData.dinnerDecision = userData.dinnerOptions[restChoiceItem];

    console.log("final choice info ", userData.dinnerDecision);
    scrollToDetails();

    // empty the table to start clean if other options have been picked previously
    $("#final-restaurant-details").empty();

    // set variables for data to be shown in final choice cards/views
    var restName = userData.dinnerDecision.restaurant.name;
    var restPhotoPath = userData.dinnerDecision.restaurant.photos_url; // or .featured_image
    var restAddressText = userData.dinnerDecision.restaurant.location.address;
    var restMenuSrc = userData.dinnerDecision.restaurant.menu_url;
    // var movReleased = userData.dinnerDecision.;
    var restMenuText = "See Menu";

    // create image tag & details for photo to be added to final choice details view
    var restPhotoImg = $("<img>");
    restPhotoImg.attr("src", restPhotoPath);
    restPhotoImg.attr("alt", restName);
    restPhotoImg.addClass("center-img-element");

    // create link to google for address of restaurant
    var restAddressLink = $("<a>");
    restAddressLink.attr("href", "https://www.google.com/search?q=" + restName + " " + restAddressText);
    restAddressLink.attr("alt", restName);
    restAddressLink.attr("target", "_blank");
    restAddressLink.addClass("bold-text");
    restAddressLink.text(restAddressText);

    // create link to restaurant menu on google
    var restMenuLink = $("<a>");
    // restMenuLink.attr("href", restMenuSrc); // menu link from api data
    restMenuLink.attr("href", "https://www.google.com/search?q=" + restName + " menu");
    restMenuLink.attr("alt", restName);
    restMenuLink.attr("target", "_blank");
    restMenuLink.addClass("bold-text");
    restMenuLink.text(restMenuText);

    console.log("poster path = ", restPhotoImg.attr("src"));

    // add title to the card title area
    $("#restaurant-final-pick-title").text(restName);

    // // append new details for selected restaurant to the final restaurant details card area
    $("#final-restaurant-details").append(restPhotoImg);
    $("#final-restaurant-details").append(restAddressLink);
    $("#final-restaurant-details").append("<br>");
    $("#final-restaurant-details").append(restMenuLink);

});

//Clear out error message above form. Used in various places.
function clearErrors () {
	 $("#form-err").hide('fast');
     $("#form-err .notification .error").remove();
}

// Clear out error messages above choice table lists
function clearTableListErrors (id) {

    console.log("table list errors cleared now");
    $(id).hide("fast");
    $(id + " .error").remove();
}

// When form div has focus again clear error messages
$("#movie-select-list").focus( function() {

    console.log("form focus here");
    clearTableListErrors("#movie-list-err");
});

// When form div has focus again clear error messages
$("#resturant-select-list").focus( function() {

    console.log("form focus here");
    clearTableListErrors("#restaurant-list-err");
});

//Scroll up to error message if it's out of view.
function focusError () {
	if (scrollValue > 170) {

	$('html, body').animate({
        scrollTop: $("#form-err").offset().top
    }, 300);
	}
}

//used in focusError function.
var scrollValue;
$(window).scroll(function (event) {
    scrollValue = $(window).scrollTop();
});

$('select').focus(function(){
	clearErrors();
})

//reset form, clear out location data, and reset geolocation button
$(":reset").on("click", function(){
	clearErrors();
	userData.long = null;
	userData.lat = null;
	userData.zipCode = null;
	$("#zip-input").prop("disabled", false);
	$("#geo-input").text("Get my current location");
});

// ---------------------------------------------------------------------------------------------------------------
// Event Handler for Submit Button Click in User Input form area
// arguments: event
// returns: nothing
// ---------------------------------------------------------------------------------------------------------------

$("#submit").on("click", function(e) {
	clearErrors();
    
    // prevents the page from reloading when the submit button is clicked (default is to reload page)
    // another way would be to use type="button" in the html page instead of type="submit"
    e.preventDefault();

    console.log("submit button clicked");

    //Validate zip code if user has typed one in, and if valid convert to lat long
    var zipVal = $("#zip-input").val();
    if (zipVal.length === 0 && userData.long === null) {
    	//User has not typed in a zip code or chosen geolocation
    	//Evan: add message to page
    	$("#form-err").show('fast');
        $("#form-err .notification").html("<span class='error'>What's your location?</span>");
        focusError();
    } else if ($("#zip-input").val().length > 0) {
    	//User has typed in zip code field
    	userData.zipCode = $("#zip-input").val().trim();
    	zipToCoordinates(userData.zipCode);
    }

    //Stop code if user doesn't have a location
    if (userData.long === null) {
    		return;
    	}    
       
    var genreChoice = $("#movie-genre-list").find(":selected").text();
    userData.genrePref = genreChoice; 
    // change the genre entered into the number needed for the api call for movies
    // getGenreNumber(genreChoice.toLowerCase());

    // console.log("genre# = ", userData.genrePref);

    var restTypeUserChoice = $("#resturant-type-list").find(":selected").text();
    userData.cuisinePref = restTypeUserChoice.toLowerCase();
    console.log("cuisine selected = ", userData.cuisinePref);

    dinnerQuery(userData.cuisinePref, userData.long, userData.lat);
    movieQuery(userData.genrePref, userData.long, userData.lat);

});

//------------------------------------------------------------------------
// Scroll down to the results area if form submision is successful.
// Included in done method of both AJAX calls.
//------------------------------------------------------------------------

function scrollToResults () {
	if (userData.dinnerOptions.length > 0 && userData.movieOptions.length > 0) {
		$('html, body').animate({
        	scrollTop: $("#results-area").offset().top
    	}, 300);

	}		
}

// ---------------------------------------------------------------------------------------------------------------
// Get the string entered by the user and turn it into the corresponding # to use in the movie API call
// arguments: text selected by user for genre
// returns: # associated w/ genre text
// ---------------------------------------------------------------------------------------------------------------
function getGenreNumber(genreString) {

    for (var i = 0; i < validationData.genres.length; i++) {

        if (validationData.genres[i].name == genreString) {

            userData.genrePref = validationData.genres[i].id;
            console.log(userData.genrePref);
        }
    }


}


// ---------------------------------------------------------------------------------------------------------------
// Grab movie API data and put it in the table
// arguments: none
// returns: nothing
// ---------------------------------------------------------------------------------------------------------------
function putMovieAPIDataIntoTableDiv() {

    var movName;
    var movTimes;
    var movLocation;
    var movRating;

    $("#movie-choices-list > tbody").empty();

    for (var i = 0; i < userData.movieOptions.length; i++) {

        movName = userData.movieOptions[i].title;
        movTimes = "none returned"
        movLocation = "none returned";
        movRating = userData.movieOptions[i].vote_average;

        // console.log("movie Name = ", movName);
        // console.log("movie Times = ", movTimes);
        // console.log("movie Location = ", movLocation);
        // console.log("movie Rating = ", movRating);

        var newRestaurantRow = createTableRowRestaurant(i, movName, movTimes, movLocation, movRating);

        $("#movie-choices-list > tbody").append(newRestaurantRow);
    }

}

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

    $("#restaurant-choices-list > tbody").empty();

    console.log(userData.dinnerOptions);
   
    for (var i = 0; i < userData.dinnerOptions.length; i++) {

        console.log(userData.dinnerOptions[i]);

        restName = userData.dinnerOptions[i].restaurant.name;
        restPrice = userData.dinnerOptions[i].restaurant.price_range;
        restLocation = userData.dinnerOptions[i].restaurant.location.address;
        restRating = userData.dinnerOptions[i].restaurant.user_rating.aggregate_rating;

        //convert restPrice to dollar signs
        console.log("price is "+restPrice);
        var restPriceSigns = "";
        if (restPrice > 0) {
        for (var i = 0; i < restPrice; i++) {
            restPriceSigns += "$";
            }
        }

        var newRestaurantRow = createTableRowRestaurant(i, restName, restPriceSigns, restLocation, restRating);

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