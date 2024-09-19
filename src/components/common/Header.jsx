import Nav from './Nav';

const Header = () => {
  return (
    <header className="fixed top-0 z-30 Header">
      {/* top-0 left-0 z-50 w-full py-12 md:py-12 sm:py-8 bg-gradient-to-b from-white/30 to-transparent */}
      <Nav />
    </header>
  );
};

export default Header;
