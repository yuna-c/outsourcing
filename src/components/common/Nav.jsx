import { HiMenu, HiX } from 'react-icons/hi';
import { useState } from 'react';
import Button from './ui/Button';
import Link from './ui/Link';

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav aria-label="Global" className="relative flex items-center justify-between mx-auto md:px-2 Nav">
      <div className="flex items-center Logo">
        <Link to="/" label="홈" />
      </div>

      <button onClick={toggleMenu} className="text-3xl md:hidden focus:outline-none" aria-label="Toggle menu">
        {isOpen ? <HiX /> : <HiMenu />}
      </button>

      <ul
        className={`${
          isOpen ? 'block' : 'hidden'
        } md:flex items-center justify-between absolute top-14 left-0 right-0 z-10 w-full rounded-md border border-black 
        md:space-y-0 space-y-4 md:border-0 md:w-auto md:static md:p-0 p-3 bg-white md:bg-transparent transition-all duration-300 ease-in-out`}
      >
        <li className="mx-3">
          <Link to="/sample" label="샘플" />
        </li>
        <li className="mx-3">
          <Link to="/login" label="로그인" />
        </li>
        <li className="mx-3">
          <Link to="/signUp" label="회원가입" />
        </li>
        <li className="flex items-center ml-2">
          <Button className="px-3 py-1 text-base">로그아웃</Button>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
