import { CurrentTheme } from '../..';

interface IContentData {
  name: string;
  contents: Array<{
    text: string;
    type: string | number;
  }>;
}

export function PopContent(data: IContentData) {
  return (
    <div
      className="popover"
      style={{ backgroundColor: CurrentTheme.panelColor }}
    >
      <p style={{ color: CurrentTheme.textBlackColor }}>{data.name}</p>
      <div className="hl" style={{ backgroundColor: CurrentTheme.lineColor }} />
      {data.contents.map((content) => (
        <div
          style={{
            backgroundColor: CurrentTheme.panelColor,
            color:
              content.type === 0 || content.type === 'default'
                ? CurrentTheme.textSubBlackColor
                : CurrentTheme.textDangerColor,
          }}
        >
          <p>{content.text}</p>
        </div>
      ))}
    </div>
  );
}
