// Suivi d'animes : boutons − / + pour l'épisode (sauvegardé automatiquement)
export const refreshFrequency = false;
export const command = "echo";

const KEY = "sakura-anime-v3"; // change ce nom pour repartir de la liste ci-dessous
const DEFAULTS = [
  { name: "Tensei Kizoku S3", ep: 1, total: 12 },
  { name: "Ao Ashi S2", ep: 1, total: 24 },
];

const load = () => {
  try {
    const r = localStorage.getItem(KEY);
    if (r) return JSON.parse(r);
  } catch (e) {}
  return DEFAULTS;
};
const save = (list) => {
  try { localStorage.setItem(KEY, JSON.stringify(list)); } catch (e) {}
};

export const initialState = { list: load() };

export const updateState = (event, prev) => {
  if (event.type === "ADJUST") {
    const list = prev.list.map((a, i) =>
      i === event.i ? { ...a, ep: Math.max(0, Math.min(a.total, a.ep + event.d)) } : a
    );
    save(list);
    return { list };
  }
  return prev;
};

export const className = `
  top: 36px; left: 380px; width: 310px;
  font-family: "SF Pro Rounded", ui-rounded, -apple-system, sans-serif; color: #1c2340;
`;

const round = { width: 26, height: 26, borderRadius: 13, display: "flex", alignItems: "center",
  justifyContent: "center", cursor: "pointer", fontWeight: 800, fontSize: 16, userSelect: "none" };

export const render = ({ list }, dispatch) => (
  <div style={{ background: "rgba(255,255,255,0.6)", borderRadius: 26, padding: "18px 20px",
    boxShadow: "0 10px 30px rgba(226,120,140,0.16)", backdropFilter: "blur(22px) saturate(140%)",
    WebkitBackdropFilter: "blur(22px) saturate(140%)" }}>
    <div style={{ fontSize: 13, fontWeight: 800, color: "#1f3a8a", marginBottom: 10 }}>En cours de visionnage</div>
    {(list || []).map((a, i) => (
      <div key={a.name} style={{ display: "flex", alignItems: "center", gap: 10, padding: "7px 0" }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 14, fontWeight: 700, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
            {a.name}
          </div>
          <div style={{ fontSize: 12, opacity: 0.6, fontWeight: 600 }}>Épisode {a.ep}/{a.total}</div>
          <div style={{ height: 5, borderRadius: 3, background: "rgba(240,232,235,0.9)", marginTop: 4 }}>
            <div style={{ height: 5, borderRadius: 3, background: "#f07a93", width: (a.ep / a.total) * 100 + "%" }} />
          </div>
        </div>
        <div style={{ ...round, background: "rgba(240,232,235,0.9)", color: "#1f3a8a" }}
          onClick={() => dispatch({ type: "ADJUST", i: i, d: -1 })}>−</div>
        <div style={{ ...round, background: "#f07a93", color: "#fff" }}
          onClick={() => dispatch({ type: "ADJUST", i: i, d: 1 })}>+</div>
      </div>
    ))}
  </div>
);
