import { Outlet } from 'react-router-dom';
import Footer from './Footer';
import Header from './Header';
import ScrollTop from './ui/ScrollTop';

const Layout = () => {
  return (
    <>
      <Header />
<<<<<<< HEAD
<<<<<<< HEAD
      <main className="relative bg-white md:bg-white Layout">
        <section className="mt-24 min-h-[calc(100vh-4rem)] md:min-h-[calc(100vh-3rem)]">
=======
      <main className="relative p-0 mt-20 bg-white md:bg-white Layout">
        <section className="min-h-[calc(100vh-7rem)] md:min-h-[calc(100vh-10rem)]">
          {/*  flex justify-center items-center 가로세로 중간 배치 */}
>>>>>>> 32de0e33973d3ae5bc17672c20f9ade30560baf9
=======
      <main className="relative p-0 bg-white md:bg-white">
        <section className="min-h-[calc(100vh-7.5rem)] sm:min-h-[calc(100vh-12rem)] md:min-h-[calc(100vh-8.5rem)] lg:min-h-[calc(100vh-8rem)]">
>>>>>>> ee5abbfcc4d382c942e16f6edb9e1cf6e3b82c77
          <Outlet />
        </section>
      </main>
      <Footer />
      <ScrollTop />
    </>
  );
};

export default Layout;
