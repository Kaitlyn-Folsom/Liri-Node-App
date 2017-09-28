//REQUIRE
var requireKeys = require("./keys.js");
var Twitter = require("twitter");
var Spotify = require("node-spotify-api");
var request = require("request");
var fs = require("fs");

var userInput = process.argv;

var action = userInput[2];

    for (var i = 3; i < userInput.length; i++) {
          var userRequest = userInput[i];
    }

executeAction(action, userRequest);

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

        //Log movie info to terminal
        console.log("\n==========OMDB==========");
        console.log("Title: " + JSON.parse(body).Title);
        console.log("Year: " + JSON.parse(body).Year);
        console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
        console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
        console.log("Country: " + JSON.parse(body).Country);
        console.log("Language: " + JSON.parse(body).Language);
        console.log("Plot: " + JSON.parse(body).Plot);
        console.log("Actors: " + JSON.parse(body).Actors);
        console.log("=======================\n");

        //Append movie info to log.txt
        fs.appendFile("log.txt", "\nTitle: " + JSON.parse(body).Title + "\n", function(err) {});
        fs.appendFile("log.txt", "Year: " + JSON.parse(body).Year + "\n", function(err) {});
        fs.appendFile("log.txt", "IMDB Rating: " + JSON.parse(body).imdbRating + "\n", function(err) {});
        fs.appendFile("log.txt", "Rotton Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value + "\n", function(err) {});
        fs.appendFile("log.txt", "Country: " + JSON.parse(body).Country + "\n", function(err) {});
        fs.appendFile("log.txt", "Language: " + JSON.parse(body).Language + "\n", function(err) {});
        fs.appendFile("log.txt", "Plot: " + JSON.parse(body).Plot + "\n", function(err) {});
        fs.appendFile("log.txt", "Actors: " + JSON.parse(body).Actors + "\n", function(err) {});
        fs.appendFile("log.txt", "\n==================================", function(err) {});
        
        console.log("Your movie info was also added to log.txt!\n");
    });
}; //End getMovie function

// ======== TWITTER FUNCTION ==========//

function twitter() {

    var client = new Twitter(requireKeys.twitterKeys);

    var params = {
        screen_name: "LucyKeegan10"
    };

    client.get("statuses/user_timeline", function(error, tweets, response) {

        // console.log(tweets);
        console.log("LucyKeegan10 tweeted...\n")

        fs.appendFile("log.txt", "\nLucyKeegan10 tweeted.....\n", function(err) {});

        for(var i = 0; i < tweets.length; i++){

            console.log(tweets[i].created_at);
            console.log(tweets[i].text);
            console.log("\n==========================\n")

        //Append movie info to log.txt
        fs.appendFile("log.txt", "\n" + tweets[i].created_at + "\n", function(err) {});
        fs.appendFile("log.txt", "\n" + tweets[i].text + "\n", function(err) {});
        fs.appendFile("log.txt", "\n============================\n", function(err) {});
        }
        console.log("Your tweets were also added to log.txt!\n");
    });
}; //End twitter function

function getSpotify() {

    var client = new Spotify(requireKeys.spotifyKeys);

    var song = "";

    for (var i = 3; i < userInput.length; i++) {
        if (i > 3 && i < userInput.length) {
            song = song + "+" + userInput[i];
        } else {
            song += userInput[i];
        }
    }

    if (song === "") {
        client.search({
            type: "track",
            query: "The Sign ace of base"
        }, function(err, data) {
            if (err) {
                console.log('Error occurred: ' + err);
                return;
            }
            console.log("\n=========SPOTIFY===========");
            console.log("Song Title: " + data.tracks.items[0].name);
            console.log("Artist: " + data.tracks.items[0].artists[0].name);
            console.log("Spotify Link: " + data.tracks.items[0].preview_url);
            console.log("Album Name: " + data.tracks.items[0].album.name);
            console.log("===========================\n");
        });
    } else {
        client.search({
            type: "track",
            query: song
        }, function(err, data) {
            if (err) {
                console.log('Error occurred: ' + err);
                return;
            }

            //Log Song infor to terminal
            console.log("\n=========SPOTIFY===========");
            console.log("Song Title: " + data.tracks.items[0].name);
            console.log("Artist: " + data.tracks.items[0].artists[0].name);
            console.log("Spotify Link: " + data.tracks.items[0].preview_url);
            console.log("Album Name: " + data.tracks.items[0].album.name);
            console.log("=============================\n");

            //Append song info to log.txt
            fs.appendFile("log.txt", "\nSong Title: " + data.tracks.items[0].name + "\n", function(err) {});
            fs.appendFile("log.txt", "Artist: " + data.tracks.items[0].artists[0].name + "\n", function(err) {});
            fs.appendFile("log.txt", "Spotify Link: " + data.tracks.items[0].preview_url + "\n", function(err) {});
            fs.appendFile("log.txt", "Album Name: " + data.tracks.items[0].album.name + "\n", function(err) {});
            fs.appendFile("log.txt", "\n==================================\n", function(err) {});

            console.log("Your song info was also added to log.txt!\n");
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

        var randomAction = dataArr[0];
        console.log("\nAction: " + randomAction);
  
        userInput = dataArr[1];
        console.log("User Request: " + userInput);

      executeAction(randomAction, userInput);

    });

}; //End doWhatItSays function

// ========= EXECUTION ==============//
function executeAction(action, userRequest){
    switch(action) {
        case "my-tweets":
            twitter();
            break;
        case "spotify-this-song":
            getSpotify(userRequest);
            break;
        case "movie-this":
            getMovie();
            break;
        case "do-what-it-says":
            doWhatItSays();
            break;
        default:
            console.log("\nUnknown Action");
    };

};