# Journal Enricher
 Provide the ability to open scenes and compendiums by clicking journal links. There's also a way to embed requests to Monk's token bar to make skill checks and saving throws, as well as a method to jump to pins on the map of the current scene.
 
 The general format is @ViewScene[UUID]. You get the UUID from a scene by opening the Configure Scene dialog and clicking the icon right after the scene name in the dialog title bar. This places the UUID for the scene in the copy buffer, which you can paste between the brackets in @ViewScene[] or @ActivateScene[]. 
 
 When you open a journal, the system calls this text enricher and performs substitutions on the text, turning @ViewScene[UUID] into the name of the scene, and making it a hyperlink so that when you click it, the scene is displayed. @ActivateScene[], @Goto, @OpenCompendium[], @MonkXP[] and @MonkRoll[] are processed similarly.
 
 The compendium name is in two parts: the first part is "world" for compendiums in your world, or the module or system name, following by a dot, then the id of the pack, which you find system.json or module.json file where the compendium is stored.
 
 For example, the D&D 5e Monsters compendium is @OpenCompendium[dnd5e.monsters].
 
 Here are some examples:

@ViewScene[dgTrK7gSBDbVcIss]

@ActivateScene[u3msVy6pdwZ93lCp]

@Goto[Scene.UUID: Label]

>The scene UUID is followed by a colon and the text of a Journal Note that has been placed on a map (the Scene. part is optional). This combines the functionality of @ViewScene and @PanToPin.

@OpenCompendium[world.mycompendium]

@OpenCompendium[dnd5e.monsters]

@MonkXP[50 no-split]
 
@MonkXP[250 equal-split]
 
@MonkXP[250 robin-hood-split]: larger share to lower-level characters
 
@MonkXP[250 nottingham-split]: larger share to higher-level characters

@MonkRoll[DC 12 Dexterity save]

@MonkRoll[DC 12 Investigation check]

@PanToPin[JournalEntry.HtmRXrp1A0K3bYQW.JournalEntryPage.sfldPNVbYtYXLjLu]

>Get the UUID by right-clicking the icon in the edit window for the journal page you have pinned. Create the pin on the map by dragging the the name of the page from the journal page index and dropping it on the map. Because the scene where the pin resides has to be the current scene, it's best to include a @ViewScene[] enricher along with the @PanToPin[], or just use @Goto (added in a later release).

