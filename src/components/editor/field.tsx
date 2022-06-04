import './styles/field.css';

import { useEffect, useState } from 'react';
import { RootState } from '../../store';
import { useSelector } from 'react-redux';
import { imageExtensions, videoExtensions } from '../../data';
import Property from '../system/property';

interface IToolData {
  panelWidth: number;
}

export default function Field(data: IToolData) {
  const currentOpenedPanel = useSelector(
    (state: RootState) => state.asset.currentOpenedPanel
  );
  const assetData = useSelector((state: RootState) => state.asset.assetData);
  const toggle = useSelector((state: RootState) => state.window.toggle);
  const windowList = useSelector((state: RootState) => state.window.windowList);
  const currentWindow = useSelector(
    (state: RootState) => state.window.currentWindow
  );
  const currentElement = useSelector(
    (state: RootState) => state.window.currentElement
  );

  const [winHeight, setWinHeight] = useState<number>(window.innerHeight);

  useEffect(() => {
    window.addEventListener('resize', () => setWinHeight(window.innerHeight));
  }, []);

  return (
    <div
      className="Field"
      style={{
        position: 'relative',
        height: 'calc(100% - 40px)',
        width: `calc(100% - ${data.panelWidth}px - 70px)`,
        marginTop: 40,
        marginLeft: data.panelWidth + 70,
      }}
    >
      <div
        className="View"
        style={{
          width:
            toggle === 0 && currentElement !== undefined
              ? 'calc(100% - 350px)'
              : '100%',
        }}
      >
        {toggle === 0 ? (
          <div
            style={{
              position: 'relative',
              top:
                winHeight - 104 <=
                windowList.find((window) => window.id === currentWindow)
                  ?.windowData.height! /
                  2 +
                  35
                  ? 0
                  : '50%',
              left:
                document.body.offsetWidth - data.panelWidth - 70 <=
                windowList.find((window) => window.id === currentWindow)
                  ?.windowData.width! /
                  2
                  ? 0
                  : '50%',
              transform:
                document.body.offsetWidth - data.panelWidth - 70 <=
                windowList.find((window) => window.id === currentWindow)
                  ?.windowData.width! /
                  2
                  ? winHeight - 104 <=
                    windowList.find((window) => window.id === currentWindow)
                      ?.windowData.height! /
                      2 +
                      35
                    ? undefined
                    : 'translateY(-50%)'
                  : winHeight - 104 <=
                    windowList.find((window) => window.id === currentWindow)
                      ?.windowData.height! /
                      2 +
                      35
                  ? 'translateX(-50%)'
                  : 'translate(-50%, -50%)',
              width:
                windowList.find((window) => window.id === currentWindow)
                  ?.windowData.width! / 2,
              height:
                windowList.find((window) => window.id === currentWindow)
                  ?.windowData.height! /
                  2 +
                35,
              backgroundColor: 'white',
              borderRadius: 10,
              boxShadow: '0px 1px 40px 0px #00000005',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            <div
              style={{
                position: 'relative',
                width: '100%',
                height: 35,
                borderRadius: '10px 10px 0 0',
                backgroundColor: '#8052ff',
                zIndex: 1,
              }}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="#fff"
                style={{
                  position: 'relative',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  float: 'left',
                  left: 10,
                }}
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.523-1.943A5.977 5.977 0 0116 10c0 .34-.028.675-.083 1H15a2 2 0 00-2 2v2.197A5.973 5.973 0 0110 16v-2a2 2 0 00-2-2 2 2 0 01-2-2 2 2 0 00-1.668-1.973z"
                  clipRule="evenodd"
                />
              </svg>
              <p
                style={{
                  position: 'relative',
                  top: 'calc(50% - .5px)',
                  transform: 'translateY(-50%)',
                  float: 'left',
                  color: '#fff',
                  fontSize: '.9rem',
                  left: 17,
                  fontWeight: 500,
                  maxWidth: 'calc(100% - 170px)',
                  textOverflow: 'ellipsis',
                  overflow: 'hidden',
                  whiteSpace: 'nowrap',
                }}
              >
                {windowList.find((window) => window.id === currentWindow)?.name}
              </p>
              <svg
                width="10"
                height="10"
                fill="#fff"
                viewBox="0 0 10 10"
                style={{
                  position: 'relative',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  float: 'right',
                  right: 20,
                }}
              >
                <polygon points="10.2,0.7 9.5,0 5.1,4.4 0.7,0 0,0.7 4.4,5.1 0,9.5 0.7,10.2 5.1,5.8 9.5,10.2 10.2,9.5 5.8,5.1" />
              </svg>
              <svg
                width="10"
                height="10"
                fill="#fff"
                viewBox="0 0 10 10"
                style={{
                  position: 'relative',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  float: 'right',
                  right: 50,
                }}
              >
                <path d="M0,0v10h10V0H0z M9,9H1V1h8V9z" />
              </svg>
              <svg
                width="10"
                height="10"
                fill="#fff"
                x="0px"
                y="0px"
                viewBox="0 0 10.2 1"
                style={{
                  position: 'relative',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  float: 'right',
                  right: 80,
                }}
              >
                <rect x="0" y="50%" width="10.2" height="1" />
              </svg>
            </div>
            <div
              style={{
                position: 'absolute',
                width: '100%',
                height: 'calc(100% - 35px)',
                top: 35,
              }}
            >
              {windowList
                .find((window) => window.id === currentWindow)
                ?.elementData.map((element) => {
                  switch (element.type) {
                    case 'text':
                      return (
                        <pre
                          key={element.id}
                          style={{
                            position: 'absolute',
                            top: `calc(${
                              !isNaN(element.y as any)
                                ? `${element.y}px`
                                : element.y
                            })`,
                            left: !isNaN(element.x as any)
                              ? `${element.x}px`
                              : element.x,
                            fontSize: element.fontSize,
                            margin: 0,
                            color: element.color,
                            backgroundColor: element.backgroundColor,
                            transform: `translate(-${element.xAlign}%, -${element.yAlign}%)`,
                            zIndex: -1,
                          }}
                        >
                          {element.text}
                        </pre>
                      );
                    default:
                      return undefined;
                  }
                })}
            </div>
          </div>
        ) : toggle === 1 ? (
          <div>Script Panel</div>
        ) : assetData.find((asset) => asset.id === currentOpenedPanel)
            ?.extension !== undefined &&
          imageExtensions.includes(
            assetData
              .find((asset) => asset.id === currentOpenedPanel)
              ?.extension!.substr(1)!
          ) ? (
          <img
            src={
              assetData.find((asset) => asset.id === currentOpenedPanel)
                ?.contents
            }
            alt={
              assetData.find((asset) => asset.id === currentOpenedPanel)
                ?.name! +
              assetData.find((asset) => asset.id === currentOpenedPanel)
                ?.extension!
            }
            style={{
              position: 'relative',
              maxWidth: 512,
              maxHeight: 512,
              marginTop: '1rem',
              left: '50%',
              transform: 'translateX(-50%)',
              borderRadius: 7,
            }}
          />
        ) : assetData.find((asset) => asset.id === currentOpenedPanel)
            ?.extension !== undefined &&
          videoExtensions.includes(
            assetData
              .find((asset) => asset.id === currentOpenedPanel)
              ?.extension!.substr(1)!
          ) ? (
          <video
            controls
            style={{
              position: 'relative',
              maxWidth: 512,
              maxHeight: 512,
              marginTop: '1rem',
              left: '50%',
              transform: 'translateX(-50%)',
              borderRadius: 7,
            }}
          >
            <source
              src={
                assetData.find((asset) => asset.id === currentOpenedPanel)
                  ?.contents
              }
            />
          </video>
        ) : (
          <pre
            style={{
              position: 'relative',
              left: 20,
              color: 'var(--fieldTextColor)',
              fontSize: '1.05rem',
              textAlign: 'left',
              width: 'calc(100% - 30px)',
            }}
          >
            {currentOpenedPanel === null
              ? null
              : assetData.find((asset) => asset.id === currentOpenedPanel)
                  ?.contents}
          </pre>
        )}
      </div>
      {toggle === 0 && currentElement !== undefined ? (
        <div
          className="Inspector"
          style={{
            width: 350,
          }}
        >
          <div
            style={{
              width: 'calc(100% - 60px)',
              height: 33,
              margin: '12px 30px 0 30px',
              paddingBottom: 5,
            }}
          >
            <div
              className="hl"
              style={{
                position: 'relative',
                top: '100%',
              }}
            />
            {
              {
                text: (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="var(--shortcutIconColor)"
                    strokeWidth="2"
                    style={{
                      width: '1.2rem',
                      height: '1.2rem',
                      marginTop: 3.5,
                      float: 'left',
                    }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 6h16M4 12h16M4 18h7"
                    />
                  </svg>
                ),
                line: (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="var(--shortcutIconColor)"
                    strokeWidth="2"
                    style={{
                      width: '1.2rem',
                      height: '1.2rem',
                      marginTop: 3.5,
                      float: 'left',
                    }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"
                    />
                  </svg>
                ),
                image: (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="var(--shortcutIconColor)"
                    strokeWidth="2"
                    style={{
                      width: '1.2rem',
                      height: '1.2rem',
                      marginTop: 3.5,
                      float: 'left',
                    }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                ),
                video: (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="var(--shortcutIconColor)"
                    strokeWidth="2"
                    style={{
                      width: '1.2rem',
                      height: '1.2rem',
                      marginTop: 3.5,
                      float: 'left',
                    }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                    />
                  </svg>
                ),
                button: (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="var(--shortcutIconColor)"
                    strokeWidth="2"
                    style={{
                      width: '1.2rem',
                      height: '1.2rem',
                      marginTop: 3.5,
                      float: 'left',
                    }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"
                    />
                  </svg>
                ),
                toggle: (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="var(--shortcutIconColor)"
                    strokeWidth="2"
                    style={{
                      width: '1.2rem',
                      height: '1.2rem',
                      marginTop: 3.5,
                      float: 'left',
                    }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
                    />
                  </svg>
                ),
                'sl-input': (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="var(--shortcutIconColor)"
                    strokeWidth="2"
                    style={{
                      width: '1.2rem',
                      height: '1.2rem',
                      marginTop: 3.5,
                      float: 'left',
                    }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                    />
                  </svg>
                ),
                'ml-input': (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="var(--shortcutIconColor)"
                    strokeWidth="2"
                    style={{
                      width: '1.2rem',
                      height: '1.2rem',
                      marginTop: 3.5,
                      float: 'left',
                    }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                    />
                  </svg>
                ),
              }[
                windowList
                  .find((window) => window.id === currentWindow)!
                  .elementData.find((element) => element.id === currentElement)!
                  .type
              ]
            }
            <p
              style={{
                color: 'var(--shortcutIconColor)',
                fontWeight: 600,
                marginTop: 5,
                marginLeft: 7,
                float: 'left',
                maxWidth: 'calc(100% - 1.2rem - 7px)',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                fontSize: '.95rem',
              }}
            >
              {
                windowList
                  .find((window) => window.id === currentWindow)
                  ?.elementData.find((element) => element.id === currentElement)
                  ?.name
              }
            </p>
          </div>
          <Property
            curr={currentElement}
            type={
              windowList
                .find((window) => window.id === currentWindow)
                ?.elementData.find((element) => element.id === currentElement)
                ?.type!
            }
          />
        </div>
      ) : undefined}
    </div>
  );
}
