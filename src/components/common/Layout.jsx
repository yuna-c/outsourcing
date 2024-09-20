import { Outlet } from 'react-router-dom';
import Footer from './Footer';
import Header from './Header';
import ScrollTop from './ui/ScrollTop';

const Layout = () => {
  return (
    <>
      <Header />
      <main className="relative bg-white md:bg-white Layout">
        <section className="mt-24 min-h-[calc(100vh-4rem)] md:min-h-[calc(100vh-3rem)]">
          <Outlet />
        </section>
      </main>
      <Footer />
      <ScrollTop />
    </>
  );
};

export default Layout;
