export function Overlay({ visible, ...rest }) {
  return (
    <>
      <div className="overlay" {...rest}>
        {rest.onTriggerClose && (
          <button className="close" onClick={rest.onTriggerClose}>
            x
          </button>
        )}
        <div className="content">{rest.children}</div>
      </div>
      <style jsx>{`
        .overlay {
          position: fixed;
          background: rgba(0, 0, 0, 0.5);
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          z-index: 10;
          max-height: 100vh;
          width: 100%;

          display: flex;
          justify-content: center;
          align-items: center;

          transition-duration: 500ms;

          color: white;
          backdrop-filter: blur(10px);

          opacity: ${visible ? 1 : 0};
          user-select: none;
          pointer-events: ${visible ? "auto" : "none"};
        }
        .content {
          position: relative;
          display: flex;
          justify-content: center;
          width: 100%;
        }
        .close {
          position: absolute;
          top: 10px;
          right: 10px;
          z-index: 100;

          background: none;
          border: none;
          font-size: 32px;
          color: white;
          cursor: pointer;
        }
      `}</style>
    </>
  );
}
