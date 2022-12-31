import { slotChars, walls } from "./levels";
import { getRandomArbitrary } from "./utils";

export default function Cell({
  char,
  x,
  y,
  active,
  showOnlyWalls = false,
  ...rest
}) {
  return (
    <>
      <div className="cell" {...rest}>
        {showOnlyWalls && walls.includes(char) && (
          <div className="wall" style={wallStyleMap[char]}></div>
        )}
        {!showOnlyWalls && slotChars.includes(char) && (
          <div className="empty">
            <div></div>
          </div>
        )}
        {!showOnlyWalls && char === "o" && (
          <div className={`marble ${active && "active"}`}>
            <div></div>
          </div>
        )}
      </div>
      <style jsx>{`
        .cell {
          -webkit-tap-highlight-color: transparent;
          position: relative;
          aspect-ratio: 1;
          display: flex;
          width: 100%;
          align-items: center;
          justify-content: center;
          user-select: none;
        }

        .wall {
          background: #444;
          position: absolute;
        }
        .marble {
          position: absolute;
          width: 80%;
          height: 80%;
          border-radius: 50%;
          background: #008073;
          cursor: pointer;
          transition-duration: 90ms;
        }
        .marble.active {
          transform: scale(1.1);
          background: #039b8b;
          box-shadow: -3px 3px 15px -3px rgba(0, 0, 0, 0.6);
        }
        .marble > div {
          position: absolute;
          top: ${19}%;
          left: ${53}%;
          width: 40%;
          height: 40%;
          background: rgba(255, 255, 255, 0.5);
          border-radius: 50%;
          filter: blur(calc(min(100vw, 680px) / 70));
          transition-duration: 60ms;
        }
        .marble.active > div {
          top: ${15}%;
          left: ${45}%;
          width: 50%;
          height: 50%;
          background: rgba(255, 255, 255, 0.8);
          filter: blur(8px);
        }
        .empty {
          position: absolute;
          width: 80%;
          height: 80%;
          border-radius: 50%;
          background: #878787;
          cursor: pointer;
        }
        .empty > div {
          position: absolute;
          top: 28%;
          left: 17%;
          width: 55%;
          height: 55%;
          background: rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          filter: blur(calc(min(100vw, 680px) / 70));
        }
      `}</style>
    </>
  );
}

const wallStyleMap = {
  "#": {
    height: "100%",
    width: "100%",
  },
  "█": {
    height: "100%",
    width: "100%",
  },
  "▌": { height: "100%", width: "50%", left: "0" },
  "▐": { height: "100%", width: "50%", right: "0" },
  "▀": { height: "50%", width: "100%", top: "0" },
  "▄": { height: "50%", width: "100%", bottom: "0" },
  "▖": {
    left: "0",
    bottom: "0",
    height: "50%",
    width: "50%",
  },
  "▗": {
    bottom: "0",
    height: "50%",
    width: "50%",
    right: "0",
  },
  "▘": {
    left: "0",
    top: "0",
    height: "50%",
    width: "50%",
  },
  "▝": {
    top: "0",
    right: "0",
    height: "50%",
    width: "50%",
  },
  "▚": {
    height: "140%",
    width: "50%",
    transform: "rotate(-45deg)",
  },
  "▞": {
    height: "140%",
    width: "50%",
    transform: "rotate(45deg)",
  },
};
