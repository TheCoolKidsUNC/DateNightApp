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
    cuisines: { "cuisines": [{ "cuisine": { "cuisine_id": 152, "cuisine_name": "African" } }, { "cuisine": { "cuisine_id": 1, "cuisine_name": "American" } }, { "cuisine": { "cuisine_id": 954, "cuisine_name": "Amish" } }, { "cuisine": { "cuisine_id": 151, "cuisine_name": "Argentine" } }, { "cuisine": { "cuisine_id": 175, "cuisine_name": "Armenian" } }, { "cuisine": { "cuisine_id": 3, "cuisine_name": "Asian" } }, { "cuisine": { "cuisine_id": 193, "cuisine_name": "BBQ" } }, { "cuisine": { "cuisine_id": 955, "cuisine_name": "Bagels" } }, { "cuisine": { "cuisine_id": 5, "cuisine_name": "Bakery" } }, { "cuisine": { "cuisine_id": 227, "cuisine_name": "Bar Food" } }, { "cuisine": { "cuisine_id": 132, "cuisine_name": "Belgian" } }, { "cuisine": { "cuisine_id": 270, "cuisine_name": "Beverages" } }, { "cuisine": { "cuisine_id": 159, "cuisine_name": "Brazilian" } }, { "cuisine": { "cuisine_id": 182, "cuisine_name": "Breakfast" } }, { "cuisine": { "cuisine_id": 133, "cuisine_name": "British" } }, { "cuisine": { "cuisine_id": 168, "cuisine_name": "Burger" } }, { "cuisine": { "cuisine_id": 30, "cuisine_name": "Cafe" } }, { "cuisine": { "cuisine_id": 491, "cuisine_name": "Cajun" } }, { "cuisine": { "cuisine_id": 956, "cuisine_name": "California" } }, { "cuisine": { "cuisine_id": 121, "cuisine_name": "Cantonese" } }, { "cuisine": { "cuisine_id": 158, "cuisine_name": "Caribbean" } }, { "cuisine": { "cuisine_id": 25, "cuisine_name": "Chinese" } }, { "cuisine": { "cuisine_id": 161, "cuisine_name": "Coffee and Tea" } }, { "cuisine": { "cuisine_id": 287, "cuisine_name": "Colombian" } }, { "cuisine": { "cuisine_id": 153, "cuisine_name": "Cuban" } }, { "cuisine": { "cuisine_id": 192, "cuisine_name": "Deli" } }, { "cuisine": { "cuisine_id": 100, "cuisine_name": "Desserts" } }, { "cuisine": { "cuisine_id": 411, "cuisine_name": "Dim Sum" } }, { "cuisine": { "cuisine_id": 541, "cuisine_name": "Diner" } }, { "cuisine": { "cuisine_id": 959, "cuisine_name": "Donuts" } }, { "cuisine": { "cuisine_id": 268, "cuisine_name": "Drinks Only" } }, { "cuisine": { "cuisine_id": 651, "cuisine_name": "Eastern European" } }, { "cuisine": { "cuisine_id": 149, "cuisine_name": "Ethiopian" } }, { "cuisine": { "cuisine_id": 38, "cuisine_name": "European" } }, { "cuisine": { "cuisine_id": 40, "cuisine_name": "Fast Food" } }, { "cuisine": { "cuisine_id": 112, "cuisine_name": "Filipino" } }, { "cuisine": { "cuisine_id": 298, "cuisine_name": "Fish and Chips" } }, { "cuisine": { "cuisine_id": 45, "cuisine_name": "French" } }, { "cuisine": { "cuisine_id": 501, "cuisine_name": "Frozen Yogurt" } }, { "cuisine": { "cuisine_id": 274, "cuisine_name": "Fusion" } }, { "cuisine": { "cuisine_id": 134, "cuisine_name": "German" } }, { "cuisine": { "cuisine_id": 156, "cuisine_name": "Greek" } }, { "cuisine": { "cuisine_id": 143, "cuisine_name": "Healthy Food" } }, { "cuisine": { "cuisine_id": 233, "cuisine_name": "Ice Cream" } }, { "cuisine": { "cuisine_id": 148, "cuisine_name": "Indian" } }, { "cuisine": { "cuisine_id": 154, "cuisine_name": "International" } }, { "cuisine": { "cuisine_id": 135, "cuisine_name": "Irish" } }, { "cuisine": { "cuisine_id": 55, "cuisine_name": "Italian" } }, { "cuisine": { "cuisine_id": 207, "cuisine_name": "Jamaican" } }, { "cuisine": { "cuisine_id": 60, "cuisine_name": "Japanese" } }, { "cuisine": { "cuisine_id": 178, "cuisine_name": "Kebab" } }, { "cuisine": { "cuisine_id": 67, "cuisine_name": "Korean" } }, { "cuisine": { "cuisine_id": 136, "cuisine_name": "Latin American" } }, { "cuisine": { "cuisine_id": 66, "cuisine_name": "Lebanese" } }, { "cuisine": { "cuisine_id": 70, "cuisine_name": "Mediterranean" } }, { "cuisine": { "cuisine_id": 73, "cuisine_name": "Mexican" } }, { "cuisine": { "cuisine_id": 137, "cuisine_name": "Middle Eastern" } }, { "cuisine": { "cuisine_id": 74, "cuisine_name": "Mongolian" } }, { "cuisine": { "cuisine_id": 147, "cuisine_name": "Moroccan" } }, { "cuisine": { "cuisine_id": 117, "cuisine_name": "Nepalese" } }, { "cuisine": { "cuisine_id": 139, "cuisine_name": "Pakistani" } }, { "cuisine": { "cuisine_id": 162, "cuisine_name": "Peruvian" } }, { "cuisine": { "cuisine_id": 82, "cuisine_name": "Pizza" } }, { "cuisine": { "cuisine_id": 983, "cuisine_name": "Pub Food" } }, { "cuisine": { "cuisine_id": 320, "cuisine_name": "Ramen" } }, { "cuisine": { "cuisine_id": 998, "cuisine_name": "Salad" } }, { "cuisine": { "cuisine_id": 304, "cuisine_name": "Sandwich" } }, { "cuisine": { "cuisine_id": 83, "cuisine_name": "Seafood" } }, { "cuisine": { "cuisine_id": 461, "cuisine_name": "Soul Food" } }, { "cuisine": { "cuisine_id": 972, "cuisine_name": "South American" } }, { "cuisine": { "cuisine_id": 85, "cuisine_name": "South Indian" } }, { "cuisine": { "cuisine_id": 471, "cuisine_name": "Southern" } }, { "cuisine": { "cuisine_id": 966, "cuisine_name": "Southwestern" } }, { "cuisine": { "cuisine_id": 89, "cuisine_name": "Spanish" } }, { "cuisine": { "cuisine_id": 141, "cuisine_name": "Steak" } }, { "cuisine": { "cuisine_id": 177, "cuisine_name": "Sushi" } }, { "cuisine": { "cuisine_id": 997, "cuisine_name": "Taco" } }, { "cuisine": { "cuisine_id": 179, "cuisine_name": "Tapas" } }, { "cuisine": { "cuisine_id": 163, "cuisine_name": "Tea" } }, { "cuisine": { "cuisine_id": 964, "cuisine_name": "Teriyaki" } }, { "cuisine": { "cuisine_id": 150, "cuisine_name": "Tex-Mex" } }, { "cuisine": { "cuisine_id": 95, "cuisine_name": "Thai" } }, { "cuisine": { "cuisine_id": 142, "cuisine_name": "Turkish" } }, { "cuisine": { "cuisine_id": 308, "cuisine_name": "Vegetarian" } }, { "cuisine": { "cuisine_id": 641, "cuisine_name": "Venezuelan" } }, { "cuisine": { "cuisine_id": 99, "cuisine_name": "Vietnamese" } }] },
    cuisineText: [],
    genres: [{
        "id": 28,
        "name": "Action"
    }, {
        "id": 12,
        "name": "Adventure"
    }, {
        "id": 16,
        "name": "Animated"
    }, {
        "id": 35,
        "name": "Comedy"
    }, {
        "id": 80,
        "name": "Crime drama"
    }, {
        "id": 99,
        "name": "Documentary"
    }, {
        "id": 18,
        "name": "Drama"
    }, {
        "id": 14,
        "name": "Fantasy"
    }, {
        "id": 36,
        "name": "Historical drama"
    }, {
        "id": 27,
        "name": "Horror"
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
        "id": 53,
        "name": "Thriller"
    }]
}

validationData.cuisines.cuisines.forEach(function(item) {
    validationData.cuisineText.push(item.cuisine.cuisine_name.toLowerCase());
});

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

    // add new array items to the dropdown list on the user input form
    for (var i = 0; i < genreSelectionList.length; i++) {
        $("#movie-genre-list > select").append("<option>" + genreSelectionList[i].name + "</option>");
    }

    // create new arrary w/ a list of 10 random food types
    var foodSelectionList = randomizeArray(validationData.cuisineText, listLength);

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
        console.log("length of array lower than num choices = ", num);    }

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
function dinnerQuery(cuisine, long, lat) {
    var apikey = '5102e337643a0e5250051310c79d40d6';
    var base = 'https://developers.zomato.com/api/v2.1';
    var endpoint = '/search?';
    var url = base + endpoint + 'cuisines=' + cuisine + '&lat=' + lat + '&lon=' + long + '&apikey=' + apikey;

    $.ajax({
        url: url,
        method: 'GET'
    }).done(function(data) {
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

// here is one API key since we run out at 50 calls. ---- x23n96frwcyfg7jnss9h8ax4   or this one  xmmfbjcyadjpghdjbuh56he7

function movieQuery(genre, long, lat) {
    var apikey = 'x23n96frwcyfg7jnss9h8ax4';
    var base = 'https://data.tmsapi.com/v1.1';
    var endpoint = '/movies/showings?';
    var startDate = moment().format('YYYY-MM-DD');
    var url = base + endpoint + 'startDate=' + startDate + '&lat=' + lat + '&lng=' + long + '&radius=10&units=mi&imageSize=Md&imageText=true' + '&api_key=' + apikey;

    $.ajax({
        crossDomain: true,
        url: url,
        method: 'GET',
        error: function(a, b) {
            console.log(a);
            console.log(b);
            console.log('error');
        }
    }).done(function(data) {
        var filteredMovies = [];
        for (var i = 0; i < data.length - 1; i++) {
            var genres = data[i].genres;
            var check;
            if (genres) {
                check = genres.includes(userData.genrePref);
            }
            if (check === true) {
                filteredMovies.push(data[i]);
            }
        }
        userData.movieOptions = randomizeArray(filteredMovies, 3);

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
function zipToCoordinates(zip) {
    var url = 'https://api.zippopotam.us/us/' + zip;
    $.ajax({
        url: url,
        method: 'GET',
        error: function() {
            $("#form-err").show();
            $("#form-err .notification").html("<span class='error'>Sorry. That's not a valid zip code.</span>");
            focusError();
            $("#zip-input").focus(function() {
                clearErrors();
            })
        },
        success: function(data) {
            userData.lat = data.places[0].latitude;
            userData.long = data.places[0].longitude;
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
            $("#geo-input").text("Got Your Coordinates!");
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
        if (item.name.toLowerCase() === userGenre) {
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
    if (validationData.cuisineText.includes(userFood)) {
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

function scrollToDetails() {    
    if (userData.dinnerDecision && userData.movieDecision) {
        $('html, body').animate({
            scrollTop: $("#date-details").offset().top
        }, 300);
    }
}

function showDateChoice() {
    if (userData.dinnerDecision !== null && userData.movieDecision !== null) {
        $('#final-dinner-choice').slideDown('fast');
        $('#final-movie-choice').slideDown('fast');
    }
}

// ---------------------------------------------------------------------------------------------------------------
// Event Handler for Movie Choices Table Row Click
// arguments: event
// returns: nothing
// ---------------------------------------------------------------------------------------------------------------
$("#movie-choices-list").on("click", "tbody > tr", function(e) {

    // remove all "is-selected" classes from the table rows
    $("#movie-choices-list .is-selected").removeClass("is-selected");

    // add is selected class to the choice made
    $(this).addClass("is-selected");

    // grab array # of the movie choice selected
    var movieChoiceItem = $(this).attr("id");

    // set user Data movie choice information
    userData.movieDecision = userData.movieOptions[movieChoiceItem];

    showDateChoice();
    scrollToDetails();

    // empty the table to start clean if other options have been picked previously
    $("#final-movie-details").empty();

    // set variables for data to be shown in final choice cards/views
    var movTitle = userData.movieDecision.title;
    var movPosterPath = userData.movieDecision.preferredImage.uri;
    var movDescription = userData.movieDecision.shortDescription;
    var movReleased = userData.movieDecision.releaseDate;

    // need to iterate through the times / locations in the array
   
    // returns back an array of location names w/ associated times
    var movTimesArray = getTimesLocationData2(userData.movieDecision.showtimes);

    // check to see if an array of theatres/times comes back
    if (movTimesArray.constructor === Array) {

        // if movie times array larger than 4 narrow it down for display / user choice

        // create movTimesElements from movTimesArray
        var locationList = $("<ul>");
        locationList.attr("id", "loc_list");

        // loop through location names here
        for (var i = 0; i < movTimesArray.length; i++) {

            // create html elements for listing movie theatres / details
            var locationItem = $("<li>");
            var locationLink = $("<a>");
            var timesList = $("<p>");

            locationLink.text(movTimesArray[i].theatreName);

            // check to see if there is a link to buy tickets
            if (movTimesArray[i].theatreLink != undefined) {
                locationLink.attr("href", movTimesArray[i].theatreLink);
                locationLink.attr("target", "_blank");
                locationLink.attr("alt", "Get Tickets Here");
            }

            // add times in array to the list w/ a , separating them
            timesList.text(" Showtimes: " + movTimesArray[i].theatreTimes.join(", "));

            // add HTML elements to the DOM / user view
            locationList.append(locationItem);
            locationItem.append(locationLink);
            locationItem.append(timesList);

        } // end loop through movTimesArray

        $("#final-movie-details").append(locationList);

    } else {
        // need to figure out what to do here if no times / locations returned
        $("#final-movie-details").append(movTimesArray);
    }

    // add title to the card title area
    $("#movie-final-pick-title").text(movTitle);
    $("#final-movie-details").prepend("<p><strong>Release Date: </strong><span>" + movReleased + "</span></p>");
    $("#final-movie-details").prepend("<p><strong>Overview: </strong><p> " + movDescription + "</p>");
});


// ---------------------------------------------------------------------------------------------------------------
// Event Handler for Restaurant Choices Table Row Click
// arguments: event
// returns: nothing
// ---------------------------------------------------------------------------------------------------------------
$("#restaurant-choices-list").on("click", "tbody > tr", function(e) {

    // remove all "is-selected" classes from the table rows
    $("#restaurant-choices-list .is-selected").removeClass("is-selected");

    // add is selected class to the choice made
    $(this).addClass("is-selected");

    // grab array # of the restaurant choice selected
    var restChoiceItem = $(this).attr("id");

    // set user Data restaurant choice information
    userData.dinnerDecision = userData.dinnerOptions[restChoiceItem];

    showDateChoice();
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
    restMenuLink.attr("href", "https://www.google.com/search?q=" + restName + " menu");
    restMenuLink.attr("alt", restName);
    restMenuLink.attr("target", "_blank");
    restMenuLink.addClass("bold-text");
    restMenuLink.text(restMenuText);

    // add title to the card title area
    $("#restaurant-final-pick-title").text(restName);

    // append new details for selected restaurant to the final restaurant details card area
    $("#final-restaurant-details").append(restPhotoImg);
    $("#final-restaurant-details").append(restAddressLink);
    $("#final-restaurant-details").append("<br>");
    $("#final-restaurant-details").append(restMenuLink);

});


function getTimesLocationData2(timesArray) {

    // get current time to check against times from movie api
    var currentTime = moment();

    // theatre object array for checks
    var theatreArray = [];
    var theatreArrayCtr = 0;

    // get current time to check against times from movie api
    var currentTime = moment();

    // get final choice showtimes info

    for (var i = 0; i < timesArray.length; i++) {

        var newTheatre = {
            theatreName: null,
            theatreLink: null,
            theatreTimes: [],
        };

        var showtimeLocation = timesArray[i].theatre.name;
       
        var grabLink = timesArray[i].ticketURI;

        // get the time from the current api data array
        var timeGrab = timesArray[i].dateTime.split("T").pop();
        var movieTimeMoment = moment(timeGrab, "HH:mm");

        if (movieTimeMoment.isAfter(currentTime)) {

            if (theatreArray.length === 0) {

                newTheatre.theatreName = showtimeLocation;
                newTheatre.theatreLink = grabLink;
                newTheatre.theatreTimes.push(timeGrab);

                theatreArray.push(newTheatre);

            } else {

                // check to see if the theatre name is in the theatre array already 
                if (theatreArray[theatreArrayCtr].theatreName === showtimeLocation) {
                    theatreArray[theatreArrayCtr].theatreTimes.push(timeGrab);
                } else {

                    theatreArrayCtr++;

                    var addTheatre = {
                        theatreName: null,
                        theatreLink: null,
                        theatreTimes: [],
                    };
                    addTheatre.theatreName = showtimeLocation;
                    addTheatre.theatreLink = grabLink;
                    addTheatre.theatreTimes.push(timeGrab);
                    theatreArray.push(addTheatre);
                }
            }
        }      
    }
    if (theatreArray.length === 0) {
        return "No Show Times Available";
    } else {
        return theatreArray;
    }
};

//Clear out error message above form. Used in various places.
function clearErrors() {
    $("#form-err").hide('fast');
    $("#form-err .notification .error").remove();
}

// Clear out error messages above choice table lists
function clearTableListErrors(id) {
    $(id).hide("fast");
    $(id + " .error").remove();
}

// When form div has focus again clear error messages
$("#movie-select-list").focus(function() {
    clearTableListErrors("#movie-list-err");
});

// When form div has focus again clear error messages
$("#resturant-select-list").focus(function() {
    clearTableListErrors("#restaurant-list-err");
});

//Scroll up to error message if it's out of view.
function focusError() {
    if (scrollValue > 170) {
        $('html, body').animate({
            scrollTop: $("#form-err").offset().top
        }, 300);
    }
}

//used in focusError function.
var scrollValue;
$(window).scroll(function(event) {
    scrollValue = $(window).scrollTop();
});

$('select').focus(function() {
    clearErrors();
})

//reset form, clear out location data, and reset geolocation button
$(":reset").on("click", function() {
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

    var restTypeUserChoice = $("#resturant-type-list").find(":selected").text();
    getCuisineNumber(restTypeUserChoice.toLowerCase());

    dinnerQuery(userData.cuisinePref, userData.long, userData.lat);
    movieQuery(userData.genrePref, userData.long, userData.lat);

});

//------------------------------------------------------------------------
// Scroll down to the results area if form submision is successful.
// Included in done method of both AJAX calls.
//------------------------------------------------------------------------

function scrollToResults() {
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
        }
    }
}

function getCuisineNumber(cuisineString) {
    var validationArray = validationData.cuisines.cuisines;
    for (var i = 0; i < validationArray.length; i++) {
        if (validationArray[i].cuisine.cuisine_name.toLowerCase() === cuisineString) {
            userData.cuisinePref = validationArray[i].cuisine.cuisine_id;
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
        movTimes = userData.movieOptions[i].showtimes;
        movLocation = "none returned";

        // check to see if data coming back has ratings details
        // found one case that the api did not return the ratings array
        if (userData.movieOptions[i].ratings != undefined) {

            movRating = userData.movieOptions[i].ratings[0].code;
        } else {

            movRating = "Not Rated";
        }

        var movTimesArray = getTimesLocationData2(movTimes);
        var newMovieRow = createTableRowMovie2(i, movName, movTimesArray, movRating);
        $("#movie-choices-list > tbody").append(newMovieRow);
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

    for (var i = 0; i < userData.dinnerOptions.length; i++) {

        restName = userData.dinnerOptions[i].restaurant.name;
        restPrice = userData.dinnerOptions[i].restaurant.price_range;
        restLocation = userData.dinnerOptions[i].restaurant.location.address;
        restRating = userData.dinnerOptions[i].restaurant.user_rating.aggregate_rating;

        //convert restPrice to dollar signs
        var restPriceSigns = "";
        if (restPrice > 0) {
            for (var x = 0; x < restPrice; x++) {
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

    // get current time to check against times from movie api
    var currentTime = moment();

    var timesHTMLList = "<ul>";
    var locationHTMLList = "<ul>";

    for (var i = 0; i < timesArray.length; i++) {

        var timeGrab = timesArray[i].dateTime.split("T").pop();
        var movieTimeMoment = moment(timeGrab, "HH:mm");

        // check to see if movie time from api is after current time
        if (movieTimeMoment.isAfter(currentTime)) {
            var showtimeLocation = timesArray[i].theatre.name;
            timesHTMLList += `<li>${timeGrab}</li>`;
            locationHTMLList += `<li>${showtimeLocation}</li>`;
        }
    }

    timesHTMLList += "</ul>";
    locationHTMLList += "</ul>";

    // use ` instead of ' or " to be able to add the variable names into the string and it interpret them for the values passed in
    return `
        <tr id='${id}'>
            <td>${name}</td>
            <td>${timesHTMLList}</td>
            <td>${locationHTMLList}</td>
            <td>${rating}</td>
        </tr>
    `;

}

// ---------------------------------------------------------------------------------------------------------------
// Create & Format table row data for movie API data
// arguments: movie name, times, location, rating
// returns: html setup of the new table row with the table data passed in the arugments section
// ---------------------------------------------------------------------------------------------------------------
function createTableRowMovie2(id, name, timesArray, rating) {
    var timesHTMLList = "<ul>";
    var locationHTMLList = "<ul>";
    if (timesArray.constructor === Array) {
        for (var i = 0; i < timesArray.length; i++) {
            var timeGrab = timesArray[i].theatreTimes;
            var nameGrab = timesArray[i].theatreName;
            var timeGrabList = timeGrab.join(", ");
            timesHTMLList += "<li>" + timeGrabList + "</li>";
            locationHTMLList += "<li>" + nameGrab + "</li>";
        }
    } else {
        // no times available so return no available movie times / locations
        timesHTMLList += "<li>No available showtimes</li>";
        locationHTMLList += "<li>No available theatres</li>";
    }

    timesHTMLList += "</ul>";
    locationHTMLList += "</ul>";

    // use ` instead of ' or " to be able to add the variable names into the string and it interpret them for the values passed in
    return `
        <tr id='${id}'>
            <td>${name}</td>
            <td>${timesHTMLList}</td>
            <td>${locationHTMLList}</td>
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