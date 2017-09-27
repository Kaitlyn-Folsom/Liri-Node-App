var requireKeys = require("./keys.js");
var Twitter = require("twitter");

var Spotify = require("node-spotify-api");
var request = require("request");
var fs = require("fs");

var action = process.argv[2];

var userInput = process.argv;

//========== GET MOVIE FUNCTION ============//
function getMovie() {

    var movieName = "";

    for (var i = 3; i < userInput.length; i++) {

        if (i > 3 && i < userInput.length) {
            movieName = movieName + "+" + userInput[i];
        } else {
            movieName += userInput[i];
        }
    }

    if (movieName === "") {
        movieName = "mr nobody";
    }

    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=40e9cece";

    request(queryUrl, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log("Everything working fine.");
        }
        // console.log(JSON.parse(body));
        console.log("\nTitle: " + JSON.parse(body).Title);
        console.log("Year: " + JSON.parse(body).Year);
        console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
        console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
        console.log("Country: " + JSON.parse(body).Country);
        console.log("Language: " + JSON.parse(body).Language);
        console.log("Plot: " + JSON.parse(body).Plot);
        console.log("Actors: " + JSON.parse(body).Actors + "\n");
    });

}; //End getMovie function

// ======== TWITTER FUNCTION ==========//

function twitter() {

    var client = new Twitter(requireKeys.twitterKeys);

    var params = {
        screen_name: "LucyKeegan10"
    };

    client.get("statuses/user_timeline" params, function(error, tweets, response) {
        if (!error) {
            console.log(error);
        }

        console.log(tweets[0].text);
        console.log(tweets[0].created_at);

        var myTweets = tweets;

        for(var i = 0; i < myTweets.length; i++){
            // console.log(myTweets[i]);
        }


    });

}; //End twitter function

function getSpotify() {

    var spotify = new Spotify({
        id: "370fc808b7694ccb8ec87fe5737051a4",
        secret: "91c9c4b1ae4741baa23b2a6d229e7a77"
    });

    var song = "";

    for (var i = 3; i < userInput.length; i++) {

        if (i > 3 && i < userInput.length) {

            song = song + "+" + userInput[i];

        } else {
            song += userInput[i];
        }
    }

    if (song === "") {

        spotify.search({
            type: "track",
            query: "The Sign ace of base"
        }, function(err, data) {
            if (err) {
                console.log('Error occurred: ' + err);
                return;
            }
            console.log("\nSong Title: " + data.tracks.items[0].name);
            console.log("Artist: " + data.tracks.items[0].artists[0].name);
            console.log("Spotify Link: " + data.tracks.items[0].preview_url);
            console.log("Album Name: " + data.tracks.items[0].album.name + "\n");
        });

    } else {

        spotify.search({
            type: "track",
            query: song
        }, function(err, data) {
            if (err) {
                console.log('Error occurred: ' + err);
                return;
            }
            // console.log(data.tracks.items[0]);
            console.log("\nSong Title: " + data.tracks.items[0].name);
            console.log("Artist: " + data.tracks.items[0].artists[0].name);
            console.log("Spotify Link: " + data.tracks.items[0].preview_url);
            console.log("Album Name: " + data.tracks.items[0].album.name + "\n");
        });
    }
}; //End spotify function

// ============ BEGIN DO WHAT IT SAYS ============== //

function doWhatItSays() {

    fs.readFile("random.txt", "utf8", function(error, data) {

        if (error) {
            return console.log(error);
        }

        var dataArr = data.split(",");


        console.log(dataArr);

        var randomAction = dataArr[0];
        var randomUserInput = dataArr[1];

        if (action === randomAction) {

        }


    });

}; //End doWhatItSays function

if (action === "movie-this") {
    getMovie();
} else if (action === "spotify-this-song") {
    getSpotify();
} else if (action === "my-tweets") {
    twitter();
} else if (action === "do-what-it-says") {
    doWhatItSays();
} else {
    console.log("Unknown action");
}