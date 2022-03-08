import './styles/header.css';
import logo from '../../assets/svgs/logo.svg';

export default function Header() {
  return (
    <div
      className="Header"
      style={{
        backgroundColor: 'var(--headerColor)',
      }}
    >
      <div>
        <img src={logo} alt="selenod" />
      </div>
    </div>
  );
}
