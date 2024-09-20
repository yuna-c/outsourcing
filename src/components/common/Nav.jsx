import React, { useRef, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../../core/stores/useAuthStore';
import useNavStore from '../../core/stores/useNavStore';
import { useAuthActions } from '../../core/hooks/useAuthActions';

import { HiMenu, HiX } from 'react-icons/hi';
// import { FaPills } from 'react-icons/fa';
import psmLogo from '../../assets/images/psm_logo.png';

import Button from './ui/Button';
import Link from './ui/Link';

const Nav = () => {
  const navigate = useNavigate();
  const navRef = useRef(null);

  const { isOpen, isScrolled, setIsOpen, toggleIsOpen, setIsScrolled } = useNavStore();

  const { isLoggedIn, avatar, nickname, clearAuth } = useAuthStore((state) => ({
    isLoggedIn: state.isLoggedIn,
    avatar: state.avatar,
    nickname: state.nickname,
    clearAuth: state.clearAuth
  }));
  const { signOut } = useAuthActions();

  const onHandleLogout = useCallback(() => {
    signOut.mutate();
    clearAuth();
    navigate('/');
    setIsOpen(false);
  }, [clearAuth, navigate, setIsOpen]);

  const handleClickOutside = useCallback(
    (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    },
    [setIsOpen]
  );

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    document.addEventListener('scroll', handleScroll);
    return () => {
      document.removeEventListener('scroll', handleScroll);
    };
  }, [setIsScrolled]);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handleClickOutside]);

  return (
    <nav
      ref={navRef}
      className={`fixed z-30 left-0 right-0 ${
        isScrolled ? 'w-full my-0 rounded-none' : 'w-[95%] lg:w-[50%] my-5'
      } flex items-center justify-between px-5 py-2 mx-auto border border-custom-gray rounded-full bg-custom-gray transition-all duration-300 ease-in-out`}
    >
      <div className="flex items-center">
        <Link to="/" onClick={() => setIsOpen(false)}>
          {/* <FaPills className="text-3xl text-black" /> */}
          <img src={psmLogo} alt="PSM_logo" className="w-10 h-auto" />
        </Link>
      </div>

      <button onClick={toggleIsOpen} className="text-3xl md:hidden focus:outline-none" aria-label="Toggle menu">
        {isOpen ? <HiX /> : <HiMenu />}
      </button>

      <ul
        className={`md:flex items-center absolute md:relative top-16 md:top-0 left-0 right-0 z-10 md:p-0 py-3 px-2 w-full md:w-auto space-y-2 md:space-y-0 rounded-xl border md:border-0 bg-custom-gray md:bg-transparent transition-all duration-300 ease-in-out ${
          isOpen ? 'opacity-100 max-h-screen' : 'opacity-0 max-h-0'
        } md:opacity-100 md:max-h-full overflow-hidden`}
        onClick={() => setIsOpen(false)}
      >
        {isLoggedIn ? (
          <>
            <li className="mx-3">
              <Link to="/sample" label="샘플" />
            </li>
            <li className="mx-3">
              <Link to="/myPage" label="마이페이지" />
            </li>
            <li className="flex items-center">
              <div className="flex items-center pr-1 mx-2">
                <div className="inline-flex w-8 h-8 mr-2 overflow-hidden border rounded-full">
                  <img
                    src={avatar || 'https://via.placeholder.com/30'}
                    alt={nickname}
                    className="object-cover w-full h-full"
                  />
                </div>
                <span className="font-bold">{nickname} 님</span>
              </div>
              <Button onClick={onHandleLogout} className="px-3 py-1 text-base">
                로그아웃
              </Button>
            </li>
          </>
        ) : (
          <>
            <li className="mx-3">
              <Link to="/signIn" label="로그인" />
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

export default React.memo(Nav);
