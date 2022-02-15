import './styles/editor.css';
import { CurrentTheme } from '../..';

import Tool from './tool';

export default function Editor() {
  return (
    <div
      className="Editor"
      style={{ backgroundColor: CurrentTheme.editorColor }}
    >
      <Tool />
    </div>
  );
}
