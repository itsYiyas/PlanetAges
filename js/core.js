/**
 * Created by Robert on 29/09/2017.
 */
// how many years there are per Earth year (Venus, Mercury, .. Pluto)
var planetRates = [0.2408467,0.61519726,1.0,1.8808158,11.862615,29.447498,84.016846,164.79132,248.00];
// this is emulating a JSON response from a server or some sort - could check your age in other solar systems if the database was filled up
// recieved planet textures from https://www.solarsystemscope.com/textures

/**
 * name = name
 * img = source of image from root
 * yearrate = ratio of a year to an earth year
 * dayrate = how many hours pass per day
 * size = kilometers
 */
var planets = [
    {"name" : "Venus",
    "img" : "img/2k_venus.jpg",
    "yearrate" : "0.2408467",
    "dayrate": "1408"
    },

    {"name" : "Mercury",
    "img" : "img/2k_mercury.jpg",
    "yearrate" : "0.61519726",
        "dayrate": "5832"},

    {"name" : "Earth",
    "img" : "img/2k_earth.jpg",
    "yearrate" : "1.0",
        "dayrate": "24"},

    {"name" : "Mars",
    "img" : "img/2k_mars.jpg",
    "yearrate" : "1.8808158",
        "dayrate": "25"},

    {"name" : "Jupiter",
    "img" : "img/2k_jupiter.jpg",
    "yearrate" : "11.862615",
        "dayrate": "10"},

    {"name" : "Saturn",
    "img" : "img/2k_saturn.jpg",
    "yearrate" : "29.447498",
        "dayrate": "11"},

    {"name" : "Uranus",
    "img" : "img/2k_uranus.jpg",
    "yearrate" : "84.016846",
        "dayrate": "17"},

    {"name" : "Neptune",
    "img" : "img/2k_neptune.jpg",
    "yearrate" : "164.79132",
        "dayrate": "16"},

    {"name" : "Pluto",
    "img" : "img/pluto.jpg",
    "yearrate" : "248.00",
        "dayrate": "153"}
    ];

$(document).ready(function() {
    console.log('he');
    createPlanets();
});

function createPlanets() {
    $.each(planets,function(key,value) {
        /**
         * copy the template planet
         * fill out basic information
         * plug in image as background image for planet
         * plug in (dayrate/24)*24 so each planet rotates relative to Earth's rotation, every 24s
         */
        $copy = $('#planetTemplate')
            .clone()
            .attr('id',value.name)
            .css('background-image','url('+value.img+')')
            .css('animation','rotate '+(value.dayrate/24)*24+'s infinite linear');
        //$copy.find('img').attr('background-image','url('+value.img+')');
        $copy.find('h2').html(value.name);
        //$copy.find('img').attr('alt','The planet '+value.name);
        $copy.find('p').html(value.name);
        $copy.appendTo('#planets')
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
    var elements = document.getElementsByTagName("section");
    // for every section (planet) iterate and calculate relative age from age / planetRates
    for (i = 0; i < elements.length; i++) {
       var p = elements[i].getElementsByTagName("p")[0];
       p.innerHTML = (age / planetRates[i]).toFixed(2) + " years old!";
    }
}

