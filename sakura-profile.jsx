// Profil + infos système (en haut à gauche)
export const refreshFrequency = 30000;

const NAME = ""; // laisse vide pour utiliser le nom de ton compte Mac

export const command = `
id -F
sw_vers -productVersion
uname -m
echo $(( $(sysctl -n hw.memsize) / 1073741824 ))
sysctl -n machdep.cpu.brand_string
sysctl -n hw.ncpu
df -H / | awk 'NR==2{print $3 " / " $2}'
uptime | awk -F'up ' '{print $2}' | cut -d, -f1
`;

export const className = `
  top: 36px; left: 36px; width: 320px;
  font-family: "SF Pro Rounded", ui-rounded, -apple-system, sans-serif; color: #1c2340;
`;

const row = { display: "flex", justifyContent: "space-between", fontSize: 13, padding: "3px 0" };

export const render = ({ output }) => {
  const l = (output || "").trim().split("\n");
  const name = NAME || l[0] || "Moi";
  const arch = l[2] === "arm64" ? "Apple Silicon" : "Intel";
  const rows = [
    ["macOS", l[1] || "--"],
    ["puce", arch],
    ["RAM", (l[3] || "--") + " Go"],
    ["cpu", (l[4] || "--").replace("Intel(R) Core(TM) ", "").replace(" CPU", "") + " · " + (l[5] || "--") + " cœurs"],
    ["disque", l[6] || "--"],
    ["allumé", l[7] || "--"],
  ];
  return (
    <div style={{ background: "rgba(255,255,255,0.6)", borderRadius: 26, padding: "18px 20px",
      boxShadow: "0 10px 30px rgba(226,120,140,0.16)", backdropFilter: "blur(22px) saturate(140%)",
      WebkitBackdropFilter: "blur(22px) saturate(140%)" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 12 }}>
        <div style={{ width: 52, height: 52, borderRadius: 18, background: "linear-gradient(135deg,#f8c6d1,#f07a93)",
          color: "#fff", fontSize: 24, fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center" }}>
          {name.charAt(0).toUpperCase()}
        </div>
        <div>
          <div style={{ fontSize: 17, fontWeight: 800, color: "#1f3a8a" }}>{name}</div>
          <div style={{ fontSize: 12, color: "#e0607a", fontWeight: 600 }}>mon mac</div>
        </div>
      </div>
      {rows.map((r) => (
        <div key={r[0]} style={row}>
          <span style={{ opacity: 0.55, fontWeight: 600 }}>{r[0]}</span>
          <span style={{ fontWeight: 700, textAlign: "right" }}>{r[1]}</span>
        </div>
      ))}
    </div>
  );
};
