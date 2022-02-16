interface IData {
  display: string;
}

export function Opacity(data: IData) {
  return (
    <div
      style={{
        display: data.display,
        position: 'absolute',
        width: '100%',
        height: 'calc(100% + 64px)',
        top: '-64px',
        opacity: 0,
        zIndex: 998,
      }}
    />
  );
}
