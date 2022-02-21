import { useState } from 'react';
import { CurrentTheme } from '../..';
import { EContentType } from '../../enum';

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
  >(
    cacheKey === undefined || window.sessionStorage.getItem(cacheKey!) === null
      ? contents
      : (JSON.parse(window.sessionStorage.getItem(cacheKey!)!) as Array<{
          text: string;
          type?: EContentType;
          onClick?: Function;
          selected?: boolean;
        }>)
  );

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
          <div
            key={content.text}
            style={{
              backgroundColor: CurrentTheme.popContentColor,
              color:
                content.type === EContentType.DANGER
                  ? CurrentTheme.textDangerColor
                  : CurrentTheme.textSubBlackColor,
            }}
            onClick={() => {
              if (typeof content['onClick'] === 'function') {
                content.onClick!();
              }
              const newSelected = contentsState.find((arrContent) => {
                if (arrContent.text === content.text) {
                  return true;
                }
              });
              const oldSelected = contentsState.find((arrContent) => {
                if (arrContent.selected === true) {
                  return true;
                }
              });
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
                  JSON.stringify([...newArray])
                );
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
