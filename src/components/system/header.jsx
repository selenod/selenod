import './styles/header.css';
import logo from '../../assets/svgs/logo.svg';

export default function Header() {
  return (
    <div className="Header header-white">
      <div>
        <img src={logo} alt="selenod"></img>
      </div>
    </div>
  );
}
