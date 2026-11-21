/* STARFORGE CORE & FIREBASE SCRIPT */

// The visual starburst mascot (renders crystal/spark icon without image uploads)
const MOTO_MASCOT = "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><defs><linearGradient id='a' x1='0%25' y1='0%25' x2='100%25' y2='100%25'><stop offset='0%25' stop-color='%23a855f7'/><stop offset='100%25' stop-color='%23c084fc'/></linearGradient></defs><rect width='100' height='100' rx='24' fill='%230a0c16'/><path d='M50 12 L56 38 L82 44 L58 52 L50 82 L42 52 L18 44 L44 38 Z' fill='url(%23a)'/><circle cx='50' cy='45' r='12' fill='%23fff' opacity='0.75'/><path d='M50 32 L51 44 L63 45 L51 46 L50 58 L49 46 L37 45 L49 44 Z' fill='%23fff'/></svg>";

const DEFAULT_DATA = {
  profile: { name: "Starforger", avatar: "🌌", bio: "Exploring the Starforge arcade.", xp: 0, sessions: 0, playedIds: [] },
  favorites: [],
  recent: [],
  friends: [
    { id: "sf-bot-1", name: "UltraNecrozma", avatar: "⚡", level: 12, status: "Forging high scores" },
    { id: "sf-bot-2", name: "NovaRunner", avatar: "🚀", level: 7, status: "Playing Cyber Snake" }
  ],
  settings: {
    mode: "dark",
    size: "normal",
    reduceMotion: false,
    font: "Inter",
    theme: "gold",
    bg: "stars",
    cloak: "none",
    customTitle: "",
    customIcon: "",
    cloakOnSwitch: false,
    panicKey: "\\",
    panicUrl: "https://classroom.google.com",
    preferEmbed: true
  }
};

// PLACE YOUR FIREBASE CREDENTIALS FROM THE CONSOLE HERE:
const firebaseConfig = {
  apiKey: "PLACE_YOUR_API_KEY_HERE",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.firebasestorage.app",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

let db, auth, currentUser = null;

// Only spin up Firebase when API credentials are live, preventing crash states on build scripts
if (firebaseConfig.apiKey && !firebaseConfig.apiKey.includes("PLACE_YOUR")) {
  import("https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js").then(({ initializeApp }) => {
    const app = initializeApp(firebaseConfig);
    Promise.all([
      import("https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js"),
      import("https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js")
    ]).then(([{ getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged }, { getFirestore, doc, setDoc, getDoc }]) => {
      auth = getAuth(app);
      db = getFirestore(app);

      window.signInWithGoogle = () => {
        signInWithPopup(auth, new GoogleAuthProvider()).then(res => {
          currentUser = res.user;
          loadUserData(res.user.uid);
        }).catch(err => console.error("Login fail:", err));
      };

      window.logoutFirebase = () => {
        signOut(auth).then(() => {
          currentUser = null;
          location.reload();
        });
      };

      onAuthStateChanged(auth, user => {
        if (user) {
          currentUser = user;
          loadUserData(user.uid);
        } else {
          applyAppearance();
          applyCloak();
        }
      });
    });
  });
}

function loadUserData(uid) {
  if (!db) return;
  const docRef = doc(db, "users", uid);
  getDoc(docRef).then(snap => {
    if (snap.exists()) {
      localStorage.setItem("starforge_data", JSON.stringify(snap.data()));
    } else {
      syncLocalToFirebase(uid);
    }
    applyAppearance();
    applyCloak();
    if (window.renderProfile) window.renderProfile();
  });
}

function syncLocalToFirebase(uid) {
  if (!db) return;
  const data = getStore();
  setDoc(doc(db, "users", uid), data).then(() => {
    console.log("Profile synced to cloud backup.");
  });
}

function getStore() {
  try {
    const raw = JSON.parse(localStorage.getItem("starforge_data") || "{}");
    return {
      profile: { ...DEFAULT_DATA.profile, ...(raw.profile || {}) },
      favorites: Array.isArray(raw.favorites) ? raw.favorites : [],
      recent: Array.isArray(raw.recent) ? raw.recent : [],
      friends: Array.isArray(raw.friends) ? raw.friends : DEFAULT_DATA.friends,
      settings: { ...DEFAULT_DATA.settings, ...(raw.settings || {}) }
    };
  } catch { return JSON.parse(JSON.stringify(DEFAULT_DATA)); }
}

function saveStore(data) {
  localStorage.setItem("starforge_data", JSON.stringify(data));
  if (currentUser && db) {
    setDoc(doc(db, "users", currentUser.uid), data);
  }
}

function toggleFavorite(id) {
  const data = getStore();
  const idx = data.favorites.indexOf(id);
  if (idx > -1) data.favorites.splice(idx, 1);
  else data.favorites.unshift(id);
  saveStore(data);
  return idx === -1;
}

function recordGameSession(id) {
  const data = getStore();
  data.profile.sessions += 1;
  data.profile.xp += 35;
  if (!data.profile.playedIds.includes(id)) {
    data.profile.playedIds.push(id);
    data.profile.xp += 50;
  }
  data.recent = [id, ...data.recent.filter(x => x !== id)].slice(0, 8);
  saveStore(data);
}

/* Themes & Appearance */
const THEMES = {
  default:    { label: "Default",    accent: "#a855f7", light: "#c084fc", bg: "#06070c", surf: "#0a0c16", card: "#0f1221" },
  strawberri: { label: "Strawberri", accent: "#e11d48", light: "#fb7185", bg: "#14090c", surf: "#1f0e13", card: "#2b141b" },
  pink:       { label: "Pink",       accent: "#db2777", light: "#f472b6", bg: "#120a10", surf: "#1c1019", card: "#271623" },
  aqua:       { label: "Aqua",       accent: "#0284c7", light: "#38bdf8", bg: "#081018", surf: "#0f1924", card: "#162333" },
  forest:     { label: "Forest",     accent: "#059669", light: "#34d399", bg: "#08120e", surf: "#0f1f18", card: "#162b22" },
  rose:       { label: "Rose",       accent: "#e11d48", light: "#fda4af", bg: "#130b0e", surf: "#1d1116", card: "#291820" },
  lavender:   { label: "Lavender",   accent: "#8b5cf6", light: "#c4b5fd", bg: "#0f0d17", surf: "#171424", card: "#211d33" },
  amber:      { label: "Amber",      accent: "#d97706", light: "#fbbf24", bg: "#140f08", surf: "#1f170c", card: "#2b2011" },
  gold:       { label: "Necrozma Gold", accent: "#eab308", light: "#fde047", bg: "#0c0d14", surf: "#141622", card: "#1d2033" },
  mono:       { label: "Monochrome", accent: "#52525b", light: "#d4d4d8", bg: "#09090b", surf: "#121215", card: "#1c1c21" }
};

function applyAppearance() {
  const { settings } = getStore();
  const root = document.documentElement;
  const body = document.body;
  const t = THEMES[settings.theme] || THEMES.default;

  const isLight = settings.mode === "light" || (settings.mode === "auto" && window.matchMedia("(prefers-color-scheme: light)").matches);

  root.style.setProperty("--accent", t.accent);
  root.style.setProperty("--accent-light", t.light);

  if (isLight) {
    root.style.setProperty("--bg-main", "#f1f5f9");
    root.style.setProperty("--bg-surface", "#ffffff");
    root.style.setProperty("--bg-card", "#e2e8f0");
    root.style.setProperty("--bg-hover", "#cbd5e1");
    root.style.setProperty("--text-main", "#0f172a");
    root.style.setProperty("--text-muted", "#475569");
    root.style.setProperty("--border", "#cbd5e1");
  } else {
    root.style.setProperty("--bg-main", t.bg);
    root.style.setProperty("--bg-surface", t.surf);
    root.style.setProperty("--bg-card", t.card);
    root.style.setProperty("--bg-hover", "#1d1f33");
    root.style.setProperty("--text-main", "#f8fafc");
    root.style.setProperty("--text-muted", "#64748b");
    root.style.setProperty("--border", "#1e293b");
  }

  root.classList.remove("scale-small", "scale-large");
  if (settings.size === "small") root.classList.add("scale-small");
  if (settings.size === "large") root.classList.add("scale-large");

  body.classList.toggle("reduce-motion", Boolean(settings.reduceMotion));
  body.classList.remove("bg-glow", "bg-stars");
  if (settings.bg === "glow") body.classList.add("bg-glow");
  if (settings.bg === "stars") body.classList.add("bg-stars");

  const fontName = settings.font || "Inter";
  root.style.setProperty("--font
