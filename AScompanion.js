// Starter Decks:
var starterDeck = ['4 Refugees','3 Scavengers','1 Brawler','1 Spear','1 Shovel'];
// recon starter alts … 'Scouting Refugee','Hardy Scavenger'

// Mercenaries:
var baseMercs = ['Brawler','Hunter','Group Leaders','Saboteur','Scavenger','Scout','Sniper Team','Thugs'];
var hqMercs = ['Medics','Engineers'];
var reconMercs = ['Assassin','Courier','Drill Sergeant','Guard','Provocateur','Rogue','Scrappers','Spy','Tinker'];

// Junk:
var baseJunk = ['Junk','Medkit','Multitool','Net','Pickaxe','Pills','Shovel','Spear'];
var hqJunk = ['Rifle','Toolkit'];
var reconJunk = ['Binoculars','Maps'];
var allJunk = baseJunk.concat(hqJunk,reconJunk);

// Contest Resources:
var baseCR = ['Field Crew','Grenade','Sled Team','Tribe Family','Wolf Pack'];
var hqCR = [];
var reconCR = ['Cargo Sled','Combat Medics','Demolition Team','Tear Gas','Tribal Hunters'];
var allCR = baseCR.concat(hqCR,reconCR);

// Buildings:
var baseBuildings = [];
var hqBuildings = ['Armory','Bunker','Hydroponic Gardens','Pharmacy'];
var reconBuildings = ['Portable Decoys','Scout Tower'];
var allBuildings = baseBuildings.concat(hqBuildings,reconBuildings);

// Leaders:
var baseLeaders = [];
var hqLeaders = ['Butcher','Cannibal','Excavator','Fanatic','Gangster','Mentor','Organizer','Peacemaker','Ranger','Sergeant of Arms'];
var reconLeaders = [];
var allLeaders = baseLeaders.concat(hqLeaders,reconLeaders);

// Gangs:
var baseGangs = [];
var hqGangs = ['Gearheads','Pharmers','Masons'];
var reconGangs = [];
var allGangs = baseGangs.concat(hqGangs,reconGangs);

// Modules:
var baseModules = [];
var hqModules = ['HQ Module #1: "Medics, Tools, and Gangs."','HQ Module #2: "Engineers and Buildings."','HQ Module #3: "Tribal Leaders."','HQ Module #4: "Dirty Deeds."'];
var reconModules = ['Recon Module #1: "Spy Hunter."','Recon Module #2: "Liars and Thieves."','Recon Module #3: "Expanding the Ranks."','Recon Module #4: "Randomized Contested Resources."','Recon Module #5: "The Kitchen Sink."'];
var communityModules = [];
var allModules = baseModules.contact(hqModules,reconModules,communityModules);


var check; 

function checkTest() {
	check = $('#hqCheck').is(':checked');
	if (check) {
		$('#somediv').html("HQ!");
	} else {
		$('#somediv').html("<br>");
	}
}


function getModule() {


	// super messy... need to try putting these if statements in a loop

	var base, hq, recon;

	if (baseCheck.checked) {
		$('#somediv').html("Base!");
		base = true;
	} else {
		$('#somediv').html("<br>");
		base = false;
	}

	if (hqCheck.checked) {
		$('#somediv2').html("HQ!");
		hq = true;
	} else {
		$('#somediv2').html("<br>");
		hq = false;
	}

	if (reconCheck.checked) {
		$('#somediv3').html("Recon!");
		recon = true;
	} else {
		$('#somediv3').html("<br>");
		recon = false;
	}

	var allMercs = [];
	if (base) { 
		allMercs = allMercs.concat(baseMercs);
	}
	if (hq) { 
		allMercs = allMercs.concat(hqMercs);
	}
	if (recon) { 
		allMercs = allMercs.concat(reconMercs);
	}

	$('#allmercs').html(allMercs.sort().join(", "));





	var choice = document.getElementById('modules');

    var title = '';
    var intructions = [];
	var randomIndex = 0;
    var randomMercs = [];
    var tempArray = allMercs.slice();

    switch (choice.options[choice.selectedIndex].text) {
	case 'HQ1':
		title = hqModules[0];
		instructions = ["Set up the game in the standard fashion.",
						"Add the stack of <em>Medic</em> cards alongside the other mercenary cards.",
						"Shuffle the 8 new <em>Junkyard</em> cards into the <em>Junkyard</em> deck. For now ignore the special ability of the <em>Toolkit</em>.",
						"Locate the <em>Gearheads</em> and <em>Pharmers</em>. Place them on the table next to the mercenary stacks."]
		break;
	case 'HQ2':
		title = hqModules[1];
		instructions = ["Sample instructions."];
		break;
	case 'HQ3':
		title = hqModules[2];
		break;
	case 'HQ4':
		title = hqModules[3];
		break;
	case 'Recon1':
		title = reconModules[0];
		randomMercs = ['Spy'];
		break;
	case 'Recon2':
		title = reconModules[1];
		randomMercs = ['Assassin','Provocateur','Rogue','Guard'];
		break;
	case 'Recon3':
		title = reconModules[2];
		randomMercs = ['Courier','Drill Sergeant','Scrappers','Tinker'];
		break;
	case 'Recon4':
		title = reconModules[3];
		break;
	case 'Recon5':
		title = reconModules[4];
		break;
	default:
		return;
	}

	for (var i = 0; i < randomMercs.length; i++) {
		var j = tempArray.indexOf(randomMercs[i]);
		if (j != -1) {
			tempArray.splice(j,1);
		}
	}

    var counter = Math.min(allMercs.length,10) - randomMercs.length;

    while (counter--) {
    	randomIndex = Math.floor(Math.random() * tempArray.length);
		randomMercs.push(tempArray[randomIndex]);
		tempArray.splice(randomIndex,1);
    }

    $('#selectedModule').html(title);
    $('#randomMercs').html('<strong>Mercenaries: </strong>' + randomMercs.sort().join(', ') + '.');

    $('#list').empty();

    for (var i in instructions) {
    	var html = '<li>' + instructions[i] + '</li>';
    	$('#list').append(html);
    }
    

}

