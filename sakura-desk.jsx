// Sakura Desk v3 : v2 + verre dépoli + survol rose
import { run } from "uebersicht";

const TASKS = [
  { t: "Rice mon macOS", done: true },
  { t: "Finir le portfolio", done: false },
  { t: "Acheter des nouilles", done: false },
];
const APPS = [
  ["Safari", "Safari"],
  ["VS Code", "Visual Studio Code"],
  ["Spotify", "Spotify"],
  ["Discord", "Discord"],
  ["Terminal", "Terminal"],
  ["Messages", "Messages"],
];

export const refreshFrequency = 10000;

export const command =
  "LC_TIME=fr_FR.UTF-8 date '+%H:%M|%A %d %B'; " +
  "pmset -g batt | grep -Eo '[0-9]+%' | head -1; " +
  "df -H / | awk 'NR==2{print $3}'";

export const className = `
  top: 36px;
  right: 36px;
  width: 290px;
  font-family: "SF Pro Rounded", ui-rounded, -apple-system, sans-serif;
  color: #1c2340;
`;

const card = {
  background: "rgba(255,255,255,0.6)",
  borderRadius: 26,
  padding: "18px 20px",
  marginBottom: 14,
  boxShadow: "0 10px 30px rgba(226,120,140,0.16)",
  backdropFilter: "blur(22px) saturate(140%)",
  WebkitBackdropFilter: "blur(22px) saturate(140%)",
};
const head = { fontSize: 13, fontWeight: 800, marginBottom: 10, color: "#1f3a8a" };
const stat = {
  flex: 1,
  textAlign: "center",
  padding: "8px 4px",
  borderRadius: 16,
  background: "rgba(240,232,235,0.8)",
};
const app = {
  padding: "8px 14px",
  borderRadius: 999,
  fontSize: 14,
  fontWeight: 600,
  cursor: "pointer",
};

export const render = ({ output }) => {
  const lines = (output || "").trim().split("\n");
  const top = (lines[0] || "--:--|").split("|");
  const batt = lines[1] || "--";
  const disk = lines[2] || "--";

  return (
    <div>
      <div style={card}>
        <div style={{ fontSize: 64, fontWeight: 800, color: "#1f3a8a", lineHeight: 1 }}>
          {top[0]}
        </div>
        <div style={{ marginTop: 6, fontSize: 14, fontWeight: 600, color: "#e0607a" }}>
          {top[1]}
        </div>
      </div>

      <div style={{ ...card, display: "flex", gap: 8 }}>
        <div style={stat}>
          <div style={{ fontWeight: 800 }}>{batt}</div>
          <div style={{ fontSize: 11, opacity: 0.6 }}>batterie</div>
        </div>
        <div style={stat}>
          <div style={{ fontWeight: 800 }}>{disk}</div>
          <div style={{ fontSize: 11, opacity: 0.6 }}>disque</div>
        </div>
      </div>

      <div style={card}>
        <div style={head}>Lancer</div>
        {APPS.map((a) => (
          <div key={a[1]} style={app} onClick={() => run('open -a "' + a[1] + '"')}
            onMouseEnter={(e) => { e.currentTarget.style.background = "#f07a93"; e.currentTarget.style.color = "#fff"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#1c2340"; }}
          >
            {a[0]}
          </div>
        ))}
      </div>

      <div style={card}>
        <div style={head}>À faire</div>
        {TASKS.map((x) => (
          <div
            key={x.t}
            style={{
              padding: "5px 0",
              fontSize: 14,
              fontWeight: 600,
              opacity: x.done ? 0.45 : 1,
              textDecoration: x.done ? "line-through" : "none",
            }}
          >
            {x.done ? "✓ " : "○ "}
            {x.t}
          </div>
        ))}
      </div>
    </div>
  );
};
