import { RootState } from '../../../store';
import { useSelector } from 'react-redux';

export default function Cover() {
  const isActived = useSelector((state: RootState) => state.cover.actived);

  return (
    <div
      style={{
        display: isActived === true ? 'block' : 'none',
        position: 'absolute',
        width: '100%',
        height: '100%',
        opacity: 0,
        zIndex: 998,
      }}
    />
  );
}
