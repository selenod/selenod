import './styles/active.css';

import { useContext, useState } from 'react';

import { PopContent } from '../system/popcontent';
import { RootState } from '../../store';
import { Popover } from 'react-tiny-popover';
import { useSelector, useDispatch } from 'react-redux';
import { setTrue, setFalse } from '../system/reduxSlice/coverSlice';
import { setScriptSaved, togglePanel } from '../system/reduxSlice/windowSlice';
import {
  setOpenedPanel,
  togglePanelOpened,
} from '../system/reduxSlice/assetSlice';
import { imageExtensions, videoExtensions } from '../../data';
import api from '../../config/api';
import { scriptContext } from '../..';
import toast from 'react-hot-toast';

interface IToolData {
  panelWidth: number;
}

export default function Active(data: IToolData) {
  const scripts = useContext(scriptContext);

  const [showPopover, setShowPopover] = useState<boolean>(false);

  const dispatch = useDispatch();

  const projectData = useSelector((state: RootState) => state.project.data);
  const scriptSaved = useSelector(
    (state: RootState) => state.window.scriptSaved
  );
  const currentWindow = useSelector(
    (state: RootState) => state.window.currentWindow
  );
  const isClicked = useSelector((state: RootState) => state.cover.clicked);
  const assetData = useSelector((state: RootState) => state.asset.assetData);
  const toggle = useSelector((state: RootState) => state.window.toggle);
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
          <div
            className="essential"
            style={{
              width: 70,
              backgroundColor:
                toggle === 0 ? 'var(--panelPathColor)' : undefined,
            }}
            onClick={() => dispatch(togglePanel(0))}
          >
            <p
              style={{
                position: 'relative',
                top: '50%',
                textAlign: 'center',
                transform: 'translateY(-50%)',
                fontSize: '.8rem',
                fontWeight: 600,
                color: 'var(--shortcutIconColor)',
              }}
            >
              Window
            </p>
          </div>
          <div
            className="essential"
            style={{
              width: 60,
              backgroundColor:
                toggle === 1 ? 'var(--panelPathColor)' : undefined,
            }}
            onClick={() => dispatch(togglePanel(1))}
          >
            <p
              style={{
                position: 'relative',
                top: '50%',
                textAlign: 'center',
                transform: 'translateY(-50%)',
                fontSize: '.8rem',
                fontWeight: 600,
                color: 'var(--shortcutIconColor)',
              }}
            >
              Script
            </p>
          </div>
          <div
            className="vl"
            style={{
              height: 25,
              margin: '7.5px 12px 0 12px',
              float: 'left',
            }}
          />
          <div
            style={{
              width: 'calc(100% - 192px)',
              marginLeft: 157,
              height: 40,
              overflowX: 'scroll',
              display: 'flex',
              justifyContent: 'flex-start',
            }}
          >
            {openedPanelList.map((panel) => (
              <div
                key={panel}
                title={`${assetData.find((asset) => asset.id === panel)?.name}${
                  assetData.find((asset) => asset.id === panel)?.extension
                }`}
                onClick={() => {
                  dispatch(setOpenedPanel(panel));

                  if (togglePanel !== undefined) {
                    dispatch(togglePanel(undefined));
                  }
                }}
              >
                {panel === currOpenedPnl ? (
                  <div
                    style={{
                      position: 'relative',
                      width: '100%',
                      height: 2,
                      top: 'calc(100% - 3px)',
                      backgroundColor: '#956fff',
                      paddingRight: 12,
                      borderRadius: '1rem 1rem 0 0',
                    }}
                  />
                ) : null}
                <div
                  className="close-btn"
                  style={{
                    position: 'relative',
                    top: panel === currOpenedPnl ? 'calc(50% - 2px)' : '50%',
                    transform: 'translateY(-50%)',
                    width: 20,
                    height: 20,
                    float: 'right',
                    borderRadius: 5,
                    zIndex: 5,
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    dispatch(
                      togglePanelOpened({
                        id: panel,
                        toggle: false,
                      })
                    );
                  }}
                >
                  <svg
                    style={{
                      position: 'relative',
                      top: 2,
                      left: '50%',
                      width: 14,
                      height: 14,
                      transform: 'translateX(-50%)',
                    }}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="var(--iconGrayColor)"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                {assetData.find((data) => data.id === panel)?.extension !==
                  undefined &&
                imageExtensions.includes(
                  assetData
                    .find((data) => data.id === panel)
                    ?.extension!.substr(1)!
                ) ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="var(--shortcutIconColor)"
                    style={{
                      position: 'relative',
                      top: panel === currOpenedPnl ? 10.5 : 12.5,
                      left: 12,
                      float: 'left',
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
                ) : assetData.find((data) => data.id === panel)?.extension !==
                    undefined &&
                  videoExtensions.includes(
                    assetData
                      .find((data) => data.id === panel)
                      ?.extension!.substr(1)!
                  ) ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="var(--shortcutIconColor)"
                    style={{
                      position: 'relative',
                      top: panel === currOpenedPnl ? 10.5 : 12.5,
                      left: 12,
                      float: 'left',
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
                    fill="var(--shortcutIconColor)"
                    style={{
                      position: 'relative',
                      top: panel === currOpenedPnl ? 10.5 : 12.5,
                      left: 12,
                      float: 'left',
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
                    position: 'relative',
                    top: panel === currOpenedPnl ? 'calc(50% - 2px)' : '50%',
                    left: 19,
                    maxWidth: 'calc(100% - 60px)',
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
          </div>
        </nav>
        <div>
          <div
            title={scriptSaved ? undefined : 'Upload Script'}
            style={{
              cursor: scriptSaved ? 'auto' : 'pointer',
            }}
            onClick={async () => {
              if (!scriptSaved) {
                await api
                  .put('/project/script', {
                    uid: localStorage.getItem('id'),
                    id: projectData.id,
                    windowId: currentWindow,
                    scriptData: scripts.find(
                      (script) => script.windowId === currentWindow
                    )?.script,
                  })
                  .then(() => {
                    dispatch(setScriptSaved(true));
                    toast.success('Script has been uploaded successfully.');
                  })
                  .catch((err) => {
                    toast.error(
                      err.response.data.message
                        ? err.response.data.message
                        : 'Fail to update database.'
                    );
                  });
              }
            }}
          >
            {scriptSaved ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="var(--shortcutIconColor)"
              >
                {/* <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 12.75l6 6 9-13.5"
                /> */}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="17"
                height="17"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2.5"
                stroke="var(--shortcutIconColor)"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                />
              </svg>
            )}
          </div>
          <div title="Build Project">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="var(--shortcutIconColor)"
            >
              <path
                fillRule="evenodd"
                d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z"
                clipRule="evenodd"
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
              if (isClicked) {
                dispatch(setFalse());
                setShowPopover(false);
              }
            }}
            content={() => (
              <PopContent
                contents={[
                  {
                    text: 'Close All Tabs',
                    onClick: () => {
                      openedPanelList.forEach((panel) => {
                        dispatch(
                          togglePanelOpened({
                            id: panel,
                            toggle: false,
                          })
                        );
                        dispatch(setFalse());
                        setShowPopover(false);
                      });
                    },
                  },
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
