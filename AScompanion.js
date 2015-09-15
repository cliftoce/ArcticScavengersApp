$(document).ready( function () {

	var components = ['base','hq','recon'];

	hideRules();
	updateAvailableModes();

	$('.accordion').accordion({ 
		active: false,
		collapsible: true,
		heightStyle: "content"
	});

	$('form#moduleSelection input').each(function() {
		$(this).click(function() {
			updateAvailableModes();
		});
	});

	$('#randomizer').click(function() {
		hideRules();
		$('#basicRules').show();
		var mode = getMode();
		var players = getPlayers();
		var Modules = { // hashtable of arrays of the form ['module name',['required mercenaries']]
			'base': ['Base Game',[]],
			'hq1': ['HQ Module #1: "Medics, Tools, and Gangs"',['Medic']],
			'hq2': ['HQ Module #2: "Engineers and Buildings"',['Engineer']],
			'hq3': ['HQ Module #3: "Tribal Leaders"',[]],
			'hq4': ['HQ Module #4: "Dirty Deeds"',[]],
			'recon1': ['Recon Module #1: "Spy Hunter"',['Spy']],
			'recon2': ['Recon Module #2: "Liars and Thieves"',['Assassin','Provocateur','Rogue','Guard']],
			'recon3': ['Recon Module #3: "Expanding the Ranks"',['Courier','Drill Sergeant','Scrappers','Tinker']],
			'recon4': ['Recon Module #4: "Randomized Contested Resources"',[]],
			'recon5': ['Recon Module #5: "The Kitchen Sink"',[]]
		}
		$('#selectedMode').html(Modules[mode][0] + ( players === '-' ? '' : ' for ' + players + ( players === '1' ? ' player.' : ' players.' )));
	    $('#randomMercs').html('<strong>Mercenaries: </strong>' + randomizeMercs(Modules[mode][1]).sort().join(', ') + '.');
	});

	function hideRules() {
		$('.accordion.rules').hide();
	}

	function updateAvailableModes() {
		for (var i in components) { // loop over the prefixes 'base', 'hq', and 'recon'
			if ($('#' + components[i] + 'Check')[0].checked) { // enable game mode(s) according to the checked checkboxes
				$('option.' + components[i] + 'Module').removeAttr('disabled');
				$('span.' + components[i] + 'Disabled').remove();
			} else { // disable game mode(s) according to the unchecked checkboxes
				$('option.' + components[i] + 'Module').attr('disabled','disabled');
				if ($('.' + components[i] + 'Disabled').length == 0) {
					$('option.' + components[i] + 'Module').append('<span class="' + components[i] + 'Disabled"> (click "' + $('#' + components[i] + 'Check')[0].value + '" to enable)</span>');
				}
			}
		}
	}

	function getMode() {
		var choice = document.getElementById('mode');
		var mode = choice.options[choice.selectedIndex].value;
	    if (mode !== 'base') {
	    	$('#' + mode).show();
	    }
		return mode;
	}

	function getPlayers() {
		var choice = document.getElementById('players');
		var players = choice.options[choice.selectedIndex].text;
		$('#2pException').show() // show the rule that applies to all but the 2-player game
		if (players === '1') {
			$('#soloRules').show();
		} else if (players === '2') {
			$('#2pRules').show();
			$('#2pException').hide(); // hide the rule that does not apply to the 2-player game
		}
		return players;
	}

	function randomizeMercs(reqMercs) {
		var Mercs = {
			'base': ['Brawler','Hunter','Group Leaders','Saboteur','Scavenger','Scout','Sniper Team','Thugs'],
			'hq': ['Medic','Engineer'],
			'recon': ['Assassin','Courier','Drill Sergeant','Guard','Provocateur','Rogue','Scrappers','Spy','Tinker']
		};
		var randMercs = reqMercs;
		var tempMercs = [];
		for (var i in components) { // loop over the prefixes 'base', 'hq', and 'recon'
			if ($('#' + components[i] + 'Check')[0].checked) { // construct array available mercenaries according to the checked checkboxes
				tempMercs = tempMercs.concat(Mercs[components[i]]);
			}
		}
		for (var i = 0; i < randMercs.length; i++) { // remove mercenaries that are already required by the module
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
