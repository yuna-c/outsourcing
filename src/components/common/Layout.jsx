import { Outlet } from 'react-router-dom';
import Footer from './Footer';
import Header from './Header';
import ScrollTop from './ui/ScrollTop';

const Layout = () => {
  return (
    <>
      <Header />
      <main className="relative mt-20 bg-white md:bg-white Layout">
        <section className="min-h-[calc(100vh-7rem)] md:min-h-[calc(100vh-10rem)]">
          {/*  flex justify-center items-center 가로세로 중간 배치 */}
          <Outlet />
        </section>
      </main>
      <Footer />
      <ScrollTop />
    </>
  );
};

export default Layout;
