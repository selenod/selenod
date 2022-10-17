import './styles/field.css';

import { useContext, useEffect, useState } from 'react';
import { RootState } from '../../store';
import { useDispatch, useSelector } from 'react-redux';
import { imageExtensions, nodeData, videoExtensions } from '../../data';
import Property from '../system/property';
import Ieum, { NodesObject } from '@ieum-lang/ieum';
import {
  editorDataContext,
  scriptContext,
  setEditorDataContext,
  setScriptContext,
} from '../..';
import { setScriptSaved } from '../system/reduxSlice/windowSlice';
import Edit from '@ieum-lang/ieum/dist/data/EditorData';
import DefaultTypes from '@ieum-lang/ieum/dist/data/type/DefaultTypes';

interface IToolData {
  panelWidth: number;
}

export default function Field(data: IToolData) {
  const scripts = useContext(scriptContext);
  const editorData = useContext(editorDataContext);
  const setScripts = useContext(setScriptContext);
  const setEditorData = useContext(setEditorDataContext);

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

  const dispatch = useDispatch();

  useEffect(() => {
    const handleResize = () => setWinHeight(window.innerHeight);
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
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
          position: 'relative',
          width:
            toggle === 0 && currentElement !== undefined
              ? 'calc(100% - 350px)'
              : '100%',
          overflow: toggle === 1 ? 'hidden' : 'auto',
          background: toggle === 0 ? '#fff' : undefined,
          backgroundColor:
            toggle === 0
              ? windowList.find((window) => window.id === currentWindow)
                  ?.windowData.themeColor
              : 'var(--editorColor)',
        }}
      >
        {toggle === 0 ? (
          <div
            style={{
              width: '100%',
              height: '100%',
              background: '#fff',
              backgroundColor: windowList.find(
                (window) => window.id === currentWindow
              )?.windowData.themeColor,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
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
                          left: `calc(${
                            !isNaN(element.x as any)
                              ? `${element.x}px`
                              : element.x
                          })`,
                          fontSize: element.fontSize,
                          fontWeight: element.fontWeight,
                          color: element.color,
                          margin: 0,
                          backgroundColor: element.backgroundColor,
                          transform: `translate(-${element.xAlign}%, -${
                            element.yAlign
                          }%) rotate(calc(${
                            !isNaN(element.rotation as any)
                              ? `${element.rotation}deg`
                              : element.rotation
                          }))`,
                          zIndex: element.index,
                        }}
                      >
                        {element.text}
                      </pre>
                    );
                  case 'line':
                    return (
                      <div
                        key={element.id}
                        style={{
                          position: 'absolute',
                          top: `calc(${
                            !isNaN(element.y as any)
                              ? `${element.y}px`
                              : element.y
                          })`,
                          left: `calc(${
                            !isNaN(element.x as any)
                              ? `${element.x}px`
                              : element.x
                          })`,
                          width: `calc(${
                            !isNaN(element.width as any)
                              ? `${element.width}px`
                              : element.width
                          })`,
                          height: `calc(${
                            !isNaN(element.height as any)
                              ? `${element.height}px`
                              : element.height
                          })`,
                          borderRadius: '1rem',
                          backgroundColor: element.backgroundColor,
                          transform: `translate(-${element.xAlign}%, -${
                            element.yAlign
                          }%) rotate(calc(${
                            !isNaN(element.rotation as any)
                              ? `${element.rotation}deg`
                              : element.rotation
                          }))`,
                          zIndex: element.index,
                        }}
                      />
                    );
                  case 'image':
                    return (
                      <img
                        key={element.id}
                        src={
                          assetData.find((asset) => asset.id === element.src)
                            ?.contents
                        }
                        alt=""
                        style={{
                          position: 'absolute',
                          top: `calc(${
                            !isNaN(element.y as any)
                              ? `${element.y}px`
                              : element.y
                          })`,
                          left: `calc(${
                            !isNaN(element.x as any)
                              ? `${element.x}px`
                              : element.x
                          })`,
                          width: `calc(${
                            !isNaN(element.width as any)
                              ? `${element.width}px`
                              : element.width
                          })`,
                          height: `calc(${
                            !isNaN(element.height as any)
                              ? `${element.height}px`
                              : element.height
                          })`,
                          transform: `translate(-${element.xAlign}%, -${
                            element.yAlign
                          }%) rotate(calc(${
                            !isNaN(element.rotation as any)
                              ? `${element.rotation}deg`
                              : element.rotation
                          }))`,
                          borderRadius: `calc(${
                            !isNaN(element.borderRadius as any)
                              ? `${element.borderRadius}px`
                              : element.borderRadius
                          })`,
                          zIndex: element.index,
                        }}
                      />
                    );
                  case 'video':
                    return (
                      <video
                        key={element.id}
                        poster={
                          assetData.find((asset) => asset.id === element.src)
                            ?.contents
                        }
                        style={{
                          position: 'absolute',
                          top: `calc(${
                            !isNaN(element.y as any)
                              ? `${element.y}px`
                              : element.y
                          })`,
                          left: `calc(${
                            !isNaN(element.x as any)
                              ? `${element.x}px`
                              : element.x
                          })`,
                          width: `calc(${
                            !isNaN(element.width as any)
                              ? `${element.width}px`
                              : element.width
                          })`,
                          height: `calc(${
                            !isNaN(element.height as any)
                              ? `${element.height}px`
                              : element.height
                          })`,
                          transform: `translate(-${element.xAlign}%, -${
                            element.yAlign
                          }%) rotate(calc(${
                            !isNaN(element.rotation as any)
                              ? `${element.rotation}deg`
                              : element.rotation
                          }))`,
                          borderRadius: `calc(${
                            !isNaN(element.borderRadius as any)
                              ? `${element.borderRadius}px`
                              : element.borderRadius
                          })`,
                          zIndex: element.index,
                        }}
                      >
                        <source
                          src={
                            assetData.find((asset) => asset.id === element.src)
                              ?.contents
                          }
                        />
                      </video>
                    );
                  case 'button':
                    return (
                      <div
                        key={element.id}
                        style={{
                          position: 'absolute',
                          top: `calc(${
                            !isNaN(element.y as any)
                              ? `${element.y}px`
                              : element.y
                          })`,
                          left: `calc(${
                            !isNaN(element.x as any)
                              ? `${element.x}px`
                              : element.x
                          })`,
                          width: `calc(${
                            !isNaN(element.width as any)
                              ? `${element.width}px`
                              : element.width
                          })`,
                          height: `calc(${
                            !isNaN(element.height as any)
                              ? `${element.height}px`
                              : element.height
                          })`,
                          transform: `translate(-${element.xAlign}%, -${
                            element.yAlign
                          }%) rotate(calc(${
                            !isNaN(element.rotation as any)
                              ? `${element.rotation}deg`
                              : element.rotation
                          }))`,
                          borderRadius: `calc(${
                            !isNaN(element.borderRadius as any)
                              ? `${element.borderRadius}px`
                              : element.borderRadius
                          })`,
                          backgroundColor: element.backgroundColor,
                          transition: 'ease-out background-color 100ms',
                          paddingLeft: 15,
                          paddingRight: 15,
                          minWidth: 70,
                          border: 0,
                          outline: 0,
                          color: element.color,
                          fontSize: element.fontSize,
                          fontWeight: element.fontWeight,
                          zIndex: element.index,
                        }}
                      >
                        <p
                          style={{
                            position: 'relative',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            textAlign: 'center',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            width: '100%',
                            margin: 0,
                          }}
                        >
                          {element.text}
                        </p>
                      </div>
                    );
                  case 'checkbox':
                    return (
                      <div
                        key={element.id}
                        style={{
                          position: 'absolute',
                          top: `calc(${
                            !isNaN(element.y as any)
                              ? `${element.y}px`
                              : element.y
                          })`,
                          left: `calc(${
                            !isNaN(element.x as any)
                              ? `${element.x}px`
                              : element.x
                          })`,
                          width: `calc(${
                            !isNaN(element.width as any)
                              ? `${element.width}px`
                              : element.width
                          })`,
                          height: `calc(${
                            !isNaN(element.width as any)
                              ? `${element.width}px`
                              : element.width
                          })`,
                          backgroundColor: element.backgroundColor,
                          transform: `translate(-${element.xAlign}%, -${
                            element.yAlign
                          }%) rotate(calc(${
                            !isNaN(element.rotation as any)
                              ? `${element.rotation}deg`
                              : element.rotation
                          }))`,
                          zIndex: element.index,
                          borderRadius: `calc(${
                            !isNaN(element.borderRadius as any)
                              ? `${element.borderRadius}px`
                              : element.borderRadius
                          })`,
                          boxSizing: 'border-box',
                          border: element.isChecked
                            ? undefined
                            : `1.5px solid ${element.borderColor}`,
                        }}
                      >
                        {element.isChecked ? (
                          <div
                            style={{
                              width: '100%',
                              height: '100%',
                              backgroundColor: element.color,
                              borderRadius: `calc(${
                                !isNaN(element.borderRadius as any)
                                  ? `${element.borderRadius}px`
                                  : element.borderRadius
                              })`,
                              cursor: 'pointer',
                            }}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill="#fff"
                              style={{
                                position: 'relative',
                              }}
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                        ) : null}
                      </div>
                    );
                  case 'sl-input':
                    return (
                      <input
                        key={element.id}
                        style={{
                          position: 'absolute',
                          top: `calc(${
                            !isNaN(element.y as any)
                              ? `${element.y}px`
                              : element.y
                          })`,
                          left: `calc(${
                            !isNaN(element.x as any)
                              ? `${element.x}px`
                              : element.x
                          })`,
                          width: `calc(${
                            !isNaN(element.width as any)
                              ? `${element.width}px`
                              : element.width
                          })`,
                          height: `calc(${
                            !isNaN(element.height as any)
                              ? `${element.height}px`
                              : element.height
                          })`,
                          transform: `translate(-${element.xAlign}%, -${
                            element.yAlign
                          }%) rotate(calc(${
                            !isNaN(element.rotation as any)
                              ? `${element.rotation}deg`
                              : element.rotation
                          }))`,
                          zIndex: element.index,
                          borderRadius: `calc(${
                            !isNaN(element.borderRadius as any)
                              ? `${element.borderRadius}px`
                              : element.borderRadius
                          })`,
                          boxSizing: 'border-box',
                          border: `1.5px solid ${element.borderColor}`,
                          fontSize: element.fontSize,
                          fontWeight: element.fontWeight,
                          color: element.color,
                        }}
                        type="text"
                        placeholder={element.text}
                        disabled
                      />
                    );
                  case 'ml-input':
                    return (
                      <textarea
                        key={element.id}
                        style={{
                          position: 'absolute',
                          top: `calc(${
                            !isNaN(element.y as any)
                              ? `${element.y}px`
                              : element.y
                          })`,
                          left: `calc(${
                            !isNaN(element.x as any)
                              ? `${element.x}px`
                              : element.x
                          })`,
                          width: `calc(${
                            !isNaN(element.width as any)
                              ? `${element.width}px`
                              : element.width
                          })`,
                          height: `calc(${
                            !isNaN(element.height as any)
                              ? `${element.height}px`
                              : element.height
                          })`,
                          transform: `translate(-${element.xAlign}%, -${
                            element.yAlign
                          }%) rotate(calc(${
                            !isNaN(element.rotation as any)
                              ? `${element.rotation}deg`
                              : element.rotation
                          }))`,
                          zIndex: element.index,
                          borderRadius: `calc(${
                            !isNaN(element.borderRadius as any)
                              ? `${element.borderRadius}px`
                              : element.borderRadius
                          })`,
                          boxSizing: 'border-box',
                          border: `1.5px solid ${element.borderColor}`,
                          fontSize: element.fontSize,
                          fontWeight: element.fontWeight,
                          color: element.color,
                        }}
                        placeholder={element.text}
                        disabled
                      />
                    );
                  default:
                    return undefined;
                }
              })}
          </div>
        ) : toggle === 1 ? (
          <div>
            <Ieum
              types={[
                ...DefaultTypes,
                {
                  name: 'enum',
                  elements: [
                    'No Element',
                    ...[
                      ...new Set(
                        windowList
                          .find((window) => window.id === currentWindow)
                          ?.elementData.map((data) => data.name)
                      ),
                    ],
                  ],
                  initialValue: 'No Element',
                  color: '#ffc53c',
                },
              ]}
              nodesData={nodeData}
              editorData={
                editorData!.find((data) => data.windowId === currentWindow)
                  ?.data
              }
              nodesObject={
                scripts!.find((script) => script.windowId === currentWindow)
                  ?.script
              }
              onEditorDataUpdated={(data: Edit) => {
                setEditorData!([
                  ...editorData.filter(
                    (data) => data.windowId !== currentWindow
                  ),
                  {
                    windowId: currentElement!,
                    data,
                  },
                ]);
              }}
              onNodesUpdated={(object: NodesObject) => {
                dispatch(setScriptSaved(false));

                setScripts!([
                  ...scripts.filter(
                    (script) => script.windowId !== currentWindow
                  ),
                  {
                    windowId: currentWindow!,
                    script: object,
                  },
                ]);
              }}
            />
          </div>
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
                checkbox: (
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
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
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
