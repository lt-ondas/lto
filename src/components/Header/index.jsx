import { Link } from 'react-router-dom';
import './Header.css';

function Header() {
    return (
        <header className='header'>
            <Link className='text-logo' to="/">Linhas de Transmissão e Ondas - 2025.1</Link>
            <Link to="/Sobre">Sobre</Link>
        </header>
    );
}

export default Header;
