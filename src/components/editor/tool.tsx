import './styles/tool.css';
import { CurrentTheme } from '../..';

import { useState, useEffect, ReactElement } from 'react';
import { Resizable } from 're-resizable';
import { Popover } from 'react-tiny-popover';

import Active from './active';
import { PopContent } from '../system/popcontent';

export default function Tool() {
  interface IPnlSize {
    width: number;
    height: string;
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
  const [pnlComponent, setPnlComponent] = useState<ReactElement | null>(null);
  const [showPopover, setShowPopover] = useState<{
    option?: boolean;
    windowMgr?: boolean;
  }>({
    option: false,
    windowMgr: false,
  });

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
              <div
                className="hl"
                style={{ backgroundColor: CurrentTheme.lineColor }}
              />
              <p style={{ color: CurrentTheme.shortcutIconColor }}>Explore</p>
            </div>
            <nav className="pnl-explore">
              <Popover
                isOpen={showPopover.windowMgr as boolean}
                positions={['bottom']}
                padding={10}
                align="start"
                reposition={false}
                onClickOutside={() =>
                  setShowPopover({
                    windowMgr: false,
                  })
                }
                content={() => (
                  <PopContent
                    {...{
                      name: 'Manage Windows',
                      contents: [
                        { text: 'MainWindow', type: 0 },
                        { text: '대충윈도우22', type: 0 },
                        { text: '대충윈도우333', type: 0 },
                        { text: '그거뇌절임', type: 0 },
                      ],
                    }}
                  />
                )}
              >
                <div
                  style={{
                    backgroundColor: CurrentTheme.panelPathColor,
                  }}
                  title="Manage Windows"
                  onClick={() =>
                    setShowPopover({
                      windowMgr: !showPopover.windowMgr,
                    })
                  }
                >
                  <p style={{ color: CurrentTheme.textGrayColor }}>
                    MyPorject/MainWindow
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-caret-down-fill"
                      viewBox="0 0 16 16"
                    >
                      <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
                    </svg>
                  </p>
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
              <div
                className="hl"
                style={{ backgroundColor: CurrentTheme.lineColor }}
              />
              <p style={{ color: CurrentTheme.shortcutIconColor }}>Asset</p>
            </div>
          </nav>
        );
        setPnlDisplay('block');
        setPrgWidth(pnlSize.width);
        break;
      default:
        break;
    }
  }, [pnlCase, pnlSize.width, showPopover.windowMgr]);

  useEffect(() => {
    if (showPopover.option === true) {
      setShortcutColor([
        CurrentTheme.shortcutHoverColor,
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
        style={{ backgroundColor: CurrentTheme.shortcutColor }}
      >
        <ul>
          <li>
            <Popover
              isOpen={showPopover.option as boolean}
              positions={['right']}
              padding={10}
              align="start"
              reposition={false}
              onClickOutside={() =>
                setShowPopover({
                  option: false,
                })
              }
              content={() => (
                <PopContent
                  {...{
                    name: 'Project Setting',
                    contents: [
                      { text: 'Save Project', type: 0 },
                      { text: 'Save Project on Local', type: 0 },
                      { text: 'Open Project', type: 0 },
                      { text: 'Open Project on Local', type: 0 },
                      { text: 'Rename Project', type: 1 },
                      { text: 'Delete Project', type: 1 },
                    ],
                  }}
                />
              )}
            >
              <button
                title="Project Setting"
                style={{ backgroundColor: shortcutColor[0] }}
                onClick={() =>
                  setShowPopover({
                    option: !showPopover.option,
                  })
                }
                onPointerOver={() =>
                  setShortcutColor([
                    CurrentTheme.shortcutHoverColor,
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
                  width="24"
                  height="24"
                  fill="currentColor"
                  className="bi bi-gear-fill"
                  viewBox="0 0 16 16"
                  style={{ fill: CurrentTheme.shortcutIconColor }}
                >
                  <path d="M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872l-.1-.34zM8 10.93a2.929 2.929 0 1 1 0-5.86 2.929 2.929 0 0 1 0 5.858z" />
                </svg>
              </button>
            </Popover>
          </li>
          <div
            className="hl"
            style={{ backgroundColor: CurrentTheme.lineColor }}
          />
          <li>
            <button
              title="Explore"
              onClick={() => {
                if (pnlCase === 0) {
                  setPnlCase(null);
                } else {
                  setPnlCase(0);
                }
              }}
              style={{ backgroundColor: shortcutColor[1] }}
              onPointerOver={() =>
                setShortcutColor([
                  shortcutColor[0],
                  CurrentTheme.shortcutHoverColor,
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
                width="27"
                height="27"
                fill="currentColor"
                className="bi bi-file-earmark-code"
                viewBox="0 0 16 16"
                style={{ fill: CurrentTheme.shortcutIconColor }}
              >
                <path d="M14 4.5V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h5.5L14 4.5zm-3 0A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4.5h-2z" />
                <path d="M8.646 6.646a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1 0 .708l-2 2a.5.5 0 0 1-.708-.708L10.293 9 8.646 7.354a.5.5 0 0 1 0-.708zm-1.292 0a.5.5 0 0 0-.708 0l-2 2a.5.5 0 0 0 0 .708l2 2a.5.5 0 0 0 .708-.708L5.707 9l1.647-1.646a.5.5 0 0 0 0-.708z" />
              </svg>
            </button>
          </li>
          <li>
            <button
              title="Asset"
              onClick={() => {
                if (pnlCase === 1) {
                  setPnlCase(null);
                } else {
                  setPnlCase(1);
                }
              }}
              style={{ backgroundColor: shortcutColor[2] }}
              onPointerOver={() =>
                setShortcutColor([
                  shortcutColor[0],
                  shortcutColor[1],
                  CurrentTheme.shortcutHoverColor,
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
                width="24"
                height="24"
                fill="currentColor"
                className="bi bi-archive-fill"
                viewBox="0 0 16 16"
                style={{ fill: CurrentTheme.shortcutIconColor }}
              >
                <path d="M12.643 15C13.979 15 15 13.845 15 12.5V5H1v7.5C1 13.845 2.021 15 3.357 15h9.286zM5.5 7h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1 0-1zM.8 1a.8.8 0 0 0-.8.8V3a.8.8 0 0 0 .8.8h14.4A.8.8 0 0 0 16 3V1.8a.8.8 0 0 0-.8-.8H.8z" />
              </svg>
            </button>
          </li>
        </ul>
      </div>
      <Resizable
        className="panel"
        style={{
          backgroundColor: CurrentTheme.panelColor,
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
