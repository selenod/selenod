import './styles/active.css';

import { useState } from 'react';

import { PopContent } from '../system/popcontent';
import { RootState } from '../../store';
import { Popover } from 'react-tiny-popover';
import { useSelector, useDispatch } from 'react-redux';
import { setTrue, setFalse } from '../system/reduxSlice/coverSlice';

interface IToolData {
  panelWidth: number;
}

export default function Active(data: IToolData) {
  const [showPopover, setShowPopover] = useState<boolean>(false);
  const dispatch = useDispatch();
  const isClicked = useSelector((state: RootState) => state.cover.clicked);

  return (
    <div
      className="Active"
      style={{
        width: `calc(100% - ${data.panelWidth}px - 70px)`,
      }}
    >
      <div>
        <nav></nav>
        <div>
          <div title="Build Project">
            <svg
              width="20"
              height="20"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0_413_18)">
                <path
                  d="M3.22595 2.5024L12.8747 8.07311C12.8981 8.08662 12.9073 8.09915 12.9126 8.10864C12.9193 8.1208 12.9247 8.13843 12.9247 8.15972C12.9247 8.18101 12.9193 8.19863 12.9126 8.2108C12.9073 8.22028 12.8981 8.23281 12.8747 8.24632L3.22595 13.817C3.20255 13.8305 3.1871 13.8323 3.17625 13.8321C3.16235 13.8318 3.14439 13.8277 3.12595 13.817C3.10751 13.8064 3.09494 13.7929 3.08778 13.781C3.08219 13.7717 3.07595 13.7575 3.07595 13.7304L3.07595 2.589C3.07595 2.56198 3.08219 2.54775 3.08778 2.53845C3.09494 2.52653 3.10751 2.51304 3.12595 2.5024C3.14439 2.49175 3.16235 2.48762 3.17625 2.48737C3.1871 2.48718 3.20255 2.48889 3.22595 2.5024Z"
                  stroke="var(--shortcutIconColor)"
                  stroke-width="2"
                />
              </g>
              <defs>
                <clipPath id="clip0_413_18">
                  <rect width="16" height="16" rx="1" fill="white" />
                </clipPath>
              </defs>
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
                name="More Actions.."
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
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
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
