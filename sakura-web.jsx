// Carte de ton site : aperçu + clic pour ouvrir dans le navigateur
import { run } from "uebersicht";

const URL_SITE = "https://example.com";
const TITLE = "Mon site";
const IMAGE = ""; // URL d'une image d'aperçu (optionnel)

export const refreshFrequency = false;
export const command = "echo";

export const className = `
  top: 250px; left: 380px; width: 310px;
  font-family: "SF Pro Rounded", ui-rounded, -apple-system, sans-serif; color: #1c2340;
`;

export const render = () => (
  <div
    onClick={() => run('open "' + URL_SITE + '"')}
    onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-3px)"; }}
    onMouseLeave={(e) => { e.currentTarget.style.transform = "none"; }}
    style={{ background: "rgba(255,255,255,0.6)", borderRadius: 26, overflow: "hidden", cursor: "pointer",
      transition: "transform 0.2s", boxShadow: "0 10px 30px rgba(226,120,140,0.16)",
      backdropFilter: "blur(22px) saturate(140%)", WebkitBackdropFilter: "blur(22px) saturate(140%)" }}
  >
    <div style={{ height: 190, background: "linear-gradient(135deg,#f8c6d1,#f07a93)" }}>
      {IMAGE ? <img src={IMAGE} alt="" style={{ width: "100%", height: 190, objectFit: "cover", display: "block" }} /> : null}
    </div>
    <div style={{ padding: "14px 20px" }}>
      <div style={{ fontSize: 15, fontWeight: 800, color: "#1f3a8a" }}>{TITLE}</div>
      <div style={{ fontSize: 12, fontWeight: 600, color: "#e0607a" }}>
        {URL_SITE.replace(/^https?:\/\//, "").split("/")[0]} ↗
      </div>
    </div>
  </div>
);
