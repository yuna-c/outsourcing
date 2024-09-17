import { Outlet } from 'react-router-dom';
import Footer from './Footer';
import Header from './Header';

const Layout = () => {
  return (
    <>
      <Header />
      <main className="relative p-3 px-0 py-0 mt-20 bg-white md:bg-white md:px-6 md:py-4 Layout">
        <section className="min-h-[calc(100vh-7rem)] md:min-h-[calc(100vh-10rem)]">
          {/*  flex justify-center items-center 가로세로 중간 배치 */}
          <Outlet />
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Layout;
