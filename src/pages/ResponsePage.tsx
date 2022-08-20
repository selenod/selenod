import { useEffect } from 'react';
import { ResponseProps } from '../data';
import Footer from '../components/system/footer';

export default function ErrorPage({ status, message }: ResponseProps) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
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
              style={{
                fontSize: '10rem',
                color: 'var(--textBlack)',
                fontWeight: 900,
                letterSpacing: '.5rem',
              }}
            >
              {status}
            </p>
            <p
              style={{
                position: 'relative',
                left: '50%',
                transform: 'translateX(-50%)',
                fontSize: '1.8rem',
                color: 'var(--textBlack)',
                fontWeight: 600,
                width: '80vw',
                wordBreak: 'break-all',
              }}
            >
              {message}
            </p>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
