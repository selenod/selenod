import './styles/editor.css';

import Tool from './tool';

export default function Editor() {
  return (
    <div className="Editor" style={{ backgroundColor: 'var(--editorColor)' }}>
      <Tool />
    </div>
  );
}
