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
            const myData = `<a class="control myscene" data-scene-id="${id}" data-tooltip="View scene" aria-describedby="tooltip"><b>${scene?.name}</b></a>`;
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
            const myData = `<a class="control activatescene" data-scene-id="${id}" data-tooltip="Activate scene" aria-describedby="tooltip"><b>${scene?.name}</b></a>`;
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
				const myData = `<a class="control opencomp" comp-id="${comp}" data-tooltip="Open compendium" aria-describedby="tooltip"><b>${c.metadata.label}</b></a>`;
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
            const myData = `<a class="control viewscene" data-scene-id="${id}" data-tooltip="View scene" aria-describedby="tooltip"><b>${scene?.name}</b></a>`;
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
            const myData = `<a class="control monkroll" data-skill="${sk}" data-dc="${dc}" data-type="${type}" data-tooltip="Roll ${type}" aria-describedby="tooltip"><b>DC ${dc} ${skill} ${longtype}</b></a>`;
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
