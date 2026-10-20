// Mini lecteur : Spotify, Musique ou SoundCloud (lu depuis l'onglet du navigateur)
import { run } from "uebersicht";

const SOUNDCLOUD = "https://soundcloud.com/ton-pseudo"; // ton profil SoundCloud
const SHOW_PROFILE_PLAYER = false; // mets false pour cacher le lecteur de profil

export const refreshFrequency = 3000;

const script = (app) =>
  'if application "' + app + '" is running then tell application "' + app +
  '" to return "' + app + '|" & (name of current track) & "|" & (artist of current track)';

const BROWSERS = ["Safari", "Google Chrome", "Arc", "Brave Browser", "Microsoft Edge"];
const SC_SCRIPT = [
  "on isRunning(b)",
  '  tell application "System Events" to return (name of processes) contains b',
  "end isRunning",
  "on scan(b)",
  "  try",
  '    if b is "Safari" then',
  '      tell application "Safari"',
  "        repeat with w in windows",
  "          repeat with t in tabs of w",
  '            if (URL of t) contains "soundcloud.com" then return "SoundCloud|" & (name of t)',
  "          end repeat",
  "        end repeat",
  "      end tell",
  "    else",
  '      using terms from application "Google Chrome"',
  "        tell application b",
  "          repeat with w in windows",
  "            repeat with t in tabs of w",
  '              if (URL of t) contains "soundcloud.com" then return "SoundCloud|" & (title of t)',
  "            end repeat",
  "          end repeat",
  "        end tell",
  "      end using terms from",
  "    end if",
  "  end try",
  '  return ""',
  "end scan",
  "repeat with b in {" + BROWSERS.map((b) => '"' + b + '"').join(", ") + "}",
  "  if isRunning(b as text) then",
  "    set r to scan(b as text)",
  '    if r is not "" then return r',
  "  end if",
  "end repeat",
].join("\n");

export const command =
  "( osascript -e '" + script("Spotify") + "'; osascript -e '" + script("Music") +
  "'; osascript <<'AS'\n" + SC_SCRIPT + "\nAS\n) 2>/dev/null | grep -m1 '|'";

export const className = `
  top: 230px; right: 350px; width: 380px;
  font-family: "SF Pro Rounded", ui-rounded, -apple-system, sans-serif; color: #1c2340;
`;

const ctl = (app, cmd) => run("osascript -e 'tell application \"" + app + "\" to " + cmd + "'");
const btn = { cursor: "pointer", fontSize: 20, padding: "0 8px", color: "#1f3a8a" };
const glass = {
  background: "rgba(255,255,255,0.6)", borderRadius: 26, padding: "16px 20px", marginBottom: 10,
  boxShadow: "0 10px 30px rgba(226,120,140,0.16)", backdropFilter: "blur(22px) saturate(140%)",
  WebkitBackdropFilter: "blur(22px) saturate(140%)", display: "flex", alignItems: "center", gap: 14,
};

// "▶ Titre by Artiste | Écouter sur SoundCloud" -> { title, artist }
const parseSC = (raw) => {
  let t = raw.replace(/^[▶⏸\s]+/, "").split(" | ")[0];
  const i = t.lastIndexOf(" by ");
  return i > 0 ? { title: t.slice(0, i), artist: t.slice(i + 4) } : { title: t, artist: "" };
};

export const render = ({ output }) => {
  const p = (output || "").trim().split("|");
  const app = p[0];
  const isSC = app === "SoundCloud";
  const on = p.length >= 2 && app;
  let title = "Rien en lecture";
  let sub = "Lance Spotify, Musique ou SoundCloud";
  if (on && isSC) {
    const s = parseSC(p.slice(1).join("|"));
    title = s.title;
    sub = (s.artist ? s.artist + " · " : "") + "SoundCloud";
  } else if (on) {
    title = p[1];
    sub = p[2];
  }
  return (
    <div>
      <div style={glass}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 15, fontWeight: 800, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
            {title}
          </div>
          <div style={{ fontSize: 13, color: "#e0607a", fontWeight: 600 }}>{sub}</div>
        </div>
        {on && !isSC && (
          <div style={{ display: "flex", alignItems: "center" }}>
            <span style={btn} onClick={() => ctl(app, "previous track")}>⏮</span>
            <span style={btn} onClick={() => ctl(app, "playpause")}>⏯</span>
            <span style={btn} onClick={() => ctl(app, "next track")}>⏭</span>
          </div>
        )}
      </div>
      {SHOW_PROFILE_PLAYER && (
        <div style={{ borderRadius: 26, overflow: "hidden", boxShadow: "0 10px 30px rgba(226,120,140,0.16)" }}>
          <iframe
            title="SoundCloud"
            width="100%"
            height="250"
            scrolling="no"
            frameBorder="no"
            style={{ display: "block", border: 0 }}
            src={"https://w.soundcloud.com/player/?url=" + encodeURIComponent(SOUNDCLOUD) + "&color=%23f07a93&auto_play=false&hide_related=true&show_comments=false&show_teaser=false&visual=false"}
          />
        </div>
      )}
    </div>
  );
};
