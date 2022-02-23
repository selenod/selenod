import { CurrentTheme } from '../..';
import { EContentType } from '../../enum';

import { useState, useEffect } from 'react';
import { Popover } from 'react-tiny-popover';
import Modal from 'react-modal';
import { RootState } from '../../store';
import { useSelector } from 'react-redux';

interface IContentData {
  name: string;
  cacheKey?: string;
  isSelection?: boolean;
  contents: Array<{
    text: string;
    type?: EContentType;
    onClick?: Function;
    selected?: boolean;
  }>;
}

Modal.setAppElement('#root');

export function PopContent({
  name,
  cacheKey,
  isSelection,
  contents,
}: IContentData) {
  const [contentsState, setContentsState] = useState<
    Array<{
      text: string;
      type?: EContentType;
      onClick?: Function;
      selected?: boolean;
    }>
  >(contents);
  const [editedWindow, setEditedWindow] = useState<string | null>(null);
  const isClicked = useSelector((state: RootState) => state.cover.clicked);
  const [editModal, setEditModal] = useState<string | null>(null);

  useEffect(() => {
    if (
      cacheKey !== undefined &&
      window.sessionStorage.getItem(cacheKey!) !== null
    ) {
      const tempArray = contentsState;
      const newSelected = contentsState.find(
        (arrContent) =>
          arrContent.text === window.sessionStorage.getItem(cacheKey!)!
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
        className="popover"
        style={{ backgroundColor: CurrentTheme.popContentColor }}
      >
        <p style={{ color: CurrentTheme.textBlackColor }}>{name}</p>
        <div
          className="hl"
          style={{ backgroundColor: CurrentTheme.lineColor }}
        />
        {contentsState.map((content) => (
          <Popover
            key={content.text}
            isOpen={
              typeof editedWindow === 'string' && editedWindow === content.text
            }
            positions={['right']}
            padding={5}
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
                style={{ backgroundColor: CurrentTheme.popContentColor }}
              >
                <p style={{ color: CurrentTheme.textBlackColor }}>
                  {content.text}
                </p>
                <div
                  className="hl"
                  style={{ backgroundColor: CurrentTheme.lineColor }}
                />
                <div
                  title="Rename Window"
                  style={{
                    backgroundColor: CurrentTheme.popContentColor,
                    color: CurrentTheme.textSubBlackColor,
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
                    backgroundColor: CurrentTheme.popContentColor,
                    color: CurrentTheme.textDangerColor,
                  }}
                >
                  <p>Delete Window</p>
                </div>
                <Modal
                  isOpen={editModal === content.text}
                  contentLabel="Rename Modal"
                  style={{
                    content: {
                      position: 'relative',
                      width: '500px',
                      height: '200px',
                      top: '5vh',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      backgroundColor: CurrentTheme.popContentColor,
                    },
                  }}
                >
                  <div
                    className="header"
                    style={{ backgroundColor: CurrentTheme.panelColor }}
                  >
                    <p style={{ color: CurrentTheme.textSubBlackColor }}>
                      Rename Window
                    </p>
                    <div
                      title="Cancel"
                      onClick={() => {
                        setEditModal(null);
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="27"
                        height="27"
                        fill={CurrentTheme.shortcutIconColor}
                        className="bi bi-x"
                        viewBox="0 0 16 16"
                      >
                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                      </svg>
                    </div>
                  </div>
                  <div className="body">
                    <i style={{ fontSize: '14px' }}>
                      네 모습 그대로 미움 받는 것이 너 아닌 다른 모습으로 사랑
                      받는 것보다 낫다.
                    </i>
                    <br />
                    -앙드레 지드-
                    <br />
                    <br />
                    고로 저희는 변수의 이름 바꾸기를 지원하지 않고 있습니다.
                  </div>
                </Modal>
              </div>
            )}
          >
            <div
              title={content.text}
              style={{
                backgroundColor: CurrentTheme.popContentColor,
                color:
                  content.type === EContentType.DANGER
                    ? CurrentTheme.textDangerColor
                    : CurrentTheme.textSubBlackColor,
              }}
              onClick={(e) => {
                e.preventDefault();
                if (typeof content['onClick'] === 'function') {
                  content.onClick!();
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
                {content.selected === true ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    fill={CurrentTheme.shortcutIconColor}
                    className="bi bi-check-lg"
                    viewBox="0 0 16 16"
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
      <div
        className="popover"
        style={{ backgroundColor: CurrentTheme.popContentColor }}
      >
        <p style={{ color: CurrentTheme.textBlackColor }}>{name}</p>
        <div
          className="hl"
          style={{ backgroundColor: CurrentTheme.lineColor }}
        />
        {contentsState.map((content) => (
          <div
            key={content.text}
            title={content.text}
            style={{
              backgroundColor: CurrentTheme.popContentColor,
              color:
                content.type === EContentType.DANGER
                  ? CurrentTheme.textDangerColor
                  : CurrentTheme.textSubBlackColor,
            }}
            onClick={(e) => {
              e.preventDefault();
              if (typeof content['onClick'] === 'function') {
                content.onClick!();
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
              {content.selected === true ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  fill={CurrentTheme.shortcutIconColor}
                  className="bi bi-check-lg"
                  viewBox="0 0 16 16"
                >
                  <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z" />
                </svg>
              ) : (
                <></>
              )}
              <p>{content.text}</p>
            </div>
          </div>
        ))}
      </div>
    );
  } else
    return (
      <div
        className="popover"
        style={{ backgroundColor: CurrentTheme.popContentColor }}
      >
        <p style={{ color: CurrentTheme.textBlackColor }}>{name}</p>
        <div
          className="hl"
          style={{ backgroundColor: CurrentTheme.lineColor }}
        />
        {contentsState.map((content) => (
          <div
            key={content.text}
            title={content.text}
            style={{
              backgroundColor: CurrentTheme.popContentColor,
              color:
                content.type === EContentType.DANGER
                  ? CurrentTheme.textDangerColor
                  : CurrentTheme.textSubBlackColor,
            }}
          >
            <p>{content.text}</p>
          </div>
        ))}
      </div>
    );
}
