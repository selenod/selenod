import './styles/tool.css';

import { useState, useEffect, useRef, ReactElement } from 'react';
import { RootState } from '../../store';
import { Resizable } from 're-resizable';
import { Popover } from 'react-tiny-popover';
import { useSelector, useDispatch } from 'react-redux';
import { setTrue, setFalse } from '../system/reduxSlice/coverSlice';
import { createElement } from '../system/reduxSlice/windowSlice';
import {
  addAsset,
  addData,
  togglePanelOpened,
  deleteAssetById,
  renameAsset,
} from '../system/reduxSlice/assetSlice';
import { FileDrop } from 'react-file-drop';
import toast from 'react-hot-toast';
import Modal from 'react-modal';

import Active from './active';
import Field from './field';
import { PopContent } from '../system/popcontent';
import {
  ContentType,
  AssetType,
  imageExtensions,
  videoExtensions,
  ElementType,
} from '../../data';
import { createWindow, setCurrWin } from '../system/reduxSlice/windowSlice';

Modal.setAppElement('#root');

export default function Tool() {
  interface IPnlSize {
    width: number;
    height: string;
  }

  const isClicked = useSelector((state: RootState) => state.cover.clicked);
  const windowList = useSelector((state: RootState) => state.window.windowList);
  const assetList = useSelector((state: RootState) => state.asset.assetList);
  const assetData = useSelector((state: RootState) => state.asset.assetData);
  const currentWindow = useSelector(
    (state: RootState) => state.window.currentWindow
  );
  const assetLength = useSelector(
    (state: RootState) => state.asset.assetLength
  );

  if (
    windowList.find(
      (w) => w.id === parseInt(window.sessionStorage.getItem('current_window')!)
    ) === undefined
  ) {
    window.sessionStorage.setItem('current_window', '0');
  }

  const [pnlCase, setPnlCase] = useState<number | null>(0);
  const [pnlSize, setPnlSize] = useState<IPnlSize>({
    width: 380,
    height: '100%',
  });

  // For Progress component
  const [prgWidth, setPrgWidth] = useState<number>(380);
  const [shortcutColor, setShortcutColor] = useState<string[]>([
    '#ffffff00',
    '#ffffff00',
    '#ffffff00',
  ]);
  const [pnlDisplay, setPnlDisplay] = useState<string>('block');
  const [formDisable, setFormDisable] = useState<boolean>(false);
  const [pnlComponent, setPnlComponent] = useState<ReactElement | null>(null);
  const [winOpenId, setWinOpenId] = useState<number>();
  const [assetRenameWinOpenId, setAssetRenameWinOpenId] = useState<number>();
  const [showPopover, setShowPopover] = useState<{
    option?: boolean;
    windowMgr?: boolean;
  }>({
    option: false,
    windowMgr: false,
  });
  const [showNodePopover, setShowNodePopover] = useState<boolean>(false);
  const [showAssetPopover, setShowAssetPopover] = useState<number>();
  const [formInput, setFormInput] = useState<string>('');
  const [assetFormInput, setAssetFormInput] = useState<string>('');
  const [assetFormContents, setAssetFormContents] = useState<string>('');

  const assetInput = useRef<any>(null);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      setCurrWin(
        window.sessionStorage.getItem('current_window') !== null
          ? parseInt(window.sessionStorage.getItem('current_window')!)
          : windowList[0].id
      )
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Detect panel index changing
  useEffect(() => {
    switch (pnlCase) {
      case null:
        setPnlDisplay('none');
        setPrgWidth(0);
        break;
      case 0:
        // Explore panel
        setPnlComponent(
          <nav>
            <div>
              <div className="hl" />
              <p style={{ color: 'var(--shortcutIconColor)', fontWeight: 800 }}>
                Explore
              </p>
            </div>
            <nav className="pnl-explore">
              <Popover
                isOpen={showPopover.windowMgr as boolean}
                positions={['bottom']}
                padding={5}
                align="start"
                reposition={false}
                onClickOutside={() => {
                  if (isClicked) {
                    dispatch(setFalse());
                    setShowPopover({
                      windowMgr: false,
                    });
                  }
                }}
                content={() => (
                  <PopContent
                    isSelection={true}
                    cacheKey="current_window"
                    contents={windowList.map((window) => ({
                      text: window.name,
                      id: window.id,
                      selected: windowList.indexOf(window) === 0 ? true : false,
                      onClick: () => {
                        dispatch(setCurrWin(window.id));
                        dispatch(setFalse());
                        setShowPopover({
                          windowMgr: false,
                        });
                      },
                    }))}
                  />
                )}
              >
                <div
                  style={{
                    backgroundColor: 'var(--panelPathColor)',
                    maxWidth: 'calc(100% - 98px)',
                    float: 'left',
                  }}
                  className="mgr-window tool-btn"
                  title="Manage Windows"
                  onClick={() => {
                    dispatch(
                      showPopover.windowMgr
                        ? dispatch(setFalse())
                        : dispatch(setTrue())
                    );
                    setShowPopover({
                      windowMgr: !showPopover.windowMgr,
                    });
                  }}
                >
                  <p
                    style={{
                      display: 'block',
                      color: 'var(--textGrayColor)',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                      paddingRight: '21px',
                    }}
                  >
                    MyProject/
                    {
                      windowList.find((window) => currentWindow === window.id)!
                        .name
                    }
                  </p>
                  <svg
                    style={{
                      float: 'right',
                      marginTop: '-7px',
                    }}
                    xmlns="http://www.w3.org/2000/svg"
                    width="12.5"
                    height="12.5"
                    fill="var(--textGrayColor)"
                    viewBox="0 0 16 16"
                  >
                    <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
                  </svg>
                </div>
              </Popover>
              <Popover
                isOpen={showNodePopover}
                positions={['bottom']}
                padding={5}
                align="start"
                reposition={false}
                onClickOutside={() => {
                  setShowNodePopover(false);
                  dispatch(setFalse());
                }}
                content={() => (
                  <PopContent
                    isScrollable={true}
                    width={300}
                    height={350}
                    contents={[
                      {
                        text: 'BASIC',
                        type: ContentType.CATEGORY,
                      },
                      {
                        text: 'Text',
                        onClick: () => {
                          dispatch(
                            createElement({
                              name: `Text ${
                                windowList
                                  .find((window) => window.id === currentWindow)
                                  ?.elementData.filter(
                                    (element) =>
                                      element.type === ElementType.TEXT
                                  ).length! + 1
                              }`,
                              type: ElementType.TEXT,
                            })
                          );
                          setShowNodePopover(false);
                          dispatch(setFalse());
                        },
                      },
                      {
                        text: 'Line',
                        onClick: () => {
                          dispatch(
                            createElement({
                              name: `Line ${
                                windowList
                                  .find((window) => window.id === currentWindow)
                                  ?.elementData.filter(
                                    (element) =>
                                      element.type === ElementType.LINE
                                  ).length! + 1
                              }`,
                              type: ElementType.LINE,
                            })
                          );
                          setShowNodePopover(false);
                          dispatch(setFalse());
                        },
                      },
                      {
                        text: 'Sprite',
                        onClick: () => {
                          dispatch(
                            createElement({
                              name: `Sprite ${
                                windowList
                                  .find((window) => window.id === currentWindow)
                                  ?.elementData.filter(
                                    (element) =>
                                      element.type === ElementType.SPRITE
                                  ).length! + 1
                              }`,
                              type: ElementType.SPRITE,
                            })
                          );
                          setShowNodePopover(false);
                          dispatch(setFalse());
                        },
                      },
                      {
                        type: ContentType.LINE,
                      },
                      {
                        text: 'ASSET',
                        type: ContentType.CATEGORY,
                      },
                      {
                        text: 'Image',
                        onClick: () => {
                          dispatch(
                            createElement({
                              name: `Image ${
                                windowList
                                  .find((window) => window.id === currentWindow)
                                  ?.elementData.filter(
                                    (element) =>
                                      element.type === ElementType.IMAGE
                                  ).length! + 1
                              }`,
                              type: ElementType.IMAGE,
                            })
                          );
                          setShowNodePopover(false);
                          dispatch(setFalse());
                        },
                      },
                      {
                        text: 'Video',
                        onClick: () => {
                          dispatch(
                            createElement({
                              name: `Video ${
                                windowList
                                  .find((window) => window.id === currentWindow)
                                  ?.elementData.filter(
                                    (element) =>
                                      element.type === ElementType.VIDEO
                                  ).length! + 1
                              }`,
                              type: ElementType.VIDEO,
                            })
                          );
                          setShowNodePopover(false);
                          dispatch(setFalse());
                        },
                      },
                      {
                        type: ContentType.LINE,
                      },
                      {
                        text: 'INPUT',
                        type: ContentType.CATEGORY,
                      },
                      {
                        text: 'Button',
                        onClick: () => {
                          dispatch(
                            createElement({
                              name: `Button ${
                                windowList
                                  .find((window) => window.id === currentWindow)
                                  ?.elementData.filter(
                                    (element) =>
                                      element.type === ElementType.BUTTON
                                  ).length! + 1
                              }`,
                              type: ElementType.BUTTON,
                            })
                          );
                          setShowNodePopover(false);
                          dispatch(setFalse());
                        },
                      },
                      {
                        text: 'Toggle',
                        onClick: () => {
                          dispatch(
                            createElement({
                              name: `Toggle ${
                                windowList
                                  .find((window) => window.id === currentWindow)
                                  ?.elementData.filter(
                                    (element) =>
                                      element.type === ElementType.TOGGLE
                                  ).length! + 1
                              }`,
                              type: ElementType.TOGGLE,
                            })
                          );
                          setShowNodePopover(false);
                          dispatch(setFalse());
                        },
                      },
                      {
                        text: 'Single-Line Input',
                        onClick: () => {
                          dispatch(
                            createElement({
                              name: `Single-Line Input ${
                                windowList
                                  .find((window) => window.id === currentWindow)
                                  ?.elementData.filter(
                                    (element) =>
                                      element.type === ElementType.SLINPUT
                                  ).length! + 1
                              }`,
                              type: ElementType.SLINPUT,
                            })
                          );
                          setShowNodePopover(false);
                          dispatch(setFalse());
                        },
                      },
                      {
                        text: 'Multiple-Line Input',
                        onClick: () => {
                          dispatch(
                            createElement({
                              name: `Multiple-Line Input ${
                                windowList
                                  .find((window) => window.id === currentWindow)
                                  ?.elementData.filter(
                                    (element) =>
                                      element.type === ElementType.MLINPUT
                                  ).length! + 1
                              }`,
                              type: ElementType.MLINPUT,
                            })
                          );
                          setShowNodePopover(false);
                          dispatch(setFalse());
                        },
                      },
                    ]}
                  />
                )}
              >
                <div
                  className="tool-btn"
                  title="Create Element"
                  style={{
                    float: 'right',
                    backgroundColor: 'var(--panelPathColor)',
                    width: 30,
                    height: 30,
                  }}
                  onClick={() => {
                    dispatch(
                      showNodePopover
                        ? dispatch(setFalse())
                        : dispatch(setTrue())
                    );
                    setShowNodePopover(true);
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    style={{
                      position: 'relative',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                    }}
                    width="17"
                    height="17"
                    viewBox="0 0 20 20"
                    fill="var(--textGrayColor)"
                  >
                    <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM14 11a1 1 0 011 1v1h1a1 1 0 110 2h-1v1a1 1 0 11-2 0v-1h-1a1 1 0 110-2h1v-1a1 1 0 011-1z" />
                  </svg>
                </div>
              </Popover>
              <div
                className="tool-btn"
                title="Create New Window"
                style={{
                  float: 'left',
                  backgroundColor: 'var(--panelPathColor)',
                  width: 30,
                  height: 30,
                  marginLeft: 7,
                }}
                onClick={() => setWinOpenId(0)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  style={{
                    position: 'relative',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                  }}
                  width="17"
                  height="17"
                  viewBox="0 0 20 20"
                  fill="var(--textGrayColor)"
                >
                  <path
                    fillRule="evenodd"
                    d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V8a2 2 0 00-2-2h-5L9 4H4zm7 5a1 1 0 10-2 0v1H8a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V9z"
                  />
                </svg>
              </div>
              <Modal
                closeTimeoutMS={150}
                isOpen={winOpenId === 0}
                contentLabel="Create New Window"
                style={{
                  content: {
                    width: '400px',
                  },
                }}
              >
                <div className="header">
                  <p>Create New Window</p>
                  <div title="Cancel" onClick={() => setWinOpenId(undefined)}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="27"
                      height="27"
                      fill="var(--shortcutIconColor)"
                      className="bi bi-x"
                      viewBox="0 0 16 16"
                    >
                      <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                    </svg>
                  </div>
                </div>
                <div className="body">
                  <div
                    style={{
                      position: 'relative',
                      top: 20,
                      left: '50%',
                      transform: 'translateX(-50%)',
                    }}
                  >
                    <p
                      style={{
                        margin: 0,
                        color: 'var(--textSubBlackColor)',
                        paddingBottom: '.7rem',
                      }}
                    >
                      Create new window named..
                    </p>
                    <input
                      style={{
                        width: '100%',
                        margin: '0 0 1rem 0',
                        fontSize: '.9rem',
                      }}
                      onChange={(e) => {
                        setFormInput(e.target.value);
                      }}
                    />
                    <button
                      className="button primary"
                      style={{
                        display: 'inherit',
                        marginLeft: 'auto',
                        marginBottom: 40,
                      }}
                      disabled={formDisable}
                      onClick={() => {
                        // two-factor (who knows?)
                        setFormDisable(true);

                        if (formInput.replaceAll(' ', '') !== '') {
                          if (
                            windowList.find(
                              (window) => window.name === formInput
                            )
                          ) {
                            toast.error(
                              `There's already a window with the same name.`
                            );
                            setWinOpenId(undefined);
                            setFormDisable(false);
                            setFormInput('');
                            return false;
                          }

                          dispatch(createWindow(formInput));
                          toast.success(`The window has been created.`);
                        } else if (formInput.replaceAll(' ', '') === '') {
                          toast.error(`Window's name cannot be blank.`);
                        } else {
                          toast.error(`An error occured.`);
                        }
                        setWinOpenId(undefined);
                        setFormDisable(false);
                        setFormInput('');
                      }}
                    >
                      Create Window
                    </button>
                  </div>
                </div>
              </Modal>
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  height: 'calc(100% - 72px)', //bottom: 25px
                  top: 11,
                  overflow: 'auto',
                }}
              >
                {windowList
                  .find((window) => window.id === currentWindow)
                  ?.elementData.map((element) => (
                    <div key={element.id}>
                      <div
                        className="asset"
                        onClick={(e) => {
                          e.preventDefault();
                        }}
                        // style={{
                        //   backgroundColor:
                        //     showAssetPopover === asset.id
                        //       ? 'var(--panelPathColor)'
                        //       : undefined,
                        // }}
                      >
                        <div title={`${element.name}`}>
                          {
                            {
                              text: (
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  style={{
                                    width: '1.1rem',
                                    height: '1.1rem',
                                    marginTop: -1.5,
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
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  style={{
                                    width: '1.1rem',
                                    height: '1.1rem',
                                    marginTop: -1.5,
                                  }}
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"
                                  />
                                </svg>
                              ),
                              sprite: (
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  style={{
                                    width: '1.1rem',
                                    height: '1.1rem',
                                    marginTop: -1.5,
                                  }}
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                                  />
                                </svg>
                              ),
                              image: (
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  style={{
                                    width: '1.1rem',
                                    height: '1.1rem',
                                    marginTop: -1.5,
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
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  style={{
                                    width: '1.1rem',
                                    height: '1.1rem',
                                    marginTop: -1.5,
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
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  style={{
                                    width: '1.1rem',
                                    height: '1.1rem',
                                    marginTop: -1.5,
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
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  style={{
                                    width: '1.1rem',
                                    height: '1.1rem',
                                    marginTop: -1.5,
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
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  style={{
                                    width: '1.1rem',
                                    height: '1.1rem',
                                    marginTop: -1.5,
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
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  style={{
                                    width: '1.1rem',
                                    height: '1.1rem',
                                    marginTop: -1.5,
                                  }}
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                                  />
                                </svg>
                              ),
                            }[element.type]
                          }
                          <p
                            style={{
                              width: 'calc(100% - 43px)',
                              height: '100%',
                              overflow: 'hidden',
                              whiteSpace: 'nowrap',
                              textOverflow: 'ellipsis',
                            }}
                          >
                            {element.name}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </nav>
          </nav>
        );
        setPnlDisplay('block');
        setPrgWidth(pnlSize.width);
        break;
      case 1:
        // Asset panel
        setPnlComponent(
          <nav>
            <div>
              <div className="hl" />
              <p style={{ color: 'var(--shortcutIconColor)', fontWeight: 800 }}>
                Asset
              </p>
            </div>
            <nav className="pnl-asset">
              <p
                style={{
                  width: 'calc(100% - 90px)',
                  color: 'var(--shortcutIconColor)',
                  float: 'left',
                  marginTop: 11.6,
                  fontSize: '.9rem',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  fontWeight: 500,
                }}
              >
                Remaining Assets: {100 - assetLength} / {100}
              </p>
              <input
                type="file"
                ref={assetInput}
                style={{ display: 'none' }}
                onChange={async (event) => {
                  if (100 - assetLength - event.target.files!.length < 0) {
                    toast.error(
                      'The upload has been canceled because the upload exceeds the number of assets remaining.'
                    );
                  } else {
                    for (
                      let i = 0, index = assetLength;
                      i < event.target.files!.length;
                      i++
                    ) {
                      index++;

                      const reader = new FileReader();

                      reader.addEventListener('load', () => {
                        dispatch(
                          addAsset({
                            id: index === 1 ? 0 : assetData[index - 2].id + 1,
                          })
                        );

                        dispatch(
                          addData({
                            name: event.target.files![i].name.includes('.')
                              ? event.target.files![i].name.substr(
                                  0,
                                  event.target.files![i].name.lastIndexOf('.')
                                )
                              : event.target.files![i].name,
                            id: index === 1 ? 0 : assetData[index - 2].id + 1,
                            type: AssetType.FILE,
                            extension: event.target.files![i].name.includes('.')
                              ? event.target.files![i].name.substr(
                                  event.target.files![i].name.lastIndexOf('.')
                                )
                              : '',
                            contents: reader.result as string,
                          })
                        );
                      });

                      if (
                        event.target.files![i].name.includes('.') &&
                        (imageExtensions.includes(
                          event.target.files![i].name.substr(
                            event.target.files![i].name.lastIndexOf('.') + 1
                          )
                        ) ||
                          videoExtensions.includes(
                            event.target.files![i].name.substr(
                              event.target.files![i].name.lastIndexOf('.') + 1
                            )
                          ))
                      ) {
                        reader.readAsDataURL(event.target.files![i]);
                      } else {
                        reader.readAsText(event.target.files![i]);
                      }
                    }
                  }
                }}
                multiple
              />
              <div
                className="tool-btn"
                title="Upload File From Local"
                style={{
                  float: 'right',
                  backgroundColor: 'var(--panelPathColor)',
                  width: 30,
                  height: 30,
                }}
                onClick={() => assetInput.current.click()}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  style={{
                    position: 'relative',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                  }}
                  width="17"
                  height="17"
                  viewBox="0 0 20 20"
                  fill="var(--textGrayColor)"
                >
                  <path d="M5.5 13a3.5 3.5 0 01-.369-6.98 4 4 0 117.753-1.977A4.5 4.5 0 1113.5 13H11V9.413l1.293 1.293a1 1 0 001.414-1.414l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13H5.5z" />
                  <path d="M9 13h2v5a1 1 0 11-2 0v-5z" />
                </svg>
              </div>
              <div
                className="tool-btn"
                title="Create Asset"
                style={{
                  float: 'right',
                  backgroundColor: 'var(--panelPathColor)',
                  width: 30,
                  height: 30,
                  marginRight: 7,
                }}
                onClick={() => setWinOpenId(1)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  style={{
                    position: 'relative',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                  }}
                  width="17"
                  height="17"
                  viewBox="0 0 20 20"
                  fill="var(--textGrayColor)"
                >
                  <path
                    fillRule="evenodd"
                    d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V8z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <Modal
                closeTimeoutMS={150}
                isOpen={winOpenId === 1}
                contentLabel="Create New Asset"
                style={{
                  content: {
                    width: '400px',
                  },
                }}
              >
                <div className="header">
                  <p>Create New Asset</p>
                  <div title="Cancel" onClick={() => setWinOpenId(undefined)}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="27"
                      height="27"
                      fill="var(--shortcutIconColor)"
                      className="bi bi-x"
                      viewBox="0 0 16 16"
                    >
                      <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                    </svg>
                  </div>
                </div>
                <div className="body">
                  <div
                    style={{
                      position: 'relative',
                      top: 20,
                      left: '50%',
                      transform: 'translateX(-50%)',
                    }}
                  >
                    <p
                      style={{
                        margin: 0,
                        color: 'var(--textSubBlackColor)',
                        paddingBottom: '.7rem',
                      }}
                    >
                      Create new asset named..
                    </p>
                    <input
                      style={{
                        width: '100%',
                        margin: '0 0 1rem 0',
                        fontSize: '.9rem',
                      }}
                      onChange={(e) => {
                        setAssetFormInput(e.target.value);
                      }}
                      placeholder="asset_name.txt"
                    />
                    <p
                      style={{
                        margin: 0,
                        color: 'var(--textSubBlackColor)',
                        paddingBottom: '.7rem',
                        marginTop: 5,
                      }}
                    >
                      and its contents..
                    </p>
                    <textarea
                      style={{
                        width: '100%',
                        height: 173,
                        margin: '0 0 1rem 0',
                        fontSize: '.9rem',
                      }}
                      onChange={(e) => {
                        setAssetFormContents(e.target.value);
                      }}
                      placeholder="Type something awesome here.."
                    />
                    <button
                      className="button primary"
                      style={{
                        display: 'inherit',
                        marginLeft: 'auto',
                        marginBottom: 40,
                      }}
                      disabled={formDisable}
                      onClick={() => {
                        // two-factor (who knows?)
                        setFormDisable(true);

                        if (assetFormInput.replaceAll(' ', '') !== '') {
                          if (
                            assetFormInput.includes('\\') ||
                            assetFormInput.includes('/') ||
                            assetFormInput.includes(':') ||
                            assetFormInput.includes('*') ||
                            assetFormInput.includes('?') ||
                            assetFormInput.includes('"') ||
                            assetFormInput.includes('<') ||
                            assetFormInput.includes('>') ||
                            assetFormInput.includes('|')
                          ) {
                            toast.error(
                              `The asset's name cannot include \\, /, :, *, ?, ", <, >, |`
                            );
                          } else {
                            dispatch(
                              addAsset({
                                id:
                                  assetLength === 0
                                    ? 0
                                    : assetData[assetLength - 1].id + 1,
                              })
                            );

                            dispatch(
                              addData({
                                name: assetFormInput.includes('.')
                                  ? assetFormInput.substr(
                                      0,
                                      assetFormInput.lastIndexOf('.')
                                    )
                                  : assetFormInput,
                                id:
                                  assetLength === 0
                                    ? 0
                                    : assetData[assetLength - 1].id + 1,
                                type: AssetType.FILE,
                                extension: assetFormInput.includes('.')
                                  ? assetFormInput.substr(
                                      assetFormInput.lastIndexOf('.')
                                    )
                                  : '',
                                contents: assetFormContents,
                              })
                            );
                            toast.success(`The asset has been created.`);
                          }
                        } else if (assetFormInput.replaceAll(' ', '') === '') {
                          toast.error(`Asset's name cannot be blank.`);
                        } else {
                          toast.error(`An error occured.`);
                        }
                        setWinOpenId(undefined);
                        setFormDisable(false);
                        setAssetFormInput('');
                        setAssetFormContents('');
                      }}
                    >
                      Create Asset
                    </button>
                  </div>
                </div>
              </Modal>
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  height: 'calc(100% - 72px)', //bottom: 25px
                  top: 11,
                  overflow: 'auto',
                }}
              >
                <FileDrop
                  onDragOver={(e) => console.log('범위로 들어옴')}
                  onDragLeave={(e) => console.log('범위에서 나감')}
                  onDrop={async (files, event) => {
                    const entryArr: Array<FileSystemEntry | null> = [];
                    for (let i = 0; i < event.dataTransfer.items.length; i++) {
                      entryArr.push(
                        event.dataTransfer.items[i].webkitGetAsEntry()
                      );
                    }

                    if (100 - assetLength - files!.length < 0) {
                      toast.error(
                        'The upload has been canceled because the upload exceeds the number of assets remaining.'
                      );
                    } else {
                      for (
                        let i = 0, index = assetLength;
                        i < files!.length;
                        i++
                      ) {
                        const fileAsEntry = entryArr[i];
                        if (fileAsEntry) {
                          if (fileAsEntry.isFile) {
                            index++;

                            const reader = new FileReader();

                            reader.addEventListener('load', () => {
                              dispatch(
                                addAsset({
                                  id:
                                    index === 1
                                      ? 0
                                      : assetData[index - 2].id + 1,
                                })
                              );

                              dispatch(
                                addData({
                                  name: files![i].name.includes('.')
                                    ? files![i].name.substr(
                                        0,
                                        files![i].name.lastIndexOf('.')
                                      )
                                    : files![i].name,
                                  id:
                                    index === 1
                                      ? 0
                                      : assetData[index - 2].id + 1,
                                  type: AssetType.FILE,
                                  extension: files![i].name.includes('.')
                                    ? files![i].name.substr(
                                        files![i].name.lastIndexOf('.')
                                      )
                                    : '',
                                  contents: reader.result as string,
                                })
                              );
                            });

                            if (
                              files![i].name.includes('.') &&
                              (imageExtensions.includes(
                                files![i].name.substr(
                                  files![i].name.lastIndexOf('.') + 1
                                )
                              ) ||
                                videoExtensions.includes(
                                  files![i].name.substr(
                                    files![i].name.lastIndexOf('.') + 1
                                  )
                                ))
                            ) {
                              reader.readAsDataURL(files![i]);
                            } else {
                              reader.readAsText(files![i]);
                            }
                          } else {
                            toast.error(
                              `The folder '${
                                files![i].name
                              }' couldn't be uploaded because it is unable to upload folders as asset.`
                            );
                          }
                        }
                      }
                    }
                  }}
                >
                  {assetData.map((asset) => (
                    // !asset.isDisabled ? (
                    // asset.type === AssetType.FILE ? (
                    <div key={asset.id}>
                      <Modal
                        closeTimeoutMS={150}
                        isOpen={assetRenameWinOpenId === asset.id}
                        contentLabel="Rename Asset"
                        style={{
                          content: {
                            width: '400px',
                          },
                        }}
                      >
                        <div className="header">
                          <p>Rename Asset</p>
                          <div
                            title="Cancel"
                            onClick={() => setAssetRenameWinOpenId(undefined)}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="27"
                              height="27"
                              fill="var(--shortcutIconColor)"
                              className="bi bi-x"
                              viewBox="0 0 16 16"
                            >
                              <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                            </svg>
                          </div>
                        </div>
                        <div className="body">
                          <div
                            style={{
                              position: 'relative',
                              top: 20,
                              left: '50%',
                              transform: 'translateX(-50%)',
                            }}
                          >
                            <p
                              style={{
                                margin: 0,
                                color: 'var(--textSubBlackColor)',
                                paddingBottom: '.7rem',
                                maxWidth: '100%',
                              }}
                            >
                              Rename the asset to..
                            </p>
                            <input
                              style={{
                                width: '100%',
                                margin: '0 0 1rem 0',
                                fontSize: '.9rem',
                              }}
                              onChange={(e) => {
                                setAssetFormInput(e.target.value);
                              }}
                              placeholder={`${asset.name}${asset.extension}`}
                            />
                            <button
                              className="button primary"
                              style={{
                                display: 'inherit',
                                marginLeft: 'auto',
                                marginBottom: 40,
                              }}
                              disabled={formDisable}
                              onClick={() => {
                                // two-factor (who knows?)
                                setFormDisable(true);

                                if (assetFormInput.replaceAll(' ', '') !== '') {
                                  if (
                                    assetFormInput.includes('\\') ||
                                    assetFormInput.includes('/') ||
                                    assetFormInput.includes(':') ||
                                    assetFormInput.includes('*') ||
                                    assetFormInput.includes('?') ||
                                    assetFormInput.includes('"') ||
                                    assetFormInput.includes('<') ||
                                    assetFormInput.includes('>') ||
                                    assetFormInput.includes('|')
                                  ) {
                                    toast.error(
                                      `The asset's name cannot include \\, /, :, *, ?, ", <, >, |`
                                    );
                                  } else {
                                    dispatch(
                                      renameAsset({
                                        id: asset.id,
                                        name: assetFormInput.includes('.')
                                          ? assetFormInput.substr(
                                              0,
                                              assetFormInput.lastIndexOf('.')
                                            )
                                          : assetFormInput,
                                        extension: assetFormInput.includes('.')
                                          ? assetFormInput.substr(
                                              assetFormInput.lastIndexOf('.')
                                            )
                                          : '',
                                      })
                                    );
                                    toast.success(
                                      `The asset has been renamed.`
                                    );
                                  }
                                } else if (
                                  assetFormInput.replaceAll(' ', '') === ''
                                ) {
                                  toast.error(`Asset's name cannot be blank.`);
                                } else {
                                  toast.error(`An error occured.`);
                                }
                                setAssetRenameWinOpenId(undefined);
                                setFormDisable(false);
                                setAssetFormInput('');
                              }}
                            >
                              Rename Asset
                            </button>
                          </div>
                        </div>
                      </Modal>
                      <Popover
                        isOpen={showAssetPopover === asset.id}
                        positions={['bottom']}
                        padding={5}
                        align="start"
                        reposition={false}
                        onClickOutside={() => {
                          setShowAssetPopover(undefined);
                          dispatch(setFalse());
                        }}
                        content={() => (
                          <PopContent
                            contents={[
                              {
                                text: 'Rename Asset',
                                onClick: () =>
                                  setAssetRenameWinOpenId(asset.id),
                              },
                              {
                                text: 'Delete Asset',
                                type: ContentType.DANGER,
                                onClick: () => {
                                  dispatch(deleteAssetById(asset.id));
                                  dispatch(setFalse());
                                  setShowAssetPopover(undefined);
                                  toast.success('The asset has been deleted.');
                                },
                              },
                            ]}
                          />
                        )}
                      >
                        <div
                          className="asset"
                          onClick={(e) => {
                            e.preventDefault();
                            dispatch(
                              togglePanelOpened({
                                id: asset.id,
                                toggle: true,
                              })
                            );
                          }}
                          style={{
                            backgroundColor:
                              showAssetPopover === asset.id
                                ? 'var(--panelPathColor)'
                                : undefined,
                          }}
                          onContextMenu={(e) => {
                            e.preventDefault();
                            dispatch(setTrue());
                            setShowAssetPopover(asset.id);
                          }}
                        >
                          <div title={`${asset.name}${asset.extension}`}>
                            {assetData.find((data) => data.id === asset.id)
                              ?.extension !== undefined &&
                            imageExtensions.includes(
                              assetData
                                .find((data) => data.id === asset.id)
                                ?.extension!.substr(1)!
                            ) ? (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                style={{
                                  width: '1rem',
                                  height: '1rem',
                                }}
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            ) : assetData.find((data) => data.id === asset.id)
                                ?.extension !== undefined &&
                              videoExtensions.includes(
                                assetData
                                  .find((data) => data.id === asset.id)
                                  ?.extension!.substr(1)!
                              ) ? (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                style={{
                                  width: '1rem',
                                  height: '1rem',
                                }}
                              >
                                <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
                              </svg>
                            ) : (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                style={{
                                  width: '1rem',
                                  height: '1rem',
                                }}
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            )}
                            <p
                              style={{
                                width: 'calc(100% - 43px)',
                                height: '100%',
                                overflow: 'hidden',
                                whiteSpace: 'nowrap',
                                textOverflow: 'ellipsis',
                              }}
                            >
                              {asset.name}
                              {asset.extension}
                            </p>
                          </div>
                        </div>
                      </Popover>
                    </div>
                  ))}
                </FileDrop>
              </div>
            </nav>
          </nav>
        );
        setPnlDisplay('block');
        setPrgWidth(pnlSize.width);
        break;
      default:
        break;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    pnlCase,
    pnlSize.width,
    showPopover.windowMgr,
    dispatch,
    currentWindow,
    isClicked,
    windowList,
    formDisable,
    winOpenId,
    assetRenameWinOpenId,
    formInput,
    assetList,
    assetLength,
    assetData,
    showAssetPopover,
    showNodePopover,
    assetFormInput,
    assetFormContents,
  ]);

  useEffect(() => {
    if (showPopover.option) {
      setShortcutColor([
        'var(--shortcutHoverColor)',
        shortcutColor[1],
        shortcutColor[2],
      ]);
    } else {
      setShortcutColor(['#ffffff00', shortcutColor[1], shortcutColor[2]]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showPopover.option]);

  return (
    <div className="Tool">
      <div
        className="shortcut"
        style={{ backgroundColor: 'var(--shortcutColor)' }}
      >
        <ul>
          <li>
            <Popover
              isOpen={showPopover.option as boolean}
              positions={['right']}
              padding={5}
              align="start"
              reposition={false}
              onClickOutside={() => {
                if (isClicked) {
                  dispatch(setFalse());
                  setShowPopover({
                    option: false,
                  });
                }
              }}
              content={() => (
                <PopContent
                  contents={[
                    { text: 'Save Project' },
                    { text: 'Save Project on Local' },
                    { text: 'Open Project' },
                    { text: 'Open Project on Local' },
                    { text: 'Rename Project', type: ContentType.DANGER },
                    { text: 'Delete Project', type: ContentType.DANGER },
                  ]}
                />
              )}
            >
              <button
                title="Project Setting"
                style={{ backgroundColor: shortcutColor[0] }}
                onClick={() => {
                  dispatch(
                    showPopover.option
                      ? dispatch(setFalse())
                      : dispatch(setTrue())
                  );
                  setShowPopover({
                    option: !showPopover.option,
                  });
                }}
                onPointerOver={() =>
                  setShortcutColor([
                    'var(--shortcutHoverColor)',
                    shortcutColor[1],
                    shortcutColor[2],
                  ])
                }
                onPointerOut={() =>
                  setShortcutColor([
                    '#ffffff00',
                    shortcutColor[1],
                    shortcutColor[2],
                  ])
                }
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="28"
                  height="28"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="var(--shortcutIconColor)"
                >
                  <path
                    fillRule="evenodd"
                    d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </Popover>
          </li>
          <div className="hl" />
          <li>
            <button
              title="Explore"
              onClick={() => (pnlCase === 0 ? setPnlCase(null) : setPnlCase(0))}
              style={{
                backgroundColor:
                  pnlCase === 0
                    ? 'var(--shortcutHoverColor)'
                    : shortcutColor[1],
              }}
              onPointerOver={() =>
                setShortcutColor([
                  shortcutColor[0],
                  'var(--shortcutHoverColor)',
                  shortcutColor[2],
                ])
              }
              onPointerOut={() =>
                setShortcutColor([
                  shortcutColor[0],
                  '#ffffff00',
                  shortcutColor[2],
                ])
              }
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="var(--shortcutIconColor)"
              >
                <path
                  fillRule="evenodd"
                  d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </li>
          <li>
            <button
              title="Asset"
              onClick={() => (pnlCase === 1 ? setPnlCase(null) : setPnlCase(1))}
              style={{
                backgroundColor:
                  pnlCase === 1
                    ? 'var(--shortcutHoverColor)'
                    : shortcutColor[2],
              }}
              onPointerOver={() =>
                setShortcutColor([
                  shortcutColor[0],
                  shortcutColor[1],
                  'var(--shortcutHoverColor)',
                ])
              }
              onPointerOut={() =>
                setShortcutColor([
                  shortcutColor[0],
                  shortcutColor[1],
                  '#ffffff00',
                ])
              }
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="26"
                height="26"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="var(--shortcutIconColor)"
              >
                <path
                  fillRule="evenodd"
                  d="M2 5a2 2 0 012-2h12a2 2 0 012 2v2a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm14 1a1 1 0 11-2 0 1 1 0 012 0zM2 13a2 2 0 012-2h12a2 2 0 012 2v2a2 2 0 01-2 2H4a2 2 0 01-2-2v-2zm14 1a1 1 0 11-2 0 1 1 0 012 0z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </li>
        </ul>
      </div>
      <Resizable
        className="panel"
        style={{
          display: pnlDisplay as any,
        }}
        size={{
          width: pnlSize.width,
          height: pnlSize.height,
        }}
        onResize={(e, direction, ref, d) => {
          setPrgWidth(pnlSize.width + d.width);
        }}
        onResizeStop={(e, direction, ref, d) => {
          setPnlSize({
            width: pnlSize.width + d.width,
            height: pnlSize.height,
          });
        }}
        enable={{
          top: false,
          right: true,
          bottom: false,
          left: false,
          topRight: false,
          bottomRight: false,
          bottomLeft: false,
          topLeft: false,
        }}
        minWidth={300}
        maxWidth={600}
      >
        {pnlComponent}
      </Resizable>
      <Active {...{ panelWidth: prgWidth }} />
      <Field {...{ panelWidth: prgWidth }} />
    </div>
  );
}
