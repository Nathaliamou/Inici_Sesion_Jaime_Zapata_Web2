import { Link } from "react-router-dom";
const Header = () => {
  return (
    <header>
      <img src="" alt="Logo" />
      <nav>
        <a href="">Servicios</a>
        <a href="">Contacto</a>
        <a href="">Acerca de</a>
      </nav>
      <button>
        <Link to="/">Cerrar Sesion</Link>
      </button>
    </header>
  );
};

export default Header;
