import type { NpcState } from '../shared/types.ts';

/**
 * Beyond — Distinctive NPC Visual Designs & Idle Animation System
 *
 * Implements handcrafted pixel-art rendering for:
 * 1. Innkeeper Bram: Warm, experienced tavernkeeper with apron, rolled sleeves, bushy mustache,
 *    key ring, tankard polishing idle loop, and natural breathing.
 * 2. Barkeeper Lena: Agile, stylish bartender with midnight blue vest, shoulder bar towel,
 *    auburn braided ponytail with bounce physics, counter wipe / flagon inspect idle loop.
 * 3. Veteran Jorah: Battle-hardened warrior with scarred face, notched steel pauldron,
 *    riveted brigandine, sheathed greatsword, cape flutter, and sword pommel rest idle loop.
 */

/**
 * Innkeeper Bram — Warm, welcoming, seasoned host of The Rusty Tankard.
 */
export function drawInnkeeperBram(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  now: number,
  isSpeaking: boolean
): void {
  // 1. Idle Breathing & Speech Bob
  const talkBob = isSpeaking ? Math.sin(now * 0.02) * 2.2 : 0;
  const breathe = Math.sin(now * 0.0035 + x) * 1.5;
  const cy = y + breathe + talkBob;

  // 2. Idle Polishing Routine (8-second cycle)
  // 0s - 3.8s: Natural resting posture with hands at apron
  // 3.8s - 7.6s: Raises wooden ale tankard and polishes rim with cloth
  const polishCycleMs = 8000;
  const cycleTime = (now + x * 200) % polishCycleMs;
  const isPolishing = !isSpeaking && cycleTime >= 3500 && cycleTime <= 7500;
  const polishProgress = (cycleTime - 3500) / 4000;
  const polishCirc = Math.sin(now * 0.016);

  // 3. Natural Blinking (every ~4.2s for 140ms)
  const isBlinking = ((now + x * 150) % 4200) < 140;

  // --- Shadow ---
  ctx.fillStyle = 'rgba(0, 0, 0, 0.45)';
  ctx.beginPath();
  ctx.ellipse(x, y + 11, 12, 4.5, 0, 0, Math.PI * 2);
  ctx.fill();

  // --- Conversational Aura Ring when speaking ---
  if (isSpeaking) {
    const auraPulse = Math.sin(now * 0.012) * 2.5;
    ctx.strokeStyle = 'rgba(245, 158, 11, 0.65)';
    ctx.lineWidth = 1.8;
    ctx.beginPath();
    ctx.ellipse(x, y + 11, 15 + auraPulse, 6, 0, 0, Math.PI * 2);
    ctx.stroke();
  }

  // --- Sturdy Work Boots & Trousers ---
  ctx.fillStyle = '#18181B'; // Dark sturdy boots
  ctx.fillRect(x - 6, cy + 9, 5, 4);
  ctx.fillRect(x + 2, cy + 9, 5, 4);
  ctx.fillStyle = '#27272A';
  ctx.fillRect(x - 7, cy + 11, 6, 2);
  ctx.fillRect(x + 2, cy + 11, 6, 2);

  // Heavy wool trousers
  ctx.fillStyle = '#292524';
  ctx.fillRect(x - 6, cy + 3, 5, 7);
  ctx.fillRect(x + 2, cy + 3, 5, 7);

  // --- Cream Linen Undershirt with Rolled Sleeves ---
  ctx.fillStyle = '#FEF3C7'; // Linen cream
  ctx.fillRect(x - 9, cy - 8, 18, 12);
  ctx.fillStyle = '#FDE68A';
  ctx.fillRect(x - 8, cy - 7, 16, 10);

  // Rolled sleeves on forearms
  ctx.fillStyle = '#D97706'; // Rolled fabric band
  ctx.fillRect(x - 11, cy - 3, 3, 3);
  ctx.fillRect(x + 8, cy - 3, 3, 3);
  // Sturdy forearms
  ctx.fillStyle = '#FCD34D';
  ctx.fillRect(x - 11, cy, 3, 4);
  ctx.fillRect(x + 8, cy, 3, 4);

  // --- Warm Chestnut Woolen Vest ---
  ctx.fillStyle = '#451A03'; // Deep chestnut
  ctx.fillRect(x - 8, cy - 8, 5, 11);
  ctx.fillRect(x + 3, cy - 8, 5, 11);
  ctx.fillStyle = '#78350F';
  ctx.fillRect(x - 7, cy - 7, 3, 9);
  ctx.fillRect(x + 4, cy - 7, 3, 9);

  // Brass Vest Buttons
  ctx.fillStyle = '#F59E0B';
  ctx.fillRect(x - 1, cy - 6, 2, 2);
  ctx.fillRect(x - 1, cy - 2, 2, 2);
  ctx.fillRect(x - 1, cy + 2, 2, 2);

  // --- Sturdy Leather Bartender Apron ---
  // Apron bib
  ctx.fillStyle = '#92400E'; // Heavy saddle leather
  ctx.fillRect(x - 5, cy - 6, 10, 6);
  ctx.fillStyle = '#B45309';
  ctx.fillRect(x - 4, cy - 5, 8, 5);

  // Apron brass grommets
  ctx.fillStyle = '#FBBF24';
  ctx.fillRect(x - 4, cy - 5, 1, 1);
  ctx.fillRect(x + 3, cy - 5, 1, 1);

  // Apron skirt (drapes over trousers)
  ctx.fillStyle = '#92400E';
  ctx.fillRect(x - 7, cy, 14, 9);
  ctx.fillStyle = '#B45309';
  ctx.fillRect(x - 6, cy + 1, 12, 7);

  // Apron front utility pocket with clean cloth peeking out
  ctx.fillStyle = '#78350F';
  ctx.fillRect(x - 3, cy + 2, 6, 4);
  ctx.fillStyle = '#FFFFFF'; // White folded bar rag
  ctx.fillRect(x - 2, cy + 1, 4, 2);

  // --- Leather Belt & Brass Key Ring ---
  ctx.fillStyle = '#29180C';
  ctx.fillRect(x - 8, cy, 16, 2);
  ctx.fillStyle = '#F59E0B';
  ctx.fillRect(x - 2, cy - 0.5, 4, 3); // Belt buckle

  // Brass Ring with 3 Tavern Keys at Right Hip (Sways with breath)
  const keySway = Math.sin(now * 0.005 + x) * 1.5;
  ctx.fillStyle = '#FBBF24';
  ctx.fillRect(x + 6, cy + 1, 3, 3); // Ring
  ctx.fillStyle = '#D97706';
  ctx.fillRect(x + 7 + keySway * 0.4, cy + 3, 2, 4); // Key 1
  ctx.fillRect(x + 5 - keySway * 0.3, cy + 3, 1.5, 5); // Key 2
  ctx.fillRect(x + 8 + keySway * 0.5, cy + 3, 1.5, 3.5); // Key 3

  // --- Hand & Polishing Animation ---
  if (isPolishing) {
    // Left hand holds wooden tankard at chest height
    const tankardX = x - 5;
    const tankardY = cy - 2;

    // Ale tankard body
    ctx.fillStyle = '#78350F';
    ctx.fillRect(tankardX - 3, tankardY - 4, 6, 7);
    ctx.fillStyle = '#92400E';
    ctx.fillRect(tankardX - 2, tankardY - 3, 4, 5);
    // Brass hoops
    ctx.fillStyle = '#F59E0B';
    ctx.fillRect(tankardX - 3, tankardY - 4, 6, 1);
    ctx.fillRect(tankardX - 3, tankardY + 2, 6, 1);
    // Foam rim
    ctx.fillStyle = '#FEF08A';
    ctx.fillRect(tankardX - 3, tankardY - 5, 6, 2);

    // Left hand holding tankard handle
    ctx.fillStyle = '#FCD34D';
    ctx.fillRect(tankardX - 5, tankardY - 2, 3, 3);

    // Right hand with polishing cloth rubbing in smooth circle
    const ragX = tankardX + polishCirc * 2.5;
    const ragY = tankardY - 4 + Math.cos(now * 0.016) * 1.5;
    ctx.fillStyle = '#F8FAFC'; // White polishing cloth
    ctx.fillRect(ragX - 1, ragY - 1, 4, 4);
    ctx.fillStyle = '#E2E8F0';
    ctx.fillRect(ragX, ragY, 2, 2);
    // Right hand holding rag
    ctx.fillStyle = '#FCD34D';
    ctx.fillRect(ragX + 2, ragY, 3, 3);

    // Occasional finish gleam
    if (polishProgress > 0.85) {
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(tankardX + 2, tankardY - 6, 2, 2);
    }
  } else if (isSpeaking) {
    // Warm conversational open hand gestures
    const armGest = Math.sin(now * 0.02) * 3;
    ctx.fillStyle = '#FCD34D';
    ctx.fillRect(x - 11, cy - 2 + armGest, 4, 4); // Left hand open
    ctx.fillRect(x + 8, cy - 2 - armGest, 4, 4); // Right hand open
  } else {
    // Resting hands comfortably on apron sides
    ctx.fillStyle = '#FCD34D';
    ctx.fillRect(x - 9, cy + 2, 3, 4);
    ctx.fillRect(x + 7, cy + 2, 3, 4);
  }

  // --- Head, Face, Beard & Mustache ---
  const headY = cy - 18;

  // Friendly rounded head base
  ctx.fillStyle = '#FCD34D'; // Warm skin
  ctx.fillRect(x - 5, headY, 10, 10);
  // Warm flushed cheeks
  ctx.fillStyle = '#F87171';
  ctx.fillRect(x - 5, headY + 5, 2, 2);
  ctx.fillRect(x + 3, headY + 5, 2, 2);

  // Receding Wavy Amber-Brown Hair with Silver Temples
  ctx.fillStyle = '#451A03';
  ctx.fillRect(x - 6, headY - 2, 12, 4); // Top hairline
  ctx.fillRect(x - 7, headY, 3, 8); // Left hair side
  ctx.fillRect(x + 4, headY, 3, 8); // Right hair side
  // Silver gray streaks at temples
  ctx.fillStyle = '#94A3B8';
  ctx.fillRect(x - 7, headY + 3, 2, 3);
  ctx.fillRect(x + 5, headY + 3, 2, 3);

  // Kind Brown Eyes & Blinking
  ctx.fillStyle = '#451A03';
  if (isBlinking) {
    ctx.fillRect(x - 4, headY + 3, 3, 1);
    ctx.fillRect(x + 1, headY + 3, 3, 1);
  } else {
    ctx.fillRect(x - 4, headY + 2.5, 3, 2.5);
    ctx.fillRect(x + 1, headY + 2.5, 3, 2.5);
    // Eye shine
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(x - 3, headY + 2.5, 1, 1);
    ctx.fillRect(x + 2, headY + 2.5, 1, 1);
  }

  // Full Bushy Walrus Mustache
  ctx.fillStyle = '#78350F';
  ctx.fillRect(x - 5, headY + 6, 10, 3);
  ctx.fillStyle = '#5C3A21';
  ctx.fillRect(x - 4, headY + 5.5, 8, 2);
  // Mustache tips curling down
  ctx.fillRect(x - 6, headY + 7, 2, 2);
  ctx.fillRect(x + 4, headY + 7, 2, 2);

  // Neatly Trimmed Gray-Speckled Beard
  ctx.fillStyle = '#78350F';
  ctx.fillRect(x - 4, headY + 9, 8, 3);
  ctx.fillRect(x - 3, headY + 11, 6, 2);
  ctx.fillStyle = '#94A3B8'; // Silver specks
  ctx.fillRect(x - 2, headY + 10, 1.5, 1.5);
  ctx.fillRect(x + 1, headY + 10, 1.5, 1.5);

  // Animated Speaking Mouth behind mustache
  if (isSpeaking) {
    const mouthOpen = Math.sin(now * 0.035) > 0;
    ctx.fillStyle = '#1C1917';
    ctx.fillRect(x - 2, headY + 7.5, 4, mouthOpen ? 2.5 : 1);
  }
}

/**
 * Barkeeper Lena — Agile, poised meadmaster and tavern strategist.
 */
export function drawBarkeeperLena(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  now: number,
  isSpeaking: boolean
): void {
  // 1. Idle Breathing & Speech Bob
  const talkBob = isSpeaking ? Math.sin(now * 0.02) * 2.2 : 0;
  const breathe = Math.sin(now * 0.004 + x) * 1.4;
  const cy = y + breathe + talkBob;

  // 2. Idle Routine (7-second cycle)
  // 0s - 3.2s: Attentive posture scanning the room
  // 3.2s - 6.8s: Counter wipe motion with bar towel / inspecting crystal flagon
  const wipeCycleMs = 7000;
  const cycleTime = (now + x * 200) % wipeCycleMs;
  const isWiping = !isSpeaking && cycleTime >= 3000 && cycleTime <= 6500;
  const wipeSwing = Math.sin(now * 0.014) * 4;

  // 3. Natural Blinking & Looking Around
  const isBlinking = ((now + x * 150) % 3800) < 130;
  // Subtle eye glance left/right when scanning room
  const lookDir = Math.sin(now * 0.0018) > 0.4 ? 1 : Math.sin(now * 0.0018) < -0.4 ? -1 : 0;

  // 4. Dynamic Hair Sway Physics
  const ponytailSway = Math.sin(now * 0.0045 + x) * 2.5;

  // --- Shadow ---
  ctx.fillStyle = 'rgba(0, 0, 0, 0.45)';
  ctx.beginPath();
  ctx.ellipse(x, y + 11, 10, 4, 0, 0, Math.PI * 2);
  ctx.fill();

  // --- Speech Aura Ring ---
  if (isSpeaking) {
    const auraPulse = Math.sin(now * 0.012) * 2.5;
    ctx.strokeStyle = 'rgba(56, 189, 248, 0.65)';
    ctx.lineWidth = 1.8;
    ctx.beginPath();
    ctx.ellipse(x, y + 11, 14 + auraPulse, 5.5, 0, 0, Math.PI * 2);
    ctx.stroke();
  }

  // --- High Auburn-Copper Braided Ponytail (Drawn behind head) ---
  ctx.fillStyle = '#991B1B'; // Deep auburn
  ctx.fillRect(x - 9 + ponytailSway * 0.4, cy - 20, 5, 5); // Hair base tie
  ctx.fillStyle = '#EA580C'; // Golden copper braid
  ctx.fillRect(x - 11 + ponytailSway * 0.7, cy - 18, 4, 6);
  ctx.fillRect(x - 13 + ponytailSway, cy - 14, 4, 7);
  ctx.fillRect(x - 14 + ponytailSway * 1.2, cy - 8, 3, 6);
  // Gold hair tie band
  ctx.fillStyle = '#F59E0B';
  ctx.fillRect(x - 9 + ponytailSway * 0.4, cy - 19, 2, 3);
  ctx.fillRect(x - 14 + ponytailSway * 1.2, cy - 3, 2, 2);

  // --- Fitted Barmaid Boots & Dark Trousers ---
  ctx.fillStyle = '#0F172A';
  ctx.fillRect(x - 5, cy + 9, 4, 4);
  ctx.fillRect(x + 1, cy + 9, 4, 4);
  ctx.fillStyle = '#1E293B';
  ctx.fillRect(x - 6, cy + 11, 5, 2);
  ctx.fillRect(x + 1, cy + 11, 5, 2);

  // Dark fitted pants
  ctx.fillStyle = '#1E1B4B';
  ctx.fillRect(x - 5, cy + 3, 4, 7);
  ctx.fillRect(x + 1, cy + 3, 4, 7);

  // --- Crisp White Folded Collar Shirt ---
  ctx.fillStyle = '#F8FAFC';
  ctx.fillRect(x - 7, cy - 7, 14, 11);
  ctx.fillStyle = '#E2E8F0';
  ctx.fillRect(x - 6, cy - 6, 12, 9);

  // Rolled sleeves with leather forearm bracers
  ctx.fillStyle = '#78350F'; // Leather bracers
  ctx.fillRect(x - 9, cy - 1, 3, 4);
  ctx.fillRect(x + 6, cy - 1, 3, 4);
  ctx.fillStyle = '#F59E0B'; // Brass studs
  ctx.fillRect(x - 9, cy, 1, 2);
  ctx.fillRect(x + 8, cy, 1, 2);

  // --- Fitted Midnight-Blue Vest with Brass Buttons ---
  ctx.fillStyle = '#1E3A8A'; // Midnight blue
  ctx.fillRect(x - 6, cy - 7, 4, 11);
  ctx.fillRect(x + 2, cy - 7, 4, 11);
  ctx.fillStyle = '#2563EB';
  ctx.fillRect(x - 5, cy - 6, 2, 9);
  ctx.fillRect(x + 3, cy - 6, 2, 9);

  // Brass Buttons
  ctx.fillStyle = '#F59E0B';
  ctx.fillRect(x - 0.5, cy - 5, 1.5, 1.5);
  ctx.fillRect(x - 0.5, cy - 2, 1.5, 1.5);
  ctx.fillRect(x - 0.5, cy + 1, 1.5, 1.5);

  // Leather corset belt
  ctx.fillStyle = '#311604';
  ctx.fillRect(x - 6, cy + 2, 12, 3);
  ctx.fillStyle = '#D97706';
  ctx.fillRect(x - 1.5, cy + 2, 3, 3); // Buckle

  // --- Signature White Bar Towel Draped over Left Shoulder ---
  ctx.fillStyle = '#FFFFFF'; // Clean white towel
  ctx.fillRect(x - 8, cy - 8, 4, 13);
  ctx.fillStyle = '#E2E8F0'; // Shadow fold
  ctx.fillRect(x - 7, cy - 4, 2, 9);
  // Red woven stripe along towel border
  ctx.fillStyle = '#EF4444';
  ctx.fillRect(x - 8, cy + 3, 4, 1);

  // --- Hand Actions: Wiping Counter vs Resting vs Speaking ---
  if (isWiping) {
    // Right arm extending forward to wipe the counter
    const wipeHandX = x + 4 + wipeSwing;
    const wipeHandY = cy + 4;
    // Arm
    ctx.fillStyle = '#FCD34D';
    ctx.fillRect(x + 4, cy + 1, 3, 3);
    // Hand holding small bar cloth
    ctx.fillStyle = '#FCD34D';
    ctx.fillRect(wipeHandX, wipeHandY - 1, 3, 3);
    ctx.fillStyle = '#F8FAFC'; // Cloth
    ctx.fillRect(wipeHandX - 1, wipeHandY + 1, 5, 3);

    // Left hand resting poised at hip
    ctx.fillStyle = '#FCD34D';
    ctx.fillRect(x - 7, cy + 2, 3, 3);
  } else if (isSpeaking) {
    // Lively bartender advice hand gestures
    const armGest = Math.sin(now * 0.02) * 3;
    ctx.fillStyle = '#FCD34D';
    ctx.fillRect(x - 8, cy - 1 + armGest, 3, 3);
    ctx.fillRect(x + 6, cy - 1 - armGest, 3, 3);
  } else {
    // Both hands resting poised at belt/hips
    ctx.fillStyle = '#FCD34D';
    ctx.fillRect(x - 7, cy + 2, 3, 3);
    ctx.fillRect(x + 5, cy + 2, 3, 3);
  }

  // --- Head, Face, Hair Bangs & Silver Earring ---
  const headY = cy - 18;

  // Face
  ctx.fillStyle = '#FCD34D';
  ctx.fillRect(x - 4, headY, 9, 9);

  // Auburn Hair Volume & Side Bangs
  ctx.fillStyle = '#991B1B';
  ctx.fillRect(x - 5, headY - 3, 11, 4); // Top hair
  ctx.fillStyle = '#C2410C';
  ctx.fillRect(x - 5, headY - 1, 3, 7); // Left swept bangs
  ctx.fillRect(x + 3, headY - 1, 3, 5); // Right swept hair

  // Piercing Emerald Eyes & Blinking
  ctx.fillStyle = '#064E3B';
  if (isBlinking) {
    ctx.fillRect(x - 3 + lookDir, headY + 3, 3, 1);
    ctx.fillRect(x + 1 + lookDir, headY + 3, 3, 1);
  } else {
    ctx.fillRect(x - 3 + lookDir, headY + 2, 2.5, 2.5);
    ctx.fillRect(x + 1 + lookDir, headY + 2, 2.5, 2.5);
    // Emerald iris
    ctx.fillStyle = '#10B981';
    ctx.fillRect(x - 2.5 + lookDir, headY + 2.5, 1.5, 1.5);
    ctx.fillRect(x + 1.5 + lookDir, headY + 2.5, 1.5, 1.5);
    // Pupil shine
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(x - 2 + lookDir, headY + 2, 1, 1);
    ctx.fillRect(x + 2 + lookDir, headY + 2, 1, 1);
  }

  // Silver Hoop Earring at right ear
  ctx.fillStyle = '#E2E8F0';
  ctx.fillRect(x + 5, headY + 4, 1.5, 2.5);
  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect(x + 5, headY + 4, 1, 1); // Earring glint

  // Animated Speaking Mouth
  if (isSpeaking) {
    const mouthOpen = Math.sin(now * 0.035) > 0;
    ctx.fillStyle = '#18181B';
    ctx.fillRect(x - 1.5, headY + 6.5, 3.5, mouthOpen ? 2.5 : 1);
    // Subtle red lip color
    ctx.fillStyle = '#F87171';
    ctx.fillRect(x - 1, headY + 6, 2.5, 1);
  }
}

/**
 * Veteran Jorah — Seasoned warrior, scarred combat veteran, arena commander.
 */
export function drawVeteranJorah(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  now: number,
  isSpeaking: boolean
): void {
  // 1. Heavy Measured Warrior Breathing & Speech Bob
  const talkBob = isSpeaking ? Math.sin(now * 0.02) * 2.2 : 0;
  const breathe = Math.sin(now * 0.0028 + x) * 1.5;
  const cy = y + breathe + talkBob;

  // 2. Idle Sword Rest & Stance Adjustment (6.5-second cycle)
  // 0s - 3.2s: Broad disciplined combat stance
  // 3.2s - 6.5s: Gauntleted hand rests on broadsword pommel, shoulder rolls
  const stanceCycleMs = 6500;
  const cycleTime = (now + x * 200) % stanceCycleMs;
  const isPommelRest = !isSpeaking && cycleTime >= 3000 && cycleTime <= 6200;

  // 3. Natural Blinking
  const isBlinking = ((now + x * 150) % 4600) < 140;

  // 4. Combat Cape Breeze Flutter
  const capeWave = Math.sin(now * 0.005 + x) * 2;

  // --- Shadow ---
  ctx.fillStyle = 'rgba(0, 0, 0, 0.48)';
  ctx.beginPath();
  ctx.ellipse(x, y + 12, 13, 5, 0, 0, Math.PI * 2);
  ctx.fill();

  // --- Speech Aura Ring ---
  if (isSpeaking) {
    const auraPulse = Math.sin(now * 0.012) * 2.5;
    ctx.strokeStyle = 'rgba(239, 68, 68, 0.65)';
    ctx.lineWidth = 1.8;
    ctx.beginPath();
    ctx.ellipse(x, y + 12, 16 + auraPulse, 6, 0, 0, Math.PI * 2);
    ctx.stroke();
  }

  // --- Tattered Charcoal-Red Combat Cape draped behind ---
  ctx.fillStyle = '#262626'; // Charcoal cape back
  ctx.fillRect(x - 10, cy - 6, 20, 17);
  ctx.fillStyle = '#7F1D1D'; // Faded blood-red inner lining
  ctx.fillRect(x - 9, cy - 5, 18, 15);
  // Tattered frayed bottom edge flapping
  ctx.fillStyle = '#18181B';
  ctx.fillRect(x - 10 + capeWave, cy + 9, 6, 4);
  ctx.fillRect(x - 2, cy + 10, 5, 4);
  ctx.fillRect(x + 4 - capeWave, cy + 9, 6, 4);

  // --- Heavy Steel Broadsword Sheathed Across Back ---
  // Blade scabbard
  ctx.fillStyle = '#29180C'; // Scabbard leather
  ctx.fillRect(x + 6, cy - 14, 4, 22);
  ctx.fillStyle = '#94A3B8'; // Steel scabbard tip & throat
  ctx.fillRect(x + 6, cy + 7, 4, 2);
  ctx.fillRect(x + 6, cy - 15, 4, 2);
  // Crossguard & Pommel
  ctx.fillStyle = '#D97706'; // Bronze crossguard
  ctx.fillRect(x + 3, cy - 16, 10, 2);
  ctx.fillStyle = '#451A03'; // Wrapped hilt
  ctx.fillRect(x + 7, cy - 21, 2, 5);
  ctx.fillStyle = '#F59E0B'; // Pommel gold ring
  ctx.fillRect(x + 6.5, cy - 23, 3, 2);
  ctx.fillStyle = '#EF4444'; // Red soul gem on pommel
  ctx.fillRect(x + 7.5, cy - 22.5, 1, 1);

  // --- Reinforced Greaves & Sabatons (Legs & Feet) ---
  ctx.fillStyle = '#1E293B';
  ctx.fillRect(x - 7, cy + 9, 5, 5);
  ctx.fillRect(x + 2, cy + 9, 5, 5);
  ctx.fillStyle = '#475569'; // Steel knee cops & toe caps
  ctx.fillRect(x - 7, cy + 7, 5, 3);
  ctx.fillRect(x + 2, cy + 7, 5, 3);
  ctx.fillRect(x - 8, cy + 12, 6, 2);
  ctx.fillRect(x + 2, cy + 12, 6, 2);

  // --- Riveted Steel Brigandine & Crossed Leather Straps ---
  ctx.fillStyle = '#1F2937'; // Heavy dark leather base
  ctx.fillRect(x - 8, cy - 7, 16, 15);
  ctx.fillStyle = '#374151'; // Reinforced body
  ctx.fillRect(x - 7, cy - 6, 14, 13);

  // Steel plate rivets
  ctx.fillStyle = '#94A3B8';
  ctx.fillRect(x - 5, cy - 5, 2, 2);
  ctx.fillRect(x + 3, cy - 5, 2, 2);
  ctx.fillRect(x - 5, cy, 2, 2);
  ctx.fillRect(x + 3, cy, 2, 2);

  // Cross-chest scabbard strap with bronze wolf buckle
  ctx.fillStyle = '#451A03';
  ctx.fillRect(x - 7, cy - 6, 3, 3);
  ctx.fillRect(x - 4, cy - 3, 3, 3);
  ctx.fillRect(x - 1, cy, 3, 3);
  ctx.fillRect(x + 2, cy + 3, 3, 3);
  ctx.fillStyle = '#D97706'; // Bronze wolf badge
  ctx.fillRect(x - 2, cy - 2, 4, 4);
  ctx.fillStyle = '#FDE68A';
  ctx.fillRect(x - 1, cy - 1, 2, 2);

  // --- Notched Weathered Steel Pauldron on Right Shoulder ---
  ctx.fillStyle = '#334155';
  ctx.fillRect(x + 7, cy - 9, 6, 7);
  ctx.fillStyle = '#64748B';
  ctx.fillRect(x + 8, cy - 8, 4, 5);
  // Steel highlight
  ctx.fillStyle = '#CBD5E1';
  ctx.fillRect(x + 8, cy - 8, 4, 1);
  // Battle notch cut into pauldron
  ctx.fillStyle = '#0F172A';
  ctx.fillRect(x + 10, cy - 6, 2, 2);

  // Left leather pauldron with fur trim
  ctx.fillStyle = '#78350F';
  ctx.fillRect(x - 12, cy - 8, 5, 6);
  ctx.fillStyle = '#E2E8F0'; // White/gray wolf pelt trim
  ctx.fillRect(x - 13, cy - 9, 7, 2);

  // --- Arm & Hand Stance (Rest on Sword vs Guard vs Speaking) ---
  if (isPommelRest) {
    // Right gauntleted hand resting firmly atop sword pommel
    ctx.fillStyle = '#475569';
    ctx.fillRect(x + 5, cy - 24, 5, 4); // Gauntlet over pommel
    ctx.fillStyle = '#94A3B8';
    ctx.fillRect(x + 6, cy - 24, 3, 2);

    // Left hand resting on belt
    ctx.fillStyle = '#475569';
    ctx.fillRect(x - 9, cy + 1, 4, 4);
  } else if (isSpeaking) {
    // Commanding warrior instruction gestures
    const armGest = Math.sin(now * 0.02) * 3;
    ctx.fillStyle = '#475569';
    ctx.fillRect(x - 11, cy - 2 + armGest, 4, 4);
    ctx.fillRect(x + 8, cy - 2 - armGest, 4, 4);
  } else {
    // Solid combat stance with hands at hips
    ctx.fillStyle = '#475569';
    ctx.fillRect(x - 10, cy + 2, 4, 4);
    ctx.fillRect(x + 7, cy + 2, 4, 4);
  }

  // --- Grizzled Veteran Head, Face, Beard & Battle Scar ---
  const headY = cy - 19;

  // Weathered face
  ctx.fillStyle = '#E5B887'; // Weathered skin
  ctx.fillRect(x - 5, headY, 10, 10);

  // Grizzled Graying Dark Hair
  ctx.fillStyle = '#334155';
  ctx.fillRect(x - 6, headY - 3, 12, 4); // Top hair
  ctx.fillRect(x - 6, headY, 3, 6); // Left hair side
  ctx.fillRect(x + 4, headY, 3, 6); // Right hair side
  // Silver hair streaks
  ctx.fillStyle = '#94A3B8';
  ctx.fillRect(x - 5, headY - 2, 3, 2);
  ctx.fillRect(x + 3, headY - 2, 2, 2);

  // Prominent Jagged Red Battle Scar across Left Cheek & Brow
  ctx.fillStyle = '#991B1B';
  ctx.fillRect(x - 3, headY + 1, 1.5, 2);
  ctx.fillRect(x - 4, headY + 3, 1.5, 3);
  ctx.fillRect(x - 3, headY + 6, 1.5, 2);

  // Steely Blue Eyes & Blinking
  ctx.fillStyle = '#0F172A';
  if (isBlinking) {
    ctx.fillRect(x - 3, headY + 3, 3, 1);
    ctx.fillRect(x + 1, headY + 3, 3, 1);
  } else {
    ctx.fillRect(x - 3, headY + 2.5, 2.5, 2.5);
    ctx.fillRect(x + 1, headY + 2.5, 2.5, 2.5);
    // Steel-blue iris
    ctx.fillStyle = '#38BDF8';
    ctx.fillRect(x - 2.5, headY + 3, 1.5, 1.5);
    ctx.fillRect(x + 1.5, headY + 3, 1.5, 1.5);
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(x - 2, headY + 2.5, 1, 1);
    ctx.fillRect(x + 2, headY + 2.5, 1, 1);
  }

  // Heavy Grizzled Beard & Mustache
  ctx.fillStyle = '#334155';
  ctx.fillRect(x - 5, headY + 6, 10, 4); // Mustache
  ctx.fillRect(x - 4, headY + 9, 8, 4); // Full beard
  ctx.fillRect(x - 3, headY + 12, 6, 2); // Beard tip
  // Silver beard strands
  ctx.fillStyle = '#94A3B8';
  ctx.fillRect(x - 3, headY + 9, 2, 3);
  ctx.fillRect(x + 2, headY + 9, 2, 3);
  ctx.fillRect(x - 1, headY + 11, 2, 2);

  // Animated Speaking Mouth
  if (isSpeaking) {
    const mouthOpen = Math.sin(now * 0.035) > 0;
    ctx.fillStyle = '#111827';
    ctx.fillRect(x - 2, headY + 8, 4, mouthOpen ? 2.5 : 1);
  }
}

/**
 * Fallback Generic NPC Renderer with distinct pixel-art details, breathing, and blinking.
 */
export function drawGenericNpc(
  ctx: CanvasRenderingContext2D,
  npc: NpcState,
  x: number,
  y: number,
  now: number,
  isSpeaking: boolean
): void {
  const talkBob = isSpeaking ? Math.sin(now * 0.02) * 2.2 : 0;
  const breathe = Math.sin(now * 0.0035 + x) * 1.5;
  const cy = y + breathe + talkBob;
  const isBlinking = ((now + x * 150) % 4000) < 140;

  // Shadow
  ctx.fillStyle = 'rgba(0,0,0,0.4)';
  ctx.beginPath();
  ctx.ellipse(x, y + 10, 11, 4, 0, 0, Math.PI * 2);
  ctx.fill();

  // Torso
  ctx.fillStyle = '#374151';
  ctx.fillRect(x - 7, cy - 7, 14, 14);
  ctx.fillStyle = '#4B5563';
  ctx.fillRect(x - 6, cy - 6, 12, 12);

  // Head
  ctx.fillStyle = '#FCD34D';
  ctx.fillRect(x - 5, cy - 17, 10, 10);
  ctx.fillStyle = '#1F2937';
  ctx.fillRect(x - 6, cy - 19, 12, 4);

  // Eyes
  ctx.fillStyle = '#111827';
  if (isBlinking) {
    ctx.fillRect(x - 3, cy - 14, 2, 1);
    ctx.fillRect(x + 1, cy - 14, 2, 1);
  } else {
    ctx.fillRect(x - 3, cy - 14.5, 2, 2);
    ctx.fillRect(x + 1, cy - 14.5, 2, 2);
  }

  if (isSpeaking) {
    const mouthOpen = Math.sin(now * 0.035) > 0;
    ctx.fillStyle = '#111827';
    ctx.fillRect(x - 2, cy - 11, 4, mouthOpen ? 2 : 1);
  }
}

/**
 * Aleph — The Soul-Shifter. A sophisticated man in a dramatic, high-detail hooded cloak.
 * Merges mysterious occult silhouette with high-detail character features.
 */
export function drawMysteriousAleph(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  now: number,
  isSpeaking: boolean
): void {
  // 1. Idle Anatomy: Breathing & Stance
  const talkBob = isSpeaking ? Math.sin(now * 0.02) * 2.2 : 0;
  const breathe = Math.sin(now * 0.003 + x) * 1.7;
  const cy = y + breathe + talkBob;

  // 2. Idle Routine (9-second cycle)
  const idleCycleMs = 9000;
  const cycleTime = (now + x * 300) % idleCycleMs;
  const isAdjusting = !isSpeaking && cycleTime >= 4000 && cycleTime <= 7500;
  
  // 3. Natural Blinking & Heterochromia Eyes
  const isBlinking = ((now + x * 200) % 4500) < 140;
  const cloakSway = Math.sin(now * 0.004) * 3;

  // --- Shadow (Deep & Weighted) ---
  ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
  ctx.beginPath();
  ctx.ellipse(x, y + 12, 16, 6, 0, 0, Math.PI * 2);
  ctx.fill();

  // --- 1. Large Hooded Void Cloak (Back Layer) ---
  ctx.fillStyle = '#111827'; // Dark charcoal back
  ctx.beginPath();
  ctx.moveTo(x - 15 + cloakSway * 0.5, cy - 12);
  ctx.lineTo(x + 15 - cloakSway * 0.5, cy - 12);
  ctx.lineTo(x + 18 - cloakSway, cy + 12);
  ctx.lineTo(x - 18 + cloakSway, cy + 12);
  ctx.fill();

  // --- 2. Inner Attire: Midnight Vest & Purple Cravat ---
  // These peek through the open front of the cloak
  ctx.fillStyle = '#1E1B4B'; // Midnight vest
  ctx.fillRect(x - 6, cy - 8, 12, 12);
  ctx.fillStyle = '#4C1D95'; // Purple silk cravat
  ctx.fillRect(x - 2, cy - 7, 4, 6);
  ctx.fillStyle = '#7C3AED';
  ctx.fillRect(x - 1, cy - 6, 2, 4);

  // --- 3. Outer Cloak Panels (Deep Indigo) ---
  ctx.fillStyle = '#1E1B4B'; // Main indigo cloak
  // Left Panel
  ctx.beginPath();
  ctx.moveTo(x - 10, cy - 12);
  ctx.lineTo(x - 4, cy - 12);
  ctx.lineTo(x - 5, cy + 12);
  ctx.lineTo(x - 16 + cloakSway, cy + 12);
  ctx.closePath();
  ctx.fill();
  // Right Panel
  ctx.beginPath();
  ctx.moveTo(x + 10, cy - 12);
  ctx.lineTo(x + 4, cy - 12);
  ctx.lineTo(x + 5, cy + 12);
  ctx.lineTo(x + 16 - cloakSway, cy + 12);
  ctx.closePath();
  ctx.fill();

  // Cloak Highlights & Fold Shading
  ctx.fillStyle = '#312E81';
  ctx.fillRect(x - 10, cy - 10, 2, 20);
  ctx.fillRect(x + 8, cy - 10, 2, 20);

  // --- 4. Golden Runic Embroidery on Cloak Hem ---
  ctx.fillStyle = '#D97706';
  for (let i = 0; i < 3; i++) {
    ctx.fillRect(x - 14 + cloakSway + i * 3, cy + 9, 1.5, 1.5);
    ctx.fillRect(x + 10 - cloakSway + i * 3, cy + 9, 1.5, 1.5);
  }

  // --- 5. Head & Deep Hood ---
  const headY = cy - 22;
  
  // Hood Silhouette
  ctx.fillStyle = '#1E1B4B';
  ctx.beginPath();
  ctx.arc(x, headY + 4, 13, Math.PI, 0);
  ctx.fill();
  ctx.fillRect(x - 13, headY + 4, 26, 8);

  // Golden Runic Trim on Hood Edge
  ctx.strokeStyle = '#D97706';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.arc(x, headY + 4, 13.5, Math.PI + 0.2, -0.2);
  ctx.stroke();

  // Deep Shadow inside Hood (The Void Face)
  ctx.fillStyle = '#020617';
  ctx.beginPath();
  ctx.arc(x, headY + 4, 9, 0, Math.PI * 2);
  ctx.fill();

  // Visible Pale Face peeking through shadow
  ctx.fillStyle = '#FDE68A'; 
  ctx.fillRect(x - 4, headY + 2, 9, 9);
  // Chin shading
  ctx.fillStyle = '#E5E7EB';
  ctx.fillRect(x - 4, headY + 9, 9, 2);

  // Heterochromia Piercing Eyes (Glow effect)
  if (isBlinking) {
    ctx.fillStyle = '#1E293B';
    ctx.fillRect(x - 3, headY + 6, 2, 1);
    ctx.fillRect(x + 1, headY + 6, 2, 1);
  } else {
    // Left eye: Soul-Cyan Flare
    ctx.fillStyle = '#22D3EE';
    ctx.fillRect(x - 3, headY + 5.5, 2.5, 2.5);
    // Right eye: Star-Gold Flare
    ctx.fillStyle = '#FACC15';
    ctx.fillRect(x + 1, headY + 5.5, 2.5, 2.5);
    // Specular shine
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(x - 2.5, headY + 5.5, 1, 1);
    ctx.fillRect(x + 1.5, headY + 5.5, 1, 1);
  }

  // Dark hair bangs visible under hood
  ctx.fillStyle = '#171717';
  ctx.fillRect(x - 5, headY + 1, 11, 2);
  ctx.fillStyle = '#E2E8F0'; // Silver streak
  ctx.fillRect(x - 4, headY + 1, 3, 1);

  // --- 6. Hands & Celestial Staff ---
  const staffX = x + 19;
  const staffY = cy + Math.sin(now * 0.004) * 2;
  
  if (isSpeaking) {
    const handG = Math.sin(now * 0.015) * 3;
    ctx.fillStyle = '#FCD34D';
    ctx.fillRect(x - 12, cy - 2 + handG, 4, 4); // Left hand gesticulating
  } else if (isAdjusting) {
    ctx.fillStyle = '#FCD34D';
    ctx.fillRect(x - 9, cy - 14, 4, 4); // Adjusting hood edge
  } else {
    ctx.fillStyle = '#FCD34D';
    ctx.fillRect(x - 11, cy + 2, 3, 3); // Hand at rest
  }

  // Right gauntleted hand holding staff
  ctx.fillStyle = '#1E293B';
  ctx.fillRect(x + 10, cy - 2, 4, 6);
  ctx.fillStyle = '#94A3B8';
  ctx.fillRect(x + 10, cy - 1, 1, 4);

  // Staff Handle
  ctx.fillStyle = '#29180C';
  ctx.fillRect(staffX - 1.5, staffY - 26, 3, 42);
  // Pulsating Purple Soul-Shard
  const shardPulse = 0.8 + Math.sin(now * 0.007) * 0.2;
  ctx.fillStyle = '#A855F7';
  ctx.beginPath();
  ctx.moveTo(staffX, staffY - 34);
  ctx.lineTo(staffX + 5, staffY - 29);
  ctx.lineTo(staffX, staffY - 24);
  ctx.lineTo(staffX - 5, staffY - 29);
  ctx.closePath();
  ctx.fill();
  
  // Ambient staff glow
  const shardGlow = ctx.createRadialGradient(staffX, staffY - 29, 1, staffX, staffY - 29, 12);
  shardGlow.addColorStop(0, 'rgba(168, 85, 247, 0.4)');
  shardGlow.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = shardGlow;
  ctx.beginPath();
  ctx.arc(staffX, staffY - 29, 12 * shardPulse, 0, Math.PI * 2);
  ctx.fill();

  // --- 7. Orbiting Soul-Motes ---
  [0, 1, 2].forEach(i => {
    const moteAng = now * 0.0018 + (i * Math.PI * 2) / 3;
    const mx = x + Math.cos(moteAng) * 22;
    const my = cy - 8 + Math.sin(moteAng * 1.1) * 14;
    ctx.fillStyle = i === 0 ? '#22D3EE' : i === 1 ? '#C084FC' : '#FACC15';
    ctx.beginPath();
    ctx.arc(mx, my, 1.5, 0, Math.PI * 2);
    ctx.fill();
  });

  // Speaking Mouth
  if (isSpeaking) {
    const mouthOpen = Math.sin(now * 0.035) > 0;
    ctx.fillStyle = '#111827';
    ctx.fillRect(x - 1.5, headY + 8.5, 3.5, mouthOpen ? 2 : 1);
  }
}

/**
 * Main drawNpc dispatcher function
 */
export function drawNpc(
  ctx: CanvasRenderingContext2D,
  npc: NpcState,
  now: number
): void {
  const x = Math.round(npc.x);
  const y = Math.round(npc.y);
  const isSpeaking = (npc.speakingMs ?? 0) > 0;

  // Route to handcrafted individual NPC sprites
  if (npc.id === 'npc_bram' || npc.spriteKind === 'innkeeper') {
    drawInnkeeperBram(ctx, x, y, now, isSpeaking);
  } else if (npc.id === 'npc_lena' || npc.spriteKind === 'barkeep') {
    drawBarkeeperLena(ctx, x, y, now, isSpeaking);
  } else if (npc.id === 'npc_jorah' || npc.spriteKind === 'veteran') {
    drawVeteranJorah(ctx, x, y, now, isSpeaking);
  } else if (npc.id === 'npc_aleph' || npc.spriteKind === 'mysterious_cloak') {
    drawMysteriousAleph(ctx, x, y, now, isSpeaking);
  } else {
    drawGenericNpc(ctx, npc, x, y, now, isSpeaking);
  }

  // Distinctive Name Badge & Interaction Prompt
  const bob = Math.sin(now * 0.0035 + x) * 1.5;
  ctx.font = '700 10.5px "Plus Jakarta Sans", sans-serif';
  ctx.fillStyle = isSpeaking ? '#FCD34D' : '#FDE68A';
  ctx.textAlign = 'center';
  ctx.fillText(npc.name, x, y - 24 + bob);

  ctx.fillStyle = isSpeaking ? '#38BDF8' : '#94A3B8';
  ctx.font = '600 9px "JetBrains Mono", monospace';
  ctx.fillText(isSpeaking ? '• Speaking •' : '[E] Talk', x, y - 34 + bob);
}

/**
 * Humanoid boss sprite for Floors 6-10 (Elyndor, Zadkiel, Sariel, Seraphel, Oriphiel)
/**
 * Handcrafted Pixel-Art Humanoid Boss Sprites for Floors 6-10
 * (Elyndor, Zadkiel, Sariel, Seraphel, Oriphiel)
 */

export function drawElyndorSprite(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  now: number,
  isEnraged = false
): void {
  const floatBob = Math.sin(now * 0.0035) * 4;
  const cy = y - 12 + floatBob;

  // Concentric harmonic soundwave ripples (Psalm of Silence)
  const waveRadius1 = (now * 0.035) % 48;
  const waveAlpha1 = Math.max(0, 1 - waveRadius1 / 48) * (isEnraged ? 0.35 : 0.2);
  ctx.strokeStyle = `rgba(168, 85, 247, ${waveAlpha1})`;
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.arc(x, cy + 10, waveRadius1, 0, Math.PI * 2);
  ctx.stroke();

  if (isEnraged) {
    const waveRadius2 = ((now * 0.035) + 24) % 48;
    const waveAlpha2 = Math.max(0, 1 - waveRadius2 / 48) * 0.3;
    ctx.strokeStyle = `rgba(253, 224, 71, ${waveAlpha2})`;
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(x, cy + 10, waveRadius2, 0, Math.PI * 2);
    ctx.stroke();
  }

  // Choral Halo with sacred ray spokes behind head
  ctx.save();
  const haloPulse = Math.sin(now * 0.004) * 2;
  const haloR = (isEnraged ? 18 : 14) + haloPulse;
  ctx.strokeStyle = isEnraged ? '#FDE047' : '#DDD6FE';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(x, cy - 24, haloR, 0, Math.PI * 2);
  ctx.stroke();

  // Halo sunburst ray teeth
  const rays = isEnraged ? 12 : 8;
  const rot = now * 0.001;
  ctx.fillStyle = isEnraged ? '#FCD34D' : '#C4B5FD';
  for (let i = 0; i < rays; i++) {
    const ang = rot + (i * Math.PI * 2) / rays;
    const rx = x + Math.cos(ang) * (haloR + 3);
    const ry = cy - 24 + Math.sin(ang) * (haloR + 3);
    ctx.fillRect(Math.round(rx) - 1, Math.round(ry) - 1, 2, 2);
  }
  ctx.restore();

  // Spectral translucent backing aura
  const auraGrad = ctx.createRadialGradient(x, cy + 4, 6, x, cy + 4, 30);
  auraGrad.addColorStop(0, isEnraged ? 'rgba(234, 179, 8, 0.28)' : 'rgba(124, 58, 237, 0.28)');
  auraGrad.addColorStop(1, 'rgba(15, 23, 42, 0)');
  ctx.fillStyle = auraGrad;
  ctx.beginPath();
  ctx.arc(x, cy + 4, 30, 0, Math.PI * 2);
  ctx.fill();

  // Liturgical Robes - Deep Midnight Violet Outer Mantle
  ctx.fillStyle = '#2E1065';
  ctx.fillRect(x - 14, cy - 14, 28, 32);

  // Layered Amethyst Inner Vestments
  ctx.fillStyle = '#6D28D9';
  ctx.fillRect(x - 11, cy - 10, 22, 28);
  ctx.fillStyle = '#7C3AED';
  ctx.fillRect(x - 7, cy - 8, 14, 26);

  // Frayed Tattered Bottom Hem
  for (let t = 0; t < 6; t++) {
    const sway = Math.sin(now * 0.004 + t * 0.8) * 1.5;
    const h = 5 + (t % 3) * 3;
    ctx.fillStyle = t % 2 === 0 ? '#581C87' : '#4C1D95';
    ctx.fillRect(x - 13 + t * 4.5, cy + 18, 4, h + sway);
  }

  // Silver Liturgical Stole with Golden Cross Embroidery
  ctx.fillStyle = '#EDE9FE';
  ctx.fillRect(x - 9, cy - 14, 4, 28);
  ctx.fillRect(x + 5, cy - 14, 4, 28);
  ctx.fillStyle = '#F59E0B';
  ctx.fillRect(x - 8, cy - 6, 2, 6);
  ctx.fillRect(x - 9, cy - 4, 4, 2);
  ctx.fillRect(x + 6, cy - 6, 2, 6);
  ctx.fillRect(x + 5, cy - 4, 4, 2);

  // Pectoral Silver Cross
  ctx.fillStyle = '#CBD5E1';
  ctx.fillRect(x - 1, cy - 2, 2, 7);
  ctx.fillRect(x - 3, cy, 6, 2);

  // Pale Ethereal Visage & Head
  ctx.fillStyle = '#F5F3FF';
  ctx.fillRect(x - 5, cy - 24, 10, 10);
  // Hood / Cowl drape
  ctx.fillStyle = '#4C1D95';
  ctx.fillRect(x - 7, cy - 26, 14, 4);
  ctx.fillRect(x - 7, cy - 24, 2, 10);
  ctx.fillRect(x + 5, cy - 24, 2, 10);

  // Mournful Glowing Violet Eyes
  ctx.fillStyle = isEnraged ? '#FEF08A' : '#DDD6FE';
  ctx.fillRect(x - 3, cy - 20, 2, 2);
  ctx.fillRect(x + 1, cy - 20, 2, 2);

  // Left Hand: Silver Conductor's Tuning Fork / Choral Staff
  ctx.fillStyle = '#CBD5E1';
  ctx.fillRect(x - 18, cy - 16, 2, 24);
  ctx.fillStyle = '#38BDF8';
  ctx.fillRect(x - 20, cy - 20, 2, 6);
  ctx.fillRect(x - 16, cy - 20, 2, 6);
  ctx.fillRect(x - 19, cy - 16, 4, 2);

  // Right Side: Floating Sacred Hymnal Grimoire
  const bookY = cy - 8 + Math.sin(now * 0.005) * 5;
  const bookX = x + 16;
  // Leather binding
  ctx.fillStyle = '#78350F';
  ctx.fillRect(bookX - 1, bookY - 1, 14, 12);
  // Open aged parchment pages
  ctx.fillStyle = '#FEF3C7';
  ctx.fillRect(bookX, bookY, 6, 10);
  ctx.fillRect(bookX + 6, bookY, 6, 10);
  // Gold script notation
  ctx.fillStyle = '#B45309';
  ctx.fillRect(bookX + 1, bookY + 2, 4, 1);
  ctx.fillRect(bookX + 1, bookY + 4, 4, 1);
  ctx.fillRect(bookX + 1, bookY + 6, 4, 1);
  ctx.fillRect(bookX + 7, bookY + 2, 4, 1);
  ctx.fillRect(bookX + 7, bookY + 4, 4, 1);
  ctx.fillRect(bookX + 7, bookY + 6, 4, 1);

  // Drifting Golden Musical Notation Motes
  for (let s = 0; s < 3; s++) {
    const noteT = (now * 0.0018 + s * 0.33) % 1;
    const nx = bookX + 6 + Math.sin(now * 0.006 + s) * 6;
    const ny = bookY - noteT * 26;
    ctx.fillStyle = s % 2 === 0 ? '#FCD34D' : '#DDD6FE';
    ctx.fillRect(Math.round(nx), Math.round(ny), 2, 2);
  }
}

export function drawZadkielSprite(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  now: number,
  isEnraged = false
): void {
  const walkBob = Math.sin(now * 0.004) * 2;
  const cy = y - 12 + walkBob;

  // Ground Ash & Burning Embers Emitter
  for (let e = 0; e < 4; e++) {
    const emberT = (now * 0.0015 + e * 0.25) % 1;
    const ex = x - 20 + ((e * 17) % 40) + Math.sin(now * 0.005 + e) * 4;
    const ey = cy + 24 - emberT * 20;
    ctx.fillStyle = e % 2 === 0 ? 'rgba(148, 163, 184, 0.45)' : isEnraged ? '#EF4444' : '#F97316';
    ctx.fillRect(Math.round(ex), Math.round(ey), 2, 2);
  }

  // Ashen Bastion Ground Ring
  ctx.save();
  const ringA = isEnraged ? 0.35 : 0.2;
  ctx.strokeStyle = `rgba(217, 170, 82, ${ringA})`;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(x, cy + 18, 26, 0, Math.PI * 2);
  ctx.stroke();
  ctx.restore();

  // Torso Chassis & Weathered Steel Cuirass
  ctx.fillStyle = '#1E293B';
  ctx.fillRect(x - 14, cy - 14, 28, 28);
  ctx.fillStyle = '#334155';
  ctx.fillRect(x - 12, cy - 12, 24, 24);

  // Antique Bronze & Gold Filigree Inlay
  ctx.fillStyle = '#D9AA52';
  ctx.fillRect(x - 8, cy - 10, 16, 20);
  ctx.fillStyle = '#B45309';
  ctx.fillRect(x - 6, cy - 8, 12, 16);
  ctx.fillStyle = isEnraged ? '#FEF08A' : '#F59E0B';
  ctx.fillRect(x - 2, cy - 4, 4, 8); // Cenotaph Core Sigil

  // Heavy Spiked Fortress Pauldrons
  ctx.fillStyle = '#475569';
  ctx.fillRect(x - 20, cy - 16, 8, 12);
  ctx.fillRect(x + 12, cy - 16, 8, 12);
  ctx.fillStyle = '#D9AA52';
  ctx.fillRect(x - 22, cy - 18, 4, 4); // Pauldron upward spikes
  ctx.fillRect(x + 18, cy - 18, 4, 4);

  // Armored Greaves & Sabatons
  ctx.fillStyle = '#1E293B';
  ctx.fillRect(x - 10, cy + 14, 8, 12);
  ctx.fillRect(x + 2, cy + 14, 8, 12);
  ctx.fillStyle = '#475569';
  ctx.fillRect(x - 11, cy + 22, 10, 5);
  ctx.fillRect(x + 1, cy + 22, 10, 5);

  // Great-Helm & Glowing Furnace Visor
  ctx.fillStyle = '#334155';
  ctx.fillRect(x - 8, cy - 26, 16, 14);
  // Gold Helm Crown Ridge
  ctx.fillStyle = '#D9AA52';
  ctx.fillRect(x - 2, cy - 30, 4, 6);
  // Horizontal Visor Slit
  ctx.fillStyle = '#0F172A';
  ctx.fillRect(x - 6, cy - 21, 12, 5);
  // Glowing Molten Amber Furnace Visor Slit
  ctx.fillStyle = isEnraged ? '#FEF08A' : '#F59E0B';
  ctx.fillRect(x - 4, cy - 20, 8, 3);

  // Left Arm: Reliquary Greatshield with Sacred Urn Crest
  const shieldX = x - 24;
  const shieldY = cy - 12;
  // Shield rim & backing
  ctx.fillStyle = '#78350F';
  ctx.fillRect(shieldX - 2, shieldY - 2, 14, 30);
  ctx.fillStyle = '#D9AA52';
  ctx.fillRect(shieldX, shieldY, 10, 26);
  ctx.fillStyle = '#475569';
  ctx.fillRect(shieldX + 2, shieldY + 2, 6, 22);
  // Embossed Reliquary Urn Emblem
  ctx.fillStyle = '#FDE68A';
  ctx.fillRect(shieldX + 3, shieldY + 6, 4, 3); // urn lid
  ctx.fillRect(shieldX + 2, shieldY + 9, 6, 7); // urn body
  ctx.fillRect(shieldX + 3, shieldY + 16, 4, 3); // urn pedestal
  // Pulsing Amber Ward Gem
  ctx.fillStyle = isEnraged ? '#FFFFFF' : '#F59E0B';
  ctx.fillRect(shieldX + 4, shieldY + 11, 2, 3);

  // Right Arm: Swinging Smoking Ashen Censer Flail
  const censerAngle = Math.sin(now * 0.006) * 0.45;
  const chainLen = 22;
  const chainStartX = x + 12;
  const chainStartY = cy - 4;
  const censerX = chainStartX + Math.sin(censerAngle) * chainLen + 6;
  const censerY = chainStartY + Math.cos(censerAngle) * chainLen;

  // Flail Iron Chain
  ctx.strokeStyle = '#64748B';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(chainStartX, chainStartY);
  ctx.lineTo(censerX, censerY);
  ctx.stroke();

  // Ornate Bronze Censer Vessel
  ctx.fillStyle = '#B45309';
  ctx.fillRect(censerX - 5, censerY - 2, 10, 10);
  ctx.fillStyle = '#D9AA52';
  ctx.fillRect(censerX - 3, censerY - 4, 6, 3); // censer top cap
  // Perforated Vent Cross
  ctx.fillStyle = isEnraged ? '#FEF08A' : '#EA580C';
  ctx.fillRect(censerX - 1, censerY, 2, 6);
  ctx.fillRect(censerX - 3, censerY + 2, 6, 2);

  // Incense Smoke Puffs rising from censer
  for (let s = 0; s < 3; s++) {
    const smokeT = (now * 0.002 + s * 0.33) % 1;
    const sx = censerX + Math.sin(now * 0.007 + s) * 6;
    const sy = censerY - smokeT * 24;
    ctx.fillStyle = `rgba(148, 163, 184, ${Math.max(0, 0.4 - smokeT * 0.4)})`;
    ctx.fillRect(Math.round(sx) - 2, Math.round(sy) - 2, 4, 4);
  }
}

export function drawSarielSprite(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  now: number,
  isEnraged = false
): void {
  const floatBob = Math.sin(now * 0.003) * 5;
  const cy = y - 12 + floatBob;

  // Occult Floor Void Sigil
  ctx.save();
  const sigilRot = now * 0.001;
  ctx.translate(x, cy + 22);
  ctx.rotate(sigilRot);
  ctx.strokeStyle = isEnraged ? 'rgba(232, 121, 249, 0.4)' : 'rgba(192, 132, 252, 0.22)';
  ctx.lineWidth = 1.5;
  ctx.strokeRect(-18, -18, 36, 36);
  ctx.rotate(Math.PI / 4);
  ctx.strokeRect(-18, -18, 36, 36);
  ctx.restore();

  // Floating Orbiting Corrupted Scripture Pages (Elliptical 3D depth)
  const numPages = isEnraged ? 5 : 3;
  const orbitSpeed = isEnraged ? 0.005 : 0.0032;

  // Draw back pages (behind Sariel)
  for (let i = 0; i < numPages; i++) {
    const ang = now * orbitSpeed + (i * Math.PI * 2) / numPages;
    const depth = Math.sin(ang);
    if (depth < 0) {
      const px = x + Math.cos(ang) * 26;
      const py = cy - 4 + Math.sin(ang) * 10;
      ctx.fillStyle = 'rgba(250, 245, 255, 0.65)';
      ctx.fillRect(Math.round(px) - 3, Math.round(py) - 4, 6, 8);
      ctx.fillStyle = '#7E22CE';
      ctx.fillRect(Math.round(px) - 2, Math.round(py) - 2, 4, 1);
      ctx.fillRect(Math.round(px) - 2, Math.round(py), 4, 1);
      ctx.fillRect(Math.round(px) - 2, Math.round(py) + 2, 4, 1);
    }
  }

  // Deep Midnight Plum & Corrupted Robes
  ctx.fillStyle = '#1E1B4B';
  ctx.fillRect(x - 12, cy - 12, 24, 30);
  ctx.fillStyle = '#3B0764';
  ctx.fillRect(x - 10, cy - 10, 20, 26);
  ctx.fillStyle = '#581C87';
  ctx.fillRect(x - 7, cy - 8, 14, 22);

  // Void Trim & Tattered Hems
  ctx.fillStyle = isEnraged ? '#F43F5E' : '#C026D3';
  ctx.fillRect(x - 10, cy + 14, 20, 3);
  for (let f = 0; f < 4; f++) {
    const fSway = Math.sin(now * 0.005 + f) * 2;
    ctx.fillRect(x - 9 + f * 5, cy + 17, 3, 4 + fSway);
  }

  // Lavender Silk Mantle & Stole
  ctx.fillStyle = '#7E22CE';
  ctx.fillRect(x - 8, cy - 12, 16, 8);
  ctx.fillStyle = '#C084FC';
  ctx.fillRect(x - 6, cy - 12, 12, 6);

  // Head, Veiled Gaze & Crescent Diadem
  ctx.fillStyle = '#F5D0FE';
  ctx.fillRect(x - 5, cy - 22, 10, 10);
  // Translucent Silk Veil
  ctx.fillStyle = 'rgba(192, 132, 252, 0.75)';
  ctx.fillRect(x - 6, cy - 19, 12, 8);
  // Occult Magenta Eyes glowing through veil
  ctx.fillStyle = isEnraged ? '#FEF08A' : '#E11D48';
  ctx.fillRect(x - 3, cy - 18, 2, 2);
  ctx.fillRect(x + 1, cy - 18, 2, 2);

  // Crescent Void Diadem
  ctx.fillStyle = '#A855F7';
  ctx.fillRect(x - 7, cy - 25, 14, 3);
  ctx.fillRect(x - 4, cy - 27, 8, 2);

  // Left Hand: Corrupted Grimoire with Purple Arcane Flame
  ctx.fillStyle = '#09090B';
  ctx.fillRect(x - 18, cy - 4, 10, 12);
  ctx.fillStyle = '#C026D3';
  ctx.fillRect(x - 16, cy - 2, 6, 8);
  // Floating void flame above grimoire
  const flameH = 3 + Math.sin(now * 0.01) * 2;
  ctx.fillStyle = isEnraged ? '#F43F5E' : '#E879F9';
  ctx.fillRect(x - 14, cy - 8 - flameH, 3, flameH);

  // Right Hand: Bone & Obsidian Scepter
  ctx.fillStyle = '#475569';
  ctx.fillRect(x + 13, cy - 16, 2, 24);
  // Floating Void Pearl at scepter tip
  ctx.fillStyle = isEnraged ? '#FDE047' : '#9333EA';
  ctx.fillRect(x + 11, cy - 20, 6, 5);
  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect(x + 13, cy - 19, 2, 2);

  // Draw front pages (in front of Sariel)
  for (let i = 0; i < numPages; i++) {
    const ang = now * orbitSpeed + (i * Math.PI * 2) / numPages;
    const depth = Math.sin(ang);
    if (depth >= 0) {
      const px = x + Math.cos(ang) * 26;
      const py = cy - 4 + Math.sin(ang) * 10;
      ctx.fillStyle = '#FAF5FF';
      ctx.fillRect(Math.round(px) - 3, Math.round(py) - 4, 6, 8);
      ctx.fillStyle = '#7E22CE';
      ctx.fillRect(Math.round(px) - 2, Math.round(py) - 2, 4, 1);
      ctx.fillRect(Math.round(px) - 2, Math.round(py), 4, 1);
      ctx.fillRect(Math.round(px) - 2, Math.round(py) + 2, 4, 1);
      ctx.strokeStyle = isEnraged ? '#F43F5E' : '#C084FC';
      ctx.lineWidth = 1;
      ctx.strokeRect(Math.round(px) - 3, Math.round(py) - 4, 6, 8);
    }
  }
}

export function drawSeraphelSprite(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  now: number,
  isEnraged = false
): void {
  const floatBob = Math.sin(now * 0.004) * 4;
  const cy = y - 12 + floatBob;
  const wingFlap = Math.sin(now * 0.005) * 5;

  // Starlight Falling Sparks
  for (let s = 0; s < 4; s++) {
    const starT = (now * 0.0016 + s * 0.25) % 1;
    const sx = x - 24 + ((s * 19) % 48) + Math.sin(now * 0.006 + s) * 5;
    const sy = cy - 10 + starT * 40;
    ctx.fillStyle = s % 2 === 0 ? '#FFFFFF' : '#FEF08A';
    ctx.fillRect(Math.round(sx), Math.round(sy), 2, 2);
  }

  // 12-Nail Sacred Crown Halo behind head
  ctx.save();
  const haloR = isEnraged ? 22 : 17;
  ctx.strokeStyle = isEnraged ? '#FACC15' : '#FEF08A';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(x, cy - 24, haloR, 0, Math.PI * 2);
  ctx.stroke();

  // 12 Sacred Seal Nails
  const nailCount = 12;
  const nailRot = now * 0.0008;
  ctx.fillStyle = '#F59E0B';
  for (let n = 0; n < nailCount; n++) {
    const ang = nailRot + (n * Math.PI * 2) / nailCount;
    const nx = x + Math.cos(ang) * (haloR + 4);
    const ny = cy - 24 + Math.sin(ang) * (haloR + 4);
    ctx.fillRect(Math.round(nx) - 1, Math.round(ny) - 1, 3, 3);
  }
  ctx.restore();

  // SIX ARTICULATED FEATHERED WINGS (3 PAIRS: UPPER, MIDDLE, LOWER)
  // 1. Upper Grand Wings (Sweeping wide & high)
  const drawWingPair = (
    spanX: number,
    baseY: number,
    tipY: number,
    color1: string,
    color2: string
  ) => {
    // Left Wing
    ctx.fillStyle = color1;
    ctx.beginPath();
    ctx.moveTo(x - 6, cy + baseY);
    ctx.lineTo(x - spanX, cy + tipY + wingFlap);
    ctx.lineTo(x - (spanX - 6), cy + tipY + wingFlap + 8);
    ctx.lineTo(x - 6, cy + baseY + 10);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = color2;
    ctx.beginPath();
    ctx.moveTo(x - 4, cy + baseY + 2);
    ctx.lineTo(x - (spanX - 8), cy + tipY + wingFlap + 4);
    ctx.lineTo(x - 4, cy + baseY + 6);
    ctx.closePath();
    ctx.fill();

    // Right Wing
    ctx.fillStyle = color1;
    ctx.beginPath();
    ctx.moveTo(x + 6, cy + baseY);
    ctx.lineTo(x + spanX, cy + tipY + wingFlap);
    ctx.lineTo(x + (spanX - 6), cy + tipY + wingFlap + 8);
    ctx.lineTo(x + 6, cy + baseY + 10);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = color2;
    ctx.beginPath();
    ctx.moveTo(x + 4, cy + baseY + 2);
    ctx.lineTo(x + (spanX - 8), cy + tipY + wingFlap + 4);
    ctx.lineTo(x + 4, cy + baseY + 6);
    ctx.closePath();
    ctx.fill();
  };

  // Draw 3 layers of Seraph wings
  drawWingPair(32, -14, -26, '#FEF08A', '#FFFFFF'); // Upper wings
  drawWingPair(26, -8, -12, '#FDE047', '#FEF9C3'); // Middle wings
  drawWingPair(20, -2, 4, '#F59E0B', '#FDE68A');   // Lower wings

  // High-Seraph Pristine Ivory & Polished Solar Gold Armor
  ctx.fillStyle = '#FFFBEB';
  ctx.fillRect(x - 10, cy - 14, 20, 26);
  ctx.fillStyle = '#F59E0B';
  ctx.fillRect(x - 8, cy - 12, 16, 22);

  // Eight-Pointed Solar Star Emblem on Chest
  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect(x - 3, cy - 6, 6, 6);
  ctx.fillStyle = '#FEF08A';
  ctx.fillRect(x - 1, cy - 9, 2, 12);
  ctx.fillRect(x - 4, cy - 4, 8, 2);

  // Celestial Sash & Pristine Tabard
  ctx.fillStyle = '#FDE047';
  ctx.fillRect(x - 5, cy + 8, 10, 14);
  ctx.fillStyle = '#D97706';
  ctx.fillRect(x - 3, cy + 10, 6, 12);

  // Radiant Celestial Visage & Blinding Eyes
  ctx.fillStyle = '#FFFBEB';
  ctx.fillRect(x - 6, cy - 24, 12, 11);
  // Pure Starlight White Eyes
  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect(x - 4, cy - 20, 3, 3);
  ctx.fillRect(x + 1, cy - 20, 3, 3);
  // Gold Circlet
  ctx.fillStyle = '#F59E0B';
  ctx.fillRect(x - 7, cy - 25, 14, 3);

  // Right Hand: Colossal Celestial Greatlance
  const lanceX = x + 16;
  const lanceStartY = cy - 36;
  const lanceEndY = cy + 26;
  // Fluted Gold Shaft
  ctx.fillStyle = '#B45309';
  ctx.fillRect(lanceX, lanceStartY + 14, 3, lanceEndY - lanceStartY - 14);
  // Massive Diamond Spearhead
  ctx.fillStyle = '#FEF08A';
  ctx.beginPath();
  ctx.moveTo(lanceX + 1.5, lanceStartY);
  ctx.lineTo(lanceX + 7, lanceStartY + 16);
  ctx.lineTo(lanceX + 1.5, lanceStartY + 20);
  ctx.lineTo(lanceX - 4, lanceStartY + 16);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect(lanceX, lanceStartY + 4, 3, 12);

  // Divine Electricity Arcs on Lancehead
  const sparkY = lanceStartY + ((now * 0.05) % 16);
  ctx.fillStyle = isEnraged ? '#FDE047' : '#67E8F9';
  ctx.fillRect(lanceX - 2, Math.round(sparkY), 7, 2);
}

export function drawOriphielSprite(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  now: number,
  isEnraged = false
): void {
  const walkBob = Math.sin(now * 0.0035) * 2;
  const cy = y - 14 + walkBob;

  // Blue Warding Sanctuary Ground Ring
  ctx.save();
  const auraR = isEnraged ? 36 : 28;
  const auraA = isEnraged ? 0.35 : 0.2;
  ctx.strokeStyle = `rgba(56, 189, 248, ${auraA})`;
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.arc(x, cy + 20, auraR, 0, Math.PI * 2);
  ctx.stroke();

  // Rotating Sanctuary Ley Runes along perimeter
  const runeCount = 6;
  const runeRot = now * 0.0006;
  ctx.fillStyle = '#38BDF8';
  for (let r = 0; r < runeCount; r++) {
    const ang = runeRot + (r * Math.PI * 2) / runeCount;
    const rx = x + Math.cos(ang) * auraR;
    const ry = cy + 20 + Math.sin(ang) * (auraR * 0.6);
    ctx.fillRect(Math.round(rx) - 1, Math.round(ry) - 1, 3, 3);
  }
  ctx.restore();

  // Twin Floating Bastion Aegis Crests (Flanking Shields)
  if (!isEnraged) {
    const drawBastionCrest = (cx: number, cyOffset: number) => {
      const shieldY = cy + cyOffset;
      ctx.fillStyle = 'rgba(2, 132, 199, 0.4)';
      ctx.beginPath();
      ctx.moveTo(cx, shieldY - 14);
      ctx.lineTo(cx + 10, shieldY - 7);
      ctx.lineTo(cx + 10, shieldY + 7);
      ctx.lineTo(cx, shieldY + 14);
      ctx.lineTo(cx - 10, shieldY + 7);
      ctx.lineTo(cx - 10, shieldY - 7);
      ctx.closePath();
      ctx.fill();

      ctx.strokeStyle = '#38BDF8';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Inner Runic Glyph
      ctx.fillStyle = '#E0F2FE';
      ctx.fillRect(cx - 2, shieldY - 4, 4, 8);
      ctx.fillRect(cx - 5, shieldY - 1, 10, 2);
    };

    const crestBob1 = Math.sin(now * 0.004) * 3;
    const crestBob2 = Math.sin(now * 0.004 + Math.PI) * 3;
    drawBastionCrest(x - 30, -4 + crestBob1);
    drawBastionCrest(x + 30, -4 + crestBob2);
  }

  // Royal Sovereign Indigo Cape draped behind
  ctx.fillStyle = '#1E1B4B';
  ctx.fillRect(x - 20, cy - 14, 40, 36);
  ctx.fillStyle = '#312E81';
  ctx.fillRect(x - 17, cy - 12, 34, 32);

  // Masterwork Warden Plate Chassis
  ctx.fillStyle = '#0F172A';
  ctx.fillRect(x - 16, cy - 16, 32, 32);
  ctx.fillStyle = '#1E293B';
  ctx.fillRect(x - 13, cy - 13, 26, 26);

  // Ancient Sanctuary Seal - Chestplate Engraving
  ctx.fillStyle = isEnraged ? '#FEF08A' : '#38BDF8';
  ctx.fillRect(x - 4, cy - 8, 8, 14);
  ctx.fillRect(x - 9, cy - 4, 18, 3);
  ctx.fillStyle = '#06B6D4';
  ctx.fillRect(x - 2, cy - 6, 4, 10);

  // Spiked Fortress Pauldrons with Fur Trim
  ctx.fillStyle = '#334155';
  ctx.fillRect(x - 24, cy - 18, 10, 14);
  ctx.fillRect(x + 14, cy - 18, 10, 14);
  ctx.fillStyle = '#E2E8F0'; // Ermine fur collar
  ctx.fillRect(x - 22, cy - 18, 8, 3);
  ctx.fillRect(x + 14, cy - 18, 8, 3);
  // Sapphire Warding Pauldron Studs
  ctx.fillStyle = '#38BDF8';
  ctx.fillRect(x - 20, cy - 14, 4, 4);
  ctx.fillRect(x + 16, cy - 14, 4, 4);

  // Heavy Armored Greaves
  ctx.fillStyle = '#0F172A';
  ctx.fillRect(x - 12, cy + 14, 10, 16);
  ctx.fillRect(x + 2, cy + 14, 10, 16);
  ctx.fillStyle = '#38BDF8';
  ctx.fillRect(x - 9, cy + 18, 4, 8);
  ctx.fillRect(x + 5, cy + 18, 4, 8);

  // Imperial Horned Crown-Helm
  ctx.fillStyle = '#1E293B';
  ctx.fillRect(x - 10, cy - 30, 20, 16);
  // Twin Upward Sovereign Horns
  ctx.fillStyle = '#38BDF8';
  ctx.fillRect(x - 14, cy - 36, 4, 12);
  ctx.fillRect(x - 12, cy - 40, 3, 6);
  ctx.fillRect(x + 10, cy - 36, 4, 12);
  ctx.fillRect(x + 9, cy - 40, 3, 6);

  // Dark Visor & Glowing Sapphire Visor Slits
  ctx.fillStyle = '#0F172A';
  ctx.fillRect(x - 7, cy - 24, 14, 6);
  ctx.fillStyle = isEnraged ? '#FEF08A' : '#38BDF8';
  ctx.fillRect(x - 5, cy - 23, 10, 3);
  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect(x - 4, cy - 22, 3, 1);
  ctx.fillRect(x + 1, cy - 22, 3, 1);

  // Colossal Two-Handed Runic Executioner Greatblade
  const bladeX = x + 20;
  const bladeStartY = cy - (isEnraged ? 50 : 38);
  const bladeEndY = cy + 24;
  const bladeLen = bladeEndY - bladeStartY;
  const bladeW = isEnraged ? 10 : 7;

  // Crossguard & Pommel
  ctx.fillStyle = '#D97706';
  ctx.fillRect(bladeX - 5, cy - 6, 14, 4);
  ctx.fillStyle = '#38BDF8';
  ctx.fillRect(bladeX, cy - 5, 4, 2);

  // Blade Body
  ctx.fillStyle = '#1E293B';
  ctx.fillRect(bladeX - Math.floor(bladeW / 2), bladeStartY, bladeW, bladeLen);

  // Glowing Cyan Fuller with Ancient Sanctuary Runes
  ctx.fillStyle = isEnraged ? '#FEF08A' : '#38BDF8';
  ctx.fillRect(bladeX - 1, bladeStartY + 4, 3, bladeLen - 8);
  // Razor Sharp Cutting Edge
  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect(bladeX + Math.floor(bladeW / 2) - 1, bladeStartY + 2, 1, bladeLen - 4);

  // If enraged, blade radiates oversized blazing beam blade aura
  if (isEnraged) {
    ctx.fillStyle = 'rgba(56, 189, 248, 0.35)';
    ctx.fillRect(bladeX - 7, bladeStartY - 6, 18, bladeLen + 10);
  }
}

/**
 * Humanoid boss sprite router for Floors 6-10
 * (Elyndor, Zadkiel, Sariel, Seraphel, Oriphiel)
 */
export function drawHumanoidBoss(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  bossName: string,
  now: number,
  en?: { hp?: number; maxHp?: number; enraged?: boolean; radius?: number; windupMs?: number }
): void {
  const isEnraged = en?.enraged || (en?.hp !== undefined && en?.maxHp !== undefined && en.hp / en.maxHp < 0.5);

  if (bossName.includes('Elyndor')) {
    drawElyndorSprite(ctx, x, y, now, isEnraged);
  } else if (bossName.includes('Zadkiel')) {
    drawZadkielSprite(ctx, x, y, now, isEnraged);
  } else if (bossName.includes('Sariel')) {
    drawSarielSprite(ctx, x, y, now, isEnraged);
  } else if (bossName.includes('Seraphel')) {
    drawSeraphelSprite(ctx, x, y, now, isEnraged);
  } else if (bossName.includes('Oriphiel')) {
    drawOriphielSprite(ctx, x, y, now, isEnraged);
  } else {
    // Graceful fallback for any custom named guardian
    drawOriphielSprite(ctx, x, y, now, isEnraged);
  }
}

