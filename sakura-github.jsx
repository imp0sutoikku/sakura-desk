// Contributions GitHub. Remplace TON_PSEUDO par ton nom d'utilisateur GitHub
const USER = "TON_PSEUDO";
export const refreshFrequency = 3600000;
export const command =
  'curl -s --max-time 10 "https://github-contributions-api.jogruber.de/v4/' + USER + '?y=last"';
export const className = `
  top: 36px; right: 350px; width: 380px;
  font-family: "SF Pro Rounded", ui-rounded, -apple-system, sans-serif; color: #1c2340;
`;
const COL = ["#f1e6ea", "#f8c6d1", "#f4a0b4", "#e8708b", "#c93d63"];
export const render = ({ output }) => {
  let list = [];
  try { list = JSON.parse(output).contributions.slice(-112); } catch (e) { list = []; }
  const pad = list.length ? new Date(list[0].date).getDay() : 0;
  const cells = Array(pad).fill(null).concat(list);
  const total = list.reduce((a, c) => a + c.count, 0);
  return (
    <div style={{ background: "rgba(255,255,255,0.6)", borderRadius: 26, padding: "16px 20px",
      boxShadow: "0 10px 30px rgba(226,120,140,0.16)", backdropFilter: "blur(22px) saturate(140%)",
      WebkitBackdropFilter: "blur(22px) saturate(140%)" }}>
      <div style={{ fontSize: 13, fontWeight: 800, color: "#1f3a8a", marginBottom: 10 }}>
        GitHub {list.length ? "· " + total + " contributions" : ""}
      </div>
      {list.length ? (
        <div style={{ display: "grid", gridTemplateRows: "repeat(7, 11px)", gridAutoFlow: "column", gap: 3 }}>
          {cells.map((c, i) => (
            <div key={i} style={{ width: 11, height: 11, borderRadius: 4, background: c ? COL[c.level] : "transparent" }} />
          ))}
        </div>
      ) : (
        <div style={{ fontSize: 13, opacity: 0.6 }}>Données indisponibles : vérifie ton pseudo dans le fichier.</div>
      )}
    </div>
  );
};
