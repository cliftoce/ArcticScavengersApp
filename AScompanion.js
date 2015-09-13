$(document).ready( function () {

	var expansions = ['base','hq','recon'];

	dropDownDisabler();

	$('form#moduleSelection input').each(function() {
		$(this).click(function() {
			dropDownDisabler();
		});
	}); 

	$('#randomizer').click(function() {
		var MoDe = getMode();
		var randomMercs = randomizeMercs(MoDe['reqMercs']);
		var instructions = getInstr(getPlayers());

	    $('#selectedMode').html(MoDe['name']);
	    $('#descr').html(MoDe['descr']);
	    $('#randomMercs').html('<strong>Mercenaries: </strong>' + randomMercs.sort().join(', ') + '.');
	    
	    $('#instructions').empty();
	    $('#instructions').append('<div><h3>Basic Instructions</h3><div><ol id="baseInstructions"></ol></div></div>');
	    for (var i in instructions['basic']) {;
	    	$('#baseInstructions').append('<li>' + instructions['basic'][i] + '</li>');
	    }
	    if ('2p' in instructions) {
	    	$('#instructions').append('<div><h3>Special 2-Player Instructions</h3><div><ol id="2pInstructions"></ol></div></div>');
		    for (var i in instructions['2p']) {;
		    	$('#2pInstructions').append('<li>' + instructions['2p'][i] + '</li>');
		    }
		}
		if (MoDe['name'] != 'Base Game.') {
			$('#instructions').append('<div><h3>Module-Specific Instructions</h3><div><ol id="moduleInstructions"></ol></div></div>');
		    for (var i in MoDe['instr']) {;
		    	$('#moduleInstructions').append('<li>' + MoDe['instr'][i] + '</li>');
		    }
		}

		$('#phases').css('display','block');

	    // Collapsible accordion instructions list
		$('#instructions > div, #phases').accordion({ 
			active: false,
			collapsible: true,
			heightStyle: "content"
		});
	});

	function dropDownDisabler() {
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

	function getInstr(pCount) {
		var instr = {
			'basic': ["Each player takes an identical starter deck: 4 <em>Refugee</em>s, 3 <em>Scavenger</em>s, 1 <em>Brawler</em>, 1 <em>Spear</em>, 1 <em>Shovel</em>.",
						"Return any additional <em>Refugee</em> cards to the box; they will not be used this game.",
						"Sort the remaining cards into three categories: <em>Contested Resources</em>, <em>Junkyard</em>, and <em>Mercenaries</em>.",
						"Each player shuffles their deck of 10 cards and places it face down in their play area.",
						"Randomly select a player and hand them the <em>initiator card</em>; this player will serve as the initator for the first round."]
		}
		if (pCount === '2') {
			instr['2p'] = ["Remove two cards of each kind from the <em>Junkyard</em> (i.e. 2 <em>Junk</em>, 2 <em>Medkit</em>s, 2 <em>Pickaxe</em>s, etc.)",
								"Eliminate all <em>Contested Resources</em> peeking.",
								"The number of tribe members a player brings to a skirmish is no longer relevant.",
								"Skirmishes must be won by 2.  If not, then it is a tie and the players place the <em>Contested Resource</em> on top of the <em>Junkyard</em> and then shuffle the <em>Junkyard</em>."];
		}
		return instr;
	}

	function getMode() {
		var mode = document.getElementById('mode');
	    
	    var MoDe = {
	    	'name': '',
	    	'descr': '',
	    	'instr': [],
	    	'reqMercs': []
	    }

	    switch (mode.options[mode.selectedIndex].text) {
	    case 'Base Game':
			MoDe['name'] = 'Base Game.';
			break;
		case 'HQ Module #1':
			MoDe['name'] = Modules['hq'][0];
			MoDe['instr'] = ["Set up the game in the standard fashion.",
						"Add the stack of <em>Medic</em> cards alongside the other mercenary cards.",
						"Shuffle the 8 new <em>Junkyard</em> cards into the <em>Junkyard</em> deck. For now ignore the special ability of the <em>Toolkit</em>.",
						"Locate the <em>Gearheads</em> and <em>Pharmers</em>. Place them on the table next to the mercenary stacks."];
			MoDe['reqMercs'] = ['Medic'];
			break;
		case 'HQ Module #2':
			MoDe['name'] = Modules['hq'][1];
			MoDe['instr'] = ["Set up the game just as you did for HQ Module #1.",
						"Add the stack of <em>Engineer</em> cards alongside the other mercenary cards.",
						"Shuffle the 12 building cards together (indicated by the building icon in the upper left corner) and place them face-down next to the <em>Junkyard</em> pile (they form a third pile of cards next to the <em>Junkyard</em> and <em>Contested Resources</em>.",
						"Add the 3rd gang card (<em>Masons</em>) next to the other 2 gangs.",
						"Players can now use the \"special ability\" from the <em>Toolkit</em> (since it works with buildings)."];
			MoDe['reqMercs'] = ['Engineer'];
			break;
		case 'HQ Module #3':
			MoDe['name'] = Modules['hq'][2];
			MoDe['instr'] = ["Set up the game just as you did for HQ Module #2.",
						"Shuffle the tribal leader cards together and deal two, face-down, to each player.  From those two, each player keeps only 1 to represent their tribal leader (players may look at them to decide). The card is kept face-up in the player's play area for everyone to see. The other card is set aside and will not be used this game."];
			break;
		case 'HQ Module #4':
			MoDe['name'] = Modules['hq'][3];
			MoDe['instr'] = ["Set up the game just as you did for HQ Module #3.",
						"Add two new rules: <ul><li>A <em>Saboteur</em> may attack a building that is completed and disable it.</li><li>A <em>Sniper Team</em> may attack a tribal leader, wounding him and removing his advantage until a <em>med</em> is applied to the leader to heal him.</li></ul>"];
			break;
		case 'Recon Module #1':
			MoDe['name'] = Modules['recon'][0];
			MoDe['descr'] = "Recon includes many mercenaries, several of which are designed to work together to produce a web of intelligence and deception.";
			MoDe['instr'] = ["Put the full stack of <em>Scouting Refugees</em> in play as a separate stack available for hire, but visually separate from the other mercenaries.",
						"Select the <em>Spy</em> and 9 other mercenries available for hire for a total of 10 mercenary stacks, plus the <em>Scouting Refugees</em>.",
						"Shuffle the 4 <em>Binoculars</em> into the <em>Junkyard</em>."];
			MoDe['reqMercs'] = ['Spy'];
			break;
		case 'Recon Module #2':
			MoDe['name'] = Modules['recon'][1];
			MoDe['descr'] = "This module introduces a couple of the deception elements of Recon.  The resolution of these cards during the skirmish can sometimes get confusing.  It is important to remember that resolution decisions happen in play order (starting with that round's <em>initiator</em>) rather than in real-time.";
			MoDe['instr'] = ["Put the <em>Assassin</em>, <em>Guard</em>, <em>Provocateur</em>, and <em>Rogue</em> in play together as mercenaries available for hire.",
						"Select 6 other mercenaries for a total of 10 stacks."];
			MoDe['reqMercs'] = ['Assassin','Provocateur','Rogue','Guard'];
			break;
		case 'Recon Module #3':
			MoDe['name'] = Modules['recon'][2];
			MoDe['descr'] = "This module introduces the remaining mercenaries from Recon as well as two new buildings.";
			MoDe['instr'] = ["Put the <em>Courier</em>, <em>Drill Sergeant</em>, <em>Scrappers</em>, and <em>Tinker</em> in play together as mercenaries available for hire.",
						"Select 6 other mercenaries for a total of 10 stacks.",
						"Add the <em>Schematics Pile</em> (from HQ) and the two new buildings (<em>Portable Decoys</em> and <em>Scout Tower</em>).",
						"Finally, substitute <em>Hardy Scavengers</em> in place of the standard <em>Scavengers</em> during player setup."];
			MoDe['reqMercs'] = ['Courier','Drill Sergeant','Scrappers','Tinker'];
			break;
		case 'Recon Module #4':
			MoDe['name'] = Modules['recon'][3];
			MoDe['descr'] = "This module deals exclusively with the <em>Contested Resources</em> pile, and thus can easiy be combined with any other module.";
			MoDe['instr'] = ["Shuffle all 28 <em>Contested Resources</em> (the 14 original plus the 14 new in Recon) together into one draw pile; then, draw the top 14 and use those for the game.",
						"Alternatively, choose 1 copy of each <em>Contested Resource</em> (7 from the base game and 7 from Recon)."];
			break;
		case 'Recon Module #5':
			MoDe['name'] = Modules['recon'][4];
			MoDe['descr'] = "This module introduces the remaining content of the Recon expansion.";
			break;
		default:
			return;
		}

		return MoDe;
	}

	function getPlayers() {
		var players = document.getElementById('players')
		return players.options[players.selectedIndex].text;
	}

	function randomizeMercs(reqMercs) {
		var randMercs = reqMercs;
		var tempMercs = [];
		for (var i in expansions) {
			if ($('#' + expansions[i] + 'Check')[0].checked) {
				tempMercs = tempMercs.concat(Mercs[expansions[i]]);
			}
		}
		for (var i = 0; i < randMercs.length; i++) {
			var j = tempMercs.indexOf(randMercs[i]);
			if (j != -1) {
				tempMercs.splice(j,1);
			}
		}
		var randomIndex = 0;
	    var counter = Math.min(tempMercs.length,10) - (tempMercs.length > 10 ? randMercs.length : 0);
	    while (counter--) {
	    	randomIndex = Math.floor(Math.random() * tempMercs.length);
			randMercs.push(tempMercs[randomIndex]);
			tempMercs.splice(randomIndex,1);
	    }
	    return randMercs;
	}

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




