import { HiMenu, HiX } from 'react-icons/hi';
import { FaPills } from 'react-icons/fa';
import { useState, useRef, useEffect } from 'react';
import Button from './ui/Button';
import Link from './ui/Link';
import { useLogout } from '../../core/hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const Nav = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const navRef = useRef(null);
  const { accessToken, nickname, clearAuth } = useLogout();

  const onHandleLogout = () => {
    clearAuth();
    navigate('/');
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event) => {
    if (navRef.current && !navRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav
      ref={navRef}
      className="fixed z-10 left-0 right-0 top-6 flex items-center justify-between px-6 py-2 w-[90%] md:w-[80%] lg:w-[50%] xl:w-[30%] mx-auto border border-custom-gray rounded-full bg-custom-gray transition-all duration-300 ease-in-out"
    >
      <div className="flex items-center">
        <Link to="/">
          <FaPills className="text-3xl text-black" />
        </Link>
      </div>

      <button onClick={toggleMenu} className="text-3xl md:hidden focus:outline-none" aria-label="Toggle menu">
        {isOpen ? <HiX /> : <HiMenu />}
      </button>

      <ul
        className={`${
          isOpen ? 'opacity-100 max-h-96' : 'opacity-0 max-h-0 lg:opacity-100 md:opacity-100'
        } md:flex items-center absolute md:relative top-14 md:top-0 left-0 right-0 z-10 md:p-0 py-3 px-2 w-full md:w-auto md:space-y-0 space-y-2 rounded-xl border md:border-0 bg-custom-gray md:bg-transparent transition-all duration-800 ease-in-out`}
      >
        {accessToken ? (
          <>
            <li className="mx-3">
              <Link to="/sample" label="샘플" />
            </li>
            <li className="mx-3">
              <Link to="/mypage" label="MyPage" />
            </li>
            <li className="flex items-center ml-2">
              <p className="px-3 py-1">
                <span className="flex">
                  <img src="" alt="" />
                </span>
                <span className="text-customPink"> {nickname} 님</span>
              </p>
              <Button onClick={onHandleLogout} className="px-3 py-1 text-base">
                로그아웃
              </Button>
            </li>
          </>
        ) : (
          <>
            <li className="mx-3">
              <Link to="/login" label="로그인" />
            </li>
            <li className="mx-3">
              <Link to="/signUp" label="회원가입" />
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Nav;
