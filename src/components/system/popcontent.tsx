import { CurrentTheme } from '../..';
import { EContentType } from '../../enum';

import { useState, useEffect } from 'react';
import { Popover } from 'react-tiny-popover';

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

  if (isSelection === true)
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
            isOpen={
              typeof editedWindow === 'string' && editedWindow === content.text
            }
            positions={['right']}
            padding={10}
            align="start"
            reposition={false}
            onClickOutside={() => {
              setEditedWindow(null);
            }}
            content={() => (
              <PopContent
                name={content.text}
                contents={[
                  {
                    text: 'Rename Window',
                    type: EContentType.DEFAULT,
                  },
                  { text: 'Delete Window', type: EContentType.DANGER },
                ]}
              />
            )}
          >
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
  else
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
