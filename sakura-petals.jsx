// Pétales qui tombent doucement sur tout l'écran
export const refreshFrequency = false;
export const command = "echo";
export const className = `
  top: 0; left: 0; width: 100vw; height: 100vh; overflow: hidden; pointer-events: none;
`;
const KF = "@keyframes petalfall { from { transform: translate(0,-10vh) rotate(0deg); } to { transform: translate(90px,110vh) rotate(360deg); } }";
export const render = () => (
  <div>
    <style>{KF}</style>
    {Array.from({ length: 14 }).map((_, i) => (
      <div key={i} style={{
        position: "absolute", top: 0, left: (i * 7.3 + 3) % 100 + "%",
        width: 10 + (i % 4) * 3, height: 10 + (i % 4) * 3,
        background: "linear-gradient(135deg,#f8c6d1,#f07a93)", borderRadius: "0 100% 0 100%",
        opacity: 0.6, animation: "petalfall " + (14 + (i % 5) * 3) + "s linear " + (i * 1.7) + "s infinite",
      }} />
    ))}
  </div>
);
