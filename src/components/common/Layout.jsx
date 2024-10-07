import { Outlet, useLocation } from 'react-router-dom';
import Footer from './Footer';
import Header from './Header';
import ScrollTop from './ui/ScrollTop';

const Layout = () => {
  const location = useLocation();
  const isMainPage = location.pathname === '/';
  const isMyPage = location.pathname === '/myPage' || location.pathname === '/myPage?tab=review';

  return (
    <div className="relative mx-auto wrap">
      <Header />
      <main className={`relative p-0 bg-white md:bg-white main ${isMainPage || isMyPage ? 'h-auto' : 'h-full'}`}>
        <section
          className={`min-h-[calc(100vh-7.5rem)] 
          sm:min-h-[calc(100vh-12rem)] md:min-h-[calc(100vh-8.5rem)]
          lg:min-h-[calc(100vh-3.8rem)] ${isMainPage || isMyPage ? 'h-auto' : 'h-full'} section`}
        >
          <Outlet />
        </section>
      </main>
      <Footer />
      <ScrollTop />
    </div>
  );
};

export default Layout;
