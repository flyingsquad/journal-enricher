# Journal Enricher
Provide the ability to open scenes and compendiums by clicking journal links. There's also a way to embed requests to Monk's token bar to make skill checks and saving throws, as well as a method to jump to pins on the map of the current scene.
 
The general format is @ViewScene[Scene.UUID]. You get the UUID from a scene by opening the Configure Scene dialog and clicking the icon right after the scene name in the dialog title bar. This places the UUID for the scene in the copy buffer, which you can paste between the brackets in @ViewScene[] or @ActivateScene[].
 
When you open a journal, the system calls this text enricher and performs substitutions on the text, turning @ViewScene[UUID] into the name of the scene, and making it a hyperlink so that when you click it, the scene is displayed.
 
If you place text bracketed by braces "{}" that text will be displayed instead of the scene name:
 
@ViewScene[Scene.dgTrK7gSBDbVcIss]{My Scene Description}
 
With Foundry V14, the level may also be specified:

@ViewScene[Scene.dgTrK7gSBDbVcIss.Level.sfldPNVbYtYXLjLu]
 
The enrichers @ActivateScene[], @Goto, @OpenCompendium[], @MonkXP[] and @MonkRoll[], @Chat, @Whisper are processed similarly.
 
The compendium name is in two parts: the first part is "world" for compendiums in your world, or the module or system name, following by a dot, then the id of the pack, which you can find in the system.json or module.json file where the compendium is stored.
 
For example, the D&D 5e Monsters compendium is @OpenCompendium[dnd5e.monsters].
 
Here are some examples:

@ViewScene[Scene.dgTrK7gSBDbVcIss]

@ActivateScene[Scene.u3msVy6pdwZ93lCp.Level.sfldPNVbYtYXLjLu]

@Goto[Scene.UUID: Label]

>The scene UUID is followed by a colon and the text of a Journal Note that has been placed on a map (the Scene. part is optional). This combines the functionality of @ViewScene and @PanToPin. A Level may also be specified, as above with @ViewScene. The indicated location is also pinged.

@Goto[Scene.UUID: x, y]

>If the text after the colon consists of two numbers separated by a comma, it is taken as an absolute coordinate value in the scene. To get these coordinates place a token or other placeable on the scene and then open its details to find the coordinates. This allows you to ping a location on the map without having to add a note.

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

@Chat[Message to all players from GM]
@Chat[Actor.oZpiKcq4t8NSUyse: The actor with the indicated UUID said this!]

>Send a chat message to all players using the selected token as the speaker. If no tokens are selected the message comes from the GM. If Actor.UUID is specified the specified actor is identified as the speaker.

@Whisper[This is a secret message!]

>"Whisper" the message to the owners of the selected tokens.