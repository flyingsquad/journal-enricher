Hooks.once('init', async function() {

CONFIG.TextEditor.enrichers.push(
    {
        pattern: /@ActivateScene\[(.+?)\]({(.+)})?/gm,
        enricher: async (match, options) => {

			const arr = match[1].split('.');
            let id = '';

			if (arr.length >= 2 && arr[0] == 'Scene')
				id = arr[1];
			else
				id = arr[0];
			
			let levelId = '';
			let levelName = '';
			let sceneName = '';

			// Check for level: Scene.52hYpT4OpAybEUlF.Level.7WQgsrVDsyekistP
			if (arr.length == 4 && arr[2] == 'Level') {
				levelId = arr[3];
			}

            const scene = game.scenes.get(id);
            const doc = document.createElement("span");

			if (match[3])
				sceneName = match[3];
			else if (scene) {
				sceneName = scene.name;
				if (levelId) {
					const level = scene.levels.get(levelId);
					if (level) {
						sceneName += `: ${level.name}`;
					} else
						levelId = '';
				}					
			} else
				sceneName = "undefined";
			doc.innerHTML = `<a class="control activatescene" data-scene-id="${id}" data-level-id="${levelId}" data-tooltip="Activate Scene" aria-describedby="tooltip"><i class="fa-solid fa-map"></i>&nbsp;<u>${sceneName}</u></a>`;
            return doc;
        }
    });

    $(document).on("click", ".activatescene", activateScene);
});

async function activateScene(event) {
    event.preventDefault();
    const id = event.currentTarget.getAttribute("data-scene-id");
    if (!id) return;
	const scene = game.scenes.get(id);
	if (scene) {
		await scene.activate();
		const levelId = event.currentTarget.getAttribute("data-level-id");
		if (levelId)
			scene.view({level: levelId});

	}
}


Hooks.once('init', async function() {
	
CONFIG.TextEditor.enrichers.push(
    {
        pattern: /@OpenCompendium\[(.+?)\]({([^}]+)})?/gm,
        enricher: async (match, options) => {

			const comp = match[1];
			const c = game.packs.get(comp);
			if (c) {
				let text;
				if (match[3])
					text = match[3];
				else
					text = c.metadata.label;
				const doc = document.createElement("span");
				const myData = `<a class="control opencomp" comp-id="${comp}" data-tooltip="Open compendium" aria-describedby="tooltip"><i class="fa-solid fa-atlas"></i>&nbsp;<u>${text}</u></a>`;
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
        pattern: /@ViewScene\[(.+?)\]({(.+)})?/gm,
        enricher: async (match, options) => {

			const arr = match[1].split('.');
            let id = '';

			if (arr.length >= 2 && arr[0] == 'Scene')
				id = arr[1];
			else
				id = arr[0];
			
			let levelId = '';
			let levelName = '';
			let sceneName = '';

			// Check for level: Scene.52hYpT4OpAybEUlF.Level.7WQgsrVDsyekistP
			if (arr.length == 4 && arr[2] == 'Level') {
				levelId = arr[3];
			}

            const scene = game.scenes.get(id);
            const doc = document.createElement("span");

			if (match[3])
				sceneName = match[3];
			else if (scene) {
				sceneName = scene.name;
				if (levelId) {
					const level = scene.levels.get(levelId);
					if (level) {
						sceneName += `: ${level.name}`;
					} else
						levelId = '';
				}					
			} else
				sceneName = "undefined";
			doc.innerHTML = `<a class="control viewscene" data-scene-id="${id}" data-level-id="${levelId}" data-tooltip="View scene" aria-describedby="tooltip"><i class="fa-solid fa-map"></i>&nbsp;<u>${sceneName}</u></a>`;
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
	if (scene) {
		const levelId = event.currentTarget.getAttribute("data-level-id");
		if (levelId)
			scene.view({level: levelId});
		else
			scene.view();
	}
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
        pattern: /@(Goto|Travel)\[([^:]+) *: *([^\]]+)\]({([^}]+)})?/gm,
        enricher: async (match, options) => {
			let mode = match[1];
            let sceneID = match[2];
            let label = match[3];
			const arr = sceneID.split('.');
            let id = '';

			if (arr.length >= 2 && arr[0] == 'Scene')
				id = arr[1];
			else
				id = arr[0];

			let levelId = '';
			let sceneName = '';

			// Check for level: Scene.52hYpT4OpAybEUlF.Level.7WQgsrVDsyekistP

			if (arr.length == 4 && arr[2] == 'Level')
				levelId = arr[3];

            const scene = game.scenes.get(id);
			
			if (!scene)
				sceneName = "undefined";
			else if (match[5])
				sceneName = match[5];
			else {
				sceneName = scene.name;
				if (levelId) {
					const level = scene.levels.get(levelId);
					if (level)
						sceneName += `: ${level.name}`;
					else
						sceneName += `: unknown level (${levelId})`;
				}
				sceneName += `: ${label}`;
			}
            const doc = document.createElement("span");
			const icon = mode == 'Goto' ? 'fa-crosshairs' : 'fa-arrow-alt-circle-right';
			doc.innerHTML = `<a class="control goto" data-scene="${id}" data-level="${levelId}" data-label="${label}" data-mode="${mode}" data-tooltip="Go to Location" aria-describedby="tooltip"><i class="fa-solid ${icon}"></i>&nbsp;<u>${sceneName}</u></a>`;
            return doc;
        }
    });

    $(document).on("click", ".goto", Goto);
});

async function Goto(event) {
    event.preventDefault();

	let sceneID = event.currentTarget.getAttribute("data-scene");
	let levelID = event.currentTarget.getAttribute("data-level");
	let label = event.currentTarget.getAttribute("data-label");
	let mode = event.currentTarget.getAttribute("data-mode");

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
		const coords = label.match(/ *([0-9]+) *, *([0-9]+)/);
		if (!coords) {
			ui.notifications.warn('No such label: ' + label);
			return;
		}
		x = coords[1];
		y = coords[2];
	}

	if (x && y) {
		if (levelID)
			await scene.view({level: levelID});
		else
			await scene.view();
		x = parseInt(x);
		y = parseInt(y);
		canvas.pan({
			x: x,
			y: y
		});
		if (mode == 'Goto')
			canvas.ping({x: x, y: y});
		else
			moveTokens(x, y);
	}
}

async function moveTokens(x, y) {
	if (canvas.tokens.controlled.length < 1) {
		// If player and no token on the scene create a token
		// for the player's character (if one's assigned).
		if (game.user.isGM || !game.user.character)
			return;
		let tokens =[];
		tokens.push(await game.user.character.getTokenDocument({
			x: x,
			y: y
		}));

		let tokenList = await canvas.scene.createEmbeddedDocuments('Token', tokens);
		return;
	}

	const deltaX = x - canvas.tokens.controlled[0].x;
	const deltaY = y - canvas.tokens.controlled[0].y;
	const elevation = canvas.tokens.controlled[0].document.elevation;

	for (let token of canvas.tokens.controlled) {
		let gridx = Math.floor((token.x + deltaX) / canvas.grid.size);
		let gridy = Math.floor((token.y + deltaY) / canvas.grid.size);
		const x = gridx * canvas.grid.size;
		const y = gridy * canvas.grid.size;
		const waypoints = [{x: x, y: y}];
		token.document.move([{x: x, y: y, elevation: elevation}], {animate: false, constrainOptions: {ignoreWalls: true}});
	}
}


Hooks.once('init', async function() {
	
CONFIG.TextEditor.enrichers.push(
    {
        pattern: /@Chat\[(.+?)\]/gm,
        enricher: async (match, options) => {
            let message = match[1].replaceAll(/"/g, '&quot;');
			let msgText = '';
			if (!message)
				return "";
			let m = message.match(/Actor.([^: ]+) *:(.+$)/);
			let actor = '';
			let tooltip = "Chat Message from Selected Token";
			if (m) {
				actor = m[1];
				const a = game.actors.get(actor);
				if (a) {
					message = `${a.name}: ${m[2]}`;
					msgText = m[2];
					tooltip = `Chat Message from ${a.name}`;
				} else {
					message = m[2];
					msgText = m[2];
				}
			} else
				msgText = message;
            const doc = document.createElement("span");
		const myData = `<a class="control chat" data-message="${msgText}" data-actor="${actor}" data-tooltip="${tooltip}" aria-describedby="tooltip"><i class="fa-solid fa-comment"></i>&nbsp;${message}</a>`;
            doc.innerHTML = myData;
            return doc;
        }
    });

    $(document).on("click", ".chat", chat);
});

function chat(event) {
	if (!game.user.isGM) {
		ui.notifications.notify("Only GMs may use this function.");
		return;
	}
    event.preventDefault();
    const message = event.currentTarget.getAttribute("data-message");
	const actor = event.currentTarget.getAttribute("data-actor");
    if (!message) return;
	let data = {content: message};
	if (actor) {
		data.speaker = {actor: actor};
	} else if (canvas.tokens.controlled.length > 0) {
		const t = canvas.tokens.controlled[0];
		data.speaker = {
			token: t.id,
			alias: t.name
		};
	}
	ChatMessage.create(data);
}


Hooks.once('init', async function() {
	
CONFIG.TextEditor.enrichers.push(
    {
        pattern: /@Whisper\[(.+?)\]/gm,
        enricher: async (match, options) => {
            let message = match[1].replaceAll(/"/g, '&quot;');
            const doc = document.createElement("span");
			const myData = `<a class="control whisper" data-message="${message}" data-tooltip="Whisper to Selected Tokens" aria-describedby="tooltip"><i class="fa-solid fa-comment"></i>&nbsp;Whisper: ${message}</a>`;
            doc.innerHTML = myData;
            return doc;
        }
    });

    $(document).on("click", ".whisper", whisper);
});

function whisper(event) {
	if (!game.user.isGM) {
		ui.notifications.notify("Only GMs may use this function.");
		return;
	}
    event.preventDefault();
    const message = event.currentTarget.getAttribute("data-message");
    if (!message) return;
	let data = {
		content: message,
		whisper: []
	};
	for (const t of canvas.tokens.controlled) {
		for (const owner in t.actor.ownership) {
			if (owner.length != 16)
				continue;
			if (t.actor.ownership[owner] === CONST.DOCUMENT_OWNERSHIP_LEVELS.OWNER)
				if (!data.whisper.includes(owner) && owner != game.user.id)
					data.whisper.push(owner);
		}
	}

	ChatMessage.create(data);
}
