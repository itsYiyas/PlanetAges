/**
 * Created by Robert on 29/09/2017.
 */
var planetsLength;
var currentActivated;
// this is emulating a JSON response from a server or some sort - could check your age in other solar systems if the database was filled up
// recieved planet textures from https://www.solarsystemscope.com/textures
/**
 * name = name
 * img = source of image from root
 * yearrate = ratio of a year to an earth year
 * dayrate = how many hours pass per day <- dictates how fast the turn
 * size = kilometers
 * distance = AU
 */
var planets = [

    {
        "name" : "Mercury",
        "img" : "img/2k_mercury.jpg",
        "yearrate" : "0.61519726",
        "dayrate": "5832",
        "size": "4879",
        "distance" : "0.39",
        "description": ""
    },
    {
        "name" : "Venus",
        "img" : "img/2k_venus.jpg",
        "yearrate" : "0.2408467",
        "dayrate": "1408",
        "size": "12104",
        "distance" : "0.723",
        "description": "In 1970, the Soviet Union's Venera 7 sends back 23 minutes of data from Venus - it was the first spacecraft to successfully land on another planet"
    },
    {
        "name" : "Earth",
        "img" : "img/2k_earth.jpg",
        "yearrate" : "1.0",
        "dayrate": "24",
        "size": "12756",
        "distance" : "1",
        "description": ""
    },
    {
        "name" : "Mars",
        "img" : "img/2k_mars.jpg",
        "yearrate" : "1.8808158",
        "dayrate": "25",
        "size": "6779",
        "distance" : "1.524",
        "description": ""
    },
    {
        "name" : "Jupiter",
        "img" : "img/2k_jupiter.jpg",
        "yearrate" : "11.862615",
        "dayrate": "10",
        "size": "142984",
        "distance" : "5.203",
        "description": ""
    },
    {
        "name" : "Saturn",
        "img" : "img/2k_saturn.jpg",
        "yearrate" : "29.447498",
        "dayrate": "11",
        "size": "120536",
        "distance" : "9.539",
        "description": ""
    },
    {
        "name" : "Uranus",
        "img" : "img/2k_uranus.jpg",
        "yearrate" : "84.016846",
        "dayrate": "17",
        "size": "50724",
        "distance" : "19.18",
        "description": ""
    },
    {
        "name" : "Neptune",
        "img" : "img/2k_neptune.jpg",
        "yearrate" : "164.79132",
        "dayrate": "16",
        "size": "49224",
        "distance" : "30.06",
        "description": ""
    },
    // {
    //     "name" : "Pluto",
    //     "img" : "img/pluto.jpg",
    //     "yearrate" : "248.00",
    //     "dayrate": "153",
    //     "size": "1187",
    //     "distance" : "39.53",
    //     "description": ""
    // }
    ];

$(document).ready(function() {
    createPlanets();
});

function createPlanets() {
    planetsLength = planets.length;
    var count = 0;
    var largestDistance = 0;
    $.each(planets,function(key,value) {
        if (parseInt(value.distance) > largestDistance) {
            largestDistance = parseInt(value.distance);
        }
    });

    $.each(planets,function(key,value) {
        /**
         * copy the template planet
         * fill out basic information
         * plug in image as background image for planet
         * plug in (dayrate/24)*24 so each planet rotates relative to Earth's rotation, every 24s
         */
        var size = value.size/10000;
        var shadowsize = size/30;
        $copy = $('#planetTemplate')
            .clone()
            .attr('id',value.name)
            .css('left',5+(value.distance/largestDistance)*80+'%')
            .css('z-index',length-count)
            .css('height',size+"vw");
        $copy.find('div')
            .css('background-image','url('+value.img+')')
            .css('animation','rotate '+(value.dayrate/24)*24+'s infinite linear')
            .css('height',size+"vw")
            .css('width',size+"vw")
            .css('box-shadow',"-"+3*shadowsize+"vw "+0.5*shadowsize+"vw "+6*shadowsize+"vw "+0.8*shadowsize+"vw inset,"+0.1*shadowsize+"vw -"+0.1*shadowsize+"vw "+0.1*shadowsize+"vw "+0.4*shadowsize+"vw");
        //$copy.find('img').attr('background-image','url('+value.img+')');
        // $copy.find('h2').html(value.name);
        $copy.find('span').html(value.description);
        //$copy.find('img').attr('alt','The planet '+value.name);
        // activate the first planet to enable the left/right arrows
        // if (count == 0) {
        //     activate($copy);
        // }
        count ++;
        $copy.appendTo('#planets');
    });
}

function doAgeCalculate(el) {
    // onchange is happening as soon as a user edits the year element
    // wait for a yyyy-mm-dd to not have leading 0 or be blank (triggered with backspace)
    if (el.value[0] == "0" || el.value == "") {return;}
    document.getElementsByTagName("header")[0].className =  "minimised";
    document.getElementsByTagName("main")[0].style.display =  "block";
    document.getElementsByTagName("p")[0].style.display =  "none";

    var age = (Date.now() - new Date(el.value)) / 31557600000;
    $.each(planets,function(key,value) {
        var agePlanet = (age/value.yearrate);
        if (agePlanet > 10) {
            $('#'+value.name).find('p').html('You are ' + agePlanet.toFixed(0) + ' years old on '+value.name+'!');
        } else {
            $('#'+value.name).find('p').html('You are ' + agePlanet.toFixed(1) + ' years old on '+value.name+'!');
        }
    });
}
function activate(el) {
    $(el).toggleClass("activated");
    if ($(el).attr('id') == currentActivated) {
        $(el).removeClass("activated");
        $('#description').find('h2').html("")
        $('#description').find('p').html("");
        currentActivated = null;
    } else {
        currentActivated = $(el).attr('id');
        $.each(planets, function (key, value) {
            if (value.name != currentActivated) {
                $('#' + value.name).removeClass("activated");
            }
        });
        var text = $(el).find('p').text() + "<br>" + $(el).find('span').text();
        $('#description').find('h2').html($(el).attr('id'));
        $('#description').find('p').html(text);
    }
}

