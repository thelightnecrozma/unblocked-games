const DEFAULT_DATA = {
  profile: { name: "Starforger", avatar: "🌌", bio: "Exploring the Starforge arcade.", xp: 0, sessions: 0, playedIds: [] },
  favorites: [],
  recent: [],
  settings: { cloak: "none", panicKey: "\\", panicUrl: "https://drive.google.com", preferEmbed: true }
};

function getStore() {
  try {
    const raw = JSON.parse(localStorage.getItem("starforge_data") || "{}");
    return {
      profile: { ...DEFAULT_DATA.profile, ...(raw.profile || {}) },
      favorites: Array.isArray(raw.favorites) ? raw.favorites : [],
      recent: Array.isArray(raw.recent) ? raw.recent : [],
      settings: { ...DEFAULT_DATA.settings, ...(raw.settings || {}) }
    };
  } catch { return JSON.parse(JSON.stringify(DEFAULT_DATA)); }
}

function saveStore(data) {
  localStorage.setItem("starforge_data", JSON.stringify(data));
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

const CLOAKS = {
  none: { title: null, icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>✦</text></svg>" },
  drive: { title: "My Drive - Google Drive", icon: "https://ssl.gstatic.com/images/branding/product/1x/drive_2020q4_32dp.png" },
  docs: { title: "Untitled document - Google Docs", icon: "https://ssl.gstatic.com/docs/documents/images/kix-favicon7.ico" },
  classroom: { title: "Home - Classroom", icon: "https://ssl.gstatic.com/classroom/favicon.png" },
  calc: { title: "Calculator", icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🧮</text></svg>" }
};

function applyCloak() {
  const { settings } = getStore();
  const preset = CLOAKS[settings.cloak] || CLOAKS.none;
  if (preset.title) document.title = preset.title;
  let link = document.querySelector("link[rel~='icon']");
  if (!link) { link = document.createElement("link"); link.rel = "icon"; document.head.appendChild(link); }
  link.href = preset.icon;
}

window.addEventListener("keydown", e => {
  if (["INPUT", "TEXTAREA"].includes(document.activeElement.tagName)) return;
  const { settings } = getStore();
  if (settings.panicKey && e.key === settings.panicKey) {
    window.location.replace(settings.panicUrl || "https://www.google.com");
  }
});

document.addEventListener("DOMContentLoaded", () => {
  applyCloak();
  const data = getStore();
  const navAvatar = document.getElementById("navAvatar");
  const navName = document.getElementById("navName");
  if (navAvatar) navAvatar.textContent = data.profile.avatar;
  if (navName) navName.textContent = data.profile.name;
});
