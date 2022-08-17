import { useEffect } from 'react';
import { ResponseProps } from '../data';

export default function ErrorPage({ status, message }: ResponseProps) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div
      style={{
        width: '100vw',
        height: '50rem',
      }}
    >
      {status === undefined && message === undefined ? (
        <div
          className="loading"
          style={{
            position: 'relative',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            textAlign: 'center',
          }}
        >
          <span />
          <span />
          <span />
        </div>
      ) : (
        <div
          style={{
            position: 'relative',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            textAlign: 'center',
          }}
        >
          <p
            className="urbanist"
            style={{
              fontSize: '10rem',
              // WebkitTextStroke: '5px var(--textBlack)',
              color: 'var(--textBlack)',
              fontWeight: 900,
              letterSpacing: '.5rem',
            }}
          >
            {status}
          </p>
          <p
            style={{
              fontSize: '1.8rem',
              color: 'var(--textBlack)',
              fontWeight: 600,
            }}
          >
            {message}
          </p>
        </div>
      )}
    </div>
  );
}
