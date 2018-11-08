require("dotenv").config()

var keys = require("./keys")

var Spotify = require('node-spotify-api')

var spotify = new Spotify(keys.spotify)

function song(input) {
    spotify.search({ type: 'track', query: input }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        var results = ("\nArtist: " + data.tracks.items[0].artists[0].name  + "\nSong Title: " + data.tracks.items[0].name  + "\nAlbum: " + data.tracks.items[0].album.name  + "\nPreview the song: " + data.tracks.items[0].preview_url);
        console.log(results)
        log(results)
    });
}
var request = require("request");
function movie(input) {

    request("http://www.omdbapi.com/?t=" + input + "&y=&plot=short&apikey=trilogy", function (error, response, body) {


        if (!error && response.statusCode === 200) {
            var data = JSON.parse(body)
            var results = ("\nTitle: " + data.Title + "\nRelease Year: " + data.Year + "\nIMDB Rating: " + data.imdbRating + "\nRotten Tomatoes Rating: " + data.Ratings[1].Value + "\nCountries of Production: " + data.Country + "\nLanguage: " + data.Language + "\nActors: " + data.Actors + "\nPlot: " + data.Plot)
            console.log(results)
            log(results)
        }
    })
}

function concert(input) {
    var request = require("request");
    request("https://rest.bandsintown.com/artists/" + input + "/events?app_id=codingbootcamp", function (error, response, body) {
        if (!error && response.statusCode === 200) {
            // console.log(input)
            // var data = JSON.parse(body)
            console.log(body)
        }
    })
}
function log(results) {
    fs.appendFile("log.txt", results, function (err) {
        if (err) {
            return console.log(err);
        }
    })

}

var fs = require("fs")
function doIt() {
    fs.readFile("random.txt", "utf8", function (err, data) {
        if(err){
            console.log(err)
        }
        var output = data.split(",")
        song(output[1])
    })
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
else if (command === "do-what-it-says") {
    doIt()
}

