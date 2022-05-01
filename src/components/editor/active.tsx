import './styles/active.css';

import { useState } from 'react';

import { PopContent } from '../system/popcontent';
import { RootState } from '../../store';
import { Popover } from 'react-tiny-popover';
import { useSelector, useDispatch } from 'react-redux';
import { setTrue, setFalse } from '../system/reduxSlice/coverSlice';
import { setOpenedPanel } from '../system/reduxSlice/assetSlice';

interface IToolData {
  panelWidth: number;
}

export default function Active(data: IToolData) {
  const [showPopover, setShowPopover] = useState<boolean>(false);
  const dispatch = useDispatch();
  const isClicked = useSelector((state: RootState) => state.cover.clicked);
  const assetData = useSelector((state: RootState) => state.asset.assetData);
  const openedPanelList = useSelector(
    (state: RootState) => state.asset.openedPanelList
  );
  const currOpenedPnl = useSelector(
    (state: RootState) => state.asset.currentOpenedPanel
  );

  return (
    <div
      className="Active"
      style={{
        width: `calc(100% - ${data.panelWidth}px - 70px)`,
      }}
    >
      <div>
        <nav>
          {openedPanelList.map((panel) => (
            <div key={panel} onClick={() => dispatch(setOpenedPanel(panel))}>
              {panel === currOpenedPnl ? (
                <div
                  style={{
                    position: 'relative',
                    width: '100%',
                    height: 2,
                    top: 'calc(100% - 3px)',
                    backgroundColor: '#956fff',
                    paddingRight: 24,
                    borderRadius: '1rem 1rem 0 0',
                  }}
                />
              ) : null}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1rem"
                height="1rem"
                viewBox="0 0 20 20"
                fill="var(--shortcutIconColor)"
                style={{
                  position: 'relative',
                  top: panel === currOpenedPnl ? 10.5 : 12.5,
                  left: 12,
                  float: 'left',
                }}
              >
                <path
                  fillRule="evenodd"
                  d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z"
                  clipRule="evenodd"
                />
              </svg>
              <p
                style={{
                  position: 'relative',
                  top: panel === currOpenedPnl ? 'calc(50% - 2px)' : '50%',
                  left: 19,
                  maxWidth: 'calc(100% - 27px)',
                  transform: 'translateY(-50%)',
                  fontSize: '.9rem',
                  color: 'var(--shortcutIconColor)',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                {assetData.find((asset) => asset.id === panel)?.name}
                {assetData.find((asset) => asset.id === panel)?.extension}
              </p>
            </div>
          ))}
        </nav>
        <div>
          <div title="Build Project">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              fill="var(--shortcutIconColor)"
              viewBox="0 0 16 16"
            >
              <path d="M10.804 8 5 4.633v6.734L10.804 8zm.792-.696a.802.802 0 0 1 0 1.392l-6.363 3.692C4.713 12.69 4 12.345 4 11.692V4.308c0-.653.713-.998 1.233-.696l6.363 3.692z" />
            </svg>
          </div>
          <Popover
            isOpen={showPopover}
            positions={['bottom']}
            padding={10}
            align="end"
            reposition={false}
            onClickOutside={() => {
              if (isClicked) {
                dispatch(setFalse());
                setShowPopover(false);
              }
            }}
            content={() => (
              <PopContent
                contents={[
                  { text: 'Close All Tabs' },
                  { text: 'Close Saved Tabs' },
                ]}
              />
            )}
          >
            <div
              title="More Actions.."
              onClick={() => {
                dispatch(showPopover === true ? setFalse() : setTrue());
                setShowPopover(!showPopover);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="var(--shortcutIconColor)"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
                />
              </svg>
            </div>
          </Popover>
        </div>
      </div>
    </div>
  );
}
