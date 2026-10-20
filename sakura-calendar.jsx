// Semaine en cours. Ajoute tes événements dans EVENTS (clé = AAAA-MM-JJ)
export const refreshFrequency = 60000;
export const command = "date +%s";
const EVENTS = {
  "2026-10-20": ["Portfolio"],
  "2026-10-21": ["Sport"],
  "2026-10-24": ["Brunch"],
};
export const className = `
  bottom: 36px; right: 350px; width: 380px;
  font-family: "SF Pro Rounded", ui-rounded, -apple-system, sans-serif; color: #1c2340;
`;
const iso = (d) => d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
export const render = () => {
  const now = new Date();
  const mon = new Date(now);
  mon.setDate(now.getDate() - ((now.getDay() + 6) % 7));
  const names = ["L", "M", "M", "J", "V", "S", "D"];
  const days = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date(mon);
    d.setDate(mon.getDate() + i);
    days.push(d);
  }
  return (
    <div style={{ background: "rgba(255,255,255,0.6)", borderRadius: 26, padding: "16px 14px",
      boxShadow: "0 10px 30px rgba(226,120,140,0.16)", backdropFilter: "blur(22px) saturate(140%)",
      WebkitBackdropFilter: "blur(22px) saturate(140%)" }}>
      <div style={{ fontSize: 13, fontWeight: 800, color: "#1f3a8a", margin: "0 6px 10px" }}>Cette semaine</div>
      <div style={{ display: "flex", gap: 6 }}>
        {days.map((d, i) => {
          const today = iso(d) === iso(now);
          const ev = EVENTS[iso(d)] || [];
          return (
            <div key={i} style={{ flex: 1, textAlign: "center", padding: "8px 2px", borderRadius: 16,
              background: today ? "#f07a93" : "rgba(240,232,235,0.8)", color: today ? "#fff" : "#1c2340" }}>
              <div style={{ fontSize: 11, opacity: 0.7 }}>{names[i]}</div>
              <div style={{ fontSize: 17, fontWeight: 800 }}>{d.getDate()}</div>
              <div style={{ fontSize: 9, fontWeight: 600, minHeight: 24 }}>{ev.join(", ")}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
