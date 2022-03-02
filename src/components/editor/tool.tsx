import './styles/tool.css';

import { useState, useEffect, ReactElement } from 'react';
import { RootState } from '../../store';
import { Resizable } from 're-resizable';
import { Popover } from 'react-tiny-popover';
import { useSelector, useDispatch } from 'react-redux';
import { setTrue, setFalse } from '../system/reduxSlice/coverSlice';

import Active from './active';
import { PopContent } from '../system/popcontent';
import { EContentType } from '../../enum';

export default function Tool() {
  interface IPnlSize {
    width: number;
    height: string;
  }

  const isClicked = useSelector((state: RootState) => state.cover.clicked);
  const windowList = useSelector((state: RootState) => state.window.windowList);

  const [currentWindow, setCurrentWindow] = useState<number>(
    window.sessionStorage.getItem('current_window')! !== null
      ? parseInt(window.sessionStorage.getItem('current_window')!)
      : windowList[0].id
  );

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
  const [pnlComponent, setPnlComponent] = useState<ReactElement | null>(null);
  const [showPopover, setShowPopover] = useState<{
    option?: boolean;
    windowMgr?: boolean;
  }>({
    option: false,
    windowMgr: false,
  });

  const dispatch = useDispatch();

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
              <p style={{ color: 'var(--shortcutIconColor)' }}>Explore</p>
            </div>
            <nav className="pnl-explore">
              <Popover
                isOpen={showPopover.windowMgr as boolean}
                positions={['bottom']}
                padding={15}
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
                    name="Manage Windows"
                    isSelection={true}
                    cacheKey="current_window"
                    contents={windowList.map((window) => ({
                      text: window.name,
                      id: window.id,
                      selected: windowList.indexOf(window) === 0 ? true : false,
                      onClick: () => {
                        setCurrentWindow(window.id);
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
                    maxWidth: '296px',
                  }}
                  title="Manage Windows"
                  onClick={() => {
                    dispatch(
                      showPopover.windowMgr === true
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
                    MyPorject/
                    {
                      windowList.filter(
                        (window) => currentWindow === window.id
                      )[0].name
                    }
                  </p>
                  <svg
                    style={{
                      float: 'right',
                      color: 'var(--textGrayColor)',
                      marginTop: '-7.5px',
                    }}
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    fill="currentColor"
                    className="bi bi-caret-down-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
                  </svg>
                </div>
              </Popover>
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
              <p style={{ color: 'var(--shortcutIconColor)' }}>Asset</p>
              <nav className="pnl-asset"></nav>
            </div>
          </nav>
        );
        setPnlDisplay('block');
        setPrgWidth(pnlSize.width);
        break;
      default:
        break;
    }
  }, [
    pnlCase,
    pnlSize.width,
    showPopover.windowMgr,
    dispatch,
    currentWindow,
    isClicked,
    windowList,
  ]);

  useEffect(() => {
    if (showPopover.option === true) {
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
              padding={10}
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
                  name="Project Setting"
                  contents={[
                    { text: 'Save Project' },
                    { text: 'Save Project on Local' },
                    { text: 'Open Project' },
                    { text: 'Open Project on Local' },
                    { text: 'Rename Project', type: EContentType.DANGER },
                    { text: 'Delete Project', type: EContentType.DANGER },
                  ]}
                />
              )}
            >
              <button
                title="Project Setting"
                style={{ backgroundColor: shortcutColor[0] }}
                onClick={() => {
                  dispatch(
                    showPopover.option === true
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
                    fill-rule="evenodd"
                    d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
                    clip-rule="evenodd"
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
              style={{ backgroundColor: shortcutColor[1] }}
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
                  fill-rule="evenodd"
                  d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>
          </li>
          <li>
            <button
              title="Asset"
              onClick={() => (pnlCase === 1 ? setPnlCase(null) : setPnlCase(1))}
              style={{ backgroundColor: shortcutColor[2] }}
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
                  fill-rule="evenodd"
                  d="M2 5a2 2 0 012-2h12a2 2 0 012 2v2a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm14 1a1 1 0 11-2 0 1 1 0 012 0zM2 13a2 2 0 012-2h12a2 2 0 012 2v2a2 2 0 01-2 2H4a2 2 0 01-2-2v-2zm14 1a1 1 0 11-2 0 1 1 0 012 0z"
                  clip-rule="evenodd"
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
    </div>
  );
}
