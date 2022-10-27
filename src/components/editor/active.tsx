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
import { dataContext, scriptContext, variableContext } from '../..';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { appURL } from '../../config/config';

interface IToolData {
  panelWidth: number;
}

export default function Active(propData: IToolData) {
  const { t } = useTranslation(['page']);

  const scripts = useContext(scriptContext);
  const vars = useContext(variableContext);
  const data = useContext(dataContext);

  const [showPopover, setShowPopover] = useState<{
    action: boolean;
  }>({
    action: false,
  });

  const dispatch = useDispatch();

  const projectData = useSelector((state: RootState) => state.project.data);
  const windowList = useSelector((state: RootState) => state.window.windowList);
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
        width: `calc(100% - ${propData.panelWidth}px - 70px)`,
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
              {t('writ0')}
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
              {t('writ1')}
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
            title={scriptSaved ? undefined : t('writ2')}
            style={{
              cursor: scriptSaved ? 'auto' : 'pointer',
            }}
            onClick={async () => {
              if (!scriptSaved) {
                await api
                  .put('/project/script', {
                    uid: data?.uid,
                    id: projectData.id,
                    windowId: currentWindow,
                    scriptData: scripts.find(
                      (script) => script.windowId === currentWindow
                    )?.script,
                    varData: vars.find(
                      (script) => script.windowId === currentWindow
                    )?.variable,
                  })
                  .then(() => {
                    dispatch(setScriptSaved(true));
                    toast.success(t('writ112'));
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
                width="19"
                height="19"
                viewBox="0 0 20 20"
                fill="var(--shortcutIconColor)"
              >
                <path
                  fillRule="evenodd"
                  d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                  clipRule="evenodd"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="19"
                height="19"
                viewBox="0 0 20 20"
                fill="var(--shortcutIconColor)"
              >
                <path d="M9.25 13.25a.75.75 0 001.5 0V4.636l2.955 3.129a.75.75 0 001.09-1.03l-4.25-4.5a.75.75 0 00-1.09 0l-4.25 4.5a.75.75 0 101.09 1.03L9.25 4.636v8.614z" />
                <path d="M3.5 12.75a.75.75 0 00-1.5 0v2.5A2.75 2.75 0 004.75 18h10.5A2.75 2.75 0 0018 15.25v-2.5a.75.75 0 00-1.5 0v2.5c0 .69-.56 1.25-1.25 1.25H4.75c-.69 0-1.25-.56-1.25-1.25v-2.5z" />
              </svg>
            )}
          </div>
          <div
            title={t('writ120')}
            onClick={() =>
              window.open(
                `${appURL}${projectData.route}${
                  currentWindow === 0
                    ? ''
                    : '/' +
                      windowList.find((window) => window.id === currentWindow)
                        ?._id
                }`
              )
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="var(--shortcutIconColor)"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M4.25 5.5a.75.75 0 00-.75.75v8.5c0 .414.336.75.75.75h8.5a.75.75 0 00.75-.75v-4a.75.75 0 011.5 0v4A2.25 2.25 0 0112.75 17h-8.5A2.25 2.25 0 012 14.75v-8.5A2.25 2.25 0 014.25 4h5a.75.75 0 010 1.5h-5z"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M6.194 12.753a.75.75 0 001.06.053L16.5 4.44v2.81a.75.75 0 001.5 0v-4.5a.75.75 0 00-.75-.75h-4.5a.75.75 0 000 1.5h2.553l-9.056 8.194a.75.75 0 00-.053 1.06z"
              />
            </svg>
          </div>
          <Popover
            isOpen={showPopover.action}
            positions={['bottom']}
            padding={10}
            align="end"
            reposition={false}
            onClickOutside={() => {
              if (isClicked) {
                dispatch(setFalse());
                setShowPopover({
                  ...showPopover,
                  action: false,
                });
              }
            }}
            content={() => (
              <PopContent
                contents={[
                  {
                    text: t('writ5'),
                    onClick: () => {
                      openedPanelList.forEach((panel) => {
                        dispatch(
                          togglePanelOpened({
                            id: panel,
                            toggle: false,
                          })
                        );
                      });
                      dispatch(setFalse());
                      setShowPopover({
                        ...showPopover,
                        action: false,
                      });
                    },
                  },
                ]}
              />
            )}
          >
            <div
              title={t('writ4')}
              onClick={() => {
                dispatch(showPopover.action === true ? setFalse() : setTrue());
                setShowPopover({
                  ...showPopover,
                  action: !showPopover.action,
                });
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
