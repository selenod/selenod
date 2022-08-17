import { useEffect } from 'react';
import { landingURL } from '../config/config';

export default function Workspace() {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Workspace - Selenod';

    if (!localStorage.getItem('id') || !localStorage.getItem('nickname')) {
      window.location.href = landingURL;
    }
  }, []);

  return (
    <div
      style={{
        width: '100vw',
        minHeight: '50rem',
        marginTop: 64,
      }}
    >
      워크스페이스입니다~
    </div>
  );
}
