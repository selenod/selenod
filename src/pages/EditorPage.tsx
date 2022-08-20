import { useEffect } from 'react';
import Editor from '../components/editor/editor';
import { landingURL } from '../config/config';
import Cover from '../cover';

export default function EditorPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Editor - Selenod';

    if (!localStorage.getItem('id') || !localStorage.getItem('nickname')) {
      window.location.href = landingURL;
    }
  }, []);

  return (
    <div className="EditorPage">
      <Cover />
      <Editor />
    </div>
  );
}
