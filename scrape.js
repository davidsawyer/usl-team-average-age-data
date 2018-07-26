const cheerio = require("cheerio"),
    fetch = require("node-fetch"),
    moment = require("moment");

const now = moment();

const TOTAL_PLAYERS = 1010;
const SUFFICIENT_NUMBER_OF_COMPLETED_PLAYERS = 990;

let remainingPlayers = [
    {
        name: "Mikey Ambrose",
        team: "Atlanta United 2",
        url: "https://www.uslsoccer.com/mikey-ambrose"
    },
    {
        name: "Carlos Asensio",
        team: "Atlanta United 2",
        url: "https://www.uslsoccer.com/carlos-asensio"
    },
    {
        name: "Kevin Barajas",
        team: "Atlanta United 2",
        url: "https://www.uslsoccer.com/kevin-barajas"
    },
    {
        name: "George Bello",
        team: "Atlanta United 2",
        url: "https://www.uslsoccer.com/george-bello"
    },
    {
        name: "George Campbell",
        team: "Atlanta United 2",
        url: "https://www.uslsoccer.com/george-campbell"
    },
    {
        name: "Alessandro Castro",
        team: "Atlanta United 2",
        url: "https://www.uslsoccer.com/alessandro-castro"
    },
    {
        name: "Nicolas Caraux",
        team: "Atlanta United 2",
        url: "https://www.uslsoccer.com/nicolas-caraux"
    },
    {
        name: "Andrew Carleton",
        team: "Atlanta United 2",
        url: "https://www.uslsoccer.com/andrew-carleton"
    },
    {
        name: "Jose Carranza",
        team: "Atlanta United 2",
        url: "https://www.uslsoccer.com/jose-carranza"
    },
    {
        name: "Paul Christensen",
        team: "Atlanta United 2",
        url: "https://www.uslsoccer.com/paul-christensen"
    },
    {
        name: "AJ Cochran",
        team: "Atlanta United 2",
        url: "https://www.uslsoccer.com/aj-cochran"
    },
    {
        name: "Jackson Conway",
        team: "Atlanta United 2",
        url: "https://www.uslsoccer.com/jackson-conway"
    },
    {
        name: "Will Crain",
        team: "Atlanta United 2",
        url: "https://www.uslsoccer.com/will-crain"
    },
    {
        name: "Kendall Edwards",
        team: "Atlanta United 2",
        url: "https://www.uslsoccer.com/kendall-edwards"
    },
    {
        name: "Dylan Gaither",
        team: "Atlanta United 2",
        url: "https://www.uslsoccer.com/dylan-gaither"
    },
    {
        name: "Jon Gallagher",
        team: "Atlanta United 2",
        url: "https://www.uslsoccer.com/jon-gallagher"
    },
    {
        name: "Justin Garces",
        team: "Atlanta United 2",
        url: "https://www.uslsoccer.com/justin-garces"
    },
    {
        name: "Chris Goslin",
        team: "Atlanta United 2",
        url: "https://www.uslsoccer.com/chris-goslin"
    },
    {
        name: "Mitch Hildebrandt",
        team: "Atlanta United 2",
        url: "https://www.uslsoccer.com/mitch-hildebrandt"
    },
    {
        name: "Alec Kann",
        team: "Atlanta United 2",
        url: "https://www.uslsoccer.com/alec-kann"
    },
    {
        name: "Andrew Kendall-Moullin",
        team: "Atlanta United 2",
        url: "https://www.uslsoccer.com/andrew-kendall-moullin"
    },
    {
        name: "Laurent Kissiedou",
        team: "Atlanta United 2",
        url: "https://www.uslsoccer.com/laurent-kissiedou"
    },
    {
        name: "Kevin Kratz",
        team: "Atlanta United 2",
        url: "https://www.uslsoccer.com/kevin-kratz"
    },
    {
        name: "Lagos Kunga",
        team: "Atlanta United 2",
        url: "https://www.uslsoccer.com/lagos-kunga"
    },
    {
        name: "Chad Letts",
        team: "Atlanta United 2",
        url: "https://www.uslsoccer.com/chad-letts"
    },
    {
        name: "Diego Lopez",
        team: "Atlanta United 2",
        url: "https://www.uslsoccer.com/diego-lopez"
    },
    {
        name: "Jack Metcalf",
        team: "Atlanta United 2",
        url: "https://www.uslsoccer.com/jack-metcalf"
    },
    {
        name: "Shawn Nicklaw",
        team: "Atlanta United 2",
        url: "https://www.uslsoccer.com/shawn-nicklaw"
    },
    {
        name: "Jose Hernandez",
        team: "Atlanta United 2",
        url: "https://www.uslsoccer.com/jose-rafael-hernandez"
    },
    {
        name: "Miles Robinson",
        team: "Atlanta United 2",
        url: "https://www.uslsoccer.com/miles-robinson"
    },
    {
        name: "Yosef Samuel",
        team: "Atlanta United 2",
        url: "https://www.uslsoccer.com/yosef-samuel"
    },
    {
        name: "Devon Sandoval",
        team: "Atlanta United 2",
        url: "https://www.uslsoccer.com/devon-sandoval"
    },
    {
        name: "Oliver Shannon",
        team: "Atlanta United 2",
        url: "https://www.uslsoccer.com/oliver-shannon"
    },
    {
        name: "Russell Shealy",
        team: "Atlanta United 2",
        url: "https://www.uslsoccer.com/russell-shealy"
    },
    {
        name: "Brandon Vazquez",
        team: "Atlanta United 2",
        url: "https://www.uslsoccer.com/brandon-vazquez"
    },
    {
        name: "Andrew Wheeler-Omiunu",
        team: "Atlanta United 2",
        url: "https://www.uslsoccer.com/andrew-wheeler-omiunu"
    },
    {
        name: "Blake White",
        team: "Atlanta United 2",
        url: "https://www.uslsoccer.com/blake-white"
    },
    {
        name: "Romario Williams",
        team: "Atlanta United 2",
        url: "https://www.uslsoccer.com/romario-williams"
    },
    {
        name: "Sal Zizzo",
        team: "Atlanta United 2",
        url: "https://www.uslsoccer.com/sal-zizzo"
    },
    {
        name: "Brenden Aaronson",
        team: "Bethlehem Steel FC",
        url: "https://www.uslsoccer.com/brenden-aaronson"
    },
    {
        name: "Aidan Apodaca",
        team: "Bethlehem Steel FC",
        url: "https://www.uslsoccer.com/aidan-apodaca"
    },
    {
        name: "Brandon Aubrey",
        team: "Bethlehem Steel FC",
        url: "https://www.uslsoccer.com/brandon-aubrey"
    },
    {
        name: "Eric Ayuk",
        team: "Bethlehem Steel FC",
        url: "https://www.uslsoccer.com/eric-ayuk"
    },
    {
        name: "Cory Burke",
        team: "Bethlehem Steel FC",
        url: "https://www.uslsoccer.com/cory-burke"
    },
    {
        name: "Mike Catalano",
        team: "Bethlehem Steel FC",
        url: "https://www.uslsoccer.com/mike-catalano"
    },
    {
        name: "James Chambers",
        team: "Bethlehem Steel FC",
        url: "https://www.uslsoccer.com/james-chambers"
    },
    {
        name: "Prosper Chiluya",
        team: "Bethlehem Steel FC",
        url: "https://www.uslsoccer.com/prosper-chiluya"
    },
    {
        name: "Jack Elliott",
        team: "Bethlehem Steel FC",
        url: "https://www.uslsoccer.com/jack-elliott"
    },
    {
        name: "Marcus Epps",
        team: "Bethlehem Steel FC",
        url: "https://www.uslsoccer.com/marcus-epps"
    },
    {
        name: "Anthony Fontana",
        team: "Bethlehem Steel FC",
        url: "https://www.uslsoccer.com/anthony-fontana"
    },
    {
        name: "Raymon Gaddis",
        team: "Bethlehem Steel FC",
        url: "https://www.uslsoccer.com/raymon-gaddis"
    },
    {
        name: "Eoin Gawronski",
        team: "Bethlehem Steel FC",
        url: "https://www.uslsoccer.com/eoin-gawronski"
    },
    {
        name: "Fabian Herbers",
        team: "Bethlehem Steel FC",
        url: "https://www.uslsoccer.com/fabian-herbers"
    },
    {
        name: "Omar Holness",
        team: "Bethlehem Steel FC",
        url: "https://www.uslsoccer.com/omar-holness"
    },
    {
        name: "Derrick Jones",
        team: "Bethlehem Steel FC",
        url: "https://www.uslsoccer.com/derrick-jones"
    },
    {
        name: "Seth Kuhn",
        team: "Bethlehem Steel FC",
        url: "https://www.uslsoccer.com/seth-kuhn"
    },
    {
        name: "Matt Mahoney",
        team: "Bethlehem Steel FC",
        url: "https://www.uslsoccer.com/matt-mahoney"
    },
    {
        name: "Richie Marquez",
        team: "Bethlehem Steel FC",
        url: "https://www.uslsoccer.com/richie-marquez"
    },
    {
        name: "Olivier Mbaizo",
        team: "Bethlehem Steel FC",
        url: "https://www.uslsoccer.com/olivier-mbaizo"
    },
    {
        name: "John McCarthy",
        team: "Bethlehem Steel FC",
        url: "https://www.uslsoccer.com/john-mccarthy"
    },
    {
        name: "Jake McGuire",
        team: "Bethlehem Steel FC",
        url: "https://www.uslsoccer.com/jake-mcguire"
    },
    {
        name: "Mark McKenzie",
        team: "Bethlehem Steel FC",
        url: "https://www.uslsoccer.com/mark-mckenzie"
    },
    {
        name: "Santi Moar",
        team: "Bethlehem Steel FC",
        url: "https://www.uslsoccer.com/santi-moar"
    },
    {
        name: "Adam Najem",
        team: "Bethlehem Steel FC",
        url: "https://www.uslsoccer.com/adam-najem"
    },
    {
        name: "Chris Nanco",
        team: "Bethlehem Steel FC",
        url: "https://www.uslsoccer.com/chris-nanco"
    },
    {
        name: "Michee Ngalina",
        team: "Bethlehem Steel FC",
        url: "https://www.uslsoccer.com/michee-ngalina"
    },
    {
        name: "Ben Ofeimu",
        team: "Bethlehem Steel FC",
        url: "https://www.uslsoccer.com/ben-ofeimu"
    },
    {
        name: "AJ Paterson",
        team: "Bethlehem Steel FC",
        url: "https://www.uslsoccer.com/aj-paterson"
    },
    {
        name: "Michael Pellegrino",
        team: "Bethlehem Steel FC",
        url: "https://www.uslsoccer.com/michael-pellegrino"
    },
    {
        name: "Jeremy Rafanello",
        team: "Bethlehem Steel FC",
        url: "https://www.uslsoccer.com/jeremy-rafanello"
    },
    {
        name: "Issa Rayyan",
        team: "Bethlehem Steel FC",
        url: "https://www.uslsoccer.com/issa-rayyan"
    },
    {
        name: "Matthew Real",
        team: "Bethlehem Steel FC",
        url: "https://www.uslsoccer.com/matthew-real"
    },
    {
        name: "Tomas Romero",
        team: "Bethlehem Steel FC",
        url: "https://www.uslsoccer.com/tomas-romero"
    },
    {
        name: "Kristopher Shakes",
        team: "Bethlehem Steel FC",
        url: "https://www.uslsoccer.com/kristopher-shakes"
    },
    {
        name: "Drew Skundrich",
        team: "Bethlehem Steel FC",
        url: "https://www.uslsoccer.com/drew-skundrich"
    },
    {
        name: "Tonny Temple",
        team: "Bethlehem Steel FC",
        url: "https://www.uslsoccer.com/tonny-temple"
    },
    {
        name: "Joshua Yaro",
        team: "Bethlehem Steel FC",
        url: "https://www.uslsoccer.com/joshua-yaro"
    },
    {
        name: "Tah Anunga",
        team: "Charleston Battery",
        url: "https://www.uslsoccer.com/tah-anunga"
    },
    {
        name: "Ryan Arambula",
        team: "Charleston Battery",
        url: "https://www.uslsoccer.com/ryan-arambula"
    },
    {
        name: "Leland Archer",
        team: "Charleston Battery",
        url: "https://www.uslsoccer.com/leland-archer"
    },
    {
        name: "Robert Beebe",
        team: "Charleston Battery",
        url: "https://www.uslsoccer.com/robert-beebe"
    },
    {
        name: "Jay Bolt",
        team: "Charleston Battery",
        url: "https://www.uslsoccer.com/jay-bolt"
    },
    {
        name: "Vincenzo Candela Lopez",
        team: "Charleston Battery",
        url: "https://www.uslsoccer.com/vincenzo-candela"
    },
    {
        name: "Odisnel Cooper",
        team: "Charleston Battery",
        url: "https://www.uslsoccer.com/odisnel-cooper"
    },
    {
        name: "Quinton Griffith",
        team: "Charleston Battery",
        url: "https://www.uslsoccer.com/quinton-griffith"
    },
    {
        name: "Ataulla Guerra",
        team: "Charleston Battery",
        url: "https://www.uslsoccer.com/ataulla-guerra"
    },
    {
        name: "Neveal Hackshaw",
        team: "Charleston Battery",
        url: "https://www.uslsoccer.com/neveal-hackshaw"
    },
    {
        name: "Kotaro Higashi",
        team: "Charleston Battery",
        url: "https://www.uslsoccer.com/kotaro-higashi"
    },
    {
        name: "Angelo Kelly-Rosales",
        team: "Charleston Battery",
        url: "https://www.uslsoccer.com/angelo-kelly-rosales"
    },
    {
        name: "Joe Kuzminsky",
        team: "Charleston Battery",
        url: "https://www.uslsoccer.com/joe-kuzminsky"
    },
    {
        name: "Victor Mansaray",
        team: "Charleston Battery",
        url: "https://www.uslsoccer.com/victor-mansaray"
    },
    {
        name: "Taylor Mueller",
        team: "Charleston Battery",
        url: "https://www.uslsoccer.com/taylor-mueller"
    },
    {
        name: "Patrick Okonkwo",
        team: "Charleston Battery",
        url: "https://www.uslsoccer.com/patrick-okonkwo"
    },
    {
        name: "Nico Rittmeyer",
        team: "Charleston Battery",
        url: "https://www.uslsoccer.com/nico-rittmeyer"
    },
    {
        name: "Ian Svantesson",
        team: "Charleston Battery",
        url: "https://www.uslsoccer.com/ian-svantesson"
    },
    {
        name: "Skylar Thomas",
        team: "Charleston Battery",
        url: "https://www.uslsoccer.com/skylar-thomas"
    },
    {
        name: "Jared van Schaik",
        team: "Charleston Battery",
        url: "https://www.uslsoccer.com/jarad-van-schaik"
    },
    {
        name: "Gordon Wild",
        team: "Charleston Battery",
        url: "https://www.uslsoccer.com/gordon-wild"
    },
    {
        name: "O'Brian Woodbine",
        team: "Charleston Battery",
        url: "https://www.uslsoccer.com/obrian-woodbine"
    },
    {
        name: "Jake Areman",
        team: "Charlotte Independence",
        url: "https://www.uslsoccer.com/jake-areman"
    },
    {
        name: "Ben Beaury",
        team: "Charlotte Independence",
        url: "https://www.uslsoccer.com/ben-beaury"
    },
    {
        name: "Caleb Calvert",
        team: "Charlotte Independence",
        url: "https://www.uslsoccer.com/caleb-calvert"
    },
    {
        name: "Cordell Cato",
        team: "Charlotte Independence",
        url: "https://www.uslsoccer.com/cordell-cato"
    },
    {
        name: "Calvin Doum",
        team: "Charlotte Independence",
        url: "https://www.uslsoccer.com/calvin-doum"
    },
    {
        name: "Bilal Duckett",
        team: "Charlotte Independence",
        url: "https://www.uslsoccer.com/bilal-duckett"
    },
    {
        name: "Andrew Dykstra",
        team: "Charlotte Independence",
        url: "https://www.uslsoccer.com/andrew-dykstra"
    },
    {
        name: "Yann Ekra",
        team: "Charlotte Independence",
        url: "https://www.uslsoccer.com/yann-ekra"
    },
    {
        name: "Kevan George",
        team: "Charlotte Independence",
        url: "https://www.uslsoccer.com/kevan-george"
    },
    {
        name: "Jorge Herrera",
        team: "Charlotte Independence",
        url: "https://www.uslsoccer.com/jorge-herrera"
    },
    {
        name: "Joel Johnson",
        team: "Charlotte Independence",
        url: "https://www.uslsoccer.com/joel-johnson"
    },
    {
        name: "Greg Jordan",
        team: "Charlotte Independence",
        url: "https://www.uslsoccer.com/greg-jordan"
    },
    {
        name: "Henry Kalungi",
        team: "Charlotte Independence",
        url: "https://www.uslsoccer.com/henry-kalungi"
    },
    {
        name: "Jungsoo Lee",
        team: "Charlotte Independence",
        url: "https://www.uslsoccer.com/jungsoo-lee"
    },
    {
        name: "Kainoa Likewise",
        team: "Charlotte Independence",
        url: "https://www.uslsoccer.com/kainoa-likewise"
    },
    {
        name: "Alex Martínez",
        team: "Charlotte Independence",
        url: "https://www.uslsoccer.com/alex-martinez"
    },
    {
        name: "Brandon Miller",
        team: "Charlotte Independence",
        url: "https://www.uslsoccer.com/brandon-miller"
    },
    {
        name: "Mutaya Mwape",
        team: "Charlotte Independence",
        url: "https://www.uslsoccer.com/mutaya-mwape"
    },
    {
        name: "Ricardo Perez",
        team: "Charlotte Independence",
        url: "https://www.uslsoccer.com/ricardo-perez"
    },
    {
        name: "Donnie Smith",
        team: "Charlotte Independence",
        url: "https://www.uslsoccer.com/donnie-smith"
    },
    {
        name: "Daniel Steedman",
        team: "Charlotte Independence",
        url: "https://www.uslsoccer.com/daniel-steedman"
    },
    {
        name: "Sam Vines",
        team: "Charlotte Independence",
        url: "https://www.uslsoccer.com/sam-vines"
    },
    {
        name: "Kay Voser",
        team: "Charlotte Independence",
        url: "https://www.uslsoccer.com/kay-voser"
    },
    {
        name: "Je-Vaughn Watson",
        team: "Charlotte Independence",
        url: "https://www.uslsoccer.com/je-vaughn-watson"
    },
    {
        name: "Eamon Zayed",
        team: "Charlotte Independence",
        url: "https://www.uslsoccer.com/eamon-zayed"
    },
    {
        name: "AJ Ajeakwa",
        team: "Colorado Springs Switchbacks FC",
        url: "https://www.uslsoccer.com/aj-ajeakwa"
    },
    {
        name: "Nicholas Amoako",
        team: "Colorado Springs Switchbacks FC",
        url: "https://www.uslsoccer.com/nicholas-amoako"
    },
    {
        name: "Jordan Burt",
        team: "Colorado Springs Switchbacks FC",
        url: "https://www.uslsoccer.com/jordan-burt"
    },
    {
        name: "Steward Ceus",
        team: "Colorado Springs Switchbacks FC",
        url: "https://www.uslsoccer.com/steward-ceus"
    },
    {
        name: "Kip Colvey",
        team: "Colorado Springs Switchbacks FC",
        url: "https://www.uslsoccer.com/kip-colvey"
    },
    {
        name: "Pascal Eboussi",
        team: "Colorado Springs Switchbacks FC",
        url: "https://www.uslsoccer.com/pascal-eboussi"
    },
    {
        name: "Sam Hamilton",
        team: "Colorado Springs Switchbacks FC",
        url: "https://www.uslsoccer.com/sam-hamilton"
    },
    {
        name: "Karsten Hanlin",
        team: "Colorado Springs Switchbacks FC",
        url: "https://www.uslsoccer.com/karsten-hanlin"
    },
    {
        name: "Taylor Hunter",
        team: "Colorado Springs Switchbacks FC",
        url: "https://www.uslsoccer.com/taylor-hunter"
    },
    {
        name: "Jamal Jack",
        team: "Colorado Springs Switchbacks FC",
        url: "https://www.uslsoccer.com/jamal-jack"
    },
    {
        name: "Niki Jackson",
        team: "Colorado Springs Switchbacks FC",
        url: "https://www.uslsoccer.com/niki-jackson"
    },
    {
        name: "Taeseong Kim",
        team: "Colorado Springs Switchbacks FC",
        url: "https://www.uslsoccer.com/taeseong-kim"
    },
    {
        name: "Uriel Macias",
        team: "Colorado Springs Switchbacks FC",
        url: "https://www.uslsoccer.com/uriel-macias"
    },
    {
        name: "Shane Malcolm",
        team: "Colorado Springs Switchbacks FC",
        url: "https://www.uslsoccer.com/shane-malcolm"
    },
    {
        name: "Marty Maybin",
        team: "Colorado Springs Switchbacks FC",
        url: "https://www.uslsoccer.com/marty-maybin"
    },
    {
        name: "Moise Pouaty",
        team: "Colorado Springs Switchbacks FC",
        url: "https://www.uslsoccer.com/moise-pouaty"
    },
    {
        name: "Saeed Robinson",
        team: "Colorado Springs Switchbacks FC",
        url: "https://www.uslsoccer.com/saeed-robinson"
    },
    {
        name: "Jordan Schweitzer",
        team: "Colorado Springs Switchbacks FC",
        url: "https://www.uslsoccer.com/jordan-schweitzer"
    },
    {
        name: "Josh Suggs",
        team: "Colorado Springs Switchbacks FC",
        url: "https://www.uslsoccer.com/josh-suggs"
    },
    {
        name: "Ayukokata Tambe",
        team: "Colorado Springs Switchbacks FC",
        url: "https://www.uslsoccer.com/ayukokata-tambe"
    },
    {
        name: "Tobenna Uzo",
        team: "Colorado Springs Switchbacks FC",
        url: "https://www.uslsoccer.com/tobenna-uzo"
    },
    {
        name: "Verneri Välimaa",
        team: "Colorado Springs Switchbacks FC",
        url: "https://www.uslsoccer.com/verneri-välimaa"
    },
    {
        name: "Luke Vercollone",
        team: "Colorado Springs Switchbacks FC",
        url: "https://www.uslsoccer.com/luke-vercollone"
    },
    {
        name: "Nazmi Albadawi",
        team: "FC Cincinnati",
        url: "https://www.uslsoccer.com/nazmi-albadawi"
    },
    {
        name: "Tomi Ameobi",
        team: "FC Cincinnati",
        url: "https://www.uslsoccer.com/tomi-ameobi"
    },
    {
        name: "Matt Bahner",
        team: "FC Cincinnati",
        url: "https://www.uslsoccer.com/matt-bahner"
    },
    {
        name: "Paddy Barrett",
        team: "FC Cincinnati",
        url: "https://www.uslsoccer.com/paddy-barrett"
    },
    {
        name: "Corben Bone",
        team: "FC Cincinnati",
        url: "https://www.uslsoccer.com/corben-bone"
    },
    {
        name: "Russell Cicerone",
        team: "FC Cincinnati",
        url: "https://www.uslsoccer.com/russell-cicerone"
    },
    {
        name: "Sem de Wit",
        team: "FC Cincinnati",
        url: "https://www.uslsoccer.com/sem-de-wit"
    },
    {
        name: "Tyler Gibson",
        team: "FC Cincinnati",
        url: "https://www.uslsoccer.com/tyler-gibson"
    },
    {
        name: "Justin Hoyte",
        team: "FC Cincinnati",
        url: "https://www.uslsoccer.com/justin-hoyte"
    },
    {
        name: "Dekel Keinan",
        team: "FC Cincinnati",
        url: "https://www.uslsoccer.com/dekel-keinan"
    },
    {
        name: "Danni König",
        team: "FC Cincinnati",
        url: "https://www.uslsoccer.com/danni-konig"
    },
    {
        name: "Michael Lahoud",
        team: "FC Cincinnati",
        url: "https://www.uslsoccer.com/michael-lahoud"
    },
    {
        name: "Lance Laing",
        team: "FC Cincinnati",
        url: "https://www.uslsoccer.com/lance-laing"
    },
    {
        name: "Forrest Lasso",
        team: "FC Cincinnati",
        url: "https://www.uslsoccer.com/forrest-lasso"
    },
    {
        name: "Emmanuel Ledesma",
        team: "FC Cincinnati",
        url: "https://www.uslsoccer.com/emmanuel-ledesma"
    },
    {
        name: "Jimmy McLaughlin",
        team: "FC Cincinnati",
        url: "https://www.uslsoccer.com/jimmy-mclaughlin"
    },
    {
        name: "Evan Newton",
        team: "FC Cincinnati",
        url: "https://www.uslsoccer.com/evan-newton"
    },
    {
        name: "Spencer Richey",
        team: "FC Cincinnati",
        url: "https://www.uslsoccer.com/spencer-richey"
    },
    {
        name: "Richie Ryan",
        team: "FC Cincinnati",
        url: "https://www.uslsoccer.com/richie-ryan"
    },
    {
        name: "Will Seymore",
        team: "FC Cincinnati",
        url: "https://www.uslsoccer.com/will-seymore"
    },
    {
        name: "Blake Smith",
        team: "FC Cincinnati",
        url: "https://www.uslsoccer.com/blake-smith"
    },
    {
        name: "Mark Village",
        team: "FC Cincinnati",
        url: "https://www.uslsoccer.com/mark-village"
    },
    {
        name: "Kenney Walker",
        team: "FC Cincinnati",
        url: "https://www.uslsoccer.com/kenney-walker"
    },
    {
        name: "Emery Welshman",
        team: "FC Cincinnati",
        url: "https://www.uslsoccer.com/emery-welshman"
    },
    {
        name: "Abdul Alhassan",
        team: "Fresno FC",
        url: "https://www.uslsoccer.com/abdul-alhassan"
    },
    {
        name: "Rony Argueta",
        team: "Fresno FC",
        url: "https://www.uslsoccer.com/rony-argueta"
    },
    {
        name: "Matthew Baldisimo",
        team: "Fresno FC",
        url: "https://www.uslsoccer.com/matthew-baldisimo"
    },
    {
        name: "Danny Barrera",
        team: "Fresno FC",
        url: "https://www.uslsoccer.com/danny-barrera"
    },
    {
        name: "Milton Blanco",
        team: "Fresno FC",
        url: "https://www.uslsoccer.com/milton-blanco"
    },
    {
        name: "Cory Brown",
        team: "Fresno FC",
        url: "https://www.uslsoccer.com/cory-brown"
    },
    {
        name: "Renato Bustamante",
        team: "Fresno FC",
        url: "https://www.uslsoccer.com/renato-bustamente"
    },
    {
        name: "Juan Caffa",
        team: "Fresno FC",
        url: "https://www.uslsoccer.com/juan-caffa"
    },
    {
        name: "Terran Campbell",
        team: "Fresno FC",
        url: "https://www.uslsoccer.com/terran-campbell"
    },
    {
        name: "Agustin Cazarez",
        team: "Fresno FC",
        url: "https://www.uslsoccer.com/agustin-cazarez"
    },
    {
        name: "Christian Chaney",
        team: "Fresno FC",
        url: "https://www.uslsoccer.com/christian-chaney"
    },
    {
        name: "Alex Cooper",
        team: "Fresno FC",
        url: "https://www.uslsoccer.com/alex-cooper"
    },
    {
        name: "Jose Cuevas",
        team: "Fresno FC",
        url: "https://www.uslsoccer.com/jose-cuevas"
    },
    {
        name: "Mickey Daly",
        team: "Fresno FC",
        url: "https://www.uslsoccer.com/mickey-daly"
    },
    {
        name: "Zach Ellis-Hayden",
        team: "Fresno FC",
        url: "https://www.uslsoccer.com/zach-ellis-hayden"
    },
    {
        name: "Justin Fiddes",
        team: "Fresno FC",
        url: "https://www.uslsoccer.com/justin-fiddes"
    },
    {
        name: "Sam Howard",
        team: "Fresno FC",
        url: "https://www.uslsoccer.com/sam-howard"
    },
    {
        name: "Jemal Johnson",
        team: "Fresno FC",
        url: "https://www.uslsoccer.com/jemal-johnson"
    },
    {
        name: "Bradley Kamdem Fewo",
        team: "Fresno FC",
        url: "https://www.uslsoccer.com/bradley-kamdem-fewo"
    },
    {
        name: "Ramon Martin Del Campo",
        team: "Fresno FC",
        url: "https://www.uslsoccer.com/ramon-martin-del-campo"
    },
    {
        name: "Beto Navarro",
        team: "Fresno FC",
        url: "https://www.uslsoccer.com/beto-navarro"
    },
    {
        name: "Agustin Rey",
        team: "Fresno FC",
        url: "https://www.uslsoccer.com/agustin-rey"
    },
    {
        name: "Kyle Reynish",
        team: "Fresno FC",
        url: "https://www.uslsoccer.com/kyle-reynish"
    },
    {
        name: "Pedro Ribeiro",
        team: "Fresno FC",
        url: "https://www.uslsoccer.com/pedro-ribeiro"
    },
    {
        name: "Rodolfo",
        team: "Fresno FC",
        url: "https://www.uslsoccer.com/rodolfo"
    },
    {
        name: "Sam Strong",
        team: "Fresno FC",
        url: "https://www.uslsoccer.com/sam-strong"
    },
    {
        name: "Lamin Suma",
        team: "Fresno FC",
        url: "https://www.uslsoccer.com/lamin-suma"
    },
    {
        name: "Franck Tayou",
        team: "Fresno FC",
        url: "https://www.uslsoccer.com/franck-tayou"
    },
    {
        name: "Noah Verhoeven",
        team: "Fresno FC",
        url: "https://www.uslsoccer.com/noah-verhoeven"
    },
    {
        name: "Amass Amankona",
        team: "Indy Eleven",
        url: "https://www.uslsoccer.com/amass-amankona"
    },
    {
        name: "Justin Braun",
        team: "Indy Eleven",
        url: "https://www.uslsoccer.com/justin-braun"
    },
    {
        name: "Jordan Farr",
        team: "Indy Eleven",
        url: "https://www.uslsoccer.com/jordan-farr"
    },
    {
        name: "Ayoze García",
        team: "Indy Eleven",
        url: "https://www.uslsoccer.com/ayoze-garcia"
    },
    {
        name: "Juan Guerra",
        team: "Indy Eleven",
        url: "https://www.uslsoccer.com/juan-guerra"
    },
    {
        name: "Nathan Lewis",
        team: "Indy Eleven",
        url: "https://www.uslsoccer.com/nathan-lewis"
    },
    {
        name: "Ben Lundgaard",
        team: "Indy Eleven",
        url: "https://www.uslsoccer.com/ben-lundgaard"
    },
    {
        name: "Nico Matern",
        team: "Indy Eleven",
        url: "https://www.uslsoccer.com/nico-matern"
    },
    {
        name: "Jack McInerney",
        team: "Indy Eleven",
        url: "https://www.uslsoccer.com/jack-mcinerney"
    },
    {
        name: "Carlyle Mitchell",
        team: "Indy Eleven",
        url: "https://www.uslsoccer.com/carlyle-mitchell"
    },
    {
        name: "Seth Moses",
        team: "Indy Eleven",
        url: "https://www.uslsoccer.com/seth-moses"
    },
    {
        name: "Karl Ouimette",
        team: "Indy Eleven",
        url: "https://www.uslsoccer.com/karl-ouimette"
    },
    {
        name: "Tyler Pasher",
        team: "Indy Eleven",
        url: "https://www.uslsoccer.com/tyler-pasher"
    },
    {
        name: "Reiner",
        team: "Indy Eleven",
        url: "https://www.uslsoccer.com/reiner"
    },
    {
        name: "Brad Ring",
        team: "Indy Eleven",
        url: "https://www.uslsoccer.com/brad-ring"
    },
    {
        name: "Brad Rusin",
        team: "Indy Eleven",
        url: "https://www.uslsoccer.com/brad-rusin"
    },
    {
        name: "Soony Saad",
        team: "Indy Eleven",
        url: "https://www.uslsoccer.com/soony-saad"
    },
    {
        name: "Ben Speas",
        team: "Indy Eleven",
        url: "https://www.uslsoccer.com/ben-speas"
    },
    {
        name: "Eugene Starikov",
        team: "Indy Eleven",
        url: "https://www.uslsoccer.com/eugene-starikov"
    },
    {
        name: "Zach Steinberger",
        team: "Indy Eleven",
        url: "https://www.uslsoccer.com/zach-steinberger"
    },
    {
        name: "Kevin Venegas",
        team: "Indy Eleven",
        url: "https://www.uslsoccer.com/kevin-venegas"
    },
    {
        name: "Matt Watson",
        team: "Indy Eleven",
        url: "https://www.uslsoccer.com/matt-watson"
    },
    {
        name: "Owain Fon Williams",
        team: "Indy Eleven",
        url: "https://www.uslsoccer.com/owain-fon-williams"
    },
    {
        name: "Geoffrey Acheampong",
        team: "LA Galaxy II",
        url: "https://www.uslsoccer.com/geoffrey-acheampong"
    },
    {
        name: "Miguel Aguilar",
        team: "LA Galaxy II",
        url: "https://www.uslsoccer.com/miguel-aguilar"
    },
    {
        name: "Efrain Alvarez",
        team: "LA Galaxy II",
        url: "https://www.uslsoccer.com/efrain-alvarez"
    },
    {
        name: "Adonis Amaya",
        team: "LA Galaxy II",
        url: "https://www.uslsoccer.com/adonis-amaya"
    },
    {
        name: "Emmanuel Appiah",
        team: "LA Galaxy II",
        url: "https://www.uslsoccer.com/emmanuel-appiah"
    },
    {
        name: "Hugo Arellano",
        team: "LA Galaxy II",
        url: "https://www.uslsoccer.com/hugo-arellano"
    },
    {
        name: "Jake Arteaga",
        team: "LA Galaxy II",
        url: "https://www.uslsoccer.com/jake-arteaga"
    },
    {
        name: "Zico Bailey",
        team: "LA Galaxy II",
        url: "https://www.uslsoccer.com/zico-bailey"
    },
    {
        name: "Julian Buescher",
        team: "LA Galaxy II",
        url: "https://www.uslsoccer.com/julian-buescher"
    },
    {
        name: "Taylor Davila",
        team: "LA Galaxy II",
        url: "https://www.uslsoccer.com/taylor-davila"
    },
    {
        name: "Justin Dhillon",
        team: "LA Galaxy II",
        url: "https://www.uslsoccer.com/justin-dhillon"
    },
    {
        name: "Jean Engola",
        team: "LA Galaxy II",
        url: "https://www.uslsoccer.com/jean-engola"
    },
    {
        name: "Wade Hamilton",
        team: "LA Galaxy II",
        url: "https://www.uslsoccer.com/wade-hamilton"
    },
    {
        name: "Jonathan Hernandez",
        team: "LA Galaxy II",
        url: "https://www.uslsoccer.com/jonathan-hernandez"
    },
    {
        name: "Jorge Hernandez",
        team: "LA Galaxy II",
        url: "https://www.uslsoccer.com/jorge-hernandez"
    },
    {
        name: "Kobe Hernandez-Foster",
        team: "LA Galaxy II",
        url: "https://www.uslsoccer.com/kobe-hernandez-foster"
    },
    {
        name: "Tomas Hilliard-Arce",
        team: "LA Galaxy II",
        url: "https://www.uslsoccer.com/tomas-hilliard-arce"
    },
    {
        name: "Bradford Jamieson IV",
        team: "LA Galaxy II",
        url: "https://www.uslsoccer.com/bradford-jamieson-iv"
    },
    {
        name: "Ariel Lassiter",
        team: "LA Galaxy II",
        url: "https://www.uslsoccer.com/ariel-lassiter"
    },
    {
        name: "Ulysses Llanez",
        team: "LA Galaxy II",
        url: "https://www.uslsoccer.com/ulysses-llanez"
    },
    {
        name: "Ian Lonergan",
        team: "LA Galaxy II",
        url: "https://www.uslsoccer.com/ian-lonergan"
    },
    {
        name: "Eric Lopez",
        team: "LA Galaxy II",
        url: "https://www.uslsoccer.com/eric-lopez"
    },
    {
        name: "Frank Lopez",
        team: "LA Galaxy II",
        url: "https://www.uslsoccer.com/frank-lopez"
    },
    {
        name: "Alex Mendez",
        team: "LA Galaxy II",
        url: "https://www.uslsoccer.com/alex-mendez"
    },
    {
        name: "João Pedro",
        team: "LA Galaxy II",
        url: "https://www.uslsoccer.com/joao-pedro"
    },
    {
        name: "John Pulskamp",
        team: "LA Galaxy II",
        url: "https://www.uslsoccer.com/john-pulskamp"
    },
    {
        name: "John Requejo",
        team: "LA Galaxy II",
        url: "https://www.uslsoccer.com/john-requejo"
    },
    {
        name: "Nate Shultz",
        team: "LA Galaxy II",
        url: "https://www.uslsoccer.com/nate-shultz"
    },
    {
        name: "Brian Sylvestre",
        team: "LA Galaxy II",
        url: "https://www.uslsoccer.com/brian-sylvestre"
    },
    {
        name: "Diedie Traore",
        team: "LA Galaxy II",
        url: "https://www.uslsoccer.com/diedie-traore"
    },
    {
        name: "Adrián Vera",
        team: "LA Galaxy II",
        url: "https://www.uslsoccer.com/adrian-vera"
    },
    {
        name: "Justin Vom Steeg",
        team: "LA Galaxy II",
        url: "https://www.uslsoccer.com/justin-vom-steeg"
    },
    {
        name: "Sheanon Williams",
        team: "LA Galaxy II",
        url: "https://www.uslsoccer.com/sheanon-williams"
    },
    {
        name: "Andre Zanga",
        team: "LA Galaxy II",
        url: "https://www.uslsoccer.com/andre-zanga"
    },
    {
        name: "Ethan Zubak",
        team: "LA Galaxy II",
        url: "https://www.uslsoccer.com/ethan-zubak"
    },
    {
        name: "Freddy Adu",
        team: "Las Vegas Lights FC",
        url: "https://www.uslsoccer.com/freddy-adu"
    },
    {
        name: "Marcelo Alatorre",
        team: "Las Vegas Lights FC",
        url: "https://www.uslsoccer.com/marcelo-alatorre"
    },
    {
        name: "Angel Alvarez",
        team: "Las Vegas Lights FC",
        url: "https://www.uslsoccer.com/angel-alvarez"
    },
    {
        name: "Carlos Alvarez",
        team: "Las Vegas Lights FC",
        url: "https://www.uslsoccer.com/carlos-alvarez"
    },
    {
        name: "Eric Avila",
        team: "Las Vegas Lights FC",
        url: "https://www.uslsoccer.com/eric-avila"
    },
    {
        name: "Juan Calderon",
        team: "Las Vegas Lights FC",
        url: "https://www.uslsoccer.com/juan-calderon"
    },
    {
        name: "Isaac Díaz",
        team: "Las Vegas Lights FC",
        url: "https://www.uslsoccer.com/isaac-diaz"
    },
    {
        name: "Zak Drake",
        team: "Las Vegas Lights FC",
        url: "https://www.uslsoccer.com/zak-drake"
    },
    {
        name: "Ricardo Ferriño",
        team: "Las Vegas Lights FC",
        url: "https://www.uslsoccer.com/ricardo-ferrino"
    },
    {
        name: "Juan Carlos Garcia",
        team: "Las Vegas Lights FC",
        url: "https://www.uslsoccer.com/juan-carlos-garcia"
    },
    {
        name: "Miguel Garduño",
        team: "Las Vegas Lights FC",
        url: "https://www.uslsoccer.com/miguel-garduno"
    },
    {
        name: "Jorge Guillen-Torres",
        team: "Las Vegas Lights FC",
        url: "https://www.uslsoccer.com/jorge-guillen-torres"
    },
    {
        name: "Adolfo Guzman",
        team: "Las Vegas Lights FC",
        url: "https://www.uslsoccer.com/adolfo-guzman"
    },
    {
        name: "Daniel Guzman Miranda",
        team: "Las Vegas Lights FC",
        url: "https://www.uslsoccer.com/daniel-guzman-miranda"
    },
    {
        name: "Sebastian Hernandez",
        team: "Las Vegas Lights FC",
        url: "https://www.uslsoccer.com/sebastian-hernandez"
    },
    {
        name: "Juan Herrera-Perla",
        team: "Las Vegas Lights FC",
        url: "https://www.uslsoccer.com/juan-herrera-perla"
    },
    {
        name: "Joel Huiqui",
        team: "Las Vegas Lights FC",
        url: "https://www.uslsoccer.com/joel-huiqui"
    },
    {
        name: "Rodrigo Íñigro",
        team: "Las Vegas Lights FC",
        url: "https://www.uslsoccer.com/rodrigo-inigro"
    },
    {
        name: "Marco Jaime",
        team: "Las Vegas Lights FC",
        url: "https://www.uslsoccer.com/marco-jaime"
    },
    {
        name: "Anuar Kanan",
        team: "Las Vegas Lights FC",
        url: "https://www.uslsoccer.com/anuar-kanan"
    },
    {
        name: "Daigo Kobayashi",
        team: "Las Vegas Lights FC",
        url: "https://www.uslsoccer.com/daigo-kobayashi"
    },
    {
        name: "Zach Mathers",
        team: "Las Vegas Lights FC",
        url: "https://www.uslsoccer.com/zach-mathers"
    },
    {
        name: "Raul Mendiola",
        team: "Las Vegas Lights FC",
        url: "https://www.uslsoccer.com/raul-mendiola"
    },
    {
        name: "Alex Mendoza",
        team: "Las Vegas Lights FC",
        url: "https://www.uslsoccer.com/alex-mendoza"
    },
    {
        name: "James Murphy",
        team: "Las Vegas Lights FC",
        url: "https://www.uslsoccer.com/james-murphy"
    },
    {
        name: "Sammy Ochoa",
        team: "Las Vegas Lights FC",
        url: "https://www.uslsoccer.com/sammy-ochoa"
    },
    {
        name: "Thomas Olsen",
        team: "Las Vegas Lights FC",
        url: "https://www.uslsoccer.com/thomas-olsen"
    },
    {
        name: "Joseph Perez",
        team: "Las Vegas Lights FC",
        url: "https://www.uslsoccer.com/joseph-perez"
    },
    {
        name: "Julian Portugal",
        team: "Las Vegas Lights FC",
        url: "https://www.uslsoccer.com/julian-portugal"
    },
    {
        name: "Omar Salgado",
        team: "Las Vegas Lights FC",
        url: "https://www.uslsoccer.com/omar-salgado"
    },
    {
        name: "Nicolas Samayoa",
        team: "Las Vegas Lights FC",
        url: "https://www.uslsoccer.com/nicolas-samayoa"
    },
    {
        name: "Matthew Thomas",
        team: "Las Vegas Lights FC",
        url: "https://www.uslsoccer.com/matthew-thomas"
    },
    {
        name: "Christian Torres",
        team: "Las Vegas Lights FC",
        url: "https://www.uslsoccer.com/christian-torres"
    },
    {
        name: "Richard Ballard",
        team: "Louisville City FC",
        url: "https://www.uslsoccer.com/richard-ballard"
    },
    {
        name: "Paco Craig",
        team: "Louisville City FC",
        url: "https://www.uslsoccer.com/paco-craig"
    },
    {
        name: "George Davis IV",
        team: "Louisville City FC",
        url: "https://www.uslsoccer.com/george-davis-iv"
    },
    {
        name: "Paolo DelPiccolo",
        team: "Louisville City FC",
        url: "https://www.uslsoccer.com/paolo-delpiccolo"
    },
    {
        name: "Tim Dobrowolski",
        team: "Louisville City FC",
        url: "https://www.uslsoccer.com/tim-dobrowolski"
    },
    {
        name: "Shaun Francis",
        team: "Louisville City FC",
        url: "https://www.uslsoccer.com/shaun-francis"
    },
    {
        name: "Chris Hubbard",
        team: "Louisville City FC",
        url: "https://www.uslsoccer.com/chris-hubbard"
    },
    {
        name: "Ilija Ilić",
        team: "Louisville City FC",
        url: "https://www.uslsoccer.com/ilija-ilic"
    },
    {
        name: "Oscar Jimenez",
        team: "Louisville City FC",
        url: "https://www.uslsoccer.com/oscar-jimenez"
    },
    {
        name: "Cameron Lancaster",
        team: "Louisville City FC",
        url: "https://www.uslsoccer.com/cameron-lancaster"
    },
    {
        name: "Niall McCabe",
        team: "Louisville City FC",
        url: "https://www.uslsoccer.com/niall-mccabe"
    },
    {
        name: "Pat McMahon",
        team: "Louisville City FC",
        url: "https://www.uslsoccer.com/pat-mcmahon"
    },
    {
        name: "Brian Ownby",
        team: "Louisville City FC",
        url: "https://www.uslsoccer.com/brian-ownby"
    },
    {
        name: "Greg Ranjitsingh",
        team: "Louisville City FC",
        url: "https://www.uslsoccer.com/greg-ranjitsingh"
    },
    {
        name: "Magnus Rasmussen",
        team: "Louisville City FC",
        url: "https://www.uslsoccer.com/magnus-rasmussen"
    },
    {
        name: "Kyle Smith",
        team: "Louisville City FC",
        url: "https://www.uslsoccer.com/kyle-smith"
    },
    {
        name: "Alexis Souahy",
        team: "Louisville City FC",
        url: "https://www.uslsoccer.com/alexis-souahy"
    },
    {
        name: "Luke Spencer",
        team: "Louisville City FC",
        url: "https://www.uslsoccer.com/luke-spencer"
    },
    {
        name: "Sean Totsch",
        team: "Louisville City FC",
        url: "https://www.uslsoccer.com/sean-totsch"
    },
    {
        name: "Speedy Williams",
        team: "Louisville City FC",
        url: "https://www.uslsoccer.com/devon-williams"
    },
    {
        name: "Bolu Akinyode",
        team: "Nashville SC",
        url: "https://www.uslsoccer.com/bolu-akinyode"
    },
    {
        name: "Brandon Allen",
        team: "Nashville SC",
        url: "https://www.uslsoccer.com/brandon-allen"
    },
    {
        name: "Micah Bledsoe",
        team: "Nashville SC",
        url: "https://www.uslsoccer.com/micah-bledsoe"
    },
    {
        name: "Bradley Bourgeois",
        team: "Nashville SC",
        url: "https://www.uslsoccer.com/bradley-bourgeois"
    },
    {
        name: "CJ Cochran",
        team: "Nashville SC",
        url: "https://www.uslsoccer.com/cj-cochran"
    },
    {
        name: "Justin Davis",
        team: "Nashville SC",
        url: "https://www.uslsoccer.com/justin-davis"
    },
    {
        name: "Michael DeGraffenreidt",
        team: "Nashville SC",
        url: "https://www.uslsoccer.com/michael-degraffenreidt"
    },
    {
        name: "Liam Doyle",
        team: "Nashville SC",
        url: "https://www.uslsoccer.com/liam-doyle"
    },
    {
        name: "Jordan Dunstan",
        team: "Nashville SC",
        url: "https://www.uslsoccer.com/jordan-dunstan"
    },
    {
        name: "David Edgar",
        team: "Nashville SC",
        url: "https://www.uslsoccer.com/david-edgar"
    },
    {
        name: "Martim Galvão",
        team: "Nashville SC",
        url: "https://www.uslsoccer.com/martim-galvao"
    },
    {
        name: "Ramone Howell",
        team: "Nashville SC",
        url: "https://www.uslsoccer.com/ramone-howell"
    },
    {
        name: "Josh Hughes",
        team: "Nashville SC",
        url: "https://www.uslsoccer.com/josh-hughes"
    },
    {
        name: "Tucker Hume",
        team: "Nashville SC",
        url: "https://www.uslsoccer.com/tucker-hume"
    },
    {
        name: "Ryan James",
        team: "Nashville SC",
        url: "https://www.uslsoccer.com/ryan-james"
    },
    {
        name: "Ismaila Jome",
        team: "Nashville SC",
        url: "https://www.uslsoccer.com/ismaila-jome"
    },
    {
        name: "Kosuke Kimura",
        team: "Nashville SC",
        url: "https://www.uslsoccer.com/kosuke-kimura"
    },
    {
        name: "Matt LaGrassa",
        team: "Nashville SC",
        url: "https://www.uslsoccer.com/matt-lagrassa"
    },
    {
        name: "Ian McGrath",
        team: "Nashville SC",
        url: "https://www.uslsoccer.com/ian-mcgrath"
    },
    {
        name: "Ropapa Mensah",
        team: "Nashville SC",
        url: "https://www.uslsoccer.com/ropapa-mensah"
    },
    {
        name: "Lebo Moloto",
        team: "Nashville SC",
        url: "https://www.uslsoccer.com/lebo-moloto"
    },
    {
        name: "Matt Pickens",
        team: "Nashville SC",
        url: "https://www.uslsoccer.com/matt-pickens"
    },
    {
        name: "Michael Reed",
        team: "Nashville SC",
        url: "https://www.uslsoccer.com/michael-reed"
    },
    {
        name: "Robin Shroot",
        team: "Nashville SC",
        url: "https://www.uslsoccer.com/robin-shroot"
    },
    {
        name: "Taylor Washington",
        team: "Nashville SC",
        url: "https://www.uslsoccer.com/taylor-washington"
    },
    {
        name: "Alan Winn",
        team: "Nashville SC",
        url: "https://www.uslsoccer.com/alan-winn"
    },
    {
        name: "London Woodberry",
        team: "Nashville SC",
        url: "https://www.uslsoccer.com/london-woodberry"
    },
    {
        name: "Wahab Ackwei",
        team: "New York Red Bulls II",
        url: "https://www.uslsoccer.com/wahab-ackwei"
    },
    {
        name: "Jose Aguinaga",
        team: "New York Red Bulls II",
        url: "https://www.uslsoccer.com/jose-aguinaga"
    },
    {
        name: "Jordan Bailon",
        team: "New York Red Bulls II",
        url: "https://www.uslsoccer.com/jordan-bailon"
    },
    {
        name: "Tom Barlow",
        team: "New York Red Bulls II",
        url: "https://www.uslsoccer.com/tom-barlow"
    },
    {
        name: "Vincent Bezecourt",
        team: "New York Red Bulls II",
        url: "https://www.uslsoccer.com/vincent-bezecourt"
    },
    {
        name: "Cristian Casseres",
        team: "New York Red Bulls II",
        url: "https://www.uslsoccer.com/cristian-casseres"
    },
    {
        name: "Niko De Vera",
        team: "New York Red Bulls II",
        url: "https://www.uslsoccer.com/niko-de-vera"
    },
    {
        name: "Kyle Duncan",
        team: "New York Red Bulls II",
        url: "https://www.uslsoccer.com/kyle-duncan"
    },
    {
        name: "Steven Echevarria",
        team: "New York Red Bulls II",
        url: "https://www.uslsoccer.com/steven-echevarria"
    },
    {
        name: "Fidel Escobar",
        team: "New York Red Bulls II",
        url: "https://www.uslsoccer.com/fidel-escobar"
    },
    {
        name: "Derrick Etienne",
        team: "New York Red Bulls II",
        url: "https://www.uslsoccer.com/derrick-etienne"
    },
    {
        name: "Matthew Frank",
        team: "New York Red Bulls II",
        url: "https://www.uslsoccer.com/matthew-frank"
    },
    {
        name: "Sam Ilin",
        team: "New York Red Bulls II",
        url: "https://www.uslsoccer.com/sam-ilin"
    },
    {
        name: "Ethan Kutler",
        team: "New York Red Bulls II",
        url: "https://www.uslsoccer.com/ethan-kutler"
    },
    {
        name: "Connor Lade",
        team: "New York Red Bulls II",
        url: "https://www.uslsoccer.com/connor-lade"
    },
    {
        name: "Chris Lema",
        team: "New York Red Bulls II",
        url: "https://www.uslsoccer.com/chris-lema"
    },
    {
        name: "Scott Levene",
        team: "New York Red Bulls II",
        url: "https://www.uslsoccer.com/scott-levene"
    },
    {
        name: "Andrew Lombard",
        team: "New York Red Bulls II",
        url: "https://www.uslsoccer.com/andrew-lombard"
    },
    {
        name: "Evan Louro",
        team: "New York Red Bulls II",
        url: "https://www.uslsoccer.com/evan-louro"
    },
    {
        name: "JP Marin",
        team: "New York Red Bulls II",
        url: "https://www.uslsoccer.com/jp-marin"
    },
    {
        name: "Ryan Meara",
        team: "New York Red Bulls II",
        url: "https://www.uslsoccer.com/ryan-meara"
    },
    {
        name: "Ben Mines",
        team: "New York Red Bulls II",
        url: "https://www.uslsoccer.com/ben-mines"
    },
    {
        name: "Amando Moreno",
        team: "New York Red Bulls II",
        url: "https://www.uslsoccer.com/amando-moreno"
    },
    {
        name: "John Murphy",
        team: "New York Red Bulls II",
        url: "https://www.uslsoccer.com/john-murphy"
    },
    {
        name: "Alex Muyl",
        team: "New York Red Bulls II",
        url: "https://www.uslsoccer.com/alex-muyl"
    },
    {
        name: "Hassan Ndam",
        team: "New York Red Bulls II",
        url: "https://www.uslsoccer.com/hassan-ndam"
    },
    {
        name: "Kevin Politz",
        team: "New York Red Bulls II",
        url: "https://www.uslsoccer.com/kevin-politz"
    },
    {
        name: "Tommy Redding",
        team: "New York Red Bulls II",
        url: "https://www.uslsoccer.com/tommy-redding"
    },
    {
        name: "Carlos Rivas",
        team: "New York Red Bulls II",
        url: "https://www.uslsoccer.com/carlos-rivas"
    },
    {
        name: "Marc Rzatkowski",
        team: "New York Red Bulls II",
        url: "https://www.uslsoccer.com/marc-rzatkowski"
    },
    {
        name: "Jordan Scarlett",
        team: "New York Red Bulls II",
        url: "https://www.uslsoccer.com/jordan-scarlett"
    },
    {
        name: "Lucas Stauffer",
        team: "New York Red Bulls II",
        url: "https://www.uslsoccer.com/lucas-stauffer"
    },
    {
        name: "Jared Stroud",
        team: "New York Red Bulls II",
        url: "https://www.uslsoccer.com/jared-stroud"
    },
    {
        name: "Andrew Tinari",
        team: "New York Red Bulls II",
        url: "https://www.uslsoccer.com/andrew-tinari"
    },
    {
        name: "Florian Valot",
        team: "New York Red Bulls II",
        url: "https://www.uslsoccer.com/florian-valot"
    },
    {
        name: "Brian White",
        team: "New York Red Bulls II",
        url: "https://www.uslsoccer.com/brian-white"
    },
    {
        name: "Kyle Bekker",
        team: "North Carolina FC",
        url: "https://www.uslsoccer.com/kyle-bekker"
    },
    {
        name: "Nelson Blanco",
        team: "North Carolina FC",
        url: "https://www.uslsoccer.com/nelson-blanco"
    },
    {
        name: "Austin da Luz",
        team: "North Carolina FC",
        url: "https://www.uslsoccer.com/austin-da-luz"
    },
    {
        name: "Futty Danso",
        team: "North Carolina FC",
        url: "https://www.uslsoccer.com/futty-danso"
    },
    {
        name: "Peabo Doue",
        team: "North Carolina FC",
        url: "https://www.uslsoccer.com/peabo-doue"
    },
    {
        name: "Ulrich Ewolo",
        team: "North Carolina FC",
        url: "https://www.uslsoccer.com/ulrich-ewolo"
    },
    {
        name: "Wuilito Fernandes",
        team: "North Carolina FC",
        url: "https://www.uslsoccer.com/wuilito-fernandes"
    },
    {
        name: "Dre Fortune",
        team: "North Carolina FC",
        url: "https://www.uslsoccer.com/dre-fortune"
    },
    {
        name: "Austin Guerrero",
        team: "North Carolina FC",
        url: "https://www.uslsoccer.com/austin-guerrero"
    },
    {
        name: "Aaron Guillen",
        team: "North Carolina FC",
        url: "https://www.uslsoccer.com/aaron-guillen"
    },
    {
        name: "Michael Harrington",
        team: "North Carolina FC",
        url: "https://www.uslsoccer.com/michael-harrington"
    },
    {
        name: "Marcel Kandziora",
        team: "North Carolina FC",
        url: "https://www.uslsoccer.com/marcel-kandziora"
    },
    {
        name: "Marios Lomis",
        team: "North Carolina FC",
        url: "https://www.uslsoccer.com/marios-lomis"
    },
    {
        name: "Bernhard Luxbacher",
        team: "North Carolina FC",
        url: "https://www.uslsoccer.com/bernhard-luxbacher"
    },
    {
        name: "George Marks",
        team: "North Carolina FC",
        url: "https://www.uslsoccer.com/george-marks"
    },
    {
        name: "Steven Miller",
        team: "North Carolina FC",
        url: "https://www.uslsoccer.com/steven-miller"
    },
    {
        name: "Daniel Ríos",
        team: "North Carolina FC",
        url: "https://www.uslsoccer.com/daniel-rios"
    },
    {
        name: "Ty Shipalane",
        team: "North Carolina FC",
        url: "https://www.uslsoccer.com/ty-shipalane"
    },
    {
        name: "Graham Smith",
        team: "North Carolina FC",
        url: "https://www.uslsoccer.com/graham-smith"
    },
    {
        name: "Cameron Steele",
        team: "North Carolina FC",
        url: "https://www.uslsoccer.com/cameron-steele"
    },
    {
        name: "Alexander Tambakis",
        team: "North Carolina FC",
        url: "https://www.uslsoccer.com/alexander-tambakis"
    },
    {
        name: "David Taylor",
        team: "North Carolina FC",
        url: "https://www.uslsoccer.com/david-taylor"
    },
    {
        name: "Connor Tobin",
        team: "North Carolina FC",
        url: "https://www.uslsoccer.com/connor-tobin"
    },
    {
        name: "Joseph Adjei",
        team: "OKC Energy FC",
        url: "https://www.uslsoccer.com/joseph-adjei"
    },
    {
        name: "Kalif Alhassan",
        team: "OKC Energy FC",
        url: "https://www.uslsoccer.com/kalif-alhassan"
    },
    {
        name: "Coady Andrews",
        team: "OKC Energy FC",
        url: "https://www.uslsoccer.com/coady-andrews"
    },
    {
        name: "José Angulo",
        team: "OKC Energy FC",
        url: "https://www.uslsoccer.com/jose-angulo"
    },
    {
        name: "Atiba Harris",
        team: "OKC Energy FC",
        url: "https://www.uslsoccer.com/atiba-harris"
    },
    {
        name: "Francis Atuahene",
        team: "OKC Energy FC",
        url: "https://www.uslsoccer.com/francis-atuahene"
    },
    {
        name: "Carlos Avilez",
        team: "OKC Energy FC",
        url: "https://www.uslsoccer.com/carlos-avilez"
    },
    {
        name: "Jose Barril",
        team: "OKC Energy FC",
        url: "https://www.uslsoccer.com/jose-barril"
    },
    {
        name: "Drew Beckie",
        team: "OKC Energy FC",
        url: "https://www.uslsoccer.com/drew-beckie"
    },
    {
        name: "Jonathan Brown",
        team: "OKC Energy FC",
        url: "https://www.uslsoccer.com/jonathan-brown"
    },
    {
        name: "Bryan Byars",
        team: "OKC Energy FC",
        url: "https://www.uslsoccer.com/bryan-byars"
    },
    {
        name: "Jordan Cano",
        team: "OKC Energy FC",
        url: "https://www.uslsoccer.com/jordan-cano"
    },
    {
        name: "Justin Chavez",
        team: "OKC Energy FC",
        url: "https://www.uslsoccer.com/justin-chavez"
    },
    {
        name: "Alex Dixon",
        team: "OKC Energy FC",
        url: "https://www.uslsoccer.com/alex-dixon"
    },
    {
        name: "Richard Dixon",
        team: "OKC Energy FC",
        url: "https://www.uslsoccer.com/richard-dixon"
    },
    {
        name: "Miguel González",
        team: "OKC Energy FC",
        url: "https://www.uslsoccer.com/miguel-gonzalez"
    },
    {
        name: "Max Gunderson",
        team: "OKC Energy FC",
        url: "https://www.uslsoccer.com/max-gunderson"
    },
    {
        name: "Juan Guzman",
        team: "OKC Energy FC",
        url: "https://www.uslsoccer.com/juan-guzman"
    },
    {
        name: "Kyle Hyland",
        team: "OKC Energy FC",
        url: "https://www.uslsoccer.com/kyle-hyland"
    },
    {
        name: "Christian Ibeagha",
        team: "OKC Energy FC",
        url: "https://www.uslsoccer.com/christian-ibeagha"
    },
    {
        name: "Ryley Kraft",
        team: "OKC Energy FC",
        url: "https://www.uslsoccer.com/ryley-kraft"
    },
    {
        name: "Shawn McLaws",
        team: "OKC Energy FC",
        url: "https://www.uslsoccer.com/shawn-mclaws"
    },
    {
        name: "Juan Niño",
        team: "OKC Energy FC",
        url: "https://www.uslsoccer.com/juan-nino"
    },
    {
        name: "Philip Rasmussen",
        team: "OKC Energy FC",
        url: "https://www.uslsoccer.com/philip-rasmussen"
    },
    {
        name: "Callum Ross",
        team: "OKC Energy FC",
        url: "https://www.uslsoccer.com/callum-ross"
    },
    {
        name: "Jaime Siaj",
        team: "OKC Energy FC",
        url: "https://www.uslsoccer.com/jaime-siaj"
    },
    {
        name: "Ema Twumasi",
        team: "OKC Energy FC",
        url: "https://www.uslsoccer.com/ema-twumasi"
    },
    {
        name: "Matt Van Oekel",
        team: "OKC Energy FC",
        url: "https://www.uslsoccer.com/matt-vanoekel"
    },
    {
        name: "Christian Volesky",
        team: "OKC Energy FC",
        url: "https://www.uslsoccer.com/christian-volesky"
    },
    {
        name: "Kevin Alston",
        team: "Orange County SC",
        url: "https://www.uslsoccer.com/kevin-alston"
    },
    {
        name: "Joe Amico",
        team: "Orange County SC",
        url: "https://www.uslsoccer.com/joe-amico"
    },
    {
        name: "Owusu-Ansah Kontor",
        team: "Orange County SC",
        url: "https://www.uslsoccer.com/owusu-ansah-kontor"
    },
    {
        name: "Casey Beyers",
        team: "Orange County SC",
        url: "https://www.uslsoccer.com/casey-beyers"
    },
    {
        name: "Mats Bjurman",
        team: "Orange County SC",
        url: "https://www.uslsoccer.com/mats-bjurman"
    },
    {
        name: "Aaron Cervantes",
        team: "Orange County SC",
        url: "https://www.uslsoccer.com/aaron-cervantes"
    },
    {
        name: "Richard Chaplow",
        team: "Orange County SC",
        url: "https://www.uslsoccer.com/richard-chaplow"
    },
    {
        name: "Alex Crognale",
        team: "Orange County SC",
        url: "https://www.uslsoccer.com/alex-crognale"
    },
    {
        name: "Nicolás Czornomaz",
        team: "Orange County SC",
        url: "https://www.uslsoccer.com/nicholas-czornomaz"
    },
    {
        name: "Christian Duke",
        team: "Orange County SC",
        url: "https://www.uslsoccer.com/christian-duke"
    },
    {
        name: "Thomas Enevoldsen",
        team: "Orange County SC",
        url: "https://www.uslsoccer.com/thomas-enevoldsen"
    },
    {
        name: "Koji Hashimoto",
        team: "Orange County SC",
        url: "https://www.uslsoccer.com/koji-hashimoto"
    },
    {
        name: "Jos Hooiveld",
        team: "Orange County SC",
        url: "https://www.uslsoccer.com/jos-hooiveld"
    },
    {
        name: "Walker Hume",
        team: "Orange County SC",
        url: "https://www.uslsoccer.com/walker-hume"
    },
    {
        name: "Thomas Juel-Nielsen",
        team: "Orange County SC",
        url: "https://www.uslsoccer.com/thomas-juel-nielsen"
    },
    {
        name: "Zach Kobayashi",
        team: "Orange County SC",
        url: "https://www.uslsoccer.com/zach-kobayashi"
    },
    {
        name: "Luis López",
        team: "Orange County SC",
        url: "https://www.uslsoccer.com/luis-lopez"
    },
    {
        name: "Amirgy Pineda",
        team: "Orange County SC",
        url: "https://www.uslsoccer.com/amirgy-pineda"
    },
    {
        name: "Noah Powder",
        team: "Orange County SC",
        url: "https://www.uslsoccer.com/noah-powder"
    },
    {
        name: "Aodhan Quinn",
        team: "Orange County SC",
        url: "https://www.uslsoccer.com/aodhan-quinn"
    },
    {
        name: "Giovanni Ramos Godoy",
        team: "Orange County SC",
        url: "https://www.uslsoccer.com/giovanni-ramos-godoy"
    },
    {
        name: "Andre Rawls",
        team: "Orange County SC",
        url: "https://www.uslsoccer.com/andre-rawls"
    },
    {
        name: "Michael Seaton",
        team: "Orange County SC",
        url: "https://www.uslsoccer.com/michael-seaton"
    },
    {
        name: "Mark Segbers",
        team: "Orange County SC",
        url: "https://www.uslsoccer.com/mark-segbers"
    },
    {
        name: "Nansel Selbol",
        team: "Orange County SC",
        url: "https://www.uslsoccer.com/nansel-selbol"
    },
    {
        name: "Oscar Sorto",
        team: "Orange County SC",
        url: "https://www.uslsoccer.com/oscar-sorto"
    },
    {
        name: "Nana Attakora",
        team: "Ottawa Fury FC",
        url: "https://www.uslsoccer.com/nana-attakora"
    },
    {
        name: "Gabriel Balbinotti",
        team: "Ottawa Fury FC",
        url: "https://www.uslsoccer.com/gabriel-balbinotti"
    },
    {
        name: "Gerardo Bruna",
        team: "Ottawa Fury FC",
        url: "https://www.uslsoccer.com/gerardo-bruna"
    },
    {
        name: "Maxime Crépeau",
        team: "Ottawa Fury FC",
        url: "https://www.uslsoccer.com/maxime-crepeau"
    },
    {
        name: "Jamar Dixon",
        team: "Ottawa Fury FC",
        url: "https://www.uslsoccer.com/jamar-dixon"
    },
    {
        name: "Steevan Dos Santos",
        team: "Ottawa Fury FC",
        url: "https://www.uslsoccer.com/steevan-dos-santos"
    },
    {
        name: "Eddie Edward",
        team: "Ottawa Fury FC",
        url: "https://www.uslsoccer.com/eddie-edward"
    },
    {
        name: "Colin Falvey",
        team: "Ottawa Fury FC",
        url: "https://www.uslsoccer.com/colin-falvey"
    },
    {
        name: "Daniel Haber",
        team: "Ottawa Fury FC",
        url: "https://www.uslsoccer.com/daniel-haber"
    },
    {
        name: "Carl Haworth",
        team: "Ottawa Fury FC",
        url: "https://www.uslsoccer.com/carl-haworth"
    },
    {
        name: "Doneil Henry",
        team: "Ottawa Fury FC",
        url: "https://www.uslsoccer.com/doneil-henry"
    },
    {
        name: "Callum Irving",
        team: "Ottawa Fury FC",
        url: "https://www.uslsoccer.com/callum-irving"
    },
    {
        name: "Azake Luboyera",
        team: "Ottawa Fury FC",
        url: "https://www.uslsoccer.com/azake-luboyera"
    },
    {
        name: "Sergio Manesio",
        team: "Ottawa Fury FC",
        url: "https://www.uslsoccer.com/sergio-manesio"
    },
    {
        name: "Chris Mannella",
        team: "Ottawa Fury FC",
        url: "https://www.uslsoccer.com/chris-mannella"
    },
    {
        name: "Thomas Meilleur-Giguère",
        team: "Ottawa Fury FC",
        url: "https://www.uslsoccer.com/thomas-meilleur-giguere"
    },
    {
        name: "Monti Mohsen",
        team: "Ottawa Fury FC",
        url: "https://www.uslsoccer.com/monti-mohsen"
    },
    {
        name: "David Monsalve",
        team: "Ottawa Fury FC",
        url: "https://www.uslsoccer.com/david-monsalve"
    },
    {
        name: "Onua Obasi",
        team: "Ottawa Fury FC",
        url: "https://www.uslsoccer.com/onua-obasi"
    },
    {
        name: "Kévin Oliveira",
        team: "Ottawa Fury FC",
        url: "https://www.uslsoccer.com/kevin-oliveira"
    },
    {
        name: "Cristian Portilla",
        team: "Ottawa Fury FC",
        url: "https://www.uslsoccer.com/cristian-portilla"
    },
    {
        name: "Adonijah Reid",
        team: "Ottawa Fury FC",
        url: "https://www.uslsoccer.com/adonijah-reid"
    },
    {
        name: "Michael Salazar",
        team: "Ottawa Fury FC",
        url: "https://www.uslsoccer.com/michael-salazar"
    },
    {
        name: "Jimmy Sanon",
        team: "Ottawa Fury FC",
        url: "https://www.uslsoccer.com/jimmy-sanon"
    },
    {
        name: "Sito Seoane",
        team: "Ottawa Fury FC",
        url: "https://www.uslsoccer.com/sito-seoane"
    },
    {
        name: "Shamit Shome",
        team: "Ottawa Fury FC",
        url: "https://www.uslsoccer.com/shamit-shome"
    },
    {
        name: "Tony Taylor",
        team: "Ottawa Fury FC",
        url: "https://www.uslsoccer.com/tony-taylor"
    },
    {
        name: "Maxim Tissot",
        team: "Ottawa Fury FC",
        url: "https://www.uslsoccer.com/maxim-tissot"
    },
    {
        name: "Prince Baffoe",
        team: "Penn FC",
        url: "https://www.uslsoccer.com/prince-baffoe"
    },
    {
        name: "Salvatore Barone",
        team: "Penn FC",
        url: "https://www.uslsoccer.com/salvatore-barone"
    },
    {
        name: "Jake Bond",
        team: "Penn FC",
        url: "https://www.uslsoccer.com/jake-bond"
    },
    {
        name: "Tiago Calvano",
        team: "Penn FC",
        url: "https://www.uslsoccer.com/tiago-calvano"
    },
    {
        name: "Fabio De Sousa",
        team: "Penn FC",
        url: "https://www.uslsoccer.com/fabio-de-sousa"
    },
    {
        name: "Aaron Dennis",
        team: "Penn FC",
        url: "https://www.uslsoccer.com/aaron-dennis"
    },
    {
        name: "Mauro Eustaquio",
        team: "Penn FC",
        url: "https://www.uslsoccer.com/mauro-eustaquio"
    },
    {
        name: "Marco Franco",
        team: "Penn FC",
        url: "https://www.uslsoccer.com/marco-franco"
    },
    {
        name: "Pedro Galvao",
        team: "Penn FC",
        url: "https://www.uslsoccer.com/pedro-galvao"
    },
    {
        name: "Harri Hawkins",
        team: "Penn FC",
        url: "https://www.uslsoccer.com/harri-hawkins"
    },
    {
        name: "Tommy Heinemann",
        team: "Penn FC",
        url: "https://www.uslsoccer.com/tommy-heinemann"
    },
    {
        name: "Chris Hill",
        team: "Penn FC",
        url: "https://www.uslsoccer.com/chris-hill"
    },
    {
        name: "Miguel Jaime",
        team: "Penn FC",
        url: "https://www.uslsoccer.com/miguel-jaime"
    },
    {
        name: "Paulo Junior",
        team: "Penn FC",
        url: "https://www.uslsoccer.com/paulo-junior"
    },
    {
        name: "Sean Lewis",
        team: "Penn FC",
        url: "https://www.uslsoccer.com/sean-lewis"
    },
    {
        name: "Jacob Lissek",
        team: "Penn FC",
        url: "https://www.uslsoccer.com/jacob-lissek"
    },
    {
        name: "Richard Menjívar",
        team: "Penn FC",
        url: "https://www.uslsoccer.com/richard-menjivar"
    },
    {
        name: "Dan Metzger",
        team: "Penn FC",
        url: "https://www.uslsoccer.com/dan-metzger"
    },
    {
        name: "Lucky Mkosana",
        team: "Penn FC",
        url: "https://www.uslsoccer.com/lucky-mkosana"
    },
    {
        name: "Saalih Muhammad",
        team: "Penn FC",
        url: "https://www.uslsoccer.com/saalih-muhammad"
    },
    {
        name: "Fredrick Opoku",
        team: "Penn FC",
        url: "https://www.uslsoccer.com/fredrick-opoku"
    },
    {
        name: "Jerry Ortiz",
        team: "Penn FC",
        url: "https://www.uslsoccer.com/jerry-ortiz"
    },
    {
        name: "Isaac Osae",
        team: "Penn FC",
        url: "https://www.uslsoccer.com/isaac-osae"
    },
    {
        name: "Romuald Peiser",
        team: "Penn FC",
        url: "https://www.uslsoccer.com/romuald-peiser"
    },
    {
        name: "Calvin Rezende",
        team: "Penn FC",
        url: "https://www.uslsoccer.com/calvin-rezende"
    },
    {
        name: "Jorge Rivera",
        team: "Penn FC",
        url: "https://www.uslsoccer.com/jorge-rivera"
    },
    {
        name: "Haruna Shaibu",
        team: "Penn FC",
        url: "https://www.uslsoccer.com/haruna-shaibu"
    },
    {
        name: "Ken Tribbett",
        team: "Penn FC",
        url: "https://www.uslsoccer.com/ken-tribbett"
    },
    {
        name: "Kyle Venter",
        team: "Penn FC",
        url: "https://www.uslsoccer.com/kyle-venter"
    },
    {
        name: "Solomon Asante",
        team: "Phoenix Rising FC",
        url: "https://www.uslsoccer.com/solomon-asante"
    },
    {
        name: "Gladson Awako",
        team: "Phoenix Rising FC",
        url: "https://www.uslsoccer.com/gladson-awako"
    },
    {
        name: "John Berner",
        team: "Phoenix Rising FC",
        url: "https://www.uslsoccer.com/john-berner"
    },
    {
        name: "Chris Cortez",
        team: "Phoenix Rising FC",
        url: "https://www.uslsoccer.com/chris-cortez"
    },
    {
        name: "Mike da Fonte",
        team: "Phoenix Rising FC",
        url: "https://www.uslsoccer.com/mike-dafonte"
    },
    {
        name: "Amadou Dia",
        team: "Phoenix Rising FC",
        url: "https://www.uslsoccer.com/amadou-dia"
    },
    {
        name: "Didier Drogba",
        team: "Phoenix Rising FC",
        url: "https://www.uslsoccer.com/didier-drogba"
    },
    {
        name: "Devante Dubose",
        team: "Phoenix Rising FC",
        url: "https://www.uslsoccer.com/devante-dubose"
    },
    {
        name: "Joe Farrell",
        team: "Phoenix Rising FC",
        url: "https://www.uslsoccer.com/joe-farrell"
    },
    {
        name: "Collin Fernandez",
        team: "Phoenix Rising FC",
        url: "https://www.uslsoccer.com/collin-fernandez"
    },
    {
        name: "Billy Forbes",
        team: "Phoenix Rising FC",
        url: "https://www.uslsoccer.com/billy-forbes"
    },
    {
        name: "Kevaughn Frater",
        team: "Phoenix Rising FC",
        url: "https://www.uslsoccer.com/kevaughn-frater"
    },
    {
        name: "Dallas Jaye",
        team: "Phoenix Rising FC",
        url: "https://www.uslsoccer.com/dallas-jaye"
    },
    {
        name: "Jason Johnson",
        team: "Phoenix Rising FC",
        url: "https://www.uslsoccer.com/jason-johnson"
    },
    {
        name: "Kevon Lambert",
        team: "Phoenix Rising FC",
        url: "https://www.uslsoccer.com/kevon-lambert"
    },
    {
        name: "Zac Lubin",
        team: "Phoenix Rising FC",
        url: "https://www.uslsoccer.com/zac-lubin"
    },
    {
        name: "Doueugui Mala",
        team: "Phoenix Rising FC",
        url: "https://www.uslsoccer.com/doueugui-mala"
    },
    {
        name: "James Musa",
        team: "Phoenix Rising FC",
        url: "https://www.uslsoccer.com/james-musa"
    },
    {
        name: "Luca Ricci",
        team: "Phoenix Rising FC",
        url: "https://www.uslsoccer.com/luca-ricci"
    },
    {
        name: "Alessandro Riggi",
        team: "Phoenix Rising FC",
        url: "https://www.uslsoccer.com/alessandro-riggi"
    },
    {
        name: "Victor Vásquez",
        team: "Phoenix Rising FC",
        url: "https://www.uslsoccer.com/victor-vasquez"
    },
    {
        name: "Devin Vega",
        team: "Phoenix Rising FC",
        url: "https://www.uslsoccer.com/devin-vega"
    },
    {
        name: "Kody Wakasa",
        team: "Phoenix Rising FC",
        url: "https://www.uslsoccer.com/kody-wakasa"
    },
    {
        name: "Evan Waldrep",
        team: "Phoenix Rising FC",
        url: "https://www.uslsoccer.com/evan-waldrep"
    },
    {
        name: "Carl Woszczynski",
        team: "Phoenix Rising FC",
        url: "https://www.uslsoccer.com/carl-woszczynski"
    },
    {
        name: "Tobi Adewole",
        team: "Pittsburgh Riverhounds SC",
        url: "https://www.uslsoccer.com/tobi-adewole"
    },
    {
        name: "Kay Banjo",
        team: "Pittsburgh Riverhounds SC",
        url: "https://www.uslsoccer.com/kay-banjo"
    },
    {
        name: "Neco Brett",
        team: "Pittsburgh Riverhounds SC",
        url: "https://www.uslsoccer.com/neco-brett"
    },
    {
        name: "Dennis Chin",
        team: "Pittsburgh Riverhounds SC",
        url: "https://www.uslsoccer.com/dennis-chin"
    },
    {
        name: "Mouhamed Dabo",
        team: "Pittsburgh Riverhounds SC",
        url: "https://www.uslsoccer.com/mouhamed-dabo"
    },
    {
        name: "Jordan Dover",
        team: "Pittsburgh Riverhounds SC",
        url: "https://www.uslsoccer.com/jordan-dover"
    },
    {
        name: "Ben Fitzpatrick",
        team: "Pittsburgh Riverhounds SC",
        url: "https://www.uslsoccer.com/ben-fitzpatrick"
    },
    {
        name: "Kenardo Forbes",
        team: "Pittsburgh Riverhounds SC",
        url: "https://www.uslsoccer.com/kenardo-forbes"
    },
    {
        name: "Christiano François",
        team: "Pittsburgh Riverhounds SC",
        url: "https://www.uslsoccer.com/christiano-francois"
    },
    {
        name: "Noah Franke",
        team: "Pittsburgh Riverhounds SC",
        url: "https://www.uslsoccer.com/noah-franke"
    },
    {
        name: "Bakie Goodman",
        team: "Pittsburgh Riverhounds SC",
        url: "https://www.uslsoccer.com/bakie-goodman"
    },
    {
        name: "Joseph Greenspan",
        team: "Pittsburgh Riverhounds SC",
        url: "https://www.uslsoccer.com/joseph-greenspan"
    },
    {
        name: "Joseph Holland",
        team: "Pittsburgh Riverhounds SC",
        url: "https://www.uslsoccer.com/joseph-holland"
    },
    {
        name: "Kevin Kerr",
        team: "Pittsburgh Riverhounds SC",
        url: "https://www.uslsoccer.com/kevin-kerr"
    },
    {
        name: "Mike Kirk",
        team: "Pittsburgh Riverhounds SC",
        url: "https://www.uslsoccer.com/mike-kirk"
    },
    {
        name: "Raymond Lee",
        team: "Pittsburgh Riverhounds SC",
        url: "https://www.uslsoccer.com/raymond-lee"
    },
    {
        name: "Andrew Lubahn",
        team: "Pittsburgh Riverhounds SC",
        url: "https://www.uslsoccer.com/andrew-lubahn"
    },
    {
        name: "Dan Lynd",
        team: "Pittsburgh Riverhounds SC",
        url: "https://www.uslsoccer.com/dan-lynd"
    },
    {
        name: "Connor Maloney",
        team: "Pittsburgh Riverhounds SC",
        url: "https://www.uslsoccer.com/connor-maloney"
    },
    {
        name: "Kyle Morton",
        team: "Pittsburgh Riverhounds SC",
        url: "https://www.uslsoccer.com/kyle-morton"
    },
    {
        name: "Romeo Parkes",
        team: "Pittsburgh Riverhounds SC",
        url: "https://www.uslsoccer.com/romeo-parkes"
    },
    {
        name: "Todd Pratzner",
        team: "Pittsburgh Riverhounds SC",
        url: "https://www.uslsoccer.com/todd-pratzner"
    },
    {
        name: "Hugh Roberts",
        team: "Pittsburgh Riverhounds SC",
        url: "https://www.uslsoccer.com/hugh-roberts"
    },
    {
        name: "Thomas Vancaeyezeele",
        team: "Pittsburgh Riverhounds SC",
        url: "https://www.uslsoccer.com/thomas-vancaeyezeele"
    },
    {
        name: "Ben Zemanski",
        team: "Pittsburgh Riverhounds SC",
        url: "https://www.uslsoccer.com/ben-zemanski"
    },
    {
        name: "Vytas Andriuškevičius",
        team: "Portland Timbers 2",
        url: "https://www.uslsoccer.com/vytas-andriuskevicius"
    },
    {
        name: "Carlos Anguiano",
        team: "Portland Timbers 2",
        url: "https://www.uslsoccer.com/carlos-anguiano"
    },
    {
        name: "Victor Arboleda",
        team: "Portland Timbers 2",
        url: "https://www.uslsoccer.com/victor-arboleda"
    },
    {
        name: "Dairon Asprilla",
        team: "Portland Timbers 2",
        url: "https://www.uslsoccer.com/dairon-asprilla"
    },
    {
        name: "Jeff Attinella",
        team: "Portland Timbers 2",
        url: "https://www.uslsoccer.com/jeff-attinella"
    },
    {
        name: "Jack Barmby",
        team: "Portland Timbers 2",
        url: "https://www.uslsoccer.com/jack-barmby"
    },
    {
        name: "Lamar Batista",
        team: "Portland Timbers 2",
        url: "https://www.uslsoccer.com/lamar-batista"
    },
    {
        name: "Gio Calixtro",
        team: "Portland Timbers 2",
        url: "https://www.uslsoccer.com/gio-calixtro"
    },
    {
        name: "Julio Cascante",
        team: "Portland Timbers 2",
        url: "https://www.uslsoccer.com/julio-cascante"
    },
    {
        name: "Lucas Cini",
        team: "Portland Timbers 2",
        url: "https://www.uslsoccer.com/lucas-cini"
    },
    {
        name: "Eric Cotton",
        team: "Portland Timbers 2",
        url: "https://www.uslsoccer.com/eric-cotton"
    },
    {
        name: "Adrián Diz",
        team: "Portland Timbers 2",
        url: "https://www.uslsoccer.com/adrian-diz"
    },
    {
        name: "Jeremy Ebobisse",
        team: "Portland Timbers 2",
        url: "https://www.uslsoccer.com/jeremy-ebobisse"
    },
    {
        name: "Max Elliott",
        team: "Portland Timbers 2",
        url: "https://www.uslsoccer.com/max-elliott"
    },
    {
        name: "Christian Enriquez",
        team: "Portland Timbers 2",
        url: "https://www.uslsoccer.com/christian-enriquez"
    },
    {
        name: "Marco Farfan",
        team: "Portland Timbers 2",
        url: "https://www.uslsoccer.com/marco-farfan"
    },
    {
        name: "Andres Flores",
        team: "Portland Timbers 2",
        url: "https://www.uslsoccer.com/andres-flores"
    },
    {
        name: "Kyle Gruno",
        team: "Portland Timbers 2",
        url: "https://www.uslsoccer.com/kyle-gruno"
    },
    {
        name: "Owen Guske",
        team: "Portland Timbers 2",
        url: "https://www.uslsoccer.com/owen-guske"
    },
    {
        name: "David Guzmán",
        team: "Portland Timbers 2",
        url: "https://www.uslsoccer.com/david-guzman"
    },
    {
        name: "Harold Hanson",
        team: "Portland Timbers 2",
        url: "https://www.uslsoccer.com/harold-hanson"
    },
    {
        name: "Will Inalien",
        team: "Portland Timbers 2",
        url: "https://www.uslsoccer.com/will-inalien"
    },
    {
        name: "Modou Jadama",
        team: "Portland Timbers 2",
        url: "https://www.uslsoccer.com/modou-jadama"
    },
    {
        name: "Devyn Jambga",
        team: "Portland Timbers 2",
        url: "https://www.uslsoccer.com/devyn-jambga"
    },
    {
        name: "Johnny Klein",
        team: "Portland Timbers 2",
        url: "https://www.uslsoccer.com/johnny-klein"
    },
    {
        name: "Foster Langsdorf",
        team: "Portland Timbers 2",
        url: "https://www.uslsoccer.com/foster-langsdorf"
    },
    {
        name: "Andre Lewis",
        team: "Portland Timbers 2",
        url: "https://www.uslsoccer.com/andre-lewis"
    },
    {
        name: "Marvin Loría",
        team: "Portland Timbers 2",
        url: "https://www.uslsoccer.com/marvin-loria"
    },
    {
        name: "Terrell Lowe",
        team: "Portland Timbers 2",
        url: "https://www.uslsoccer.com/terrell-lowe"
    },
    {
        name: "Alex Mangels",
        team: "Portland Timbers 2",
        url: "https://www.uslsoccer.com/alex-mangels"
    },
    {
        name: "Kendall McIntosh",
        team: "Portland Timbers 2",
        url: "https://www.uslsoccer.com/kendall-mcintosh"
    },
    {
        name: "Roy Miller",
        team: "Portland Timbers 2",
        url: "https://www.uslsoccer.com/roy-miller"
    },
    {
        name: "Jimmy Mulligan",
        team: "Portland Timbers 2",
        url: "https://www.uslsoccer.com/jimmy-mulligan"
    },
    {
        name: "Kash Oladapo",
        team: "Portland Timbers 2",
        url: "https://www.uslsoccer.com/kash-oladapo"
    },
    {
        name: "Max Ornstil",
        team: "Portland Timbers 2",
        url: "https://www.uslsoccer.com/max-ornstil"
    },
    {
        name: "Austin Pack",
        team: "Portland Timbers 2",
        url: "https://www.uslsoccer.com/austin-pack"
    },
    {
        name: "Josh Phillips",
        team: "Portland Timbers 2",
        url: "https://www.uslsoccer.com/josh-phillips"
    },
    {
        name: "Nathan Smith",
        team: "Portland Timbers 2",
        url: "https://www.uslsoccer.com/nathan-smith"
    },
    {
        name: "Vitalis Takawira",
        team: "Portland Timbers 2",
        url: "https://www.uslsoccer.com/vitalis-takawira"
    },
    {
        name: "Bill Tuiloma",
        team: "Portland Timbers 2",
        url: "https://www.uslsoccer.com/bill-tuiloma"
    },
    {
        name: "Darixon Vuelto",
        team: "Portland Timbers 2",
        url: "https://www.uslsoccer.com/darixon-vuelto"
    },
    {
        name: "Augustine Williams",
        team: "Portland Timbers 2",
        url: "https://www.uslsoccer.com/augustine-williams"
    },
    {
        name: "Eryk Williamson",
        team: "Portland Timbers 2",
        url: "https://www.uslsoccer.com/eryk-williamson"
    },
    {
        name: "Renzo Zambrano",
        team: "Portland Timbers 2",
        url: "https://www.uslsoccer.com/renzo-zambrano"
    },
    {
        name: "Danilo Acosta",
        team: "Real Monarchs SLC",
        url: "https://www.uslsoccer.com/danilo-acosta"
    },
    {
        name: "Charlie Adams",
        team: "Real Monarchs SLC",
        url: "https://www.uslsoccer.com/charlie-adams"
    },
    {
        name: "Corey Baird",
        team: "Real Monarchs SLC",
        url: "https://www.uslsoccer.com/corey-baird"
    },
    {
        name: "Shawn Barry",
        team: "Real Monarchs SLC",
        url: "https://www.uslsoccer.com/shawn-barry"
    },
    {
        name: "Nick Besler",
        team: "Real Monarchs SLC",
        url: "https://www.uslsoccer.com/nick-besler"
    },
    {
        name: "Jack Blake",
        team: "Real Monarchs SLC",
        url: "https://www.uslsoccer.com/jack-blake"
    },
    {
        name: "Andrew Brody",
        team: "Real Monarchs SLC",
        url: "https://www.uslsoccer.com/andrew-brody"
    },
    {
        name: "Alexis Canales",
        team: "Real Monarchs SLC",
        url: "https://www.uslsoccer.com/alexis-canales"
    },
    {
        name: "Maikel Chang",
        team: "Real Monarchs SLC",
        url: "https://www.uslsoccer.com/maikel-chang"
    },
    {
        name: "David Diosa",
        team: "Real Monarchs SLC",
        url: "https://www.uslsoccer.com/david-diosa"
    },
    {
        name: "Michael Gallagher",
        team: "Real Monarchs SLC",
        url: "https://www.uslsoccer.com/michael-gallagher"
    },
    {
        name: "Rafael Guerrero",
        team: "Real Monarchs SLC",
        url: "https://www.uslsoccer.com/rafael-guerrero"
    },
    {
        name: "Josh Heard",
        team: "Real Monarchs SLC",
        url: "https://www.uslsoccer.com/josh-heard"
    },
    {
        name: "Adam Henley",
        team: "Real Monarchs SLC",
        url: "https://www.uslsoccer.com/adam-henley"
    },
    {
        name: "José Hernández",
        team: "Real Monarchs SLC",
        url: "https://www.uslsoccer.com/jose-hernandez"
    },
    {
        name: "Aaron Herrera",
        team: "Real Monarchs SLC",
        url: "https://www.uslsoccer.com/aaron-herrera"
    },
    {
        name: "Chandler Hoffman",
        team: "Real Monarchs SLC",
        url: "https://www.uslsoccer.com/chandler-hoffman"
    },
    {
        name: "David Horst",
        team: "Real Monarchs SLC",
        url: "https://www.uslsoccer.com/david-horst"
    },
    {
        name: "Alex Horwath",
        team: "Real Monarchs SLC",
        url: "https://www.uslsoccer.com/alex-horwath"
    },
    {
        name: "Juan Ignacio Mare",
        team: "Real Monarchs SLC",
        url: "https://www.uslsoccer.com/juan-ignacio-mare"
    },
    {
        name: "Masta Kacher",
        team: "Real Monarchs SLC",
        url: "https://www.uslsoccer.com/masta-kacher"
    },
    {
        name: "Jacob Jackson",
        team: "Real Monarchs SLC",
        url: "https://www.uslsoccer.com/jacob-jackson"
    },
    {
        name: "Richard Ledezma",
        team: "Real Monarchs SLC",
        url: "https://www.uslsoccer.com/richard-ledezma"
    },
    {
        name: "Jake Leeker",
        team: "Real Monarchs SLC",
        url: "https://www.uslsoccer.com/jake-leeker"
    },
    {
        name: "Brooks Lennon",
        team: "Real Monarchs SLC",
        url: "https://www.uslsoccer.com/brooks-lennon"
    },
    {
        name: "Ricky Lopez-Espin",
        team: "Real Monarchs SLC",
        url: "https://www.uslsoccer.com/ricky-lopez-espin"
    },
    {
        name: "Glademir Mendoza",
        team: "Real Monarchs SLC",
        url: "https://www.uslsoccer.com/glademir-mendoza"
    },
    {
        name: "Lyes Mezine",
        team: "Real Monarchs SLC",
        url: "https://www.uslsoccer.com/lyes-mezine"
    },
    {
        name: "James Moberg",
        team: "Real Monarchs SLC",
        url: "https://www.uslsoccer.com/james-moberg"
    },
    {
        name: "Luke Mulholland",
        team: "Real Monarchs SLC",
        url: "https://www.uslsoccer.com/luke-mulholland"
    },
    {
        name: "David Ochoa",
        team: "Real Monarchs SLC",
        url: "https://www.uslsoccer.com/david-ochoa"
    },
    {
        name: "Taylor Peay",
        team: "Real Monarchs SLC",
        url: "https://www.uslsoccer.com/taylor-peay"
    },
    {
        name: "Demar Phillips",
        team: "Real Monarchs SLC",
        url: "https://www.uslsoccer.com/demar-phillips"
    },
    {
        name: "Konrad Plewa",
        team: "Real Monarchs SLC",
        url: "https://www.uslsoccer.com/konrad-plewa"
    },
    {
        name: "Justin Portillo",
        team: "Real Monarchs SLC",
        url: "https://www.uslsoccer.com/justin-portillo"
    },
    {
        name: "Andrew Putna",
        team: "Real Monarchs SLC",
        url: "https://www.uslsoccer.com/andrew-putna"
    },
    {
        name: "Pablo Ruiz",
        team: "Real Monarchs SLC",
        url: "https://www.uslsoccer.com/pablo-ruiz"
    },
    {
        name: "Kalen Ryden",
        team: "Real Monarchs SLC",
        url: "https://www.uslsoccer.com/kalen-ryden"
    },
    {
        name: "Sebastian Saucedo",
        team: "Real Monarchs SLC",
        url: "https://www.uslsoccer.com/sebastian-saucedo"
    },
    {
        name: "Marcelo Silva",
        team: "Real Monarchs SLC",
        url: "https://www.uslsoccer.com/marcelo-silva"
    },
    {
        name: "Sebastian Soto",
        team: "Real Monarchs SLC",
        url: "https://www.uslsoccer.com/sebastian-soto"
    },
    {
        name: "Connor Sparrow",
        team: "Real Monarchs SLC",
        url: "https://www.uslsoccer.com/connor-sparrow"
    },
    {
        name: "Sammy Tojaga",
        team: "Real Monarchs SLC",
        url: "https://www.uslsoccer.com/sammy-tojaga"
    },
    {
        name: "Sebastián Velásquez",
        team: "Real Monarchs SLC",
        url: "https://www.uslsoccer.com/sebastian-velasquez"
    },
    {
        name: "Rhys Williams",
        team: "Real Monarchs SLC",
        url: "https://www.uslsoccer.com/rhys-williams"
    },
    {
        name: "Guy Abend",
        team: "Reno 1868 FC",
        url: "https://www.uslsoccer.com/guy-abend"
    },
    {
        name: "Jacob Akanyirige",
        team: "Reno 1868 FC",
        url: "https://www.uslsoccer.com/jacob-akanyirige"
    },
    {
        name: "Matt Bersano",
        team: "Reno 1868 FC",
        url: "https://www.uslsoccer.com/matt-bersano"
    },
    {
        name: "Sean Bieker",
        team: "Reno 1868 FC",
        url: "https://www.uslsoccer.com/sean-bieker"
    },
    {
        name: "Brian Brown",
        team: "Reno 1868 FC",
        url: "https://www.uslsoccer.com/brian-brown"
    },
    {
        name: "Eric Calvillo",
        team: "Reno 1868 FC",
        url: "https://www.uslsoccer.com/eric-calvillo"
    },
    {
        name: "Zach Carroll",
        team: "Reno 1868 FC",
        url: "https://www.uslsoccer.com/zach-carroll"
    },
    {
        name: "Seth Casiple",
        team: "Reno 1868 FC",
        url: "https://www.uslsoccer.com/seth-casiple"
    },
    {
        name: "Darwin Espinal",
        team: "Reno 1868 FC",
        url: "https://www.uslsoccer.com/darwin-espinal"
    },
    {
        name: "Luis Felipe Fernandes",
        team: "Reno 1868 FC",
        url: "https://www.uslsoccer.com/luis-felipe-fernandes"
    },
    {
        name: "Sam Gleadle",
        team: "Reno 1868 FC",
        url: "https://www.uslsoccer.com/sam-gleadle"
    },
    {
        name: "Mark González",
        team: "Reno 1868 FC",
        url: "https://www.uslsoccer.com/mark-gonzalez"
    },
    {
        name: "Brenton Griffiths",
        team: "Reno 1868 FC",
        url: "https://www.uslsoccer.com/brenton-griffiths"
    },
    {
        name: "Antoine Hoppenot",
        team: "Reno 1868 FC",
        url: "https://www.uslsoccer.com/antoine-hoppenot"
    },
    {
        name: "Kyle Ihn",
        team: "Reno 1868 FC",
        url: "https://www.uslsoccer.com/kyle-ihn"
    },
    {
        name: "Thomas Janjigian",
        team: "Reno 1868 FC",
        url: "https://www.uslsoccer.com/thomas-janjigian"
    },
    {
        name: "Connor Johnson",
        team: "Reno 1868 FC",
        url: "https://www.uslsoccer.com/connor-johnson"
    },
    {
        name: "James Kiffe",
        team: "Reno 1868 FC",
        url: "https://www.uslsoccer.com/james-kiffe"
    },
    {
        name: "Russell Klabough",
        team: "Reno 1868 FC",
        url: "https://www.uslsoccer.com/russell-klabough"
    },
    {
        name: "Duke Lacroix",
        team: "Reno 1868 FC",
        url: "https://www.uslsoccer.com/duke-lacroix"
    },
    {
        name: "JT Marcinkowski",
        team: "Reno 1868 FC",
        url: "https://www.uslsoccer.com/jt-marcinkowski"
    },
    {
        name: "Paul Marie",
        team: "Reno 1868 FC",
        url: "https://www.uslsoccer.com/paul-marie"
    },
    {
        name: "Lindo Mfeka",
        team: "Reno 1868 FC",
        url: "https://www.uslsoccer.com/lindo-mfeka"
    },
    {
        name: "Christo Michaelson",
        team: "Reno 1868 FC",
        url: "https://www.uslsoccer.com/christo-michaelson"
    },
    {
        name: "Jordan Murrell",
        team: "Reno 1868 FC",
        url: "https://www.uslsoccer.com/jordan-murrell"
    },
    {
        name: "Danny Musovski",
        team: "Reno 1868 FC",
        url: "https://www.uslsoccer.com/danny-musovski"
    },
    {
        name: "Kevin Partida",
        team: "Reno 1868 FC",
        url: "https://www.uslsoccer.com/kevin-partida"
    },
    {
        name: "Joel Qviberg",
        team: "Reno 1868 FC",
        url: "https://www.uslsoccer.com/joel-qviberg"
    },
    {
        name: "Brent Richards",
        team: "Reno 1868 FC",
        url: "https://www.uslsoccer.com/brent-richards"
    },
    {
        name: "Mohamed Thiaw",
        team: "Reno 1868 FC",
        url: "https://www.uslsoccer.com/mohamed-thiaw"
    },
    {
        name: "Tommy Thompson",
        team: "Reno 1868 FC",
        url: "https://www.uslsoccer.com/tommy-thompson"
    },
    {
        name: "Ivan Valencia",
        team: "Reno 1868 FC",
        url: "https://www.uslsoccer.com/ivan-valencia"
    },
    {
        name: "Jerry van Ewijk",
        team: "Reno 1868 FC",
        url: "https://www.uslsoccer.com/jerry-van-ewijk"
    },
    {
        name: "Chris Wehan",
        team: "Reno 1868 FC",
        url: "https://www.uslsoccer.com/chris-wehan"
    },
    {
        name: "Dembakwi Yomba",
        team: "Reno 1868 FC",
        url: "https://www.uslsoccer.com/dembakwi-yomba"
    },
    {
        name: "Kyle Adams",
        team: "RGVFC Toros",
        url: "https://www.uslsoccer.com/kyle-adams"
    },
    {
        name: "Pablo Aguilar",
        team: "RGVFC Toros",
        url: "https://www.uslsoccer.com/pablo-aguilar"
    },
    {
        name: "Eric Bird",
        team: "RGVFC Toros",
        url: "https://www.uslsoccer.com/eric-bird"
    },
    {
        name: "David Cabrera",
        team: "RGVFC Toros",
        url: "https://www.uslsoccer.com/david-cabrera"
    },
    {
        name: "Wilmer Cabrera",
        team: "RGVFC Toros",
        url: "https://www.uslsoccer.com/wilmer-cabrera"
    },
    {
        name: "Robert Castellanos",
        team: "RGVFC Toros",
        url: "https://www.uslsoccer.com/robert-castellanos"
    },
    {
        name: "Nicolas Corti",
        team: "RGVFC Toros",
        url: "https://www.uslsoccer.com/nicolas-corti"
    },
    {
        name: "Guillermo Delgado",
        team: "RGVFC Toros",
        url: "https://www.uslsoccer.com/guillermo-delgado"
    },
    {
        name: "Tyler Deric",
        team: "RGVFC Toros",
        url: "https://www.uslsoccer.com/tyler-deric"
    },
    {
        name: "Richard Donkor",
        team: "RGVFC Toros",
        url: "https://www.uslsoccer.com/richard-donkor"
    },
    {
        name: "Conor Donovan",
        team: "RGVFC Toros",
        url: "https://www.uslsoccer.com/conor-donovan"
    },
    {
        name: "Jesus Enriquez",
        team: "RGVFC Toros",
        url: "https://www.uslsoccer.com/jesus-enriquez"
    },
    {
        name: "Monday Etim",
        team: "RGVFC Toros",
        url: "https://www.uslsoccer.com/monday-etim"
    },
    {
        name: "Victor Garza",
        team: "RGVFC Toros",
        url: "https://www.uslsoccer.com/victor-garza"
    },
    {
        name: "Luis Gil",
        team: "RGVFC Toros",
        url: "https://www.uslsoccer.com/luis-gil"
    },
    {
        name: "Kai Greene",
        team: "RGVFC Toros",
        url: "https://www.uslsoccer.com/kai-greene"
    },
    {
        name: "Jorginho James",
        team: "RGVFC Toros",
        url: "https://www.uslsoccer.com/jorginho-james"
    },
    {
        name: "Jordan Jones",
        team: "RGVFC Toros",
        url: "https://www.uslsoccer.com/jordan-jones"
    },
    {
        name: "Derek Luke",
        team: "RGVFC Toros",
        url: "https://www.uslsoccer.com/derek-luke"
    },
    {
        name: "Adam Lundkvist",
        team: "RGVFC Toros",
        url: "https://www.uslsoccer.com/adam-lundkvist"
    },
    {
        name: "George Malki",
        team: "RGVFC Toros",
        url: "https://www.uslsoccer.com/george-malki"
    },
    {
        name: "Bryce Marion",
        team: "RGVFC Toros",
        url: "https://www.uslsoccer.com/bryce-marion"
    },
    {
        name: "John Montano",
        team: "RGVFC Toros",
        url: "https://www.uslsoccer.com/john-montano"
    },
    {
        name: "Brandon Morales",
        team: "RGVFC Toros",
        url: "https://www.uslsoccer.com/brandon-morales"
    },
    {
        name: "Michael Nelson",
        team: "RGVFC Toros",
        url: "https://www.uslsoccer.com/michael-nelson"
    },
    {
        name: "Omar Ontiveros",
        team: "RGVFC Toros",
        url: "https://www.uslsoccer.com/omar-ontiveros"
    },
    {
        name: "Manny Padilla",
        team: "RGVFC Toros",
        url: "https://www.uslsoccer.com/manny-padilla"
    },
    {
        name: "Nicolas Perea",
        team: "RGVFC Toros",
        url: "https://www.uslsoccer.com/nicolas-perea"
    },
    {
        name: "Aldo Quintanilla",
        team: "RGVFC Toros",
        url: "https://www.uslsoccer.com/aldo-quintanilla"
    },
    {
        name: "Memo Rodríguez",
        team: "RGVFC Toros",
        url: "https://www.uslsoccer.com/memo-rodriguez"
    },
    {
        name: "Matt Sanchez",
        team: "RGVFC Toros",
        url: "https://www.uslsoccer.com/matt-sanchez"
    },
    {
        name: "Carlos Small",
        team: "RGVFC Toros",
        url: "https://www.uslsoccer.com/carlos-small"
    },
    {
        name: "Mac Steeves",
        team: "RGVFC Toros",
        url: "https://www.uslsoccer.com/mac-steeves"
    },
    {
        name: "Sheldon Sullivan",
        team: "RGVFC Toros",
        url: "https://www.uslsoccer.com/sheldon-sullivan"
    },
    {
        name: "Jared Watts",
        team: "RGVFC Toros",
        url: "https://www.uslsoccer.com/jared-watts"
    },
    {
        name: "Todd Wharton",
        team: "RGVFC Toros",
        url: "https://www.uslsoccer.com/todd-wharton"
    },
    {
        name: "Zach Wright",
        team: "RGVFC Toros",
        url: "https://www.uslsoccer.com/zach-wright"
    },
    {
        name: "Matias Zaldivar",
        team: "RGVFC Toros",
        url: "https://www.uslsoccer.com/matias-zaldivar"
    },
    {
        name: "Sam Bacon",
        team: "Richmond Kickers",
        url: "https://www.uslsoccer.com/sam-bacon"
    },
    {
        name: "Greg Boehme",
        team: "Richmond Kickers",
        url: "https://www.uslsoccer.com/greg-boehme"
    },
    {
        name: "Matt Bolduc",
        team: "Richmond Kickers",
        url: "https://www.uslsoccer.com/matt-bolduc"
    },
    {
        name: "Heviel Cordovés",
        team: "Richmond Kickers",
        url: "https://www.uslsoccer.com/heviel-cordoves"
    },
    {
        name: "Kent Dickey",
        team: "Richmond Kickers",
        url: "https://www.uslsoccer.com/kent-dickey"
    },
    {
        name: "Brandon Eaton",
        team: "Richmond Kickers",
        url: "https://www.uslsoccer.com/brandon-eaton"
    },
    {
        name: "Luiz Fernando",
        team: "Richmond Kickers",
        url: "https://www.uslsoccer.com/luiz-fernando"
    },
    {
        name: "Giuseppe Gentile",
        team: "Richmond Kickers",
        url: "https://www.uslsoccer.com/giuseppe-gentile"
    },
    {
        name: "Raul Gonzalez",
        team: "Richmond Kickers",
        url: "https://www.uslsoccer.com/raul-gonzalez"
    },
    {
        name: "Neil Hlavaty",
        team: "Richmond Kickers",
        url: "https://www.uslsoccer.com/neil-hlavaty"
    },
    {
        name: "Yudai Imura",
        team: "Richmond Kickers",
        url: "https://www.uslsoccer.com/yudai-imura"
    },
    {
        name: "Dane Kelly",
        team: "Richmond Kickers",
        url: "https://www.uslsoccer.com/dane-kelly"
    },
    {
        name: "Eric Klenofsky",
        team: "Richmond Kickers",
        url: "https://www.uslsoccer.com/eric-klenofsky"
    },
    {
        name: "Alex Lee",
        team: "Richmond Kickers",
        url: "https://www.uslsoccer.com/alex-lee"
    },
    {
        name: "Evan Lee",
        team: "Richmond Kickers",
        url: "https://www.uslsoccer.com/evan-lee"
    },
    {
        name: "Bruno Miranda",
        team: "Richmond Kickers",
        url: "https://www.uslsoccer.com/bruno-miranda"
    },
    {
        name: "Koby Osei-Wusu",
        team: "Richmond Kickers",
        url: "https://www.uslsoccer.com/koby-osei-wusu"
    },
    {
        name: "Fred Owusu Sekyere",
        team: "Richmond Kickers",
        url: "https://www.uslsoccer.com/fred-owusu-sekyere"
    },
    {
        name: "Mallan Roberts",
        team: "Richmond Kickers",
        url: "https://www.uslsoccer.com/mallan-roberts"
    },
    {
        name: "Conor Shanosky",
        team: "Richmond Kickers",
        url: "https://www.uslsoccer.com/conor-shanosky"
    },
    {
        name: "Brian Shriver",
        team: "Richmond Kickers",
        url: "https://www.uslsoccer.com/brian-shriver"
    },
    {
        name: "Trevor Spangenberg",
        team: "Richmond Kickers",
        url: "https://www.uslsoccer.com/trevor-spangenberg"
    },
    {
        name: "Scott Thomsen",
        team: "Richmond Kickers",
        url: "https://www.uslsoccer.com/scott-thomsen"
    },
    {
        name: "Zachery Tashjy",
        team: "Richmond Kickers",
        url: "https://www.uslsoccer.com/zachery-tashjy"
    },
    {
        name: "Braeden Troyer",
        team: "Richmond Kickers",
        url: "https://www.uslsoccer.com/braeden-troyer"
    },
    {
        name: "Oscar Umar",
        team: "Richmond Kickers",
        url: "https://www.uslsoccer.com/oscar-umar"
    },
    {
        name: "Mekeil Williams",
        team: "Richmond Kickers",
        url: "https://www.uslsoccer.com/mekeil-williams"
    },
    {
        name: "Travis Worra",
        team: "Richmond Kickers",
        url: "https://www.uslsoccer.com/travis-worra"
    },
    {
        name: "Finnlay Wyatt",
        team: "Richmond Kickers",
        url: "https://www.uslsoccer.com/finnlay-wyatt"
    },
    {
        name: "Austin Yearwood",
        team: "Richmond Kickers",
        url: "https://www.uslsoccer.com/austin-yearwood"
    },
    {
        name: "William Yomby",
        team: "Richmond Kickers",
        url: "https://www.uslsoccer.com/william-yomby"
    },
    {
        name: "Keven Aleman",
        team: "Sacramento Republic FC",
        url: "https://www.uslsoccer.com/keven-aleman"
    },
    {
        name: "Villyan Bijev",
        team: "Sacramento Republic FC",
        url: "https://www.uslsoccer.com/villyan-bijev"
    },
    {
        name: "Quincy Butler",
        team: "Sacramento Republic FC",
        url: "https://www.uslsoccer.com/quincy-butler"
    },
    {
        name: "Josh Cohen",
        team: "Sacramento Republic FC",
        url: "https://www.uslsoccer.com/josh-cohen"
    },
    {
        name: "Rafael Diaz",
        team: "Sacramento Republic FC",
        url: "https://www.uslsoccer.com/rafael-diaz"
    },
    {
        name: "Christian Eissele",
        team: "Sacramento Republic FC",
        url: "https://www.uslsoccer.com/christian-eissele"
    },
    {
        name: "Luis Espino",
        team: "Sacramento Republic FC",
        url: "https://www.uslsoccer.com/luis-fernando-espino-vazquez"
    },
    {
        name: "Johan Garibay",
        team: "Sacramento Republic FC",
        url: "https://www.uslsoccer.com/johan-garibay"
    },
    {
        name: "Shannon Gomez",
        team: "Sacramento Republic FC",
        url: "https://www.uslsoccer.com/shannon-gomez"
    },
    {
        name: "Jeremy Hall",
        team: "Sacramento Republic FC",
        url: "https://www.uslsoccer.com/jeremy-hall"
    },
    {
        name: "Roberto Hategan",
        team: "Sacramento Republic FC",
        url: "https://www.uslsoccer.com/roberto-hategan"
    },
    {
        name: "Elliott Hord",
        team: "Sacramento Republic FC",
        url: "https://www.uslsoccer.com/elliott-hord"
    },
    {
        name: "Cameron Iwasa",
        team: "Sacramento Republic FC",
        url: "https://www.uslsoccer.com/cameron-iwasa"
    },
    {
        name: "Emrah Klimenta",
        team: "Sacramento Republic FC",
        url: "https://www.uslsoccer.com/emrah-klimenta"
    },
    {
        name: "Wilson Kneeshaw",
        team: "Sacramento Republic FC",
        url: "https://www.uslsoccer.com/wilson-kneeshaw"
    },
    {
        name: "Jordan Martinez",
        team: "Sacramento Republic FC",
        url: "https://www.uslsoccer.com/jordan-martinez"
    },
    {
        name: "Jure Matjašič",
        team: "Sacramento Republic FC",
        url: "https://www.uslsoccer.com/jure-matjasic"
    },
    {
        name: "Mark McEntosh",
        team: "Sacramento Republic FC",
        url: "https://www.uslsoccer.com/mark-mcentosh"
    },
    {
        name: "Adam Moffat",
        team: "Sacramento Republic FC",
        url: "https://www.uslsoccer.com/adam-moffat"
    },
    {
        name: "Hayden Partain",
        team: "Sacramento Republic FC",
        url: "https://www.uslsoccer.com/hayden-partain"
    },
    {
        name: "Carlos Rodriguez",
        team: "Sacramento Republic FC",
        url: "https://www.uslsoccer.com/carlos-rodriguez"
    },
    {
        name: "Justin Schmidt",
        team: "Sacramento Republic FC",
        url: "https://www.uslsoccer.com/justin-schmidt"
    },
    {
        name: "Cole Seiler",
        team: "Sacramento Republic FC",
        url: "https://www.uslsoccer.com/cole-seiler"
    },
    {
        name: "Mitchell Taintor",
        team: "Sacramento Republic FC",
        url: "https://www.uslsoccer.com/mitchell-taintor"
    },
    {
        name: "Josh Turnley",
        team: "Sacramento Republic FC",
        url: "https://www.uslsoccer.com/josh-turnley"
    },
    {
        name: "Jaime Villarreal",
        team: "Sacramento Republic FC",
        url: "https://www.uslsoccer.com/jaime-villarreal"
    },
    {
        name: "Esteban Zepeda",
        team: "Sacramento Republic FC",
        url: "https://www.uslsoccer.com/esteban-zepeda"
    },
    {
        name: "Jonathan Barden",
        team: "Saint Louis FC",
        url: "https://www.uslsoccer.com/jonathan-barden"
    },
    {
        name: "Joey Calistri",
        team: "Saint Louis FC",
        url: "https://www.uslsoccer.com/joey-calistri"
    },
    {
        name: "Michael Cox",
        team: "Saint Louis FC",
        url: "https://www.uslsoccer.com/michael-cox"
    },
    {
        name: "Kyle Culbertson",
        team: "Saint Louis FC",
        url: "https://www.uslsoccer.com/kyle-culbertson"
    },
    {
        name: "Kadeem Dacres",
        team: "Saint Louis FC",
        url: "https://www.uslsoccer.com/kadeem-dacres"
    },
    {
        name: "Albert Dikwa",
        team: "Saint Louis FC",
        url: "https://www.uslsoccer.com/albert-dikwa"
    },
    {
        name: "Wal Fall",
        team: "Saint Louis FC",
        url: "https://www.uslsoccer.com/wal-fall"
    },
    {
        name: "Jake Fenlason",
        team: "Saint Louis FC",
        url: "https://www.uslsoccer.com/jake-fenlason"
    },
    {
        name: "Sam Fink",
        team: "Saint Louis FC",
        url: "https://www.uslsoccer.com/sam-fink"
    },
    {
        name: "Tomas Gomez",
        team: "Saint Louis FC",
        url: "https://www.uslsoccer.com/tomas-gomez"
    },
    {
        name: "Kyle Greig",
        team: "Saint Louis FC",
        url: "https://www.uslsoccer.com/kyle-greig"
    },
    {
        name: "Corey Hertzog",
        team: "Saint Louis FC",
        url: "https://www.uslsoccer.com/corey-hertzog"
    },
    {
        name: "Lewis Hilton",
        team: "Saint Louis FC",
        url: "https://www.uslsoccer.com/lewis-hilton"
    },
    {
        name: "Phanuel Kavita",
        team: "Saint Louis FC",
        url: "https://www.uslsoccer.com/phanuel-kavita"
    },
    {
        name: "Austin Ledbetter",
        team: "Saint Louis FC",
        url: "https://www.uslsoccer.com/austin-ledbetter"
    },
    {
        name: "Cameron Lindley",
        team: "Saint Louis FC",
        url: "https://www.uslsoccer.com/cameron-lindley"
    },
    {
        name: "John Lynn",
        team: "Saint Louis FC",
        url: "https://www.uslsoccer.com/john-lynn"
    },
    {
        name: "Jack Maher",
        team: "Saint Louis FC",
        url: "https://www.uslsoccer.com/jack-maher"
    },
    {
        name: "Austin Martz",
        team: "Saint Louis FC",
        url: "https://www.uslsoccer.com/austin-martz"
    },
    {
        name: "Edward Opoku",
        team: "Saint Louis FC",
        url: "https://www.uslsoccer.com/edward-opoku"
    },
    {
        name: "Lawson Redmon",
        team: "Saint Louis FC",
        url: "https://www.uslsoccer.com/lawson-redmon"
    },
    {
        name: "Sean Reynolds",
        team: "Saint Louis FC",
        url: "https://www.uslsoccer.com/sean-reynolds"
    },
    {
        name: "Tony Rocha",
        team: "Saint Louis FC",
        url: "https://www.uslsoccer.com/tony-rocha"
    },
    {
        name: "Seth Rudolph",
        team: "Saint Louis FC",
        url: "https://www.uslsoccer.com/seth-rudolph"
    },
    {
        name: "Patrick Schulte",
        team: "Saint Louis FC",
        url: "https://www.uslsoccer.com/patrick-schulte"
    },
    {
        name: "Pierre da Silva",
        team: "Saint Louis FC",
        url: "https://www.uslsoccer.com/pierre-dasilva"
    },
    {
        name: "Aedan Stanley",
        team: "Saint Louis FC",
        url: "https://www.uslsoccer.com/aedan-stanley"
    },
    {
        name: "Seth Stiebel",
        team: "Saint Louis FC",
        url: "https://www.uslsoccer.com/seth-stiebel"
    },
    {
        name: "Tony Walls",
        team: "Saint Louis FC",
        url: "https://www.uslsoccer.com/tony-walls"
    },
    {
        name: "Alex Bruce",
        team: "San Antonio FC",
        url: "https://www.uslsoccer.com/alex-bruce"
    },
    {
        name: "Ethan Bryant",
        team: "San Antonio FC",
        url: "https://www.uslsoccer.com/ethan-bryant"
    },
    {
        name: "Matt Cardone",
        team: "San Antonio FC",
        url: "https://www.uslsoccer.com/matt-cardone"
    },
    {
        name: "Rafa Castillo",
        team: "San Antonio FC",
        url: "https://www.uslsoccer.com/rafa-castillo"
    },
    {
        name: "Chris Christian",
        team: "San Antonio FC",
        url: "https://www.uslsoccer.com/chris-christian"
    },
    {
        name: "Greg Cochrane",
        team: "San Antonio FC",
        url: "https://www.uslsoccer.com/greg-cochrane"
    },
    {
        name: "Gianluca Cuomo",
        team: "San Antonio FC",
        url: "https://www.uslsoccer.com/gianluca-cuomo"
    },
    {
        name: "César Elizondo",
        team: "San Antonio FC",
        url: "https://www.uslsoccer.com/cesar-elizondo"
    },
    {
        name: "José Escalante",
        team: "San Antonio FC",
        url: "https://www.uslsoccer.com/jose-escalante"
    },
    {
        name: "Ryan Felix",
        team: "San Antonio FC",
        url: "https://www.uslsoccer.com/ryan-felix"
    },
    {
        name: "Omar Gordon",
        team: "San Antonio FC",
        url: "https://www.uslsoccer.com/omar-gordon"
    },
    {
        name: "Sonny Guadarrama",
        team: "San Antonio FC",
        url: "https://www.uslsoccer.com/sonny-guadarrama"
    },
    {
        name: "Éver Guzmán",
        team: "San Antonio FC",
        url: "https://www.uslsoccer.com/ever-guzman"
    },
    {
        name: "Cyprian Hedrick",
        team: "San Antonio FC",
        url: "https://www.uslsoccer.com/cyprian-hedrick"
    },
    {
        name: "Lee Johnston",
        team: "San Antonio FC",
        url: "https://www.uslsoccer.com/lee-johnston"
    },
    {
        name: "Darnell King",
        team: "San Antonio FC",
        url: "https://www.uslsoccer.com/darnell-king"
    },
    {
        name: "Mikey Lopez",
        team: "San Antonio FC",
        url: "https://www.uslsoccer.com/mikey-lopez"
    },
    {
        name: "Stephen McCarthy",
        team: "San Antonio FC",
        url: "https://www.uslsoccer.com/stephen-mccarthy"
    },
    {
        name: "Kyle Murphy",
        team: "San Antonio FC",
        url: "https://www.uslsoccer.com/kyle-murphy"
    },
    {
        name: "Pecka",
        team: "San Antonio FC",
        url: "https://www.uslsoccer.com/pecka"
    },
    {
        name: "Connor Presley",
        team: "San Antonio FC",
        url: "https://www.uslsoccer.com/connor-presley"
    },
    {
        name: "Diego Restrepo",
        team: "San Antonio FC",
        url: "https://www.uslsoccer.com/diego-restrepo"
    },
    {
        name: "Maxi Rodríguez",
        team: "San Antonio FC",
        url: "https://www.uslsoccer.com/maxi-rodríguez"
    },
    {
        name: "Ryan Roushandel",
        team: "San Antonio FC",
        url: "https://www.uslsoccer.com/ryan-roushandel"
    },
    {
        name: "Mike Seth",
        team: "San Antonio FC",
        url: "https://www.uslsoccer.com/mike-seth"
    },
    {
        name: "Kris Tyrpak",
        team: "San Antonio FC",
        url: "https://www.uslsoccer.com/kris-tyrpak"
    },
    {
        name: "Charlie Ward",
        team: "San Antonio FC",
        url: "https://www.uslsoccer.com/charlie-ward"
    },
    {
        name: "Tony Alfaro",
        team: "Seattle Sounders FC 2",
        url: "https://www.uslsoccer.com/tony-alfaro"
    },
    {
        name: "Khai Brisco",
        team: "Seattle Sounders FC 2",
        url: "https://www.uslsoccer.com/khai-brisco"
    },
    {
        name: "Calle Brown",
        team: "Seattle Sounders FC 2",
        url: "https://www.uslsoccer.com/calle-brown"
    },
    {
        name: "Antonee Burke-Gilroy",
        team: "Seattle Sounders FC 2",
        url: "https://www.uslsoccer.com/antonee-burke-gilroy"
    },
    {
        name: "Handwalla Bwana",
        team: "Seattle Sounders FC 2",
        url: "https://www.uslsoccer.com/handwalla-bwana"
    },
    {
        name: "Sakari Carter",
        team: "Seattle Sounders FC 2",
        url: "https://www.uslsoccer.com/sakari-carter"
    },
    {
        name: "Jacob Castro",
        team: "Seattle Sounders FC 2",
        url: "https://www.uslsoccer.com/jacob-castro"
    },
    {
        name: "Felix Chenkam",
        team: "Seattle Sounders FC 2",
        url: "https://www.uslsoccer.com/felix-chenkam"
    },
    {
        name: "Jesse Daley",
        team: "Seattle Sounders FC 2",
        url: "https://www.uslsoccer.com/jesse-daley"
    },
    {
        name: "Jordy Delem",
        team: "Seattle Sounders FC 2",
        url: "https://www.uslsoccer.com/jordy-delem"
    },
    {
        name: "Alec Diaz",
        team: "Seattle Sounders FC 2",
        url: "https://www.uslsoccer.com/alec-diaz"
    },
    {
        name: "Connor Drought",
        team: "Seattle Sounders FC 2",
        url: "https://www.uslsoccer.com/connor-drought"
    },
    {
        name: "Rodrigue Ele",
        team: "Seattle Sounders FC 2",
        url: "https://www.uslsoccer.com/rodrigue-ele"
    },
    {
        name: "David Estrada",
        team: "Seattle Sounders FC 2",
        url: "https://www.uslsoccer.com/david-estrada"
    },
    {
        name: "Sam Fowler",
        team: "Seattle Sounders FC 2",
        url: "https://www.uslsoccer.com/sam-fowler"
    },
    {
        name: "Waylon Francis",
        team: "Seattle Sounders FC 2",
        url: "https://www.uslsoccer.com/waylon-francis"
    },
    {
        name: "Azriel Gonzalez",
        team: "Seattle Sounders FC 2",
        url: "https://www.uslsoccer.com/azriel-gonzalez"
    },
    {
        name: "Nick Hinds",
        team: "Seattle Sounders FC 2",
        url: "https://www.uslsoccer.com/nick-hinds"
    },
    {
        name: "Shandon Hopeau",
        team: "Seattle Sounders FC 2",
        url: "https://www.uslsoccer.com/shandon-hopeau"
    },
    {
        name: "Peter Kingston",
        team: "Seattle Sounders FC 2",
        url: "https://www.uslsoccer.com/peter-kingston"
    },
    {
        name: "Conrad Lee",
        team: "Seattle Sounders FC 2",
        url: "https://www.uslsoccer.com/conrad-lee"
    },
    {
        name: "Blake Malone",
        team: "Seattle Sounders FC 2",
        url: "https://www.uslsoccer.com/blake-malone"
    },
    {
        name: "Cameron Martin",
        team: "Seattle Sounders FC 2",
        url: "https://www.uslsoccer.com/cameron-martin"
    },
    {
        name: "Jordan McCrary",
        team: "Seattle Sounders FC 2",
        url: "https://www.uslsoccer.com/jordan-mccrary"
    },
    {
        name: "Bryan Meredith",
        team: "Seattle Sounders FC 2",
        url: "https://www.uslsoccer.com/bryan-meredith"
    },
    {
        name: "Gio Miglietti",
        team: "Seattle Sounders FC 2",
        url: "https://www.uslsoccer.com/gio-miglietti"
    },
    {
        name: "Jake Morris",
        team: "Seattle Sounders FC 2",
        url: "https://www.uslsoccer.com/jake-morris"
    },
    {
        name: "Francisco Narbón",
        team: "Seattle Sounders FC 2",
        url: "https://www.uslsoccer.com/francisco-narbón"
    },
    {
        name: "Lamar Neagle",
        team: "Seattle Sounders FC 2",
        url: "https://www.uslsoccer.com/lamar-neagle"
    },
    {
        name: "Alfonso Ocampo-Chavez",
        team: "Seattle Sounders FC 2",
        url: "https://www.uslsoccer.com/alfonso-ocampo-chavez"
    },
    {
        name: "David Olsen",
        team: "Seattle Sounders FC 2",
        url: "https://www.uslsoccer.com/david-olsen"
    },
    {
        name: "Sam Rogers",
        team: "Seattle Sounders FC 2",
        url: "https://www.uslsoccer.com/sam-rogers"
    },
    {
        name: "Alex Roldan",
        team: "Seattle Sounders FC 2",
        url: "https://www.uslsoccer.com/alex-roldan"
    },
    {
        name: "Ray Saari",
        team: "Seattle Sounders FC 2",
        url: "https://www.uslsoccer.com/ray-saari"
    },
    {
        name: "Ray Serrano",
        team: "Seattle Sounders FC 2",
        url: "https://www.uslsoccer.com/ray-serrano"
    },
    {
        name: "Harry Shipp",
        team: "Seattle Sounders FC 2",
        url: "https://www.uslsoccer.com/harry-shipp"
    },
    {
        name: "Rudy Stretch",
        team: "Seattle Sounders FC 2",
        url: "https://www.uslsoccer.com/rudy-stretch"
    },
    {
        name: "Dylan Teves",
        team: "Seattle Sounders FC 2",
        url: "https://www.uslsoccer.com/dylan-teves"
    },
    {
        name: "Gabe Threadgold",
        team: "Seattle Sounders FC 2",
        url: "https://www.uslsoccer.com/gabe-threadgold"
    },
    {
        name: "Denso Ulysse",
        team: "Seattle Sounders FC 2",
        url: "https://www.uslsoccer.com/denso-ulysse"
    },
    {
        name: "Ibrahim Usman",
        team: "Seattle Sounders FC 2",
        url: "https://www.uslsoccer.com/ibrahim-usman"
    },
    {
        name: "Marlon Vargas",
        team: "Seattle Sounders FC 2",
        url: "https://www.uslsoccer.com/marlon-vargas"
    },
    {
        name: "Henry Wingo",
        team: "Seattle Sounders FC 2",
        url: "https://www.uslsoccer.com/henry-wingo"
    },
    {
        name: "Emiliano Amor",
        team: "Swope Park Rangers",
        url: "https://www.uslsoccer.com/emiliano-amor"
    },
    {
        name: "Dakota Barnathan",
        team: "Swope Park Rangers",
        url: "https://www.uslsoccer.com/dakota-barnathan"
    },
    {
        name: "Hadji Barry",
        team: "Swope Park Rangers",
        url: "https://www.uslsoccer.com/hadji-barry"
    },
    {
        name: "Kharlton Belmar",
        team: "Swope Park Rangers",
        url: "https://www.uslsoccer.com/kharlton-belmar"
    },
    {
        name: "Camilo Benitez",
        team: "Swope Park Rangers",
        url: "https://www.uslsoccer.com/camilo-benitez"
    },
    {
        name: "Justin Bilyeu",
        team: "Swope Park Rangers",
        url: "https://www.uslsoccer.com/justin-bilyeu"
    },
    {
        name: "Gianluca Busio",
        team: "Swope Park Rangers",
        url: "https://www.uslsoccer.com/gianluca-busio"
    },
    {
        name: "Sebastian Cruz",
        team: "Swope Park Rangers",
        url: "https://www.uslsoccer.com/sebastian-cruz"
    },
    {
        name: "Eric Dick",
        team: "Swope Park Rangers",
        url: "https://www.uslsoccer.com/eric-dick"
    },
    {
        name: "Amer Didic",
        team: "Swope Park Rangers",
        url: "https://www.uslsoccer.com/amer-didic"
    },
    {
        name: "Brad Evans",
        team: "Swope Park Rangers",
        url: "https://www.uslsoccer.com/brad-evans"
    },
    {
        name: "Ryan Fessler",
        team: "Swope Park Rangers",
        url: "https://www.uslsoccer.com/ryan-fessler"
    },
    {
        name: "Wilson Harris",
        team: "Swope Park Rangers",
        url: "https://www.uslsoccer.com/wilson-harris"
    },
    {
        name: "Felipe Hernandez",
        team: "Swope Park Rangers",
        url: "https://www.uslsoccer.com/felipe-hernandez"
    },
    {
        name: "Christian Herrera",
        team: "Swope Park Rangers",
        url: "https://www.uslsoccer.com/christian-herrera"
    },
    {
        name: "Sean Karani",
        team: "Swope Park Rangers",
        url: "https://www.uslsoccer.com/sean-karani"
    },
    {
        name: "Roman Knox",
        team: "Swope Park Rangers",
        url: "https://www.uslsoccer.com/roman-knox"
    },
    {
        name: "Wan Kuzain Wan Kamal",
        team: "Swope Park Rangers",
        url: "https://www.uslsoccer.com/wan-kuzain-wan-kamal"
    },
    {
        name: "Matt Lewis",
        team: "Swope Park Rangers",
        url: "https://www.uslsoccer.com/matt-lewis"
    },
    {
        name: "Jaylin Lindsey",
        team: "Swope Park Rangers",
        url: "https://www.uslsoccer.com/jaylin-lindsey"
    },
    {
        name: "William Little",
        team: "Swope Park Rangers",
        url: "https://www.uslsoccer.com/william-little"
    },
    {
        name: "Cristian Lobato",
        team: "Swope Park Rangers",
        url: "https://www.uslsoccer.com/cristian-lobato"
    },
    {
        name: "Darrin MacLeod",
        team: "Swope Park Rangers",
        url: "https://www.uslsoccer.com/darrin-macleod"
    },
    {
        name: "Parker Maher",
        team: "Swope Park Rangers",
        url: "https://www.uslsoccer.com/parker-maher"
    },
    {
        name: "Massimo McGuire",
        team: "Swope Park Rangers",
        url: "https://www.uslsoccer.com/massimo-mcguire"
    },
    {
        name: "Chase Minter",
        team: "Swope Park Rangers",
        url: "https://www.uslsoccer.com/chase-minter"
    },
    {
        name: "Kaveh Rad",
        team: "Swope Park Rangers",
        url: "https://www.uslsoccer.com/kaveh-rad"
    },
    {
        name: "Jahon Rad",
        team: "Swope Park Rangers",
        url: "https://www.uslsoccer.com/jahon-rad"
    },
    {
        name: "Bryam Rebellón",
        team: "Swope Park Rangers",
        url: "https://www.uslsoccer.com/bryam-rebellon"
    },
    {
        name: "Diego Rubio",
        team: "Swope Park Rangers",
        url: "https://www.uslsoccer.com/diego-rubio"
    },
    {
        name: "Rodrigo Saravia",
        team: "Swope Park Rangers",
        url: "https://www.uslsoccer.com/rodrigo-saravia"
    },
    {
        name: "Matheus Silva",
        team: "Swope Park Rangers",
        url: "https://www.uslsoccer.com/matheus-silva"
    },
    {
        name: "Seth Sinovic",
        team: "Swope Park Rangers",
        url: "https://www.uslsoccer.com/seth-sinovic"
    },
    {
        name: "Graham Smith",
        team: "Swope Park Rangers",
        url: "https://www.uslsoccer.com/graham-hennessy-smith"
    },
    {
        name: "Colton Storm",
        team: "Swope Park Rangers",
        url: "https://www.uslsoccer.com/colton-storm"
    },
    {
        name: "Adrian Zendejas",
        team: "Swope Park Rangers",
        url: "https://www.uslsoccer.com/adrian-zendejas"
    },
    {
        name: "Luke Boden",
        team: "Tampa Bay Rowdies",
        url: "https://www.uslsoccer.com/luke-boden"
    },
    {
        name: "Stefano Bonomo",
        team: "Tampa Bay Rowdies",
        url: "https://www.uslsoccer.com/stefano-bonomo"
    },
    {
        name: "Joe Cole",
        team: "Tampa Bay Rowdies",
        url: "https://www.uslsoccer.com/joe-cole"
    },
    {
        name: "Neill Collins",
        team: "Tampa Bay Rowdies",
        url: "https://www.uslsoccer.com/neill-collins"
    },
    {
        name: "Kyle Curinga",
        team: "Tampa Bay Rowdies",
        url: "https://www.uslsoccer.com/kyle-curinga"
    },
    {
        name: "Leo Fernandes",
        team: "Tampa Bay Rowdies",
        url: "https://www.uslsoccer.com/leo-fernandes"
    },
    {
        name: "Akira Fitzgerald",
        team: "Tampa Bay Rowdies",
        url: "https://www.uslsoccer.com/akira-fitzgerald"
    },
    {
        name: "Junior Flemmings",
        team: "Tampa Bay Rowdies",
        url: "https://www.uslsoccer.com/junior-flemmings"
    },
    {
        name: "Hunter Gorskie",
        team: "Tampa Bay Rowdies",
        url: "https://www.uslsoccer.com/hunter-gorskie"
    },
    {
        name: "Jochen Graf",
        team: "Tampa Bay Rowdies",
        url: "https://www.uslsoccer.com/jochen-graf"
    },
    {
        name: "Sebastián Guenzatti",
        team: "Tampa Bay Rowdies",
        url: "https://www.uslsoccer.com/sebastian-guenzatti"
    },
    {
        name: "Georgi Hristov",
        team: "Tampa Bay Rowdies",
        url: "https://www.uslsoccer.com/georgi-hristov"
    },
    {
        name: "Max Lachowecki",
        team: "Tampa Bay Rowdies",
        url: "https://www.uslsoccer.com/max-lachowecki"
    },
    {
        name: "Ivan Magalhães",
        team: "Tampa Bay Rowdies",
        url: "https://www.uslsoccer.com/ivan-magalhaes"
    },
    {
        name: "Cody Mizell",
        team: "Tampa Bay Rowdies",
        url: "https://www.uslsoccer.com/cody-mizell"
    },
    {
        name: "Tamika Mkandawire",
        team: "Tampa Bay Rowdies",
        url: "https://www.uslsoccer.com/tamika-mkandawire"
    },
    {
        name: "Alex Morrell",
        team: "Tampa Bay Rowdies",
        url: "https://www.uslsoccer.com/alex-morrell"
    },
    {
        name: "David Najem",
        team: "Tampa Bay Rowdies",
        url: "https://www.uslsoccer.com/david-najem"
    },
    {
        name: "Michael Nanchoff",
        team: "Tampa Bay Rowdies",
        url: "https://www.uslsoccer.com/michael-nanchoff"
    },
    {
        name: "Dominic Oduro",
        team: "Tampa Bay Rowdies",
        url: "https://www.uslsoccer.com/dominic-oduro"
    },
    {
        name: "Kwadwo Poku",
        team: "Tampa Bay Rowdies",
        url: "https://www.uslsoccer.com/kwadwo-poku"
    },
    {
        name: "Kyle Porter",
        team: "Tampa Bay Rowdies",
        url: "https://www.uslsoccer.com/kyle-porter"
    },
    {
        name: "Zac Portillos",
        team: "Tampa Bay Rowdies",
        url: "https://www.uslsoccer.com/zac-portillos"
    },
    {
        name: "Matias Reynares",
        team: "Tampa Bay Rowdies",
        url: "https://www.uslsoccer.com/matias-reynares"
    },
    {
        name: "Lance Rozeboom",
        team: "Tampa Bay Rowdies",
        url: "https://www.uslsoccer.com/lance-rozeboom"
    },
    {
        name: "Marcel Schäfer",
        team: "Tampa Bay Rowdies",
        url: "https://www.uslsoccer.com/marcel-schafer"
    },
    {
        name: "Afrim Taku",
        team: "Tampa Bay Rowdies",
        url: "https://www.uslsoccer.com/afrim-taku"
    },
    {
        name: "Leon Taylor",
        team: "Tampa Bay Rowdies",
        url: "https://www.uslsoccer.com/leon-taylor"
    },
    {
        name: "Martin Vingaard",
        team: "Tampa Bay Rowdies",
        url: "https://www.uslsoccer.com/martin-vingaard"
    },
    {
        name: "Ayo Akinola",
        team: "Toronto FC II",
        url: "https://www.uslsoccer.com/ayo-akinola"
    },
    {
        name: "Aikim Andrews",
        team: "Toronto FC II",
        url: "https://www.uslsoccer.com/aikim-andrews"
    },
    {
        name: "Borja Angoitia",
        team: "Toronto FC II",
        url: "https://www.uslsoccer.com/borja-angoitia"
    },
    {
        name: "Kyle Bjornethun",
        team: "Toronto FC II",
        url: "https://www.uslsoccer.com/kyle-bjornethun"
    },
    {
        name: "Robert Boskovic",
        team: "Toronto FC II",
        url: "https://www.uslsoccer.com/robert-boskovic"
    },
    {
        name: "Dante Campbell",
        team: "Toronto FC II",
        url: "https://www.uslsoccer.com/dante-campbell"
    },
    {
        name: "Gianluca Catalano",
        team: "Toronto FC II",
        url: "https://www.uslsoccer.com/gianluca-catalano"
    },
    {
        name: "Angelo Cavalluzzo",
        team: "Toronto FC II",
        url: "https://www.uslsoccer.com/angelo-cavalluzzo"
    },
    {
        name: "Kunle Dada-Luke",
        team: "Toronto FC II",
        url: "https://www.uslsoccer.com/kunle-dada-luke"
    },
    {
        name: "Aidan Daniels",
        team: "Toronto FC II",
        url: "https://www.uslsoccer.com/aidan-daniels"
    },
    {
        name: "Daniel DaSilva",
        team: "Toronto FC II",
        url: "https://www.uslsoccer.com/daniel-dasilva"
    },
    {
        name: "Julian Dunn",
        team: "Toronto FC II",
        url: "https://www.uslsoccer.com/julian-dunn"
    },
    {
        name: "Lars Eckenrode",
        team: "Toronto FC II",
        url: "https://www.uslsoccer.com/lars-eckenrode"
    },
    {
        name: "Jordan Faria",
        team: "Toronto FC II",
        url: "https://www.uslsoccer.com/jordan-faria"
    },
    {
        name: "Liam Fraser",
        team: "Toronto FC II",
        url: "https://www.uslsoccer.com/liam-fraser"
    },
    {
        name: "Afram Gorgees",
        team: "Toronto FC II",
        url: "https://www.uslsoccer.com/afram-gorgees"
    },
    {
        name: "Malyk Hamilton",
        team: "Toronto FC II",
        url: "https://www.uslsoccer.com/malyk-hamilton"
    },
    {
        name: "Jordan Hamilton",
        team: "Toronto FC II",
        url: "https://www.uslsoccer.com/jordan-hamilton"
    },
    {
        name: "Shaan Hundal",
        team: "Toronto FC II",
        url: "https://www.uslsoccer.com/shaan-hundal"
    },
    {
        name: "Malik Johnson",
        team: "Toronto FC II",
        url: "https://www.uslsoccer.com/malik-johnson"
    },
    {
        name: "Tim Kübel",
        team: "Toronto FC II",
        url: "https://www.uslsoccer.com/tim-kubel"
    },
    {
        name: "Marko Mandekic",
        team: "Toronto FC II",
        url: "https://www.uslsoccer.com/marko-mandekic"
    },
    {
        name: "Mariano Miño",
        team: "Toronto FC II",
        url: "https://www.uslsoccer.com/mariano-mino"
    },
    {
        name: "Terique Mohammed",
        team: "Toronto FC II",
        url: "https://www.uslsoccer.com/terique-mohammed"
    },
    {
        name: "Noble Okello",
        team: "Toronto FC II",
        url: "https://www.uslsoccer.com/noble-okello-ayo"
    },
    {
        name: "Rimi Olatunji",
        team: "Toronto FC II",
        url: "https://www.uslsoccer.com/rimi-olatunji"
    },
    {
        name: "Brandon Onkony",
        team: "Toronto FC II",
        url: "https://www.uslsoccer.com/brandon-onkony"
    },
    {
        name: "Caleb Patterson-Sewell",
        team: "Toronto FC II",
        url: "https://www.uslsoccer.com/caleb-patterson-sewell"
    },
    {
        name: "Jelani Peters",
        team: "Toronto FC II",
        url: "https://www.uslsoccer.com/jelani-peters"
    },
    {
        name: "Luca Petrasso",
        team: "Toronto FC II",
        url: "https://www.uslsoccer.com/luca-petrasso"
    },
    {
        name: "Rocco Romeo",
        team: "Toronto FC II",
        url: "https://www.uslsoccer.com/rocco-romeo"
    },
    {
        name: "Drew Shepherd",
        team: "Toronto FC II",
        url: "https://www.uslsoccer.com/drew-shepherd"
    },
    {
        name: "Ben Spencer Jr",
        team: "Toronto FC II",
        url: "https://www.uslsoccer.com/ben-spencer-jr"
    },
    {
        name: "Matthew Srbely",
        team: "Toronto FC II",
        url: "https://www.uslsoccer.com/matthew-srbely"
    },
    {
        name: "Ryan Telfer",
        team: "Toronto FC II",
        url: "https://www.uslsoccer.com/ryan-telfer"
    },
    {
        name: "Luca Uccello",
        team: "Toronto FC II",
        url: "https://www.uslsoccer.com/luca-uccello"
    },
    {
        name: "Gideon Waja",
        team: "Toronto FC II",
        url: "https://www.uslsoccer.com/gideon-waja"
    },
    {
        name: "Steffen Yeates",
        team: "Toronto FC II",
        url: "https://www.uslsoccer.com/steffen-yeates"
    },
    {
        name: "Fernando Arce",
        team: "Tulsa Roughnecks FC",
        url: "https://www.uslsoccer.com/fernando-arce"
    },
    {
        name: "Jon Bakero",
        team: "Tulsa Roughnecks FC",
        url: "https://www.uslsoccer.com/jon-bakero"
    },
    {
        name: "Michael Binns",
        team: "Tulsa Roughnecks FC",
        url: "https://www.uslsoccer.com/michael-binns"
    },
    {
        name: "Fabián Cerda",
        team: "Tulsa Roughnecks FC",
        url: "https://www.uslsoccer.com/fabian-cerda"
    },
    {
        name: "Stefan Cleveland",
        team: "Tulsa Roughnecks FC",
        url: "https://www.uslsoccer.com/stefan-cleveland"
    },
    {
        name: "D.J. Dean",
        team: "Tulsa Roughnecks FC",
        url: "https://www.uslsoccer.com/dj-dean"
    },
    {
        name: "Jesus Ferreira",
        team: "Tulsa Roughnecks FC",
        url: "https://www.uslsoccer.com/jesus-ferreira"
    },
    {
        name: "Michael Gamble",
        team: "Tulsa Roughnecks FC",
        url: "https://www.uslsoccer.com/michael-gamble"
    },
    {
        name: "Paris Gee",
        team: "Tulsa Roughnecks FC",
        url: "https://www.uslsoccer.com/paris-gee"
    },
    {
        name: "Chase Gentry",
        team: "Tulsa Roughnecks FC",
        url: "https://www.uslsoccer.com/chase-gentry"
    },
    {
        name: "Femi Hollinger-Janzen",
        team: "Tulsa Roughnecks FC",
        url: "https://www.uslsoccer.com/femi-hollinger-janzen"
    },
    {
        name: "Adrian Jusino",
        team: "Tulsa Roughnecks FC",
        url: "https://www.uslsoccer.com/adrian-jusino"
    },
    {
        name: "Riggs Lennon",
        team: "Tulsa Roughnecks FC",
        url: "https://www.uslsoccer.com/riggs-lennon"
    },
    {
        name: "Jonathan Levin",
        team: "Tulsa Roughnecks FC",
        url: "https://www.uslsoccer.com/jonathan-levin"
    },
    {
        name: "Santiago Maidana",
        team: "Tulsa Roughnecks FC",
        url: "https://www.uslsoccer.com/santiago-maidana"
    },
    {
        name: "Ivan Mirković",
        team: "Tulsa Roughnecks FC",
        url: "https://www.uslsoccer.com/ivan-mirkovic"
    },
    {
        name: "Enrique Montano",
        team: "Tulsa Roughnecks FC",
        url: "https://www.uslsoccer.com/enrique-montano"
    },
    {
        name: "Josh Morton",
        team: "Tulsa Roughnecks FC",
        url: "https://www.uslsoccer.com/josh-morton"
    },
    {
        name: "Claudio Muñoz",
        team: "Tulsa Roughnecks FC",
        url: "https://www.uslsoccer.com/claudio-munoz"
    },
    {
        name: "Wyatt Omsberg",
        team: "Tulsa Roughnecks FC",
        url: "https://www.uslsoccer.com/wyatt-omsberg"
    },
    {
        name: "Jhon Pirez",
        team: "Tulsa Roughnecks FC",
        url: "https://www.uslsoccer.com/jhon-pirez"
    },
    {
        name: "Joaquin Rivas",
        team: "Tulsa Roughnecks FC",
        url: "https://www.uslsoccer.com/joaquin-rivas"
    },
    {
        name: "Christian Rodriguez",
        team: "Tulsa Roughnecks FC",
        url: "https://www.uslsoccer.com/christian-rodriguez"
    },
    {
        name: "Brandon Servania",
        team: "Tulsa Roughnecks FC",
        url: "https://www.uslsoccer.com/brandon-servania"
    },
    {
        name: "Terence Smith",
        team: "Tulsa Roughnecks FC",
        url: "https://www.uslsoccer.com/terence-smith"
    },
    {
        name: "Eti Tavares",
        team: "Tulsa Roughnecks FC",
        url: "https://www.uslsoccer.com/eti-tavares"
    },
    {
        name: "Christian Thierjung",
        team: "Tulsa Roughnecks FC",
        url: "https://www.uslsoccer.com/christian-thierjung"
    },
    {
        name: "Francisco Ugarte",
        team: "Tulsa Roughnecks FC",
        url: "https://www.uslsoccer.com/francisco-ugarte"
    },
    {
        name: "Nemanja Vuković",
        team: "Tulsa Roughnecks FC",
        url: "https://www.uslsoccer.com/nemanja-vukovic"
    }
];

let completedPlayers = [];
// remainingPlayers = remainingPlayers.slice(900);
// remainingPlayers = [player1, player2, player3, player4, player5, player6];

// fetch("https://david-sawyer.com").then(res => console.log(Object.keys(res)));
// return;
const promises = remainingPlayers.map(p =>
    fetch(p.url).then(res => res.text())
);

let totalCompleted = 0;

Promise.all(promises).then(responses => {
    responses.forEach((html, requestIndex) => {
        const playerInQuestion = remainingPlayers[requestIndex].url;

        // if (!html.trim()) {
        //     console.log("HTML not avilable for: ", playerInQuestion);
        //     return;
        // }

        const $ = cheerio.load(html);
        const jsonText = $('script[type="application/ld+json"]').text();
        let playerData;
        try {
            playerData = JSON.parse(jsonText);
        } catch (Error) {
            console.log("JSON parsing failed for: ", playerInQuestion);
            // console.log(html);
            // process.exit();
            return;
        }
        const name = playerData.name;
        const birthdate = moment(playerData.birthDate);
        const age = now.diff(birthdate, "years");

        const player = remainingPlayers.find(p => p.name == name);
        if (!player) {
            console.log("player not found: ", name);
            return;
        }
        player.age = age;
        completedPlayers.push(player);

        totalCompleted++;

        console.log(`${name} - ${player.team} - age ${age}`);
    });

    console.log("------------------------------------------------------------");
    console.log("------------------------------------------------------------");
    console.log("------------------------------------------------------------");
    console.log("------------------------------------------------------------");
    console.log("------------------------------------------------------------");
    console.log("------------------------------------------------------------");
    // console.log(players);
    console.log("------------------------------------------------------------");
    console.log("------------------------------------------------------------");
    console.log("------------------------------------------------------------");
    // console.log(`total completed: ${totalCompleted} / ${TOTAL_PLAYERS}`);

    console.log(JSON.stringify(completedPlayers));
});
