
$(document).ready( function () {
	$('form#moduleSelection input').each(function() {
		$(this).click(function() { 
			var expansions = ['base','hq','recon'];
			for (var i in expansions) {
				if ($('#' + expansions[i] + 'Check')[0].checked) {
					$('option.' + expansions[i] + 'Module').removeAttr('disabled');
					$('span.' + expansions[i] + 'Disabled').remove();
				} else {
					$('option.' + expansions[i] + 'Module').attr('disabled','disabled');
					if ($('.' + expansions[i] + 'Disabled').length == 0) {
						$('option.' + expansions[i] + 'Module').append('<span class="' + expansions[i] + 'Disabled"> (click "' + $('#' + expansions[i] + 'Check')[0].value + '" to enable)</span>');
					}
				}
			}

			/*
			if ($('#baseCheck')[0].checked) {
				$('option.baseGame').removeAttr('disabled');
				$('span.baseDisabled').remove();
			} else {
				$('option.baseGame').attr('disabled','disabled');
				if ($('.baseDisabled').length == 0) {
					$('option.baseGame').append('<span class="baseDisabled"> (click "Base Game" to enable)</span>');
				}
			}
			if ($('#hqCheck')[0].checked) {
				$('option.hqModule').removeAttr('disabled');
				$('span.hqDisabled').remove();
			} else {
				$('option.hqModule').attr('disabled','disabled');
				if ($('.hqDisabled').length == 0) {
					$('option.hqModule').append('<span class="hqDisabled"> (click "HQ Expansion" to enable)</span>');
				}
			}
			if ($('#reconCheck')[0].checked) {
				$('option.reconModule').removeAttr('disabled');
				$('span.reconDisabled').remove();
			} else {
				$('option.reconModule').attr('disabled','disabled');
				if ($('.reconDisabled').length == 0) {
					$('option.reconModule').append('<span class="reconDisabled"> (click "Recon Expansion" to enable)</span>');
				}
			}
			*/
		});
	}); 
});


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

	$('#allmercs').html(allMercs.sort().join(', '));





	var choice = document.getElementById('modules');

    var title = '';
    var description = '';
    var intructions = [];
	var randomIndex = 0;
    var randomMercs = [];
    var tempArray = allMercs.slice();

    switch (choice.options[choice.selectedIndex].text) {
    case 'Base Game':
		title = 'Base Game.';
		instructions = ["."]
		break;
	case 'HQ Module #1':
		title = hqModules[0];
		instructions = ["Set up the game in the standard fashion.",
						"Add the stack of <em>Medic</em> cards alongside the other mercenary cards.",
						"Shuffle the 8 new <em>Junkyard</em> cards into the <em>Junkyard</em> deck. For now ignore the special ability of the <em>Toolkit</em>.",
						"Locate the <em>Gearheads</em> and <em>Pharmers</em>. Place them on the table next to the mercenary stacks."]
		break;
	case 'HQ Module #2':
		title = hqModules[1];
		instructions = ["Set up the game just as you did for HQ Module #1.",
						"Add the stack of <em>Engineer</em> cards alongside the other mercenary cards.",
						"Shuffle the 12 buildign cards together (indicated by the building icon in the upper left corner) and place them face-down next to the <em>Junkyard</em> pile (they form a third pile of cards next to the <em>Junkyard</em> and <em>Contested Resources</em>.",
						"Add the 3rd gang card (<em>Masons</em>) next to the other 2 gangs.",
						"Players can now use the 'special ability' from the <em>Toolkit</em> (since it works with buildings)."];
		break;
	case 'HQ Module #3':
		title = hqModules[2];
		instructions = ["Set up the game just as you did for HQ Module #2.",
						"Shuffle the tribal leader cards together and deal two, face-down, to each player.  From those two, each player keeps only 1 to represent their tribal leader (players may look at them to decide). The card is kept face-up in the player's play area for everyone to see. The other card is set aside and will not be used this game."];
		break;
	case 'HQ Module #4':
		title = hqModules[3];
		instructions = ["Set up the game just as you did for HQ Module #3.",
						"Add two new rules: <ul><li>A <em>Saboteur</em> may attack a building that is completed and disable it.</li><li>A <em>Sniper Team</em> may attack a tribal leader, wounding him and removing his advantage until a <em>med</em> is applied to the leader to heal him.</li></ul>"];
		break;
	case 'Recon Module #1':
		title = reconModules[0];
		randomMercs = ['Spy'];
		description = "Recon includes many mercenaries, several of which are designed to work together to produce a web of intelligence and deception.";
		instructions = ["Put the full stack of <em>Scouting Refugees</em> in play as a separate stack available for hire, but visually separate from the other mercenaries.",
						"Select the <em>Spy</em> and 9 other mercenries available for hire for a total of 10 mercenary stacks, plus the <em>Scouting Refugees</em>.",
						"Shuffle the 4 <em>Binoculars</em> into the <em>Junkyard</em>."];
		break;
	case 'Recon Module #2':
		title = reconModules[1];
		randomMercs = ['Assassin','Provocateur','Rogue','Guard'];
		description = "This module introduces a couple of the deception elements of Recon.  The resolution of these cards during the skirmish can sometimes get confusing.  It is important to remember that resolution decisions happen in play order (starting with that round's <em>initiator</em>) rather than in real-time.";
		instructions = ["Put the <em>Assassin</em>, <em>Guard</em>, <em>Provocateur</em>, and <em>Rogue</em> in play together as mercenaries available for hire.",
						"Select 6 other mercenaries for a total of 10 stacks."];
		break;
	case 'Recon Module #3':
		title = reconModules[2];
		randomMercs = ['Courier','Drill Sergeant','Scrappers','Tinker'];
		break;
	case 'Recon Module #4':
		title = reconModules[3];
		break;
	case 'Recon Module #5':
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
    $('#description').html(description);
    $('#randomMercs').html('<strong>Mercenaries: </strong>' + randomMercs.sort().join(', ') + '.');

    $('#list').empty();

    for (var i in instructions) {
    	var html = '<li>' + instructions[i] + '</li>';
    	$('#list').append(html);
    }
    

}

