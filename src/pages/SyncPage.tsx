import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { landingURL } from '../config/config';
import { ResponseProps } from '../data';
import ResponsePage from './ResponsePage';

export default function SyncPage() {
  const { method, id, nickname } = useParams();
  const navigate = useNavigate();

  const [props, setProps] = useState<ResponseProps>({
    status: undefined,
    message: undefined,
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    if (method && id && nickname) {
      if (method === 'login') {
        localStorage.setItem('id', id!);
        localStorage.setItem('nickname', nickname!);
        navigate('/');
      } else if (
        localStorage.getItem('id') &&
        localStorage.getItem('nickname') &&
        method === 'logout' &&
        id === localStorage.getItem('id') &&
        nickname === localStorage.getItem('nickname')
      ) {
        localStorage.removeItem('id');
        localStorage.removeItem('nickname');
      }

      window.location.href = landingURL;
    } else {
      setProps({
        status: '404',
        message: 'Page not found.',
      });
    }
  }, [method, id, nickname, navigate]);

  return <ResponsePage {...props} />;
}
