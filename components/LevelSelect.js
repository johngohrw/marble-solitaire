import { useRouter } from "next/router";
import {
  emptyChars,
  getLevelID,
  levels as levelsBeforeTransform,
  slotChars,
  transformLevels,
  walls,
} from "./levels";
import { useEffect, useState } from "react";

const levels = levelsBeforeTransform;

export function LevelSelect({ closeOverlay, levelProgress }) {
  const router = useRouter();

  return (
    <>
      <div className="container">
        <div className="title">Level Select</div>
        <div className="mainLevelList">
          {Object.entries(levels).map(([categoryName, _levels]) => {
            return (
              <div className="category" key={categoryName}>
                <div className="categoryTitle">{categoryName}</div>
                <div className="levelList">
                  {Object.entries(_levels).map(([level, state]) => {
                    const levelID = getLevelID(categoryName, parseInt(level));
                    return (
                      <LevelItem
                        key={levelID}
                        onClick={() => {
                          router.push(window.location.origin + `?l=` + levelID);
                          if (closeOverlay) {
                            closeOverlay();
                          }
                        }}
                        state={state}
                        name={levelID}
                        completed={levelProgress && levelProgress[levelID]}
                      />
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <style jsx>{`
        .container {
          max-width: 1000px;
          width: 100%;
          max-height: 100vh;
          padding: 2rem 2rem;
          overflow-y: scroll;
        }
        .container::-webkit-scrollbar {
          display: none;
        }
        .title {
          font-size: 1.6rem;
          font-weight: 600;
          display: flex;
          justify-content: center;
          margin-bottom: 1.5rem;
        }
        .mainLevelList {
          display: flex;
          flex-direction: column;
        }
        .category {
          margin-bottom: 1rem;
        }
        .categoryTitle {
          font-size: 1.5rem;
          font-weight: 700;
          text-transform: capitalize;
          margin: 1rem 0 1rem;
        }
        .levelList {
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          gap: 0.5rem;
        }
      `}</style>
    </>
  );
}

function LevelItem({ state, name, completed, onClick, ...rest }) {
  return (
    <>
      <div className="container" onClick={onClick}>
        <div className="tag">{name}</div>
        {completed && <div className="complete">complete</div>}
        <div className="state">
          {state.map((row, i) => (
            <div className="row" key={`${row}${i}`}>
              {row.split("").map((char, j) => getCell(char, j))}
            </div>
          ))}
        </div>
      </div>
      <style jsx>{`
        .container {
          width: 120px;
          height: 120px;
          border-radius: 4px;
          overflow: hidden;

          position: relative;
          cursor: pointer;

          transition-duration: 200ms;
        }
        .container:hover {
          transform: scale(1.1);
        }
        .tag {
          position: absolute;
          top: 6px;
          left: 6px;
          background: rgba(0, 0, 0, 0.5);
          border-radius: 4px;
          padding: 0.1rem 0.3rem;
          font-size: 12px;
        }
        .complete {
          position: absolute;

          display: flex;
          align-items: center;
          justify-content: center;

          height: 100%;
          width: 100%;

          font-size: 12px;

          background: rgba(0, 0, 0, 0.6);
        }
        .state {
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;

          background: rgba(255, 255, 255, 0.4);
        }
        .row {
          width: 100%;
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
        }
      `}</style>
      <style global jsx>
        {`
          .minicell {
            width: 8px;
            height: 8px;
          }
          .minicell.wall {
            background: #333;
          }
          .minicell.marble {
            background: #076a60;
            border-radius: 50%;
          }
        `}
      </style>
    </>
  );
}

const getCell = (char, key) => {
  if (walls.includes(char)) {
    return <div key={`${key}${char}`} className="minicell wall" />;
  }
  if (emptyChars.includes(char)) {
    return <div key={`${key}${char}`} className="minicell empty" />;
  }
  if (slotChars.includes(char)) {
    return <div key={`${key}${char}`} className="minicell slot" />;
  }
  if (char === "o") {
    return <div key={`${key}${char}`} className="minicell marble" />;
  }
  return <div key={`${key}${char}`} className="minicell" />;
};
