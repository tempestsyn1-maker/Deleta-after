# Comprehensive Boss Overhaul & 10-Floor Thematic Boss Roster for Beyond

Implement theme-matched, handcrafted pixel-art boss encounters for all 10 dungeon floors in **Beyond — Co-op Roguelike RPG**, directly integrated with Aleph's latest commit (`63e830c: feat(dungeon): expand content with floors 6-10`). Every boss features a custom canvas pixel-art silhouette, animated signature weapons/accessories, visual attack telegraphs, and enraged phase-2 mechanics below 50% HP, strictly preserving the game's retro pixel aesthetic.

---

## 1. Context & Aleph's Latest Push Integration

Aleph recently pushed commit `63e830c`, which established the official 10-floor Sanctuary progression, biomes, and lore:
- **Floor 1**: Highkeep Outer Bailey (Courtyard) → **Warden Malakor**
- **Floor 2**: Sunken Crypt (Catacombs) → **Archlich Vaelor**
- **Floor 3**: Cindervault Bastion (Ember) → **Ignis, Cinder Sovereign**
- **Floor 4**: Abyssal Shadow Chasm (Void) → **Void-Eater Malice**
- **Floor 5**: Aetherial Void Spire (Astral) → **Archon of Nothingness**
- **Floor 6**: Hall of Forgotten Hymns (`hymns`) → **Elyndor, Keeper of the Last Hymn**
- **Floor 7**: Reliquary of the Departed (`reliquary`) → **Zadkiel, Keeper of the Ashen Reliquary**
- **Floor 8**: Chapel of Severed Light (`scripture`) → **Sariel, Warden of the Veiled Scripture**
- **Floor 9**: Celestial Nave (`nave`) → **Seraphel, Sentinel of the Final Seal**
- **Floor 10**: Warden's Gate (`wardengate`) → **Oriphiel, The Last Warden**

In the current codebase, Floors 6–10 currently render bare 16×20 colored rectangle placeholders via `drawHumanoidBoss()`. This plan replaces those placeholders with high-density canvas pixel-art sprites and elevates Floors 1–5 with enhanced telegraphs and phase-2 animations.

---

## 2. Floor-by-Floor Boss Design & Pixel Aesthetic

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                   CANON 10-FLOOR GUARDIAN ROSTER (BEYOND)                   │
├───────┬───────────────────────────────┬─────────────────────────────────────┤
│ Floor │ Boss Name & Biome             │ Visual Pixel Motif & Signature Gear │
├───────┼───────────────────────────────┼─────────────────────────────────────┤
│   1   │ Warden Malakor (Courtyard)    │ Steel Plate, Lion Crest, Tower Kite │
│   2   │ Archlich Vaelor (Catacombs)   │ Tattered Shroud, Bone Crown, Wisps  │
│   3   │ Ignis, Cinder Sovereign (Ember)│ Basalt Demon, Magma Veins, Greataxe │
│   4   │ Void-Eater Malice (Void)      │ Shadow Maw Dragon, Singularity Core │
│   5   │ Archon of Nothingness (Astral)│ Zodiac Halo, Star-Wings, Starblade  │
│   6   │ Elyndor (Hymns)               │ Melancholic Priest, Floating Hymnal │
│   7   │ Zadkiel (Reliquary)           │ Ashen Gold Plate, Censer & Relic    │
│   8   │ Sariel (Scripture)            │ Veiled Heretic, Corrupted Grimoires │
│   9   │ Seraphel (Celestial Nave)     │ Hexa-Wing Seraph, Celestial Lance   │
│  10   │ Oriphiel (Warden's Gate)      │ Bastion Sovereign, Runic Greatblade │
└───────┴───────────────────────────────┴─────────────────────────────────────┘
```

### Floor 1: Warden Malakor, Highkeep Bastion Knight
- **Aesthetic**: Steel plate chivalry, lion crest heraldry, disciplined warrior.
- **Pixel Silhouette**: Heavy articulated steel plate armor (`#334155`, `#475569`), flowing crimson battle cape (`#881337`, `#BE123C`), winged helm with gold plume, gold lion chestplate inlay (`#F59E0B`), steel broadsword, and towering kite shield with cross rivets.
- **Telegraphs & Visual FX**:
  - *Shield Wall*: Luminous azure barrier ring (`#38BDF8`) with gold lion rune.
  - *Cleave Arc*: Glowing red-orange arc swing trail (`#EF4444`).
  - *Shield Charge*: Amber runway hazard with chevron arrows and ground dust kickup.
- **Phase 2 Enrage (<50% HP)**: Cape shreds, golden blade glows radiant orange, ground stomp sparks shockwave ring.

### Floor 2: Archlich Vaelor, Necrotic Sovereign
- **Aesthetic**: Ancient mausoleum sorcery, levitating spectral skeleton, soul magic.
- **Pixel Silhouette**: Floating frayed obsidian and deep purple shroud (`#1E1B4B`, `#4C1D95`), horned bone crown with three ivory spires, piercing spectral cyan eye sockets (`#06B6D4`), ribcage encasing glowing soul lantern, floating bone scythe.
- **Telegraphs & Visual FX**:
  - *Soul Wisps*: 6 homing cyan soul orbs trailing spectral particles.
  - *Crypt Frost Nova*: Expanding frost-rune circular danger zone.
  - *Necrotic Ring*: Radial 16-point necrotic orb burst.
- **Phase 2 Enrage (<50% HP)**: Eyes ignite into blazing blue fire; orbiting soul wisps increase to 5; necromantic rune circle glows beneath.

### Floor 3: Ignis, Cinder Sovereign
- **Aesthetic**: Molten volcanic colossus, cooled basalt plate, boiling magma.
- **Pixel Silhouette**: Dark basalt rock chassis (`#18181B`) laced with branching glowing magma fissures (`#EA580C`, `#F97316`), white-hot incandescent heart core (`#FEF08A`), curved obsidian horns with blazing tips, flaming beard/crown, double-bitted magma greataxe.
- **Telegraphs & Visual FX**:
  - *Magma Geyser*: Boiling orange ground circles erupting into vertical flame spouts.
  - *Molten Cleave*: Fiery circular slash trail leaving burning ground patches.
  - *Firestorm Spiral*: Rotating wheel of molten embers.
- **Phase 2 Enrage (<50% HP)**: Core overheats into pure white-yellow; ground beneath Ignis becomes a pool of boiling lava (`rgba(234, 88, 12, 0.4)`); rising smoke and ember density doubles.

### Floor 4: Void-Eater Malice, Abyssal Singularity Dragon
- **Aesthetic**: Cosmic abyss, shadow matter, eldritch singularity.
- **Pixel Silhouette**: Undulating shadow matter body with 6 articulated void tendrils (`#09090B`, `#3B0764`), bat-like shadow wings veined with crimson energy (`#E11D48`), pulsing magenta singularity eye (`#A855F7`), horned dragon skull, gaping abyssal fanged jaw.
- **Telegraphs & Visual FX**:
  - *Singularity Well*: Swirling purple-black vortex pulling heroes toward the center.
  - *Abyssal Breath*: Wide conical shadow-flame telegraph runway.
  - *Void Nova*: Expanding ring of 20 void projectiles.
- **Phase 2 Enrage (<50% HP)**: Accretion disk emits purple lightning flashes; tendrils lash out violently; eyes burn blood red.

### Floor 5: Archon of Nothingness, Celestial Cosmic Titan
- **Aesthetic**: Solar divinity, cosmic geometry, stellar order.
- **Pixel Silhouette**: Floating celestial entity in cosmic cobalt and gold robes (`#1E293B`, `#F59E0B`), rotating 8-point golden zodiac star halo, four shimmering star-crystal wings (`#38BDF8`, `#FEF08A`), star-forged greatblade with glowing white edge.
- **Telegraphs & Visual FX**:
  - *Orbital Starbeams*: 4 targeted laser telegraph lines striking down celestial pillars.
  - *Supernova Ring*: Full-arena expanding golden shockwave ring.
  - *Arcane Constellation*: Spiral bullet pattern resembling star constellations.
- **Phase 2 Enrage (<50% HP)**: Twin counter-rotating zodiac halos; celestial wings flare with stardust bursts.

### Floor 6: Elyndor, Keeper of the Last Hymn
- **Aesthetic**: Solemn, ancient, melancholic choral master bound to the silent sanctuary.
- **Pixel Silhouette**: Tall, translucent spectral silhouette, layered frayed violet and indigo vestments (`#4C1D95`, `#6D28D9`, `#7C3AED`), tarnished silver pectoral cross, faint glowing choral halo (`#C4B5FD`), floating sacred hymnal scroll that hovers beside Elyndor turning glowing pages.
- **Telegraphs & Visual FX**:
  - *Sacred Harmonic Waves*: Concentric purple-gold soundwave rings expanding outward.
  - *Psalm of Silence*: Cross-shaped golden psalm seal on the floor with chanting particle glyphs.
  - *Spectral Choir Bolts*: Musical notation projectile bursts traveling in undulating sine waves.
- **Phase 2 Enrage (<50% HP)**: Frayed vestments billow spectral light; choral halo fractures into glowing music runes; floating hymnal unleashes rapid cascading psalm bursts.

### Floor 7: Zadkiel, Keeper of the Ashen Reliquary
- **Aesthetic**: Ancient animated armor, ashen bronze cenotaph, smoking censer flail.
- **Pixel Silhouette**: Imposing hulking warden construct in tarnished silver and aged gilded plate (`#D9AA52`, `#78716C`, `#44403C`), glowing amber visage slit within a heavy knight visor, massive towering Relic Greatshield embossed with a sacred urn, swinging an ignited ashen censer flail releasing incense smoke.
- **Telegraphs & Visual FX**:
  - *Ashen Bastion*: Hexagonal golden-bronze barrier with drifting ash particles.
  - *Censer Slam*: Cratering rectangular hammer-impact zone scattering burning ashen embers.
  - *Relic Blade Barrage*: Fan of 5 silver relic blades driven into the ground.
- **Phase 2 Enrage (<50% HP)**: Armor joints vent incandescent amber heat; relic shield pulses with a golden protective dome; censer swings continuously leaving smoke trails.

### Floor 8: Sariel, Warden of the Veiled Scripture
- **Aesthetic**: Mysterious celestial librarian, distorted by void corruption, floating forbidden scriptures.
- **Pixel Silhouette**: Hovering occult silhouette shrouded in layered deep midnight-purple robes and silk veil (`#2E1065`, `#581C87`), floating stained-glass scripture pages that orbit Sariel (`#E879F9`, `#C084FC`), glowing magenta arcane grimoire, eyes shrouded by a blindfold of light.
- **Telegraphs & Visual FX**:
  - *Scripture Seal*: Circular glowing runic floor trap that binds players upon detonation.
  - *Forbidden Text Volley*: 8-direction burst of flying razor-sharp scripture pages.
  - *Veiled Blink*: Teleportation leaving behind a corrupted page vortex that explodes after 1.2s.
- **Phase 2 Enrage (<50% HP)**: Floating pages multiply from 3 to 7, orbiting in a frantic defensive perimeter; void runes pulse along the floor beneath Sariel.

### Floor 9: Seraphel, Sentinel of the Final Seal
- **Aesthetic**: Radiant, blinding, terrifying divine seraph burdened with overwhelming light.
- **Pixel Silhouette**: Blindingly radiant divine sentinel clad in pristine ivory and gold plate (`#FEF08A`, `#FDE047`, `#FFFFFF`), six layered feathered wings (`#FDE68A`, `#F59E0B`) with rhythmic feather flap animations, halo of 12 sacred seal nails, wielding a colossal golden Celestial Greatlance crackling with divine lightning.
- **Telegraphs & Visual FX**:
  - *Final Seal Judgement*: Arena-spanning laser lance telegraph charging with piercing solar light.
  - *Starlight Supernova*: Star-shaped danger zone expanding outward into blinding sunbeams.
  - *Feather Lance Barrage*: Rapid succession of falling celestial spearheads marked by ground target rings.
- **Phase 2 Enrage (<50% HP)**: Wings ignite with blazing golden-white fire; halo nails expand outward into an orbiting orbital defense ring; celestial spears leave lingering holy ground.

### Floor 10: Oriphiel, The Last Warden
- **Aesthetic**: Solemn, monumental final sovereign of Sanctuary; tragic sentinel executing duty.
- **Pixel Silhouette**: Towering 48×56 pixel masterwork armored sovereign in deep cobalt and runic steel plate (`#0F172A`, `#1E293B`, `#38BDF8`), sovereign mantle draped over broad pauldron plates, glowing sapphire executioner visor, colossal two-handed Runic Greatblade etched with ancient warding glyphs (`#67E8F9`), surrounded by twin floating Bastion Aegis crests.
- **Telegraphs & Visual FX**:
  - *Warden's Aegis Bulwark*: Blue runic barrier reflecting front-facing attacks with rotating warding glyphs.
  - *Sanctuary Gate Collapse*: Full-arena ground tremor telegraph with safe zones beneath fallen sanctuary pillars.
  - *Apex Cleave*: 180-degree sweeping blade trail that cleaves across the floor leaving azure fracture fissures.
- **Phase 2 Enrage (<50% HP)**: Aegis crests merge into Oriphiel's blade, igniting it into a towering radiant beam sword; blue warding aura flares outward into a pulsing hurricane of sanctuary energy; footsteps leave burning azure runes.

---

## 3. Technical Architecture & File Updates

1. **`src/client/npcSprites.ts`**:
   - Upgrade `drawHumanoidBoss()` to support the full pixel-art rendering pipelines for Elyndor, Zadkiel, Sariel, Seraphel, and Oriphiel.
   - Include floating books, relic shields, orbiting grimoires, 6 feathered seraph wings, and animated weapon windups.
2. **`src/components/GameCanvas.tsx`**:
   - Ensure bosses 1–10 seamlessly integrate with health bars, enrage status markers (`[ENRAGED]`), visual telegraph hazard circles/lines, and particle effects.
   - Polish rendering routines for Floors 1–5 (Malakor, Vaelor, Ignis, Malice, Archon) with enhanced telegraph indicators.
3. **`test_regression.ts`**:
   - Maintain 100% pass rate on all 44 regression tests.
   - Add verification checks for all 10 boss names, sprite identifiers, and enrage thresholds.

---

## 4. Verification & Testing

- Run `npm test` (`tsx test_regression.ts`) to ensure all 44 existing tests pass.
- Run `compile_applet` and `lint_applet` together to verify 0 syntax or type errors.
- Test in preview canvas: verify boss animations, telegraph indicators, enrage transitions, and floor transitions up to Floor 10.
