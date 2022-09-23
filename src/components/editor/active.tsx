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
import { dataContext, scriptContext } from '../..';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { serverURL } from '../../config/config';
import Modal from 'react-modal';
import i18n from '../../locale';

interface IToolData {
  panelWidth: number;
}

enum Maker {
  EXE = 'exe',
  DMG = 'dmg',
}

export default function Active(propData: IToolData) {
  const { t } = useTranslation(['page']);

  const scripts = useContext(scriptContext);
  const data = useContext(dataContext);

  const [showPopover, setShowPopover] = useState<{
    action: boolean;
    build: boolean;
    modal: Maker | null;
    sectionID: number;
  }>({
    action: false,
    build: false,
    modal: null,
    sectionID: 0,
  });

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
                width="20"
                height="20"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="var(--shortcutIconColor)"
              >
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
          <Popover
            isOpen={showPopover.build}
            positions={['bottom']}
            padding={10}
            align="end"
            reposition={false}
            onClickOutside={() => {
              if (isClicked) {
                dispatch(setFalse());
                setShowPopover({
                  ...showPopover,
                  build: false,
                });
              }
            }}
            content={() => (
              <PopContent
                contents={[
                  {
                    text: t('writ114'),
                    onClick: () => {
                      setShowPopover({
                        ...showPopover,
                        modal: Maker.EXE,
                        sectionID: 0,
                      });
                    },
                  },
                  {
                    text: t('writ115'),
                    onClick: () => {
                      setShowPopover({
                        ...showPopover,
                        modal: Maker.DMG,
                        sectionID: 0,
                      });
                    },
                  },
                ]}
              />
            )}
          >
            <div
              title={t('writ3')}
              // onClick={() =>
              //   (window.location.href = `${serverURL}/project/build/${
              //     data!.uid
              //   }/${projectData.id}`)
              // }
              onClick={() => {
                dispatch(showPopover.build === true ? setFalse() : setTrue());
                setShowPopover({
                  ...showPopover,
                  build: !showPopover.build,
                });
              }}
            >
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
          </Popover>
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
          <Modal
            closeTimeoutMS={150}
            isOpen={showPopover.modal !== null}
            contentLabel={t('writ21')}
            style={{
              content: {
                width: '450px',
              },
            }}
          >
            <div className="header">
              <p>
                {t(showPopover.modal === Maker.EXE ? 'writ114' : 'writ115')}
              </p>
              <div
                title={t('cancel')}
                onClick={() =>
                  setShowPopover({
                    ...showPopover,
                    modal: null,
                  })
                }
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
                {
                  {
                    exe: (
                      <div>
                        {
                          {
                            0: (
                              <div>
                                {i18n.language === 'ko' ? (
                                  <p
                                    style={{
                                      margin: 0,
                                      color: 'var(--textSubBlackColor)',
                                      paddingBottom: '1rem',
                                      maxWidth: '100%',
                                      lineHeight: '1.5',
                                    }}
                                  >
                                    셀레노드 프로젝트 <b>{projectData.name}</b>{' '}
                                    를 exe 파일로 빌드합니다.
                                    <br />
                                    Windows 7 이상의 Windows 운영 체제를
                                    지원합니다.
                                  </p>
                                ) : (
                                  <p
                                    style={{
                                      margin: 0,
                                      color: 'var(--textSubBlackColor)',
                                      paddingBottom: '1rem',
                                      maxWidth: '100%',
                                      lineHeight: '1.5',
                                    }}
                                  >
                                    Build a Selenod project{' '}
                                    <b>{projectData.name}</b> as exe file.
                                    <br />
                                    It supports Windows 7 and later Windows OS.
                                  </p>
                                )}
                              </div>
                            ),
                            1: (
                              <div>
                                {i18n.language === 'ko' ? (
                                  <p
                                    style={{
                                      margin: 0,
                                      color: 'var(--textSubBlackColor)',
                                      paddingBottom: '1rem',
                                      maxWidth: '100%',
                                      lineHeight: '1.5',
                                    }}
                                  >
                                    <b>{projectData.name}.exe </b>가 빌드 큐에
                                    추가되었습니다.
                                    <br />
                                    잠시 후에 어플리케이션이 다운로드 될
                                    것입니다.
                                  </p>
                                ) : (
                                  <p
                                    style={{
                                      margin: 0,
                                      color: 'var(--textSubBlackColor)',
                                      paddingBottom: '1rem',
                                      maxWidth: '100%',
                                      lineHeight: '1.5',
                                    }}
                                  >
                                    <b>{projectData.name}.exe </b>has been added
                                    to build queue.
                                    <br />
                                    The application will be downloaded after a
                                    while.
                                  </p>
                                )}
                              </div>
                            ),
                          }[showPopover.sectionID]
                        }
                      </div>
                    ),
                    dmg: (
                      <div>
                        {
                          {
                            0: (
                              <div>
                                {i18n.language === 'ko' ? (
                                  <p
                                    style={{
                                      margin: 0,
                                      color: 'var(--textSubBlackColor)',
                                      paddingBottom: '1rem',
                                      maxWidth: '100%',
                                      lineHeight: '1.5',
                                    }}
                                  >
                                    셀레노드 프로젝트 <b>{projectData.name}</b>{' '}
                                    를 dmg 파일로 빌드합니다.
                                    <br />
                                    macOS 10.10 이상의 macOS 운영 체제를
                                    지원합니다.
                                  </p>
                                ) : (
                                  <p
                                    style={{
                                      margin: 0,
                                      color: 'var(--textSubBlackColor)',
                                      paddingBottom: '1rem',
                                      maxWidth: '100%',
                                      lineHeight: '1.5',
                                    }}
                                  >
                                    Build a Selenod project{' '}
                                    <b>{projectData.name}</b> as dmg file.
                                    <br />
                                    It supports macOS 10.10 and later macOS.
                                  </p>
                                )}
                              </div>
                            ),
                            1: (
                              <div>
                                {i18n.language === 'ko' ? (
                                  <p
                                    style={{
                                      margin: 0,
                                      color: 'var(--textSubBlackColor)',
                                      paddingBottom: '1rem',
                                      maxWidth: '100%',
                                      lineHeight: '1.5',
                                    }}
                                  >
                                    <b>{projectData.name}.dmg </b>가 빌드 큐에
                                    추가되었습니다.
                                    <br />
                                    잠시 후에 어플리케이션이 다운로드 될
                                    것입니다.
                                    <br />
                                    <br />
                                    <a
                                      href="https://selenod.notion.site/My-macOS-application-is-damaged-and-can-t-be-opened-73b0e09f048a4e99871c9144c110c10c"
                                      rel="external noreferrer"
                                      target="_blank"
                                    >
                                      어플리케이션이 손상되어 열 수 없습니다.
                                      (영문)
                                    </a>
                                  </p>
                                ) : (
                                  <p
                                    style={{
                                      margin: 0,
                                      color: 'var(--textSubBlackColor)',
                                      paddingBottom: '1rem',
                                      maxWidth: '100%',
                                      lineHeight: '1.5',
                                    }}
                                  >
                                    <b>{projectData.name}.dmg </b>has been added
                                    to build queue.
                                    <br />
                                    The application will be downloaded after a
                                    while.
                                    <br />
                                    <br />
                                    <a
                                      href="https://selenod.notion.site/My-macOS-application-is-damaged-and-can-t-be-opened-73b0e09f048a4e99871c9144c110c10c"
                                      rel="external noreferrer"
                                      target="_blank"
                                    >
                                      Application is damaged and can’t be
                                      opened.
                                    </a>
                                  </p>
                                )}
                              </div>
                            ),
                          }[showPopover.sectionID]
                        }
                      </div>
                    ),
                  }[showPopover.modal!]
                }
                <button
                  className="button primary"
                  style={{
                    display: 'inherit',
                    marginLeft: 'auto',
                    marginTop: 15,
                    marginBottom: 40,
                  }}
                  onClick={async () => {
                    switch (showPopover.modal) {
                      case Maker.EXE:
                        if (showPopover.sectionID === 0) {
                          setShowPopover({
                            ...showPopover,
                            sectionID: 1,
                          });
                        } else {
                          setShowPopover({
                            ...showPopover,
                            modal: null,
                          });
                        }
                        break;
                      case Maker.DMG:
                        if (showPopover.sectionID === 0) {
                          await setShowPopover({
                            ...showPopover,
                            sectionID: 1,
                          });
                          window.location.href = `${serverURL}/project/build/${
                            data!.uid
                          }/${projectData.id}/dmg`;
                        } else {
                          setShowPopover({
                            ...showPopover,
                            modal: null,
                          });
                        }
                        break;
                      default:
                        break;
                    }
                  }}
                >
                  {showPopover.sectionID === 0 ? t('writ116') : t('writ117')}
                </button>
              </div>
            </div>
          </Modal>
        </div>
      </div>
    </div>
  );
}
