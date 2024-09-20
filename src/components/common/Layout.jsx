import { Outlet } from 'react-router-dom';
import Footer from './Footer';
import Header from './Header';
import ScrollTop from './ui/ScrollTop';

const Layout = () => {
  return (
    <>
      <Header />
      <main className="relative p-0 bg-white md:bg-white">
        <section className="min-h-[calc(100vh-7.5rem)] sm:min-h-[calc(100vh-12rem)] md:min-h-[calc(100vh-8.5rem)] lg:min-h-[calc(100vh-8rem)]">
          <Outlet />
        </section>
      </main>
      <Footer />
      <ScrollTop />
    </>
  );
};

export default Layout;
