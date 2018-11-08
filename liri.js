require("dotenv").config()

var keys = require("./keys")

var Spotify = require('node-spotify-api')

var spotify = new Spotify(keys.spotify)

function song(input) {
    spotify.search({ type: 'track', query: input }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        console.log("Artist: " + data.tracks.items[0].artists[0].name);
        console.log("Song Title: " + data.tracks.items[0].name)
        console.log("Album: " + data.tracks.items[0].album.name)
        console.log("Preview the song: " + data.tracks.items[0].preview_url)
    });
}
var request = require("request");
function movie(input) {
    
    request("http://www.omdbapi.com/?t=" + input + "&y=&plot=short&apikey=trilogy", function (error, response, body) {


        if (!error && response.statusCode === 200) {

            console.log("Title: " + JSON.parse(body).Title)
            console.log("Release Year: " + JSON.parse(body).Year)
            console.log("IMDB Rating: " + JSON.parse(body).imdbRating)
            console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value)
            console.log("Countries of Production: " + JSON.parse(body).Country)
            console.log("Language: " + JSON.parse(body).Language)
            console.log("Actors: " + JSON.parse(body).Actors)
            console.log("Plot: " + JSON.parse(body).Plot)
        }
    })
}

function concert(input){
    var request = require("request");
    request("https://rest.bandsintown.com/artists/" + input + "/events?app_id=codingbootcamp", function (error, response, body) {
        if (!error && response.statusCode === 200) {
        // console.log(input)
        // var data = JSON.parse(body)
        console.log(body)
        }
    })
    

}
function doIt(){
    console.log("doing it")
}
var command = process.argv[2]
var term = ""
if (command === "spotify-this-song") {
    if (process.argv.length == 3) {
        song("The sign Ace of base")
    }
    else {
        for (i = 3; i < process.argv.length; i++) {
            term = term + process.argv[i] + " "
        }
        song(term)
    }
}
else if (command === "movie-this") {
    if (process.argv.length == 3) {
        movie("Mr Nobody")
    }
    else {
        for (i = 3; i < process.argv.length; i++) {
            term = term + process.argv[i] + " "
        }
        movie(term)
    }
}
else if (command === "concert-this") {
        if (process.argv.length == 3) {
            console.log("Please enter an artist or band name.")
        }
        else {
            for (i = 3; i < process.argv.length; i++) {
                term = term + process.argv[i] + " "
            }
            concert(term)
        }
}
else if ( command === "do-what-it-says"){
    doIt()
}

