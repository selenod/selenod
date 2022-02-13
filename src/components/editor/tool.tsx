import './styles/tool.css';
import { Rnd } from 'react-rnd';

export default function Tool() {
  return (
    <div className="Tool white">
      <div className="shortcut"></div>
      <Rnd
        className="panel"
        default={{ x: 80, y: 0, width: 450, height: 0 }}
        enableResizing={{
          bottom: false,
          bottomLeft: false,
          bottomRight: false,
          left: false,
          right: true,
          top: false,
          topLeft: false,
          topRight: false,
        }}
        disableDragging={true}
        minWidth={350}
        maxWidth={(window.innerWidth * 2) / 5 - 80}
      ></Rnd>
    </div>
  );
}
