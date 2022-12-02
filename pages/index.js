import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { levels } from "../components/levels";
import MarbleGame from "../components/MarbleGame";

String.prototype.replaceAt = function (index, replacement) {
  return (
    this.substring(0, index) +
    replacement +
    this.substring(index + replacement.length)
  );
};

export default function Home() {
  const [level, setLevel] = useState(null);

  useEffect(() => {
    const params = new Proxy(new URLSearchParams(window.location.search), {
      get: (searchParams, prop) => searchParams.get(prop),
    });
    const { l: level } = params;
    if (Object.prototype.hasOwnProperty.call(levels, level)) {
      setLevel(level);
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
          <h1 className="title">Marble Solitaire</h1>

          <div className="gameContainer">
            <MarbleGame level={level || "classic"} />
          </div>
          <div className="instructions">
            <h2>Instructions</h2>
            <p>Marble solitaire is a simple game played on a grid board:</p>
            <img src="./demo.png" />
            <p>
              Marbles can jump over a neighbour marble into an empty slot and
              the marble that was jumped over is removed.
            </p>

            <p>
              The aim of the game is to{" "}
              <strong>remove all of the marbles except for one.</strong>
            </p>

            <p>
              You can select a marble by clicking or tapping it. You can then
              jump by clicking or tapping an empty hole.
            </p>
          </div>
        </main>

        <footer className="">
          <a
            href="https://john.shiksha"
            target="_blank"
            rel="noopener noreferrer"
          >
            by Rengwu
          </a>
        </footer>
      </div>
      <style jsx>{`
        .page {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .container {
          display: flex;
          flex-direction: column;
          align-items: center;
          max-width: 600px;
        }
        .title {
          font-size: 2.5rem;
          margin-top: 1rem;
          color: #053934;
          text-align: center;
        }

        .gameContainer {
          display: flex;
          width: 100%;
          max-width: min(100vw, 580px);
        }
        .instructions {
          margin-top: 2rem;
          text-align: center;
        }
      `}</style>
    </>
  );
}
