type HeaderProps = {
  businessName: string;
};

function Header({ businessName }: HeaderProps) {
  return (
    <header className="main-header">
      <div className="container">
        <a href="#home" className="logo">{businessName}</a>
        <nav className="main-nav">
          <ul>
            <li><a href="#about">About</a></li>
            <li><a href="#menu">Menu</a></li>
            <li><a href="#gallery">Gallery</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;