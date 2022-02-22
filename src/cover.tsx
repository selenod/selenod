import { RootState } from './store';
import { useSelector, useDispatch } from 'react-redux';
import { setClicked } from './components/system/reduxSlice/coverSlice';

export default function Cover() {
  const isActived = useSelector((state: RootState) => state.cover.actived);
  const dispatch = useDispatch();

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
      onMouseDown={() => {
        dispatch(setClicked());
      }}
    />
  );
}
