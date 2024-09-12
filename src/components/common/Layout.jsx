import { Outlet } from 'react-router-dom';
import Footer from './Footer';
import Header from './Header';

const Layout = () => {
  return (
    <>
      <Header />
      <main className="relative p-3 px-0 py-0 bg-white md:bg-white md:px-6 md:py-4 Layout">
        <section className="min-h-[calc(100vh-7rem)] md:min-h-[calc(100vh-10rem)] ">
          <Outlet />
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Layout;
