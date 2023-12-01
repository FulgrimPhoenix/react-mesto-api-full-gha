import { Link } from 'react-router-dom';
import logo from '../images/logo/logo.svg';

function Header({children}){
  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="логотип" />
      <div className='header__menu'>
        {children}
      </div>
    </header>
  )
}
export default Header;