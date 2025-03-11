Hooks.once('init', async function() {

CONFIG.TextEditor.enrichers.push(
    {
        pattern: /@MyScene\[(.+?)\]/gm,
        enricher: async (match, options) => {

			const arr = match[1].split('.');
            let id = '';

			if (arr.length == 2 && arr[0] == 'Scene')
				id = arr[1];
			else
				id = arr[0];

            const scene = game.scenes.get(id);
            const doc = document.createElement("span");
            const myData = `<a class="control myscene" data-scene-id="${id}" data-tooltip="View scene" aria-describedby="tooltip"><i class="fa-solid fa-map"></i>&nbsp;<u>${scene?.name}</u></a>`;
            doc.innerHTML = myData;
            return doc;
        }
    });

    $(document).on("click", ".myscene", viewScene);
});

Hooks.once('init', async function() {

CONFIG.TextEditor.enrichers.push(
    {
        pattern: /@ActivateScene\[(.+?)\]/gm,
        enricher: async (match, options) => {

			const arr = match[1].split('.');
            let id = '';

			if (arr.length == 2 && arr[0] == 'Scene')
				id = arr[1];
			else
				id = arr[0];

            const scene = game.scenes.get(id);
            const doc = document.createElement("span");
            const myData = `<a class="control activatescene" data-scene-id="${id}" data-tooltip="Activate scene" aria-describedby="tooltip"><i class="fa-solid fa-map"></i>&nbsp;<u>${scene?.name}</u></a>`;
            doc.innerHTML = myData;
            return doc;
        }
    });

    $(document).on("click", ".activatescene", activateScene);
});

function activateScene(event) {
    event.preventDefault();
    const id = event.currentTarget.getAttribute("data-scene-id");
    if (!id) return;
	const scene = game.scenes.get(id);
	if (scene)
		scene.activate();
}

Hooks.once('init', async function() {
	
CONFIG.TextEditor.enrichers.push(
    {
        pattern: /@OpenCompendium\[(.+?)\]/gm,
        enricher: async (match, options) => {

			const comp = match[1];
			const c = game.packs.get(comp);
			if (c) {
				const doc = document.createElement("span");
				const myData = `<a class="control opencomp" comp-id="${comp}" data-tooltip="Open compendium" aria-describedby="tooltip"><i class="fa-solid fa-atlas"></i>&nbsp;<u>${c.metadata.label}</u></a>`;
				doc.innerHTML = myData;
				return doc;
			}
			return null;
        }
    });

    $(document).on("click", ".opencomp", openCompendium);
});

function openCompendium(event) {
    event.preventDefault();
    const id = event.currentTarget.getAttribute("comp-id");
    if (!id) return;
	game.packs.get(id).render(true);
}

Hooks.once('init', async function() {

CONFIG.TextEditor.enrichers.push(
    {
        pattern: /@ViewScene\[(.+?)\]/gm,
        enricher: async (match, options) => {

			const arr = match[1].split('.');
            let id = '';

			if (arr.length == 2 && arr[0] == 'Scene')
				id = arr[1];
			else
				id = arr[0];

            const scene = game.scenes.get(id);
            const doc = document.createElement("span");
            const myData = `<a class="control viewscene" data-scene-id="${id}" data-tooltip="View scene" aria-describedby="tooltip"><i class="fa-solid fa-map"></i>&nbsp;<u>${scene?.name}</u></a>`;
            doc.innerHTML = myData;
            return doc;
        }
    });

    $(document).on("click", ".viewscene", viewScene);
});

function viewScene(event) {
    event.preventDefault();
    const id = event.currentTarget.getAttribute("data-scene-id");
    if (!id) return;
	const scene = game.scenes.get(id);
	if (scene)
		scene.view();
}

Hooks.once('init', async function() {
	
CONFIG.TextEditor.enrichers.push(
    {
        pattern: /@MonkRoll\[([^ ]+) ([^ ]+) ([^ ]+) ([^\]]+)\]/gm,
        enricher: async (match, options) => {
            let dc = match[2];
            let skill = match[3];
			let type = match[4];

			let sk = '';
			let longtype = 'skill check';
			type = type.toLowerCase();
			if (type == 'save' || type == 'saving throw') {
				switch (skill) {
				case 'Str':
				case 'Strength': sk = 'str'; break;
				case 'Dex':
				case 'Dexterity': sk = 'dex'; break;
				case 'Con':
				case 'Constitution': sk = 'con'; break;
				case 'Int':
				case 'Intelligence': sk = 'int'; break;
				case 'Wis':
				case 'Wisdom': sk = 'wis'; break;
				case 'Cha':
				case 'Charisma': sk = 'cha'; break;
				}
				type = 'save';
				longtype = 'saving throw';

			} else {
				type = 'skill';
				longtype = 'skill check';

				switch (skill) {
				case 'Athletics': sk = 'ath'; break;
				case 'Animal-Handling': sk = 'ani'; break;
				case 'Acrobatics': sk = 'acr'; break;
				case 'Arcana': sk = 'arc'; break;
				case 'Deception': sk = 'dec'; break;
				case 'History': sk = 'his'; break;
				case 'Intimidation': sk = 'itm'; break;
				case 'Investigation': sk = 'inv'; break;
				case 'Insight': sk = 'ins'; break;
				case 'Medicine': sk = 'med'; break;
				case 'Nature': sk = 'nat'; break;
				case 'Perception': sk = 'prc'; break;
				case 'Performance': sk = 'prf'; break;
				case 'Persuasion': sk = 'per'; break;
				case 'Religion': sk = 'rel'; break;
				case 'Sleight-of-Hand': sk = 'slt'; break;
				case 'Stealth': sk = 'ste'; break;
				case 'Survival': sk = 'sur'; break;
				
				case 'Str':
				case 'Strength': sk = 'str';
					type = 'ability';
					longtype = 'ability check';
					break;
				case 'Dex':
				case 'Dexterity': sk = 'dex';
					type = 'ability';
					longtype = 'ability check';
					break;
				case 'Con':
				case 'Constitution': sk = 'con';
					type = 'ability';
					longtype = 'ability check';
					break;
				case 'Int':
				case 'Intelligence': sk = 'int';
					type = 'ability';
					longtype = 'ability check';
					break;
				case 'Wis':
				case 'Wisdom': sk = 'wis';
					type = 'ability';
					longtype = 'ability check';
					break;
				case 'Cha':
				case 'Charisma': sk = 'cha';
					type = 'ability';
					longtype = 'ability check';
					break;
				}
				skill = skill.replace(/-/g, ' ');
			}

            const doc = document.createElement("span");
            const myData = `<a class="control monkroll" data-skill="${sk}" data-dc="${dc}" data-type="${type}" data-tooltip="Roll ${type}" aria-describedby="tooltip"><i class="fa-solid fa-dice-d20"></i>&nbsp;<u>DC ${dc} ${skill} ${longtype}</u></a>`;
            doc.innerHTML = myData;
            return doc;
        }
    });

    $(document).on("click", ".monkroll", monkRoll);
});

function monkRoll(event) {
    event.preventDefault();
    const dc = event.currentTarget.getAttribute("data-dc");
    const sk = event.currentTarget.getAttribute("data-skill");
    const type = event.currentTarget.getAttribute("data-type");
    if (!dc) return;
    if (!sk) return;
	if (!type)
		type = 'skill';

	game.MonksTokenBar.requestRoll([],{request:[{"type":type,"key":sk}], dc:Number(dc), silent:false, fastForward:false, rollMode:'roll'});
}

Hooks.once('init', async function() {
	
CONFIG.TextEditor.enrichers.push(
    {
        pattern: /@MonkXP\[([^ ]+) ([^ ]+)\]/gm,
        enricher: async (match, options) => {
            let xp = match[1];
			let divide = match[2];
			let split;
			switch (divide) {
            case 'no-split':
                split = ' each';
                break;
            default:
				divide = 'equal-split';
                split = ', split equally';
                break;
            case 'robin-hood-split':
                split = ', larger share to lower-level characters';
                break;
            case 'nottingham-split':
                split = ', larger share to higher-level characters';
				break;
			}
			
            const doc = document.createElement("span");
            const myData = `<a class="control monkxp" data-xp="${xp}" data-divide="${divide}" data-tooltip="Award XP" aria-describedby="tooltip"><u>${xp} XP${split}</u></a>`;
            doc.innerHTML = myData;
            return doc;
        }
    });

    $(document).on("click", ".monkxp", monkXP);
});

function monkXP(event) {
    event.preventDefault();
    const xp = event.currentTarget.getAttribute("data-xp");
    const dividexp = event.currentTarget.getAttribute("data-divide");
    if (!xp) return;

	let players = canvas.tokens.controlled;
	if (players.length <= 0) {
		let tokens = canvas.tokens.children[0].children;
		players = tokens.filter(t => t.document.flags['monks-tokenbar'].include == 'include');
	}

	game.MonksTokenBar.assignXP(players,{xp:Number(xp), dividexp: dividexp, silent:false});
}

Hooks.once('init', async function() {
	
CONFIG.TextEditor.enrichers.push(
    {
        pattern: /@PanToPin\[(.+?)\]/gm,
        enricher: async (match, options) => {
            let ref = match[1];
			let page = getPinPage(ref);
			if (!page)
				return "";
            const doc = document.createElement("span");
            const myData = `<a class="control pantopin" data-ref="${ref}" data-tooltip="Jump to Location" aria-describedby="tooltip"><i class="fa-solid fa-crosshairs"></i>&nbsp;<u>${page.name}</u></a>`;
            doc.innerHTML = myData;
            return doc;
        }
    });

    $(document).on("click", ".pantopin", panToPin);
});

function panToPin(event) {
    event.preventDefault();
    const ref = event.currentTarget.getAttribute("data-ref");
    if (!ref) return;
	let page = getPinPage(ref);
	if (page?.sceneNote)
		canvas.notes.panToNote(page.sceneNote);
}

function getPinPage(ref) {
	let a = ref.split('.');
	let jID = a[1];
	let pageID = a[3];

	let entry = game.journal.get(jID);
	if (!entry)
		return null;

	return entry.pages.get(pageID);
}


Hooks.once('init', async function() {
	
CONFIG.TextEditor.enrichers.push(
    {
        pattern: /@Goto\[([^:]+) *: *(.+)\]/gm,
        enricher: async (match, options) => {
            let sceneID = match[1];
            let label = match[2];
			
			const arr = sceneID.split('.');
            let id = '';

			if (arr.length == 2 && arr[0] == 'Scene')
				id = arr[1];
			else
				id = arr[0];

            const scene = game.scenes.get(id);
			
			if (!scene)
				return "";
            const doc = document.createElement("span");
            const myData = `<a class="control goto" data-scene="${id}" data-label="${label}" data-tooltip="Go to Location" aria-describedby="tooltip"><i class="fa-solid fa-crosshairs"></i>&nbsp;<u>${scene.name}: ${label}</u></a>`;
            doc.innerHTML = myData;
            return doc;
        }
    });

    $(document).on("click", ".goto", Goto);
});

async function Goto(event) {
    event.preventDefault();

	let sceneID = event.currentTarget.getAttribute("data-scene");
	let label = event.currentTarget.getAttribute("data-label");

	let placeable;
	let x;
	let y;

	let scene;

	if (sceneID) {
		scene = game.scenes.get(sceneID);
		if (!scene) {
			ui.notifications.warning('No such scene ID: ' + sceneID);
			return;
		}
	}

	placeable = scene.notes.find(n => n.label === label);

	if (placeable) {
		x = placeable.x;
		y = placeable.y;
	} else {
		ui.notifications.warning('No such label: ' + label);
		return;
	}

	if (x && y) {
		if (scene !== game.canvas.scene) {
			await scene.view();
		}
		canvas.pan({
			x: parseInt(x),
			y: parseInt(y)
		});
	}
}

Hooks.on("init", function() {
	game.keybindings.register("journal-enricher", "moveTokens", {
	  name: "Move Selected Tokens",
	  hint: "When this key is pressed the selected tokens will be moved to the current mouse location.",
	  editable: [
		{
		  key: "m"
		}
	  ],
	  onDown: keybind => {
		if (canvas.tokens.controlled.length < 1)
			return;
		const deltaX = canvas.mousePosition.x - canvas.tokens.controlled[0].x;
		const deltaY = canvas.mousePosition.y - canvas.tokens.controlled[0].y;
		for (let token of canvas.tokens.controlled) {
			let gridx = Math.floor((token.x + deltaX) / canvas.grid.size);
			let gridy = Math.floor((token.y + deltaY) / canvas.grid.size);
			token.document.update({"x": gridx * canvas.grid.size, "y": gridy * canvas.grid.size});
		}
	  },
	  restricted: true,             // Restrict this Keybinding to gamemaster only?
	  precedence: CONST.KEYBINDING_PRECEDENCE.NORMAL
	});

});
