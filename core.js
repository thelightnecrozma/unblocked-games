/* STARFORGE CORE & FIREBASE CLOUD SYNC */

const STARFORGE_ICON = "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><defs><linearGradient id='a' x1='0%25' y1='0%25' x2='100%25' y2='100%25'><stop offset='0%25' stop-color='%23a855f7'/><stop offset='50%25' stop-color='%2338bdf8'/><stop offset='100%25' stop-color='%23facc15'/></linearGradient></defs><rect width='100' height='100' rx='24' fill='%230a0c16'/><path d='M50 10 L58 38 L88 46 L58 54 L50 86 L42 54 L12 46 L42 38 Z' fill='url(%23a)'/><circle cx='50' cy='46' r='11' fill='%23ffffff' opacity='0.85'/></svg>";

const DEFAULT_DATA = {
  profile: { name: "Starforger", avatar: "🌌", bio: "Exploring the Starforge arcade.", xp: 0, sessions: 0, playedIds: [] },
  favorites: [],
  recent: [],
  friends: [
    { id: "sf-bot-1", name: "UltraNecrozma", avatar: "⚡", level: 12, status: "Forging high scores" },
    { id: "sf-bot-2", name: "NovaRunner", avatar: "🚀", level: 7, status: "Playing Drift Boss" }
  ],
  settings: {
    mode: "dark",
    size: "normal",
    reduceMotion: false,
    font: "Inter",
    theme: "default",
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

const firebaseConfig = {
  apiKey: "AIzaSyDEQlK8xx50LGrFuvGwvOmiWnGJUHN9WDQ",
  authDomain: "starforge-arcade.firebaseapp.com",
  projectId: "starforge-arcade",
  storageBucket: "starforge-arcade.firebasestorage.app",
  messagingSenderId: "538838328388",
  appId: "1:538838328388:web:7c25752945c7b4c3b24811",
  measurementId: "G-12P3GT37B8"
};

let db = null;
let auth = null;
let fsDoc = null;
let fsSetDoc = null;
let fsGetDoc = null;
let currentUser = null;

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
  } catch (e) {
    return JSON.parse(JSON.stringify(DEFAULT_DATA));
  }
}

function saveStore(data) {
  localStorage.setItem("starforge_data", JSON.stringify(data));
  if (currentUser && db && fsDoc && fsSetDoc) {
    fsSetDoc(fsDoc(db, "users", currentUser.uid), data, { merge: true }).catch(function() {});
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
  data.recent = [id, ...data.recent.filter(function(x) { return x !== id; })].slice(0, 8);
  saveStore(data);
}

function refreshAuthUI() {
  const data = getStore();
  const navAvatar = document.getElementById("navAvatar");
  const navName = document.getElementById("navName");
  if (navAvatar) navAvatar.textContent = data.profile.avatar;
  if (navName) navName.textContent = data.profile.name;

  const navLoginBtn = document.getElementById("navLoginBtn");
  if (navLoginBtn) {
    if (currentUser) {
      navLoginBtn.textContent = "Sign out";
      navLoginBtn.className = "tool-btn";
      navLoginBtn.onclick = function() { if (window.logoutFirebase) window.logoutFirebase(); };
    } else {
      navLoginBtn.textContent = "Login with Google";
      navLoginBtn.className = "tool-btn primary";
      navLoginBtn.onclick = function() {
        if (window.signInWithGoogle) window.signInWithGoogle();
        else alert("Google Sign-In is still connecting — wait 2 seconds and tap again.");
      };
    }
  }
  if (typeof window.renderProfile === "function") {
    window.renderProfile();
  }
}

/* Themes & Appearance */
const THEMES = {
  default:    { label: "Cosmic Purple", accent: "#a855f7", light: "#c084fc", bg: "#06070c", surf: "#0b0d18", card: "#121526" },
  strawberri: { label: "Strawberri",    accent: "#e11d48", light: "#fb7185", bg: "#14090c", surf: "#1f0e13", card: "#2b141b" },
  pink:       { label: "Pink",          accent: "#db2777", light: "#f472b6", bg: "#120a10", surf: "#1c1019", card: "#271623" },
  aqua:       { label: "Aqua",          accent: "#0284c7", light: "#38bdf8", bg: "#081018", surf: "#0f1924", card: "#162333" },
  forest:     { label: "Forest",        accent: "#059669", light: "#34d399", bg: "#08120e", surf: "#0f1f18", card: "#162b22" },
  rose:       { label: "Rose",          accent: "#e11d48", light: "#fda4af", bg: "#130b0e", surf: "#1d1116", card: "#291820" },
  lavender:   { label: "Lavender",      accent: "#8b5cf6", light: "#c4b5fd", bg: "#0f0d17", surf: "#171424", card: "#211d33" },
  amber:      { label: "Amber",         accent: "#d97706", light: "#fbbf24", bg: "#140f08", surf: "#1f170c", card: "#2b2011" },
  gold:       { label: "Necrozma Gold", accent: "#eab308", light: "#fde047", bg: "#0c0d14", surf: "#141622", card: "#1d2033" },
  mono:       { label: "Monochrome",    accent: "#52525b", light: "#d4d4d8", bg: "#09090b", surf: "#121215", card: "#1c1c21" }
};

function applyAppearance() {
  const settings = getStore().settings;
  const root = document.documentElement;
  const body = document.body;
  if (!body) return;
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
    root.style.setProperty("--bg-hover", "#1d2138");
    root.style.setProperty("--text-main", "#f8fafc");
    root.style.setProperty("--text-muted", "#94a3b8");
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
  root.style.setProperty("--font-family", "'" + fontName + "', system-ui, sans-serif");
  if (fontName !== "Inter") {
    let gf = document.getElementById("sf-google-font");
    if (!gf) {
      gf = document.createElement("link");
      gf.id = "sf-google-font";
      gf.rel = "stylesheet";
      document.head.appendChild(gf);
    }
    gf.href = "https://fonts.googleapis.com/css2?family=" + encodeURIComponent(fontName) + ":wght@400;600;700;800;900&display=swap";
  }
}

/* Tab & Favicon Cloaking */
const CLOAKS = {
  none:      { label: "Off",       title: null, icon: STARFORGE_ICON },
  google:    { label: "Google",    title: "Google", icon: "https://www.google.com/favicon.ico" },
  classroom: { label: "Classroom", title: "Home - Classroom", icon: "https://ssl.gstatic.com/classroom/favicon.png" },
  gmail:     { label: "Gmail",     title: "Inbox - Gmail", icon: "https://ssl.gstatic.com/ui/v1/icons/mail/rfr/gmail.ico" },
  drive:     { label: "Drive",     title: "My Drive - Google Drive", icon: "https://ssl.gstatic.com/images/branding/product/1x/drive_2020q4_32dp.png" },
  desmos:    { label: "Desmos",    title: "Desmos | Graphing Calculator", icon: "https://www.desmos.com/assets/img/apps/graphing/favicon.ico" },
  wikipedia: { label: "Wikipedia", title: "Wikipedia, the free encyclopedia", icon: "https://en.wikipedia.org/static/favicon/wikipedia.ico" },
  newtab:    { label: "New Tab",   title: "New Tab", icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><circle cx='50' cy='50' r='40' fill='%2364748b'/></svg>" }
};

let originalPageTitle = "Starforge";

function setFavicon(href) {
  document.querySelectorAll("link[rel*='icon']").forEach(function(el) { el.remove(); });
  const link = document.createElement("link");
  link.rel = "icon";
  link.href = href;
  document.head.appendChild(link);
}

function applyCloak(forceHide) {
  const settings = getStore().settings;
  if (settings.cloakOnSwitch && !forceHide && !document.hidden) {
    document.title = originalPageTitle;
    setFavicon(STARFORGE_ICON);
    return;
  }
  if (settings.customTitle || settings.customIcon) {
    if (settings.customTitle) document.title = settings.customTitle;
    if (settings.customIcon) setFavicon(settings.customIcon);
    return;
  }
  const preset = CLOAKS[settings.cloak] || CLOAKS.none;
  document.title = preset.title || originalPageTitle;
  setFavicon(preset.icon);
}

document.addEventListener("visibilitychange", function() {
  if (getStore().settings.cloakOnSwitch) applyCloak(document.hidden);
});

function openAboutBlankCloak() {
  const settings = getStore().settings;
  const preset = CLOAKS[settings.cloak] || CLOAKS.drive;
  const title = settings.customTitle || preset.title || "My Drive - Google Drive";
  const icon = settings.customIcon || preset.icon;
  const docMarkup = "<!DOCTYPE html><html><head><title>" + title + "</title><link rel='icon' href='" + icon + "'><style>html,body,iframe{margin:0;padding:0;width:100%;height:100%;border:none;overflow:hidden;background:#06070c;}</style></head><body><iframe src='" + window.location.href + "' allowfullscreen></iframe></body></html>";
  document.open();
  document.write(docMarkup);
  document.close();
  try { window.history.replaceState({}, "", "/"); } catch (e) {}
}

window.addEventListener("keydown", function(e) {
  if (["INPUT", "TEXTAREA"].includes(document.activeElement.tagName) || window.__bindingPanic) return;
  const settings = getStore().settings;
  if (settings.panicKey && e.key.toLowerCase() === settings.panicKey.toLowerCase()) {
    window.location.replace(settings.panicUrl || "https://classroom.google.com");
  }
});

document.addEventListener("DOMContentLoaded", function() {
  originalPageTitle = document.title;
  applyAppearance();
  applyCloak();
  refreshAuthUI();
});

/* Safe Async Firebase Loader */
(function initFirebase() {
  try {
    Promise.all([
      import("https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js"),
      import("https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js"),
      import("https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js")
    ]).then(function(mods) {
      const appMod = mods[0];
      const authMod = mods[1];
      const fsMod = mods[2];

      const app = appMod.initializeApp(firebaseConfig);
      auth = authMod.getAuth(app);
      db = fsMod.getFirestore(app);
      fsDoc = fsMod.doc;
      fsSetDoc = fsMod.setDoc;
      fsGetDoc = fsMod.getDoc;

      window.signInWithGoogle = function() {
        const provider = new authMod.GoogleAuthProvider();
        authMod.signInWithPopup(auth, provider).then(function(res) {
          currentUser = res.user;
          loadCloudProfile(res.user);
        }).catch(function(err) {
          if (err && err.code === "auth/popup-blocked") {
            authMod.signInWithRedirect(auth, provider);
          } else {
            alert("Google Sign-In error: " + (err.message || err));
          }
        });
      };

      window.logoutFirebase = function() {
        authMod.signOut(auth).then(function() {
          currentUser = null;
          refreshAuthUI();
        });
      };

      authMod.onAuthStateChanged(auth, function(user) {
        currentUser = user || null;
        if (user) loadCloudProfile(user);
        else refreshAuthUI();
      });
    }).catch(function(err) {
      console.warn("Firebase SDK unavailable:", err);
    });
  } catch (e) {
    console.warn("Firebase init skipped:", e);
  }
})();

function loadCloudProfile(user) {
  if (!db || !fsDoc || !fsGetDoc) {
    refreshAuthUI();
    return;
  }
  const ref = fsDoc(db, "users", user.uid);
  fsGetDoc(ref).then(function(snap) {
    if (snap.exists()) {
      localStorage.setItem("starforge_data", JSON.stringify(snap.data()));
    } else {
      const local = getStore();
      if (local.profile.name === "Starforger" && user.displayName) {
        local.profile.name = user.displayName;
        localStorage.setItem("starforge_data", JSON.stringify(local));
      }
      fsSetDoc(ref, getStore(), { merge: true });
    }
    applyAppearance();
    applyCloak();
    refreshAuthUI();
  }).catch(function() {
    refreshAuthUI();
  });
}
