import { useEffect } from 'react';
import { landingURL } from '../config/config';
import Footer from '../components/system/footer';

export default function Workspace() {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Workspace - Selenod';

    if (!localStorage.getItem('id') || !localStorage.getItem('nickname')) {
      window.location.href = landingURL;
    }
  }, []);

  return (
    <div
      style={{
        width: '100vw',
      }}
    >
      <div
        style={{
          width: '100vw',
          height: 'calc(100vh - 64px)',
          marginTop: 64,
          backgroundColor: 'var(--panelColor)',
        }}
      >
        <div
          style={{
            position: 'relative',
            width: 1060,
            height: 'calc(100% - 200px)',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        >
          <div
            style={{
              width: '100%',
              height: 40,
            }}
          >
            <p
              style={{
                position: 'relative',
                top: '50%',
                transform: 'translateY(-50%)',
                float: 'left',
                fontWeight: 800,
                fontSize: '1.5rem',
                color: 'var(--textBlackColor)',
              }}
            >
              Workspace
            </p>
            <div
              className="button primary"
              style={{
                textAlign: 'center',
                float: 'right',
              }}
            >
              <p
                style={{
                  position: 'relative',
                  top: '50%',
                  transform: 'translateY(-50%)',
                }}
              >
                New Project
              </p>
            </div>
          </div>
          <div
            style={{
              width: '100%',
              height: 50,
              marginTop: 40,
              borderBottom: '1px solid var(--lineColor)',
            }}
          >
            <div
              style={{
                height: '100%',
                width: 250,
                float: 'left',
                marginLeft: 50,
              }}
            >
              <p
                style={{
                  position: 'relative',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  textAlign: 'left',
                  color: 'var(--shortcutIconColor)',
                }}
              >
                Name
              </p>
            </div>
            <div
              style={{
                height: '100%',
                width: 200,
                float: 'left',
                marginLeft: 50,
              }}
            >
              <p
                style={{
                  position: 'relative',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  textAlign: 'left',
                  color: 'var(--shortcutIconColor)',
                }}
              >
                Create At
              </p>
            </div>
            <div
              style={{
                height: '100%',
                width: 200,
                float: 'left',
                marginLeft: 50,
              }}
            >
              <p
                style={{
                  position: 'relative',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  textAlign: 'left',
                  color: 'var(--shortcutIconColor)',
                }}
              >
                Modified At
              </p>
            </div>
          </div>
          <div
            style={{
              position: 'relative',
              width: '100%',
              height: 'calc(100% - 145px)',
              marginTop: 10,
            }}
          >
            {/* render project-stacks by using map() */}
            <div className="project-stack">
              <div
                style={{
                  marginLeft: 50,
                  width: 250,
                  height: '100%',
                  float: 'left',
                }}
              >
                <p
                  className="name"
                  style={{
                    position: 'relative',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    fontWeight: 600,
                    color: 'var(--textSubBlackColor)',
                    textAlign: 'left',
                    maxWidth: '100%',
                    fontSize: '1.1rem',
                  }}
                >
                  ProjectName
                </p>
              </div>
              <div
                style={{
                  marginLeft: 50,
                  width: 200,
                  height: '100%',
                  float: 'left',
                }}
              >
                <p
                  style={{
                    position: 'relative',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    fontWeight: 500,
                    color: 'var(--textGrayColor)',
                    textAlign: 'left',
                    maxWidth: '100%',
                  }}
                >
                  Aug 10, 2022
                </p>
              </div>
              <div
                style={{
                  marginLeft: 50,
                  width: 200,
                  height: '100%',
                  float: 'left',
                }}
              >
                <p
                  style={{
                    position: 'relative',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    fontWeight: 500,
                    color: 'var(--textGrayColor)',
                    textAlign: 'left',
                    maxWidth: '100%',
                  }}
                >
                  Aug 16, 2022
                </p>
              </div>
              <svg
                width="25"
                height="25"
                viewBox="0 0 25 25"
                fill="var(--textGrayColor)"
                xmlns="http://www.w3.org/2000/svg"
                style={{
                  position: 'relative',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  float: 'right',
                  marginRight: 50,
                  cursor: 'pointer',
                }}
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M11.25 2.5C11.0179 2.50012 10.7905 2.56485 10.5931 2.68694C10.3957 2.80903 10.2362 2.98365 10.1325 3.19125L9.2275 5H5C4.66848 5 4.35054 5.1317 4.11612 5.36612C3.8817 5.60054 3.75 5.91848 3.75 6.25C3.75 6.58152 3.8817 6.89946 4.11612 7.13388C4.35054 7.3683 4.66848 7.5 5 7.5V20C5 20.663 5.26339 21.2989 5.73223 21.7678C6.20107 22.2366 6.83696 22.5 7.5 22.5H17.5C18.163 22.5 18.7989 22.2366 19.2678 21.7678C19.7366 21.2989 20 20.663 20 20V7.5C20.3315 7.5 20.6495 7.3683 20.8839 7.13388C21.1183 6.89946 21.25 6.58152 21.25 6.25C21.25 5.91848 21.1183 5.60054 20.8839 5.36612C20.6495 5.1317 20.3315 5 20 5H15.7725L14.8675 3.19125C14.7638 2.98365 14.6043 2.80903 14.4069 2.68694C14.2095 2.56485 13.9821 2.50012 13.75 2.5H11.25ZM8.75 10C8.75 9.66848 8.8817 9.35054 9.11612 9.11612C9.35054 8.8817 9.66848 8.75 10 8.75C10.3315 8.75 10.6495 8.8817 10.8839 9.11612C11.1183 9.35054 11.25 9.66848 11.25 10V17.5C11.25 17.8315 11.1183 18.1495 10.8839 18.3839C10.6495 18.6183 10.3315 18.75 10 18.75C9.66848 18.75 9.35054 18.6183 9.11612 18.3839C8.8817 18.1495 8.75 17.8315 8.75 17.5V10ZM15 8.75C14.6685 8.75 14.3505 8.8817 14.1161 9.11612C13.8817 9.35054 13.75 9.66848 13.75 10V17.5C13.75 17.8315 13.8817 18.1495 14.1161 18.3839C14.3505 18.6183 14.6685 18.75 15 18.75C15.3315 18.75 15.6495 18.6183 15.8839 18.3839C16.1183 18.1495 16.25 17.8315 16.25 17.5V10C16.25 9.66848 16.1183 9.35054 15.8839 9.11612C15.6495 8.8817 15.3315 8.75 15 8.75Z"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
