import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { setDataContext } from '..';
import { ResponseProps } from '../data';
import ResponsePage from './ResponsePage';

export default function SyncPage() {
  const { method, token, id, nickname } = useParams();
  const navigate = useNavigate();

  const setData = useContext(setDataContext);

  const [props, setProps] = useState<ResponseProps>({
    status: undefined,
    message: undefined,
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    if (method && token && id && nickname) {
      if (method === 'login') {
        setData!({
          uid: id!,
          uname: nickname!,
        });

        sessionStorage.setItem('token', token!);
        navigate('/');
      }
    } else {
      setProps({
        status: '404',
        message: 'Page not found.',
      });
    }
  }, [method, id, nickname, navigate, setData, token]);

  return <ResponsePage {...props} />;
}
