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
    embedUrl: "https://ubg77.github.io/edit/slope/",
    localPath: "",
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
    embedUrl: "https://game316009.konggames.com/gamez/0031/6009/live/index.html",
    localPath: "",
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
    embedUrl: "https://ubg77.github.io/game131022/drive-mad/",
    localPath: "",
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
    embedUrl: "https://ubg77.github.io/edit/moto-x3m/",
    localPath: "",
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
    embedUrl: "https://ubg77.github.io/edit/basketball-stars/",
    localPath: "",
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
    embedUrl: "https://ubg77.github.io/update/subway-surfers/",
    localPath: "",
    controls: "Arrow Keys to switch lanes, jump, and roll."
  },
  {
    id: "2048",
    title: "2048 Prism",
    category: "Puzzle",
    trending: true,
    badge: "UNBLOCKED",
    desc: "Slide and merge matching neon number tiles to forge the 2048 prism block.",
    cover: makeCover("#4338ca", "#7e22ce", "#a855f7", "<rect x='-48' y='-48' width='42' height='42' rx='9' fill='#38bdf8'/><rect x='6' y='-48' width='42' height='42' rx='9' fill='#f43f5e'/><rect x='-48' y='6' width='42' height='42' rx='9' fill='#fbbf24'/><rect x='6' y='6' width='42' height='42' rx='9' fill='#34d399'/>"),
    embedUrl: "",
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
    id: "cookie-clicker",
    title: "Cookie Clicker",
    category: "Puzzle",
    badge: "IDLE",
    desc: "Bake billions of cookies, hire cosmic grandmas, and automate a massive bakery empire.",
    cover: makeCover("#78350f", "#271408", "#d97706", "<circle cx='0' cy='0' r='44' fill='#d97706'/><circle cx='-15' cy='-14' r='6' fill='#451a03'/><circle cx='14' cy='-9' r='7' fill='#451a03'/><circle cx='-5' cy='16' r='6' fill='#451a03'/><circle cx='16' cy='14' r='5' fill='#451a03'/>"),
    embedUrl: "https://ozh.github.io/cookieclicker/",
    localPath: "",
    controls: "Click or tap the giant cookie and purchase upgrades on the right."
  },
  {
    id: "crossy-road",
    title: "Crossy Road",
    category: "Driving",
    badge: "CLASSIC",
    desc: "Hop across busy highways, rushing rivers, and train tracks without getting hit.",
    cover: makeCover("#15803d", "#1e3a8a", "#4ade80", "<rect x='-26' y='-30' width='52' height='56' rx='10' fill='#f8fafc'/><rect x='-9' y='-42' width='18' height='14' rx='3' fill='#ef4444'/><polygon points='26,-8 42,-2 26,4' fill='#f97316'/>"),
    embedUrl: "https://ubg77.github.io/edit/crossy-road/",
    localPath: "",
    controls: "Arrow Keys or Click/Tap to hop."
  },
  {
    id: "hextris",
    title: "Hextris",
    category: "Puzzle",
    badge: "ARCADE",
    desc: "Rotate a central hexagon to match falling colored bars before the stack overflows.",
    cover: makeCover("#312e81", "#0f766e", "#2dd4bf", "<polygon points='0,-48 42,-24 42,24 0,48 -42,24 -42,-24' fill='none' stroke='#38bdf8' stroke-width='8'/>"),
    embedUrl: "https://hextris.io/",
    localPath: "",
    controls: "Left / Right Arrow keys (or tap left/right sides of screen) to spin the hexagon."
  },
  {
    id: "pacman",
    title: "Pac-Man Classic",
    category: "Arcade",
    badge: "RETRO",
    desc: "Chomp every dot in the neon maze and dodge Blinky, Pinky, Inky, and Clyde.",
    cover: makeCover("#1e3a8a", "#172554", "#facc15", "<path d='M 0,0 L 40,-24 A 46,46 0 1,0 40,24 Z' fill='#facc15'/><circle cx='50' cy='0' r='7' fill='#fff'/>"),
    embedUrl: "https://freepacman.org/",
    localPath: "",
    controls: "Arrow Keys to move through the maze."
  },
  {
    id: "1v1-lol",
    title: "1v1.LOL",
    category: "Action",
    badge: "BUILD & SHOOT",
    desc: "Build ramps and walls at lightning speed while out-aiming rivals in tactical arena duels.",
    cover: makeCover("#1e40af", "#4c1d95", "#60a5fa", "<polygon points='-45,35 0,-35 45,35' fill='none' stroke='#38bdf8' stroke-width='7'/><line x1='-35' y1='10' x2='35' y2='10' stroke='#a78bfa' stroke-width='6'/>"),
    embedUrl: "https://ubg77.github.io/edit/1v1-lol/",
    localPath: "",
    controls: "WASD to move, Space to jump, Left Click to shoot/build, Z/X/C/V for structures."
  },
  {
    id: "stickman-hook",
    title: "Stickman Hook",
    category: "Action",
    badge: "POPULAR",
    desc: "Swing like an acrobat across floating grapple points and launch yourself across the finish line.",
    cover: makeCover("#be123c", "#6b21a8", "#fb7185", "<path d='M-45,-40 Q0,35 45,-25' fill='none' stroke='#f8fafc' stroke-width='5'/><circle cx='0' cy='12' r='14' fill='#fbbf24'/>"),
    embedUrl: "https://ubg77.github.io/edit/stickman-hook/",
    localPath: "",
    controls: "Hold Click, Space, or Touch to grapple and swing."
  }
];
