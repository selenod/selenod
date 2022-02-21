import './styles/active.css';
import { CurrentTheme } from '../..';

import { useState } from 'react';

import { PopContent } from '../system/popcontent';
import { Popover } from 'react-tiny-popover';
import { useDispatch } from 'react-redux';
import { setTrue, setFalse } from '../system/cover/coverSlice';

interface IToolData {
  panelWidth: number;
}

export default function Active(data: IToolData) {
  const [showPopover, setShowPopover] = useState<boolean>(false);
  const dispatch = useDispatch();

  return (
    <div
      className="Active"
      style={{
        backgroundColor: CurrentTheme.panelColor,
        width: `calc(100% - ${data.panelWidth}px - 70px)`,
      }}
    >
      <div>
        <nav></nav>
        <div>
          <div title="Build Project">
            <svg
              width="18"
              height="18"
              viewBox="0 0 20 23"
              fill={CurrentTheme.shortcutIconColor}
              xmlns="http://www.w3.org/2000/svg"
            >
              <mask id="path-1-inside-1_197_13" fill="white">
                <path d="M0.875 2.96073C0.875 1.40275 2.57759 0.443024 3.91049 1.24966L18.7976 10.259C20.0836 11.0372 20.0836 12.9028 18.7976 13.6811L3.9105 22.6904C2.57759 23.497 0.875 22.5373 0.875 20.9793L0.875 2.96073Z" />
              </mask>
              <path
                d="M3.9105 22.6904L2.35726 20.1238L3.9105 22.6904ZM18.7976 13.6811L20.3508 16.2477L18.7976 13.6811ZM2.35725 3.81627L17.2444 12.8256L20.3508 7.69236L5.46374 -1.31694L2.35725 3.81627ZM17.2444 11.1145L2.35726 20.1238L5.46374 25.257L20.3508 16.2477L17.2444 11.1145ZM3.875 20.9793L3.875 2.96073L-2.125 2.96073L-2.125 20.9793L3.875 20.9793ZM2.35726 20.1238C3.0237 19.7205 3.875 20.2003 3.875 20.9793L-2.125 20.9793C-2.125 24.8743 2.13148 27.2736 5.46374 25.257L2.35726 20.1238ZM17.2444 12.8256C16.6014 12.4364 16.6014 11.5036 17.2444 11.1145L20.3508 16.2477C23.5659 14.302 23.5659 9.638 20.3508 7.69236L17.2444 12.8256ZM5.46374 -1.31694C2.13147 -3.33354 -2.125 -0.934228 -2.125 2.96073L3.875 2.96073C3.875 3.73972 3.0237 4.21958 2.35725 3.81627L5.46374 -1.31694Z"
                mask="url(#path-1-inside-1_197_13)"
              />
            </svg>
          </div>
          <Popover
            isOpen={showPopover}
            positions={['bottom']}
            padding={10}
            align="end"
            reposition={false}
            onClickOutside={() => {
              dispatch(setFalse());
              setShowPopover(false);
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
                width="18"
                height="18"
                fill={CurrentTheme.shortcutIconColor}
                className="bi bi-three-dots"
                viewBox="0 0 16 16"
              >
                <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" />
              </svg>
            </div>
          </Popover>
        </div>
      </div>
    </div>
  );
}
