/**
 * Created by Robert on 29/09/2017.
 */
var planetsLength;
var currentActivated;
// this is emulating a JSON response from a server or some sort - could check your age in other solar systems if a database was filled up
// recieved planet textures from https://www.solarsystemscope.com/textures
/**
 * name = name
 * img = source of surface image
 * yearrate = ratio of a year to an earth year
 * dayrate = how many hours pass per day <- dictates how fast they turn
 * size = kilometers <- for relative scaling
 * distance = AU <- for relative distance between them
 * description = fun fact
 */
var planets = [
    {
        "name" : "Mercury",
        "img" : "img/2k_mercury.jpg",
        "yearrate" : "0.61519726",
        "dayrate": "5832",
        "size": "4879",
        "distance" : "0.39",
        "description": "As the iron core of Mercury cooled and contracted, the surface of the planet became wrinkled. "
    },
    {
        "name" : "Venus",
        "img" : "img/2k_venus.jpg",
        "yearrate" : "0.2408467",
        "dayrate": "1408",
        "size": "12104",
        "distance" : "0.723",
        "description": "In 1970, the Soviet Union's Venera 7 sent back 23 minutes of data from Venus - it was the first spacecraft to successfully land on another planet"
    },
    {
        "name" : "Earth",
        "img" : "img/2k_earth.jpg",
        "yearrate" : "1.0",
        "dayrate": "24",
        "size": "12756",
        "distance" : "1",
        "description": "Although many agree that Earth is the planet we are born on, it can be argued that men are from Mars and women are from Venus."
    },
    {
        "name" : "Mars",
        "img" : "img/2k_mars.jpg",
        "yearrate" : "1.8808158",
        "dayrate": "25",
        "size": "6779",
        "distance" : "1.524",
        "description": "Mars is home to the tallest mountain in the solar system - Olympus Mons, a shield volcano, is 21km high and 600km in diameter"
    },
    {
        "name" : "Jupiter",
        "img" : "img/2k_jupiter.jpg",
        "yearrate" : "11.862615",
        "dayrate": "10",
        "size": "142984",
        "distance" : "5.203",
        "description": "Below Jupiter’s massive atmosphere (which is made primarily of hydrogen), there are layers of compressed hydrogen gas, liquid metallic hydrogen, and a core of ice, rock, and metals"
    },
    {
        "name" : "Saturn",
        "img" : "img/2k_saturn.jpg",
        "yearrate" : "29.447498",
        "dayrate": "11",
        "size": "120536",
        "distance" : "9.539",
        "description": "Saturn has 150 moons and smaller moonlets. All are frozen worlds. The largest moons are Titan and Rhea. Enceladus appears to have an ocean below its frozen surface."
    },
    {
        "name" : "Uranus",
        "img" : "img/2k_uranus.jpg",
        "yearrate" : "84.016846",
        "dayrate": "17",
        "size": "50724",
        "distance" : "19.18",
        "description": "Uranus was discovered by Sir William Herschel in 1781, at first he thought it was a comet but several years later it was confirmed as a planet"
    },
    {
        "name" : "Neptune",
        "img" : "img/2k_neptune.jpg",
        "yearrate" : "164.79132",
        "dayrate": "16",
        "size": "49224",
        "distance" : "30.06",
        "description": "Large storms whirl through its upper atmosphere, and high-speed winds track around the planet at up 600 meters per second."
    },
    {
        "name" : "Pluto",
        "img" : "img/pluto.jpg",
        "yearrate" : "248.00",
        "dayrate": "153",
        "size": "4879",
        "distance" : "39.53",
        "description": "In 2006 Pluto, alongside many other celestial objects, was reclassified as a dwarf planet - making 8 planets in our solar system."
    }
    ];

$(document).ready(function() {
    createPlanets();
});

function createPlanets() {
    planetsLength = planets.length;
    var count = 0;

    // pick up the biggest distance from the sun to find the "end" of the solar system
    // planets are plotted on a distance/end % of the view width. therefore it doesn't matter what order they are retrieved from the database
    var largestDistance = 0;
    $.each(planets,function(key,value) {
        if (parseInt(value.distance) > largestDistance) {
            largestDistance = parseInt(value.distance);
        }
    });

    // iterate all retrieved planets and add them to the main
    $.each(planets,function(key,value) {
        /**
         * copy the template planet
         * plug in image as background image for planet
         * plug in (dayrate/24)*24 so each planet rotates relative to Earth's rotation, every 24s
         * plug in a relative size, and scale the shadow (for 3d look) to that size
         * fill out constant information (size, days, fun fact)
         */
        var size = value.size/10000;
        var shadowsize = size/30;
        $copy = $('#planetTemplate')
            .clone()
            .attr('id',value.name)
            .css('left',5+(value.distance/largestDistance)*80+'%')
            .css('z-index',planetsLength-count)
            .css('height',size+"vw");
        $copy.find('div')
            .css('background-image','url('+value.img+')')
            .css('animation','rotate '+(value.dayrate/24)*24+'s infinite linear')
            .css('height',size+"vw")
            .css('width',size+"vw")
            .css('box-shadow',"-"+3*shadowsize+"vw "+0.5*shadowsize+"vw "+6*shadowsize+"vw "+0.8*shadowsize+"vw inset,"+0.1*shadowsize+"vw -"+0.1*shadowsize+"vw "+0.1*shadowsize+"vw "+0.4*shadowsize+"vw");
        $copy.find('span').html(value.description);
        // activate Earth if we have it
        if (value.name == "Earth") {
            activate($copy);
        }
        count ++;
        $copy.appendTo('#planets');
    });
}

function doAgeCalculate(el) {
    // dob is dd/mm/yyyy as input but i'm lazily splitting it to rearrange to yyyy/mm/dd for date comparison
    var dob = (el.value).split("/");
    // hide intro text, toggle minimised header, allow overflow on planets (for thin screen/mobile hiding overflow keeps it nice)
    $('p').eq(0).toggle();
    $('header').eq(0).addClass("minimised");
    $('#planets').css('overflow',"visible");

    // calculate our age today, then plug that into each planet's <p> to store
    var age = (Date.now() - new Date(dob[2]+"/"+dob[1]+"/"+dob[0])) / 31557600000;
    $.each(planets,function(key,value) {
        var agePlanet = (age/value.yearrate);
        $('#'+value.name).find('p').html('You are ' + agePlanet.toFixed(1) + ' years old on '+value.name+'!');
    });
}
function activate(el) {
    // triggered when a user clicks on a planets - ensure only one planet active
    // copies the <p> and <span> (years / fun fact) into #description element

    if ($(el).attr('id') == currentActivated) { // if we are clicking what we already activated - deactivate and clean #description
        $(el).removeClass("activated");
        $('#description').find('h2').html("");
        $('#description').find('p').html("");
        currentActivated = null;
    } else { // otherwise deactivate current and enable new one.
        $('#'+currentActivated).toggleClass("activated");
        $(el).toggleClass("activated");
        currentActivated = $(el).attr('id');
        var text = $(el).find('p').text() + "<br>" + $(el).find('span').text();
        $('#description').find('h2').html($(el).attr('id'));
        $('#description').find('p').html(text);
    }
}