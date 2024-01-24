# Journal Enricher
 Provide the ability to open scenes and compendiums by clicking journal links. There's also a way to embed requests to Monk's token bar to make skill checks and saving throws.
 
 The general format is @ViewScene[UUID]. You get the UUID from a scene by opening the Configure Scene dialog and clicking the icon right after the scene name in the dialog title bar. 
 
 The compendium name is in two parts: the first part is "world" for compendiums in your world, or the module or system name, following by a dot, then the id of the pack, which you find system.json or module.json file where the compendium is stored.
 
 Here are some examples:

@ViewScene[dgTrK7gSBDbVcIss]

@ActivateScene[u3msVy6pdwZ93lCp]

@OpenCompendium[world.mycompendium]

@OpenCompendium[dnd5e.monsters]

@MonkRoll[DC 12 Dexterity save]

@MonkRoll[DC 12 Investigation check]

