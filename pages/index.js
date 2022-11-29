import Head from "next/head";
import { useRouter } from "next/router";
import MarbleGame from "../components/MarbleGame";

String.prototype.replaceAt = function (index, replacement) {
  return (
    this.substring(0, index) +
    replacement +
    this.substring(index + replacement.length)
  );
};

export default function Home() {
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
            <MarbleGame />
          </div>
          <div className="instructions">
            <h2>Instructions</h2>
            <p>
              Marble solitaire is played on a board with a grid of 33 holes. At
              the start of the game there are marbles in every hole except for
              the central hole.
            </p>
            <img src="./demo.png" />
            <p>
              Marbles can jump vertically or horizontally over a neighbouring
              marble and into an empty hole on the other side. The marble that
              was jumped over is then removed: You can select a marble by
              clicking or tapping it. You can then jump by clicking or tapping
              an empty hole.
            </p>
            <p>
              The aim of the game is to remove all of the marbles except for
              one.
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
          max-width: 1000px;
        }
        .title {
          font-size: 2.5rem;
          margin-top: 1rem;
          color: #053934;
        }

        .gameContainer {
          display: flex;
        }
        .instructions {
          margin-top: 2rem;
          text-align: center;
        }
      `}</style>
    </>
  );
}
