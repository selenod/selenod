import { EContentType } from '../../data';

import { useState, useEffect } from 'react';
import { Popover } from 'react-tiny-popover';
import Modal from 'react-modal';
import { RootState } from '../../store';
import { useSelector, useDispatch } from 'react-redux';
import { renameWindow, deleteWindow } from '../system/reduxSlice/windowSlice';
import toast from 'react-hot-toast';

interface IContentData {
  cacheKey?: string;
  isSelection?: boolean;
  contents: Array<{
    text: string;
    id?: number;
    type?: EContentType;
    onClick?: Function;
    selected?: boolean;
  }>;
}

Modal.setAppElement('#root');

export function PopContent({ cacheKey, isSelection, contents }: IContentData) {
  const [contentsState, setContentsState] = useState<
    Array<{
      text: string;
      id?: number;
      type?: EContentType;
      onClick?: Function;
      selected?: boolean;
    }>
  >(contents);
  const [editedWindow, setEditedWindow] = useState<string | null>(null);
  const [editModal, setEditModal] = useState<string | null>(null);
  const [delModal, setDelModal] = useState<string | null>(null);
  const [formDisable, setFormDisable] = useState<boolean>(false);
  const [formInput, setFormInput] = useState<string>('');

  const isClicked = useSelector((state: RootState) => state.cover.clicked);
  const windowList = useSelector((state: RootState) => state.window.windowList);
  const dispatch = useDispatch();

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
      <div className="popover">
        {contentsState.map((content) => (
          <Popover
            key={content.text}
            isOpen={
              typeof editedWindow === 'string' && editedWindow === content.text
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
                className="popover"
                style={{
                  width: '150px',
                }}
              >
                <div
                  title="Rename Window"
                  style={{
                    color: 'var(--textSubBlackColor)',
                  }}
                  onClick={() => {
                    setEditModal(content.text);
                  }}
                >
                  <p>Rename Window</p>
                </div>
                <div
                  title="Delete Window"
                  style={{
                    color: 'var(--red)',
                  }}
                  onClick={() => {
                    setDelModal(content.text);
                  }}
                >
                  <p>Delete Window</p>
                </div>
                <Modal
                  closeTimeoutMS={150}
                  isOpen={editModal === content.text}
                  contentLabel="Rename Modal"
                  style={{
                    content: {
                      width: '400px',
                      height: '220px',
                    },
                  }}
                >
                  <div className="header">
                    <p>Rename Window</p>
                    <div title="Cancel" onClick={() => setEditModal(null)}>
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
                        Rename the <b>{content.text}</b> window to..
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
                        }}
                        disabled={formDisable}
                        onClick={() => {
                          // two-factor (who knows?)
                          setFormDisable(true);

                          if (
                            formInput.replaceAll(' ', '') !== '' &&
                            contentsState.find(
                              (ct) => ct.text === formInput
                            ) === undefined
                          ) {
                            dispatch(
                              renameWindow({
                                id: content.id,
                                value: formInput,
                              })
                            );

                            const contentTarget = contentsState.filter(
                              (ct) => ct.id === content.id
                            )[0];
                            contentsState.splice(
                              contentsState.indexOf(contentTarget),
                              1,
                              {
                                text: formInput,
                                id: contentTarget.id,
                                type: contentTarget.type,
                                onClick: contentTarget.onClick,
                                selected: contentTarget.selected,
                              }
                            );
                            toast.success(`The window has been renamed.`);
                          } else if (formInput.replaceAll(' ', '') === '') {
                            toast.error(`The window's name cannot be blank.`);
                          } else if (
                            contentsState.find(
                              (ct) => ct.text === formInput
                            ) !== undefined
                          ) {
                            toast.error(
                              `There's already a window with the same name.`
                            );
                          } else {
                            toast.error(`An error occured.`);
                          }
                          setEditModal(null);
                          setFormDisable(false);
                          setFormInput('');
                        }}
                      >
                        Rename Window
                      </button>
                    </div>
                  </div>
                </Modal>
                <Modal
                  closeTimeoutMS={150}
                  isOpen={delModal === content.text}
                  contentLabel="Delete Modal"
                  style={{
                    content: {
                      width: '450px',
                      height: '230px',
                    },
                  }}
                >
                  <div className="header">
                    <p>Delete Window</p>
                    <div title="Cancel" onClick={() => setDelModal(null)}>
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
                          paddingBottom: '1.5rem',
                        }}
                      >
                        You cannot undone this action.
                        <br />
                        This will permanently delete the <b>
                          {content.text}
                        </b>{' '}
                        window, objects, and all nodes in the{' '}
                        <b>{content.text}</b> window.
                      </p>
                      <button
                        className="button primary"
                        style={{
                          display: 'inherit',
                          marginLeft: 'auto',
                          marginTop: 15,
                        }}
                        onClick={() => {
                          // two-factor (who knows?)
                          setFormDisable(true);
                          if (
                            window.sessionStorage.getItem('current_window') ===
                            content.id!.toString()
                          ) {
                            setDelModal(null);
                            setFormDisable(false);
                            toast.error('The window opened cannot be deleted.');
                            return false;
                          }
                          dispatch(deleteWindow(content.id));
                          contentsState.splice(
                            contentsState.indexOf(
                              contentsState.filter(
                                (ct) => content.id === ct.id
                              )[0]
                            ),
                            1
                          );
                          toast.success(`The window has been deleted.`);
                          setDelModal(null);
                          setFormDisable(false);
                        }}
                        disabled={formDisable}
                      >
                        I understand
                      </button>
                    </div>
                  </div>
                </Modal>
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
                  content.type === EContentType.DANGER
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
                newArray[contentsState.indexOf(newSelected!)] = newSelected!;
                newArray[contentsState.indexOf(oldSelected!)] = oldSelected!;
                if (typeof cacheKey !== undefined) {
                  window.sessionStorage.setItem(
                    cacheKey!,
                    windowList
                      .filter((window) => newSelected?.text! === window.name)[0]
                      .id.toString()
                  );
                }
                setContentsState([...newArray]);
              }}
              onContextMenu={(e) => {
                e.preventDefault();
                setEditedWindow(
                  typeof editedWindow === 'string' &&
                    editedWindow === content.text
                    ? null
                    : content.text
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
        ))}
      </div>
    );
  else if (isSelection) {
    return (
      <div className="popover">
        {contentsState.map((content) => (
          <div
            key={content.text}
            title={content.text}
            style={{
              backgroundColor: 'var(--popContentColor)',
              color:
                content.type === EContentType.DANGER
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
              newArray[contentsState.indexOf(newSelected!)] = newSelected!;
              newArray[contentsState.indexOf(oldSelected!)] = oldSelected!;
              if (typeof cacheKey !== undefined) {
                window.sessionStorage.setItem(cacheKey!, newSelected?.text!);
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
        ))}
      </div>
    );
  } else
    return (
      <div className="popover">
        {contentsState.map((content) => (
          <div
            key={content.text}
            title={content.text}
            style={{
              color:
                content.type === EContentType.DANGER
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
        ))}
      </div>
    );
}
