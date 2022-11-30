import { slotChars, walls } from "./levels";

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
          <div className="wall" style={wallStyleMap[char]} />
        )}
        {!showOnlyWalls && slotChars.includes(char) && (
          <div className="empty" />
        )}
        {!showOnlyWalls && char === "o" && (
          <div className={`marble ${active && "active"}`} />
        )}
      </div>
      <style jsx>{`
        .cell {
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
        }

        .marble.active {
          border: 3px solid black;
        }
        .empty {
          position: absolute;
          width: 80%;
          height: 80%;
          border-radius: 50%;
          background: #8b8b8b;
          cursor: pointer;
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
