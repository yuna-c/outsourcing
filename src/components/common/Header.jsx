import Nav from './Nav';

const Header = () => {
  return (
    <header className="fixed top-0 left-0 z-50 w-full py-12 md:py-8 sm:py-8 bg-gradient-to-b from-white to-transparent Header">
      <Nav />
    </header>
  );
};

export default Header;
