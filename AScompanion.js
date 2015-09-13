$(document).ready( function () {

	function dropDownDisabler() {
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
	}

	dropDownDisabler();
	$('form#moduleSelection input').each(function() {
		$(this).click(function() {
			dropDownDisabler();
		});
	}); 
});


// Start Decks:
var startDeck = ['4 Refugees','3 Scavengers','1 Brawler','1 Spear','1 Shovel'];
// recon starter alts … 'Scouting Refugee','Hardy Scavenger'

// Mercenaries:
var Mercs = {
	'base': ['Brawler','Hunter','Group Leaders','Saboteur','Scavenger','Scout','Sniper Team','Thugs'],
	'hq': ['Medic','Engineer'],
	'recon': ['Assassin','Courier','Drill Sergeant','Guard','Provocateur','Rogue','Scrappers','Spy','Tinker']
};

// Junk:
var Junk = {
	'base': ['Junk','Medkit','Multitool','Net','Pickaxe','Pills','Shovel','Spear'],
	'hq': ['Rifle','Toolkit'],
	'recon': ['Binoculars','Maps']
};

// Contest Resources:
var CR = {
	'base': ['Field Crew','Grenade','Sled Team','Tribe Family','Wolf Pack'],
	'hq': [],
	'recon': ['Cargo Sled','Combat Medics','Demolition Team','Tear Gas','Tribal Hunters']
};

// Buildings:
var Buildings = {
	'base': [],
	'hq': ['Armory','Bunker','Hydroponic Gardens','Pharmacy'],
	'recon': ['Portable Decoys','Scout Tower']
};

// Leaders:
var Leaders = {
	'base': [],
	'hq': ['Butcher','Cannibal','Excavator','Fanatic','Gangster','Mentor','Organizer','Peacemaker','Ranger','Sergeant of Arms'],
	'recon': ['Swindler','Yardmaster']
};

// Gangs:
var Gangs = {
	'base': [],
	'hq': ['Gearheads','Pharmers','Masons'],
	'recon': ['Humanitarians']
};

// Modules:
var Modules = {
	'base': [],
	'hq': ['HQ Module #1: "Medics, Tools, and Gangs."','HQ Module #2: "Engineers and Buildings."','HQ Module #3: "Tribal Leaders."','HQ Module #4: "Dirty Deeds."'],
	'recon': ['Recon Module #1: "Spy Hunter."','Recon Module #2: "Liars and Thieves."','Recon Module #3: "Expanding the Ranks."','Recon Module #4: "Randomized Contested Resources."','Recon Module #5: "The Kitchen Sink."'],
	'community': []
};


function getModule() {

	var tempMercs = [];

	var expansions = ['base','hq','recon'];
	for (var i in expansions) {
		if ($('#' + expansions[i] + 'Check')[0].checked) {
			tempMercs = tempMercs.concat(Mercs[expansions[i]]);
		}
	}

	var choice = document.getElementById('modules');

    var name = '';
    var descr = '';
    var intructions = [];
    var randomMercs = [];

    switch (choice.options[choice.selectedIndex].text) {
    case 'Base Game':
		name = 'Base Game.';
		instr = ["."];
		break;
	case 'HQ Module #1':
		name = Modules['hq'][0];
		instr = ["Set up the game in the standard fashion.",
						"Add the stack of <em>Medic</em> cards alongside the other mercenary cards.",
						"Shuffle the 8 new <em>Junkyard</em> cards into the <em>Junkyard</em> deck. For now ignore the special ability of the <em>Toolkit</em>.",
						"Locate the <em>Gearheads</em> and <em>Pharmers</em>. Place them on the table next to the mercenary stacks."];
		randomMercs = ['Medic'];
		break;
	case 'HQ Module #2':
		name = Modules['hq'][1];
		instr = ["Set up the game just as you did for HQ Module #1.",
						"Add the stack of <em>Engineer</em> cards alongside the other mercenary cards.",
						"Shuffle the 12 building cards together (indicated by the building icon in the upper left corner) and place them face-down next to the <em>Junkyard</em> pile (they form a third pile of cards next to the <em>Junkyard</em> and <em>Contested Resources</em>.",
						"Add the 3rd gang card (<em>Masons</em>) next to the other 2 gangs.",
						"Players can now use the \"special ability\" from the <em>Toolkit</em> (since it works with buildings)."];
		randomMercs = ['Engineer'];
		break;
	case 'HQ Module #3':
		name = Modules['hq'][2];
		instr = ["Set up the game just as you did for HQ Module #2.",
						"Shuffle the tribal leader cards together and deal two, face-down, to each player.  From those two, each player keeps only 1 to represent their tribal leader (players may look at them to decide). The card is kept face-up in the player's play area for everyone to see. The other card is set aside and will not be used this game."];
		break;
	case 'HQ Module #4':
		name = Modules['hq'][3];
		instr = ["Set up the game just as you did for HQ Module #3.",
						"Add two new rules: <ul><li>A <em>Saboteur</em> may attack a building that is completed and disable it.</li><li>A <em>Sniper Team</em> may attack a tribal leader, wounding him and removing his advantage until a <em>med</em> is applied to the leader to heal him.</li></ul>"];
		break;
	case 'Recon Module #1':
		name = Modules['recon'][0];
		descr = "Recon includes many mercenaries, several of which are designed to work together to produce a web of intelligence and deception.";
		instr = ["Put the full stack of <em>Scouting Refugees</em> in play as a separate stack available for hire, but visually separate from the other mercenaries.",
						"Select the <em>Spy</em> and 9 other mercenries available for hire for a total of 10 mercenary stacks, plus the <em>Scouting Refugees</em>.",
						"Shuffle the 4 <em>Binoculars</em> into the <em>Junkyard</em>."];
		randomMercs = ['Spy'];
		break;
	case 'Recon Module #2':
		name = Modules['recon'][1];
		descr = "This module introduces a couple of the deception elements of Recon.  The resolution of these cards during the skirmish can sometimes get confusing.  It is important to remember that resolution decisions happen in play order (starting with that round's <em>initiator</em>) rather than in real-time.";
		instr = ["Put the <em>Assassin</em>, <em>Guard</em>, <em>Provocateur</em>, and <em>Rogue</em> in play together as mercenaries available for hire.",
						"Select 6 other mercenaries for a total of 10 stacks."];
		randomMercs = ['Assassin','Provocateur','Rogue','Guard'];
		break;
	case 'Recon Module #3':
		name = Modules['recon'][2];
		randomMercs = ['Courier','Drill Sergeant','Scrappers','Tinker'];
		break;
	case 'Recon Module #4':
		name = Modules['recon'][3];
		break;
	case 'Recon Module #5':
		name = Modules['recon'][4];
		break;
	default:
		return;
	}

	for (var i = 0; i < randomMercs.length; i++) {
		var j = tempMercs.indexOf(randomMercs[i]);
		if (j != -1) {
			tempMercs.splice(j,1);
		}
	}

	var randomIndex = 0;
    var counter = Math.min(tempMercs.length,10) - (tempMercs.length > 10 ? randomMercs.length : 0);
    while (counter--) {
    	randomIndex = Math.floor(Math.random() * tempMercs.length);
		randomMercs.push(tempMercs[randomIndex]);
		tempMercs.splice(randomIndex,1);
    }

    $('#selectedModule').html(name);
    $('#descr').html(descr);
    $('#randomMercs').html('<strong>Mercenaries: </strong>' + randomMercs.sort().join(', ') + '.');

    $('#list').empty();

    for (var i in instr) {
    	var html = '<li>' + instr[i] + '</li>';
    	$('#list').append(html);
    }
    

}

