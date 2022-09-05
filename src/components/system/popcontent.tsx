import { ContentType } from '../../data';

import { useState, useEffect, useContext } from 'react';
import { Popover } from 'react-tiny-popover';
import Modal from 'react-modal';
import { RootState } from '../../store';
import { useSelector, useDispatch } from 'react-redux';
import {
  setWindowData,
  setWindowShown,
} from '../system/reduxSlice/windowSlice';
import toast from 'react-hot-toast';
import api from '../../config/api';
import { setProjectData } from './reduxSlice/projectSlice';
import { setFalse } from './reduxSlice/coverSlice';
import { dataContext } from '../..';
import { useTranslation } from 'react-i18next';

interface IContentData {
  cacheKey?: string;
  isSelection?: boolean;
  isScrollable?: boolean;
  width?: number;
  height?: number;
  contents: Array<{
    text?: string;
    id?: number;
    type?: ContentType;
    onClick?: Function;
    selected?: boolean;
  }>;
}

Modal.setAppElement('#root');

export function PopContent({
  cacheKey,
  isSelection = false,
  isScrollable = false,
  height = 200,
  width = 190,
  contents,
}: IContentData) {
  const { t } = useTranslation(['page']);

  const [contentsState, setContentsState] = useState<
    Array<{
      text?: string;
      id?: number;
      type?: ContentType;
      onClick?: Function;
      selected?: boolean;
    }>
  >(contents);
  const [editedWindow, setEditedWindow] = useState<string | null>(null);
  const [confModal, setConfModal] = useState<string | null>(null);
  const [editModal, setEditModal] = useState<string | null>(null);
  const [delModal, setDelModal] = useState<string | null>(null);
  const [formDisable, setFormDisable] = useState<boolean>(false);
  const [formInput, setFormInput] = useState<string>('');
  const [confInput, setConfInput] = useState<{
    width: string;
    height: string;
  }>({
    width: '',
    height: '',
  });

  const currentWindow = useSelector(
    (state: RootState) => state.window.currentWindow
  );
  const projectData = useSelector((state: RootState) => state.project.data);
  const isClicked = useSelector((state: RootState) => state.cover.clicked);
  const windowList = useSelector((state: RootState) => state.window.windowList);
  const dispatch = useDispatch();

  const data = useContext(dataContext);

  useEffect(() => {
    if (
      cacheKey !== undefined &&
      window.sessionStorage.getItem(cacheKey!) !== null
    ) {
      const tempArray = contentsState;
      const currentWindowId = window.sessionStorage.getItem(cacheKey!);
      const newSelected = contentsState.find(
        (arrContent) =>
          arrContent.text ===
          windowList.filter(
            (window) => window.id.toString() === currentWindowId
          )[0].name
      );
      const oldSelected = contentsState.find(
        (arrContent) => arrContent.selected
      );
      if (newSelected !== oldSelected) {
        newSelected!.selected = true;
        oldSelected!.selected = false;
      }

      tempArray[contentsState.indexOf(newSelected!)] = newSelected!;
      tempArray[contentsState.indexOf(oldSelected!)] = oldSelected!;
      setContentsState([...tempArray]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isSelection && cacheKey === 'current_window')
    return (
      <div
        className="popover-parent"
        style={
          isScrollable
            ? {
                height: height,
                width: width,
              }
            : {
                width: width,
              }
        }
      >
        <div
          className="popover"
          style={
            isScrollable
              ? {
                  height: height,
                }
              : undefined
          }
        >
          {contentsState.map((content) =>
            content.type === 'line' ? (
              <div
                className="hl"
                key={contentsState.indexOf(content)}
                style={{
                  backgroundColor: 'var(--popContentlineColor)',
                  width: 'calc(100% - 20px)',
                  marginLeft: 10,
                }}
              />
            ) : content.type === 'category' ? (
              <p
                key={contentsState.indexOf(content)}
                style={{
                  margin:
                    contentsState.indexOf(content) === 0
                      ? '7px 0 3px 15px'
                      : '10px 0 3px 15px',
                  color: 'var(--shortcutIconColor)',
                  fontSize: '.7rem',
                  fontWeight: 800,
                }}
              >
                {content.text}
              </p>
            ) : (
              <Popover
                key={contentsState.indexOf(content)}
                isOpen={
                  typeof editedWindow === 'string' &&
                  editedWindow === content.text
                }
                positions={['right']}
                padding={10}
                align="start"
                reposition={false}
                onClickOutside={() => {
                  if (isClicked) {
                    setEditedWindow(null);
                  }
                }}
                content={() => (
                  <div
                    className="popover-parent"
                    style={
                      isScrollable
                        ? {
                            height: height,
                            width: 170,
                          }
                        : {
                            width: 170,
                          }
                    }
                  >
                    <div
                      className="popover"
                      style={{
                        width: '170px',
                      }}
                    >
                      <div
                        title={t('writ62')}
                        style={{
                          color: 'var(--textSubBlackColor)',
                        }}
                        onClick={() => {
                          setConfModal(content.text!);
                        }}
                      >
                        <p>{t('writ62')}</p>
                      </div>
                      <div
                        title={t('writ63')}
                        style={{
                          color: 'var(--textSubBlackColor)',
                        }}
                        onClick={() => {
                          setEditModal(content.text!);
                        }}
                      >
                        <p>{t('writ63')}</p>
                      </div>
                      <div
                        title={t('writ64')}
                        style={{
                          color: 'var(--red)',
                        }}
                        onClick={() => {
                          setDelModal(content.text!);
                        }}
                      >
                        <p>{t('writ64')}</p>
                      </div>
                      <Modal
                        closeTimeoutMS={150}
                        isOpen={confModal === content.text}
                        contentLabel={t('writ62')}
                        style={{
                          content: {
                            width: '400px',
                          },
                        }}
                      >
                        <div className="header">
                          <p>{t('writ62')}</p>
                          <div
                            title={t('cancel')}
                            onClick={() => setConfModal(null)}
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
                              {t('writ65')}
                            </p>
                            <input
                              style={{
                                width: '100%',
                                margin: '0 0 1rem 0',
                                fontSize: '.9rem',
                              }}
                              value={confInput.width}
                              onChange={(e) => {
                                e.target.value = e.target.value
                                  .replace(/[^0-9.]/g, '')
                                  .replace('.', '')
                                  .replace(/(\..*)\./g, '$1');

                                setConfInput({
                                  ...confInput,
                                  width: e.target.value,
                                });
                              }}
                              onBlur={() => {
                                if (parseInt(confInput.width) > 3840) {
                                  setConfInput({
                                    ...confInput,
                                    width: '3840',
                                  });
                                } else if (parseInt(confInput.width) < 200) {
                                  setConfInput({
                                    ...confInput,
                                    width: '300',
                                  });
                                } else if (!parseInt(confInput.width)) {
                                  setConfInput({
                                    ...confInput,
                                    width: '1366',
                                  });
                                }
                              }}
                              placeholder={
                                windowList.find(
                                  (window) => window.id === content.id!
                                )!
                                  ? windowList
                                      .find(
                                        (window) => window.id === content.id!
                                      )!
                                      .windowData.width.toString()
                                  : undefined
                              }
                            />
                            <p
                              style={{
                                margin: '.7rem 0 0 0',
                                color: 'var(--textSubBlackColor)',
                                paddingBottom: '.7rem',
                                maxWidth: '100%',
                              }}
                            >
                              {t('writ66')}
                            </p>
                            <input
                              style={{
                                width: '100%',
                                margin: '0 0 1rem 0',
                                fontSize: '.9rem',
                              }}
                              value={confInput.height}
                              onChange={(e) => {
                                e.target.value = e.target.value
                                  .replace(/[^0-9.]/g, '')
                                  .replace('.', '')
                                  .replace(/(\..*)\./g, '$1');

                                setConfInput({
                                  ...confInput,
                                  height: e.target.value,
                                });
                              }}
                              onBlur={() => {
                                if (parseInt(confInput.height) > 2160) {
                                  setConfInput({
                                    ...confInput,
                                    height: '2160',
                                  });
                                } else if (parseInt(confInput.height) < 200) {
                                  setConfInput({
                                    ...confInput,
                                    height: '200',
                                  });
                                } else if (!parseInt(confInput.height)) {
                                  setConfInput({
                                    ...confInput,
                                    height: '768',
                                  });
                                }
                              }}
                              placeholder={
                                windowList.find(
                                  (window) => window.id === content.id!
                                )!
                                  ? windowList
                                      .find(
                                        (window) => window.id === content.id!
                                      )!
                                      .windowData.height.toString()
                                  : undefined
                              }
                            />
                            <button
                              className="button primary"
                              style={{
                                display: 'inherit',
                                marginLeft: 'auto',
                                marginBottom: 40,
                              }}
                              disabled={formDisable}
                              onClick={async () => {
                                // two-factor (who knows?)
                                setFormDisable(true);

                                if (
                                  parseInt(confInput.width) >= 300 &&
                                  parseInt(confInput.height) >= 200 &&
                                  parseInt(confInput.width) <= 3840 &&
                                  parseInt(confInput.height) <= 2160
                                ) {
                                  await api
                                    .put('/project/window', {
                                      uid: data?.uid,
                                      id: projectData.id!,
                                      _id: windowList.find(
                                        (window) => window.id === content.id!
                                      )!._id,
                                      name: windowList.find(
                                        (window) => window.id === content.id!
                                      )!.name,
                                      windowData: {
                                        width: parseInt(confInput.width),
                                        height: parseInt(confInput.height),
                                      },
                                    })
                                    .then(async () => {
                                      await api
                                        .get(
                                          `/project/${
                                            data?.uid
                                          }/${projectData.id!}`
                                        )
                                        .then((res) => {
                                          // Delete scriptData of window for dispatch setWindowData.
                                          res.data.project.windowList.forEach(
                                            (win: any) => delete win.scriptData
                                          );

                                          dispatch(
                                            setWindowData({
                                              windowList:
                                                res.data.project.windowList,
                                              currentWindow: currentWindow!,
                                            })
                                          );
                                          dispatch(
                                            setProjectData({
                                              id: projectData.id!,
                                              name: projectData.name!,
                                              owner: projectData.owner!,
                                              createAt:
                                                res.data.project.createAt,
                                              modifiedAt:
                                                res.data.project.modifiedAt,
                                            })
                                          );

                                          toast.success(t('writ67'));
                                        })
                                        .catch((err) => {
                                          toast.error(
                                            err.response.data.message
                                              ? err.response.data.message
                                              : 'Fail to update database.'
                                          );
                                        });
                                    })
                                    .catch((err) => {
                                      toast.error(
                                        err.response.data.message
                                          ? err.response.data.message
                                          : 'Fail to update database.'
                                      );
                                    });
                                } else {
                                  toast.error(`An error occured.`);
                                }
                                setConfModal(null);
                                setEditedWindow(null);
                                setFormDisable(false);
                                setFormInput('');
                                dispatch(setWindowShown(false));
                                dispatch(setFalse());
                              }}
                            >
                              {t('writ62')}
                            </button>
                          </div>
                        </div>
                      </Modal>
                      <Modal
                        closeTimeoutMS={150}
                        isOpen={editModal === content.text}
                        contentLabel={t('writ63')}
                        style={{
                          content: {
                            width: '400px',
                          },
                        }}
                      >
                        <div className="header">
                          <p>{t('writ63')}</p>
                          <div
                            title={t('cancel')}
                            onClick={() => setEditModal(null)}
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
                              {t('writ68')}
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
                              maxLength={50}
                            />
                            <button
                              className="button primary"
                              style={{
                                display: 'inherit',
                                marginLeft: 'auto',
                                marginBottom: 40,
                              }}
                              disabled={formDisable}
                              onClick={async () => {
                                // two-factor (who knows?)
                                setFormDisable(true);

                                if (
                                  formInput.replaceAll(' ', '') !== '' &&
                                  contentsState.find(
                                    (ct) => ct.text === formInput
                                  ) === undefined
                                ) {
                                  await api
                                    .put('/project/window', {
                                      uid: data?.uid,
                                      id: projectData.id!,
                                      _id: windowList.find(
                                        (window) => window.id === content.id!
                                      )!._id,
                                      name: formInput,
                                      windowData: windowList.find(
                                        (window) => window.id === content.id!
                                      )!.windowData,
                                    })
                                    .then(async () => {
                                      await api
                                        .get(
                                          `/project/${
                                            data?.uid
                                          }/${projectData.id!}`
                                        )
                                        .then((res) => {
                                          // Delete scriptData of window for dispatch setWindowData.
                                          res.data.project.windowList.forEach(
                                            (win: any) => delete win.scriptData
                                          );

                                          dispatch(
                                            setWindowData({
                                              windowList:
                                                res.data.project.windowList,
                                              currentWindow: currentWindow!,
                                            })
                                          );
                                          dispatch(
                                            setProjectData({
                                              id: projectData.id!,
                                              name: projectData.name!,
                                              owner: projectData.owner!,
                                              createAt:
                                                res.data.project.createAt,
                                              modifiedAt:
                                                res.data.project.modifiedAt,
                                            })
                                          );

                                          toast.success(t('writ69'));
                                        })
                                        .catch((err) => {
                                          toast.error(
                                            err.response.data.message
                                              ? err.response.data.message
                                              : 'Fail to update database.'
                                          );
                                        });
                                    })
                                    .catch((err) => {
                                      toast.error(
                                        err.response.data.message
                                          ? err.response.data.message
                                          : 'Fail to update database.'
                                      );
                                    });
                                } else if (
                                  formInput.replaceAll(' ', '') === ''
                                ) {
                                  toast.error(t('writ25'));
                                } else if (
                                  contentsState.find(
                                    (ct) => ct.text === formInput
                                  ) !== undefined
                                ) {
                                  toast.error(t('writ23'));
                                } else {
                                  toast.error(`An error occured.`);
                                }
                                setEditModal(null);
                                setEditedWindow(null);
                                setFormDisable(false);
                                setFormInput('');
                                dispatch(setWindowShown(false));
                                dispatch(setFalse());
                              }}
                            >
                              {t('writ63')}
                            </button>
                          </div>
                        </div>
                      </Modal>
                      <Modal
                        closeTimeoutMS={150}
                        isOpen={delModal === content.text}
                        contentLabel={t('writ64')}
                        style={{
                          content: {
                            width: '450px',
                          },
                        }}
                      >
                        <div className="header">
                          <p>{t('writ64')}</p>
                          <div
                            title={t('cancel')}
                            onClick={() => setDelModal(null)}
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
                                paddingBottom: '1rem',
                                maxWidth: '100%',
                                lineHeight: '1.5',
                              }}
                            >
                              {t('writ70')}
                              <br />
                              {t('writ71')}
                            </p>
                            <button
                              className="button danger"
                              style={{
                                display: 'inherit',
                                marginLeft: 'auto',
                                marginTop: 15,
                                marginBottom: 40,
                              }}
                              onClick={async () => {
                                // two-factor (who knows?)
                                setFormDisable(true);
                                if (
                                  window.sessionStorage.getItem(
                                    'current_window'
                                  ) === content.id!.toString()
                                ) {
                                  setDelModal(null);
                                  setFormDisable(false);
                                  toast.error(t('writ72'));

                                  setDelModal(null);
                                  setFormDisable(false);
                                  dispatch(setWindowShown(false));
                                  dispatch(setFalse());
                                  return false;
                                }

                                if (
                                  window.sessionStorage.getItem(
                                    'current_window'
                                  ) === content.id!.toString() &&
                                  windowList.indexOf(
                                    windowList.find(
                                      (window) => content.id! === window.id
                                    )!
                                  ) !== 0
                                ) {
                                  window.sessionStorage.setItem(
                                    'current_window',
                                    windowList[0].id.toString()
                                  );
                                } else if (
                                  window.sessionStorage.getItem(
                                    'current_window'
                                  ) === content.id!.toString()
                                ) {
                                  window.sessionStorage.setItem(
                                    'current_window',
                                    windowList[1].id.toString()
                                  );
                                }

                                await api
                                  .delete(
                                    `/project/window/${
                                      data?.uid
                                    }/${projectData.id!}/${
                                      windowList.find(
                                        (window) => window.id === content.id!
                                      )!._id
                                    }`
                                  )
                                  .then(async () => {
                                    await api
                                      .get(
                                        `/project/${
                                          data?.uid
                                        }/${projectData.id!}`
                                      )
                                      .then((res) => {
                                        // Delete scriptData of window for dispatch setWindowData.
                                        res.data.project.windowList.forEach(
                                          (win: any) => delete win.scriptData
                                        );

                                        dispatch(
                                          setWindowData({
                                            windowList:
                                              res.data.project.windowList,
                                            currentWindow: currentWindow!,
                                          })
                                        );
                                        dispatch(
                                          setProjectData({
                                            id: projectData.id!,
                                            name: projectData.name!,
                                            owner: projectData.owner!,
                                            createAt: res.data.project.createAt,
                                            modifiedAt:
                                              res.data.project.modifiedAt,
                                          })
                                        );
                                        contentsState.splice(
                                          contentsState.indexOf(
                                            contentsState.filter(
                                              (ct) => content.id === ct.id
                                            )[0]
                                          ),
                                          1
                                        );
                                        toast.success(t('writ73'));
                                      })
                                      .catch((err) => {
                                        toast.error(
                                          err.response.data.message
                                            ? err.response.data.message
                                            : 'Fail to update database.'
                                        );
                                      });
                                  })
                                  .catch((err) => {
                                    toast.error(
                                      err.response.data.message
                                        ? err.response.data.message
                                        : 'Fail to update database.'
                                    );
                                  });

                                setDelModal(null);
                                setFormDisable(false);
                                dispatch(setWindowShown(false));
                                dispatch(setFalse());
                              }}
                              disabled={formDisable}
                            >
                              {t('writ74')}
                            </button>
                          </div>
                        </div>
                      </Modal>
                    </div>
                  </div>
                )}
              >
                <div
                  title={content.text}
                  style={{
                    backgroundColor:
                      typeof editedWindow === 'string' &&
                      editedWindow === content.text
                        ? 'var(--popContentHoverColor)'
                        : '',
                    color:
                      content.type === ContentType.DANGER
                        ? 'var(--red)'
                        : 'var(--textSubBlackColor)',
                  }}
                  onClick={(e) => {
                    e.preventDefault();
                    if (typeof content['onClick'] === 'function') {
                      if (content.onClick !== undefined) {
                        content.onClick!();
                      }
                    }
                    const newSelected = contentsState.find(
                      (arrContent) => arrContent.text === content.text
                    );
                    const oldSelected = contentsState.find(
                      (arrContent) => arrContent.selected
                    );
                    if (newSelected !== oldSelected) {
                      newSelected!.selected = true;
                      oldSelected!.selected = false;
                    }
                    const newArray = contentsState;
                    newArray[contentsState.indexOf(newSelected!)] =
                      newSelected!;
                    newArray[contentsState.indexOf(oldSelected!)] =
                      oldSelected!;
                    if (typeof cacheKey !== undefined) {
                      window.sessionStorage.setItem(
                        cacheKey!,
                        windowList
                          .filter(
                            (window) => newSelected?.text! === window.name
                          )[0]
                          .id.toString()
                      );
                    }
                    setContentsState([...newArray]);
                  }}
                  onContextMenu={(e) => {
                    e.preventDefault();
                    setEditedWindow(
                      typeof editedWindow === 'string' &&
                        editedWindow === content.text!
                        ? null
                        : content.text!
                    );
                  }}
                >
                  <div>
                    {content.selected ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="17"
                        height="17"
                        fill="var(--shortcutIconColor)"
                        className="bi bi-check-lg"
                        viewBox="0 0 16 16"
                        style={{
                          position: 'relative',
                          top: -1,
                        }}
                      >
                        <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z" />
                      </svg>
                    ) : (
                      <></>
                    )}
                    <p>{content.text}</p>
                  </div>
                </div>
              </Popover>
            )
          )}
        </div>
      </div>
    );
  else if (isSelection) {
    return (
      <div
        className="popover-parent"
        style={
          isScrollable
            ? {
                height: height,
                width: width,
              }
            : {
                width: width,
              }
        }
      >
        <div
          className="popover"
          style={
            isScrollable
              ? {
                  height: height,
                }
              : undefined
          }
        >
          {contentsState.map((content) =>
            content.type === 'line' ? (
              <div
                key={contentsState.indexOf(content)}
                className="hl"
                style={{
                  backgroundColor: 'var(--popContentlineColor)',
                  width: 'calc(100% - 20px)',
                  marginLeft: 10,
                }}
              />
            ) : content.type === 'category' ? (
              <p
                key={contentsState.indexOf(content)}
                style={{
                  margin:
                    contentsState.indexOf(content) === 0
                      ? '7px 0 3px 15px'
                      : '10px 0 3px 15px',
                  color: 'var(--shortcutIconColor)',
                  fontSize: '.7rem',
                  fontWeight: 800,
                }}
              >
                {content.text}
              </p>
            ) : (
              <div
                key={contentsState.indexOf(content)}
                title={content.text}
                style={{
                  color:
                    content.type === ContentType.DANGER
                      ? 'var(--red)'
                      : 'var(--textSubBlackColor)',
                }}
                onClick={(e) => {
                  e.preventDefault();
                  if (typeof content['onClick'] === 'function') {
                    if (content.onClick !== undefined) {
                      content.onClick!();
                    }
                  }
                  const newSelected = contentsState.find(
                    (arrContent) => arrContent.text === content.text
                  );
                  const oldSelected = contentsState.find(
                    (arrContent) => arrContent.selected
                  );
                  if (
                    newSelected !== oldSelected &&
                    newSelected !== undefined &&
                    oldSelected !== undefined
                  ) {
                    newSelected!.selected = true;
                    oldSelected!.selected = false;
                  }
                  const newArray = contentsState;
                  newArray[contentsState.indexOf(newSelected!)] = newSelected!;
                  newArray[contentsState.indexOf(oldSelected!)] = oldSelected!;
                  if (typeof cacheKey !== undefined) {
                    window.sessionStorage.setItem(
                      cacheKey!,
                      newSelected?.text!
                    );
                  }
                  setContentsState([...newArray]);
                }}
              >
                <div>
                  {content.selected ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="17"
                      height="17"
                      fill="var(--shortcutIconColor)"
                      className="bi bi-check-lg"
                      viewBox="0 0 16 16"
                      style={{
                        position: 'relative',
                        top: -1,
                      }}
                    >
                      <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z" />
                    </svg>
                  ) : null}
                  <p>{content.text}</p>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    );
  } else
    return (
      <div
        className="popover-parent"
        style={
          isScrollable
            ? {
                height: height,
                width: width,
              }
            : {
                width: width,
              }
        }
      >
        <div className="popover">
          {contentsState.map((content) =>
            content.type === 'line' ? (
              <div
                key={contentsState.indexOf(content)}
                className="hl"
                style={{
                  backgroundColor: 'var(--popContentlineColor)',
                  width: 'calc(100% - 20px)',
                  marginLeft: 10,
                }}
              />
            ) : content.type === 'category' ? (
              <p
                key={contentsState.indexOf(content)}
                style={{
                  margin:
                    contentsState.indexOf(content) === 0
                      ? '7px 0 3px 15px'
                      : '10px 0 3px 15px',
                  color: 'var(--shortcutIconColor)',
                  fontSize: '.7rem',
                  fontWeight: 800,
                }}
              >
                {content.text}
              </p>
            ) : (
              <div
                key={contentsState.indexOf(content)}
                title={content.text}
                style={{
                  color:
                    content.type === ContentType.DANGER
                      ? 'var(--red)'
                      : 'var(--textSubBlackColor)',
                }}
                onClick={() => {
                  if (content.onClick !== undefined) {
                    content.onClick!();
                  }
                }}
              >
                <p>{content.text}</p>
              </div>
            )
          )}
        </div>
      </div>
    );
}
