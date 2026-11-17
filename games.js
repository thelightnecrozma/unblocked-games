function makeCover(c1, c2, glow, iconSvg) {
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='480' height='270' viewBox='0 0 480 270'>
    <defs>
      <linearGradient id='g' x1='0' y1='0' x2='1' y2='1'>
        <stop offset='0%' stop-color='${c1}'/><stop offset='100%' stop-color='${c2}'/>
      </linearGradient>
      <radialGradient id='r' cx='50%' cy='50%' r='55%'>
        <stop offset='0%' stop-color='${glow}' stop-opacity='0.45'/>
        <stop offset='100%' stop-color='${glow}' stop-opacity='0'/>
      </radialGradient>
      <pattern id='p' width='24' height='24' patternUnits='userSpaceOnUse'>
        <circle cx='2' cy='2' r='1' fill='rgba(255,255,255,0.12)'/>
      </pattern>
    </defs>
    <rect width='480' height='270' fill='url(#g)'/>
    <rect width='480' height='270' fill='url(#p)'/>
    <circle cx='240' cy='135' r='135' fill='url(#r)'/>
    <g transform='translate(240,135)'>${iconSvg}</g>
  </svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

const UBG_BASE = "https://ub-g.github.io/embed/";

const GAMES = [
  {
    id: "slope",
    title: "Slope",
    category: "Driving",
    featured: true,
    trending: true,
    badge: "TOP PICK",
    desc: "Speed down a steep neon cyber-track, dodge red obstacles, and keep your balance as velocity ramps up.",
    cover: makeCover("#064e3b", "#0284c7", "#34d399", "<polygon points='-85,55 0,-55 85,55' fill='none' stroke='#34d399' stroke-width='8' stroke-linejoin='round'/><circle cx='0' cy='12' r='22' fill='#fbbf24'/>"),
    embedUrl: UBG_BASE + "slope.html",
    localPath: "embed/slope.html",
    controls: "Left / Right Arrow keys or A / D to steer."
  },
  {
    id: "retro-bowl",
    title: "Retro Bowl",
    category: "Sports",
    featured: true,
    trending: true,
    badge: "POPULAR",
    desc: "Manage your franchise, call offensive plays, and throw pinpoint passes to win the championship.",
    cover: makeCover("#78350f", "#b91c1c", "#fbbf24", "<ellipse cx='0' cy='0' rx='62' ry='36' fill='#92400e' stroke='#fef3c7' stroke-width='5'/><line x1='-22' y1='0' x2='22' y2='0' stroke='#fff' stroke-width='4'/><line x1='-11' y1='-9' x2='-11' y2='9' stroke='#fff' stroke-width='3'/><line x1='0' y1='-9' x2='0' y2='9' stroke='#fff' stroke-width='3'/><line x1='11' y1='-9' x2='11' y2='9' stroke='#fff' stroke-width='3'/>"),
    embedUrl: UBG_BASE + "retro-bowl.html",
    localPath: "embed/retro-bowl.html",
    controls: "Click and drag backward to aim passes; click to dive or juke."
  },
  {
    id: "drive-mad",
    title: "Drive Mad",
    category: "Driving",
    featured: true,
    trending: true,
    badge: "HOT",
    desc: "Control oversized monster trucks across collapsing bridges, loops, and wild stunt ramps without flipping.",
    cover: makeCover("#9a3412", "#7f1d1d", "#fb923c", "<rect x='-62' y='-26' width='124' height='36' rx='10' fill='#facc15'/><circle cx='-36' cy='24' r='22' fill='#0f172a' stroke='#94a3b8' stroke-width='6'/><circle cx='36' cy='24' r='22' fill='#0f172a' stroke='#94a3b8' stroke-width='6'/>"),
    embedUrl: UBG_BASE + "drive-mad.html",
    localPath: "embed/drive-mad.html",
    controls: "W / Up Arrow / D to accelerate; S / Down Arrow / A to brake and tilt."
  },
  {
    id: "moto-x3m",
    title: "Moto X3M",
    category: "Driving",
    trending: true,
    badge: "STUNTS",
    desc: "Race dirt bikes through explosive obstacle courses and pull off mid-air flips to shave off seconds.",
    cover: makeCover("#991b1b", "#31102f", "#f43f5e", "<circle cx='-42' cy='22' r='20' fill='none' stroke='#f8fafc' stroke-width='5'/><circle cx='42' cy='22' r='20' fill='none' stroke='#f8fafc' stroke-width='5'/><path d='M-42,22 L-6,-18 L28,-6 L42,22' fill='none' stroke='#fb923c' stroke-width='7' stroke-linecap='round'/>"),
    embedUrl: UBG_BASE + "moto-x3m.html",
    localPath: "embed/moto-x3m.html",
    controls: "Up Arrow to accelerate, Down to brake, Left / Right to flip."
  },
  {
    id: "basketball-stars",
    title: "Basketball Stars",
    category: "Sports",
    trending: true,
    badge: "2 PLAYER",
    desc: "Dunk, steal, and unleash supershots in fast-paced 1v1 and 2v2 streetball matchups.",
    cover: makeCover("#b45309", "#4c1d95", "#f97316", "<circle cx='0' cy='0' r='44' fill='#f97316' stroke='#fff' stroke-width='4'/><path d='M-44,0 L44,0 M0,-44 L0,44' stroke='#fff' stroke-width='3'/>"),
    embedUrl: UBG_BASE + "basketball-stars.html",
    localPath: "embed/basketball-stars.html",
    controls: "WASD / Arrows to move, X / L to shoot or steal, Z / K for supershot."
  },
  {
    id: "subway-surfers",
    title: "Subway Surfers",
    category: "Action",
    trending: true,
    badge: "HIT",
    desc: "Dash along subway tracks, leap over oncoming trains, and collect coins on hoverboards.",
    cover: makeCover("#1d4ed8", "#6d28d9", "#38bdf8", "<rect x='-48' y='-36' width='96' height='68' rx='12' fill='#38bdf8'/><rect x='-32' y='-20' width='64' height='26' rx='5' fill='#0f172a'/><circle cx='-24' cy='20' r='7' fill='#facc15'/><circle cx='24' cy='20' r='7' fill='#facc15'/>"),
    embedUrl: UBG_BASE + "subway-surfers.html",
    localPath: "embed/subway-surfers.html",
    controls: "Arrow Keys to switch lanes, jump, and roll."
  },
  {
    id: "geometry-dash",
    title: "Geometry Dash",
    category: "Arcade",
    trending: true,
    badge: "RHYTHM",
    desc: "Jump and fly your way through danger in this rhythm-based action platformer.",
    cover: makeCover("#0284c7", "#4f46e5", "#38bdf8", "<rect x='-38' y='-38' width='76' height='76' rx='10' fill='#facc15' stroke='#0f172a' stroke-width='5'/><rect x='-20' y='-16' width='12' height='12' fill='#0f172a'/><rect x='8' y='-16' width='12' height='12' fill='#0f172a'/><rect x='-20' y='10' width='40' height='8' fill='#0f172a'/>"),
    embedUrl: UBG_BASE + "geometry-dash.html",
    localPath: "embed/geometry-dash.html",
    controls: "Spacebar, Up Arrow, or Click/Tap to jump."
  },
  {
    id: "smash-karts",
    title: "Smash Karts",
    category: "Driving",
    trending: true,
    badge: "ARENA",
    desc: "Battle other karts in 3D arenas, pick up mystery weapon boxes, and blast your rivals.",
    cover: makeCover("#dc2626", "#1e3a8a", "#f87171", "<rect x='-54' y='-20' width='108' height='32' rx='10' fill='#38bdf8'/><circle cx='-32' cy='20' r='18' fill='#0f172a' stroke='#f8fafc' stroke-width='4'/><circle cx='32' cy='20' r='18' fill='#0f172a' stroke='#f8fafc' stroke-width='4'/>"),
    embedUrl: UBG_BASE + "smash-karts.html",
    localPath: "embed/smash-karts.html",
    controls: "WASD / Arrow keys to drive, Spacebar to fire weapons."
  },
  {
    id: "2048",
    title: "2048 Prism",
    category: "Puzzle",
    badge: "UNBLOCKED",
    desc: "Slide and merge matching neon number tiles to forge the 2048 prism block.",
    cover: makeCover("#4338ca", "#7e22ce", "#a855f7", "<rect x='-48' y='-48' width='42' height='42' rx='9' fill='#38bdf8'/><rect x='6' y='-48' width='42' height='42' rx='9' fill='#f43f5e'/><rect x='-48' y='6' width='42' height='42' rx='9' fill='#fbbf24'/><rect x='6' y='6' width='42' height='42' rx='9' fill='#34d399'/>"),
    embedUrl: UBG_BASE + "2048.html",
    localPath: "games/2048/index.html",
    controls: "Arrow Keys or WASD to slide tiles."
  },
  {
    id: "neon-snake",
    title: "Cyber Snake",
    category: "Arcade",
    badge: "UNBLOCKED",
    desc: "Guide your glowing serpent to collect energy orbs while avoiding walls and your own tail.",
    cover: makeCover("#065f46", "#1e1b4b", "#10b981", "<path d='M-56,18 L-16,18 L-16,-18 L28,-18 L28,12' fill='none' stroke='#34d399' stroke-width='16' stroke-linecap='round' stroke-linejoin='round'/><circle cx='56' cy='12' r='11' fill='#f43f5e'/>"),
    embedUrl: "",
    localPath: "games/neon-snake/index.html",
    controls: "Arrow Keys or WASD to steer."
  },
  {
    id: "cyber-breakout",
    title: "Neon Breakout",
    category: "Arcade",
    badge: "UNBLOCKED",
    desc: "Smash through layers of neon bricks with a high-speed energy ball.",
    cover: makeCover("#9d174d", "#4c1d95", "#ec4899", "<rect x='-62' y='-42' width='36' height='15' rx='4' fill='#38bdf8'/><rect x='-18' y='-42' width='36' height='15' rx='4' fill='#fbbf24'/><rect x='26' y='-42' width='36' height='15' rx='4' fill='#34d399'/><circle cx='0' cy='4' r='9' fill='#fff'/><rect x='-40' y='34' width='80' height='11' rx='5' fill='#a78bfa'/>"),
    embedUrl: "",
    localPath: "games/cyber-breakout/index.html",
    controls: "Move your mouse or finger across the arena to control the paddle."
  },
  {
    id: "sky-flappy",
    title: "Sky Dash",
    category: "Action",
    badge: "UNBLOCKED",
    desc: "Boost through narrow cyber gates and beat your high score.",
    cover: makeCover("#0369a1", "#312e81", "#38bdf8", "<circle cx='-10' cy='0' r='26' fill='#fbbf24'/><polygon points='14,-9 36,0 14,9' fill='#f97316'/><circle cx='-2' cy='-7' r='4' fill='#0f172a'/>"),
    embedUrl: "",
    localPath: "games/sky-flappy/index.html",
    controls: "Click, Tap, or press Spacebar to boost."
  },
  {
    id: "vex-7",
    title: "Vex 7",
    category: "Action",
    badge: "PARKOUR",
    desc: "Leap across deadly traps, wall-jump vertical shafts, and survive intense stickman parkour acts.",
    cover: makeCover("#1e293b", "#be123c", "#f43f5e", "<circle cx='0' cy='-32' r='14' fill='#f8fafc'/><path d='M0,-18 L0,16 M-24,-6 L24,-6 M0,16 L-18,46 M0,16 L18,46' stroke='#f8fafc' stroke-width='6' stroke-linecap='round'/>"),
    embedUrl: UBG_BASE + "vex-7.html",
    localPath: "embed/vex-7.html",
    controls: "WASD or Arrow Keys to run, jump, slide, and climb."
  },
  {
    id: "tunnel-rush",
    title: "Tunnel Rush",
    category: "Driving",
    badge: "SPEED",
    desc: "Barrel through a kaleidoscope tunnel at supersonic speed and dodge rotating barriers.",
    cover: makeCover("#4c1d95", "#0f766e", "#2dd4bf", "<circle cx='0' cy='0' r='52' fill='none' stroke='#a78bfa' stroke-width='6'/><circle cx='0' cy='0' r='32' fill='none' stroke='#38bdf8' stroke-width='5'/><circle cx='0' cy='0' r='14' fill='none' stroke='#f43f5e' stroke-width='4'/>"),
    embedUrl: UBG_BASE + "tunnel-rush.html",
    localPath: "embed/tunnel-rush.html",
    controls: "Left / Right Arrow keys or A / D to rotate around the tunnel."
  },
  {
    id: "paper-io-2",
    title: "Paper.io 2",
    category: "Action",
    badge: "MULTIPLAYER",
    desc: "Capture territory by drawing loops and slice across rival trails to eliminate them.",
    cover: makeCover("#0d9488", "#1d4ed8", "#34d399", "<rect x='-45' y='-45' width='90' height='90' rx='14' fill='#34d399' opacity='0.35'/><rect x='-22' y='-22' width='44' height='44' rx='8' fill='#34d399'/>"),
    embedUrl: UBG_BASE + "paper-io-2.html",
    localPath: "embed/paper-io-2.html",
    controls: "Mouse or Arrow Keys / WASD to steer your block."
  },
  {
    id: "drift-boss",
    title: "Drift Boss",
    category: "Driving",
    badge: "1-BUTTON",
    desc: "Time your drifts around sharp floating corners without falling into the abyss.",
    cover: makeCover("#b45309", "#312e81", "#fbbf24", "<path d='M-65,35 L-10,35 L-10,-25 L55,-25' fill='none' stroke='#94a3b8' stroke-width='28' stroke-linecap='round'/><rect x='-22' y='-8' width='26' height='16' rx='4' fill='#f43f5e'/>"),
    embedUrl: UBG_BASE + "drift-boss.html",
    localPath: "embed/drift-boss.html",
    controls: "Hold Click, Spacebar, or Touch to drift right; release to straighten."
  },
  {
    id: "tomb-of-the-mask",
    title: "Tomb of the Mask",
    category: "Arcade",
    badge: "RETRO",
    desc: "Zip from wall to wall in neon labyrinths before the rising energy flood catches you.",
    cover: makeCover("#172554", "#ca8a04", "#facc15", "<rect x='-34' y='-38' width='68' height='76' rx='12' fill='#facc15'/><rect x='-18' y='-14' width='12' height='12' fill='#0f172a'/><rect x='6' y='-14' width='12' height='12' fill='#0f172a'/>"),
    embedUrl: UBG_BASE + "tomb-of-the-mask.html",
    localPath: "embed/tomb-of-the-mask.html",
    controls: "Arrow Keys or WASD to dash in any direction."
  },
  {
    id: "stickman-hook",
    title: "Stickman Hook",
    category: "Action",
    badge: "POPULAR",
    desc: "Swing like an acrobat across floating grapple points and launch yourself across the finish line.",
    cover: makeCover("#be123c", "#6b21a8", "#fb7185", "<path d='M-45,-40 Q0,35 45,-25' fill='none' stroke='#f8fafc' stroke-width='5'/><circle cx='0' cy='12' r='14' fill='#fbbf24'/>"),
    embedUrl: UBG_BASE + "stickman-hook.html",
    localPath: "embed/stickman-hook.html",
    controls: "Hold Click, Space, or Touch to grapple and swing."
  }
];
