export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <a href="/">RollingGames</a>
      </div>
      <ul className="navbar-menu">
        <li>
          <a href="contacto">Contacto</a>
        </li>
        <li>
          <a href="sobre-nosotros">Sobre Nosotros</a>
        </li>
        <li>
          <a href="carrito">Carrito</a>
        </li>
        <li>
          <a href="login">Login</a>
        </li>
        <li>
          <a href="registro">Registrarse</a>
        </li>
      </ul>
      <div className="navbar-search">
        <input id="search-input" placeholder="Buscar juegos..." type="text" />
        <button id="search-btn">🔍</button>
      </div>
      <div className="navbar-toggle">
        <span />
        <span />
        <span />
      </div>
    </nav>
  );
}
