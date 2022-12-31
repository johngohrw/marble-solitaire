import Head from "next/head";
import Router, { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  levels as levelsPreTransform,
  transformLevels,
} from "../components/levels";
import MarbleGame from "../components/MarbleGame";
import { lippyAwayCipher } from "../components/utils";
import { GiSpeaker, GiSpeakerOff } from "react-icons/gi";

const levels = transformLevels(levelsPreTransform);
const defaultLevel = "easy01";

String.prototype.replaceAt = function (index, replacement) {
  return (
    this.substring(0, index) +
    replacement +
    this.substring(index + replacement.length)
  );
};

export default function Home() {
  const [level, setLevel] = useState(null);
  const [isDev, setIsDev] = useState(false);
  const [allowSound, setAllowSound] = useState(true);
  const [showHelpOverlay, setShowHelpOverlay] = useState(false);
  const router = useRouter();

  // when router changes, set level
  // also check for devMode conditions
  useEffect(() => {
    const params = new Proxy(new URLSearchParams(window.location.search), {
      get: (searchParams, prop) => searchParams.get(prop),
    });
    const { l: level, d: devMode, lip } = params;
    if (Object.prototype.hasOwnProperty.call(levels, level)) {
      setLevel(level);
    }
    if (devMode && lip) {
      setIsDev(lippyAwayCipher(lip, devMode) === "ztr");
    }
  }, [router.asPath]);

  useEffect(() => {
    const alreadyVisited = localStorage.getItem("alreadyVisited");

    if (!alreadyVisited) {
      setShowHelpOverlay(true);
      localStorage.setItem("alreadyVisited", true);
    }
  }, []);

  return (
    <>
      <div className="page">
        <Head>
          <title>Marble Solitaire</title>
          <meta name="description" content="Marble Solitaire" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className="container">
          <img className="logo" src="./logo.svg" />
          <div style={{ marginBottom: "0.5rem", display: "flex" }}>
            <button
              className="button"
              style={{ marginLeft: "0.5rem" }}
              onClick={() => setShowHelpOverlay(true)}
            >
              How to play
            </button>

            <button
              className="button soundButton"
              style={{ marginLeft: "0.5rem" }}
              onClick={() => setAllowSound(!allowSound)}
            >
              {allowSound ? <GiSpeaker /> : <GiSpeakerOff />}
            </button>
            <button
              className="button"
              style={{ marginLeft: "0.5rem", background: "#5d3a95" }}
              onClick={() => {
                Router.push(window.location.origin + `?l=classic01`);
              }}
            >
              Classic Level
            </button>
          </div>

          <div className="gameContainer">
            <MarbleGame
              level={level || defaultLevel}
              devMode={isDev}
              soundEffects={allowSound}
            />
          </div>
        </main>

        <div className="overlay" onClick={() => setShowHelpOverlay(false)}>
          <div className="instructions">
            <h2>How to Play</h2>
            <p>Marble solitaire is a simple game played on a grid board:</p>
            <img
              src="./demo.png"
              style={{ background: "rgb(203, 204, 176)", borderRadius: "16px" }}
            />
            <p>
              Marbles can jump over a neighbouring marble into an empty slot and
              the marble that was jumped over is removed. You can jump
              horizontally and vertically.
            </p>

            <p>
              To win, you'll have to{" "}
              <strong>remove all marbles on the board except for one.</strong>
            </p>

            <p>
              You can select a marble by clicking or tapping it. You can then
              jump by clicking or tapping an empty slot.
            </p>
            <button
              className="button"
              onClick={() => setShowHelpOverlay(false)}
            >
              Got it
            </button>
          </div>
        </div>

        <footer className="footer">
          <a
            href="https://john.shiksha"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img className="credits" src="./byrengwu.svg" />
          </a>
          <a
            href="https://github.com/johngohrw/marble-solitaire"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img className="repo" src="./github.png" />
          </a>
        </footer>
      </div>
      <style jsx global>{`
        .button {
          background: #347e60;
          color: white;
          padding: 0.5rem 1rem;
          border-radius: 24px;
          cursor: pointer;
          border: 0;
        }
        .button:hover {
          background: #2672a9;
        }
        .button:disabled {
          background: gray;
        }
        .soundButton {
          padding: 0.1rem 0.5rem 0;
        }
        .soundButton svg {
          height: 24px;
          width: 24px;
        }
      `}</style>
      <style jsx>{`
        .page {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          position: relative;
        }
        .container {
          display: flex;
          flex-direction: column;
          align-items: center;
          max-width: 680px;
          width: 100%;
        }
        .title {
          font-size: 2.5rem;
          margin-top: 1rem;
          color: #053934;
          text-align: center;
        }
        .logo {
          height: 90px;
          margin: 0.5rem 0 1rem;
          max-width: 90vw;

          filter: invert(34%) sepia(39%) saturate(1910%) hue-rotate(139deg)
            brightness(94%) contrast(101%);
        }

        .gameContainer {
          display: flex;
          width: 100%;
          max-width: min(100vw, 100%);
        }

        .overlay {
          position: absolute;
          background: rgba(0, 0, 0, 0.5);
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          z-index: 10;

          transition-duration: 500ms;

          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;

          color: white;
          backdrop-filter: blur(10px);

          opacity: ${showHelpOverlay ? 1 : 0};
          user-select: none;
          pointer-events: ${showHelpOverlay ? "auto" : "none"};
        }

        .instructions {
          margin: 1.5rem;
          text-align: center;
          max-width: 500px;
        }

        .footer {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .credits {
          height: 30px;
          margin: 2.5rem 0 1rem;
          max-width: 90vw;

          filter: invert(34%) sepia(39%) saturate(1910%) hue-rotate(139deg)
            brightness(94%) contrast(101%);
        }
        .credits:hover {
          filter: invert(53%) sepia(70%) saturate(433%) hue-rotate(162deg)
            brightness(91%) contrast(91%);
        }

        .repo {
          height: 30px;
          margin: 0 0 2rem;
          max-width: 90vw;
          filter: invert(34%) sepia(39%) saturate(1910%) hue-rotate(139deg)
            brightness(94%) contrast(101%);
        }
        .repo:hover {
          filter: invert(53%) sepia(70%) saturate(433%) hue-rotate(162deg)
            brightness(91%) contrast(91%);
        }
      `}</style>
    </>
  );
}
