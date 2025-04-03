export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>RollingGames</h3>
          <p>Tu destino para los mejores videojuegos.</p>
        </div>
        <div className="footer-section">
          <h3>Enlaces</h3>
          <ul>
            <li>
              <a href="soporte">Soporte</a>
            </li>
            <li>
              <a href="terminos">Términos</a>
            </li>
            <li>
              <a href="privacidad">Privacidad</a>
            </li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>Contacto</h3>
          <p>
            Email: <span className="highlight">soporte@rollinggames.com</span>
          </p>
          <p>
            Tel: <span className="highlight">+54 11 1234-5678</span>
          </p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2025 RollingGames. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}
