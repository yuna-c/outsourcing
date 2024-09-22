import React, { useRef, useEffect, useCallback } from 'react';
import { useLogoutMutation } from '../../core/hooks/useLogoutMutation';

import useAuthStore from '../../core/stores/useAuthStore';
import useNavStore from '../../core/stores/useNavStore';

import psmLogo from '../../assets/images/psm_logo.png';
import { HiMenu, HiX } from 'react-icons/hi';
// import { FaPills } from 'react-icons/fa';

import Button from './ui/Button';
import Link from './ui/Link';

const Nav = () => {
  const navRef = useRef(null);
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const avatar = useAuthStore((state) => state.avatar);
  const nickname = useAuthStore((state) => state.nickname);
  const { isOpen, isScrolled, setIsOpen, toggleIsOpen, setIsScrolled } = useNavStore();
  const logoutMutation = useLogoutMutation(setIsOpen);

  const onHandleLogout = () => {
    logoutMutation.mutate();
  };

  const handleClickOutside = useCallback(
    (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) setIsOpen(false);
    },
    [setIsOpen]
  );

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 0);
    document.addEventListener('scroll', handleScroll);
    return () => document.removeEventListener('scroll', handleScroll);
  }, [setIsScrolled]);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [handleClickOutside]);

  return (
    <nav
      ref={navRef}
      className={`fixed left-0 right-0 ${
        isScrolled
          ? 'w-full my-0 rounded-none border-b border-custom-deepblue'
          : 'w-[95%] lg:w-[50%] my-5 border border-custom-deepblue rounded-full'
      } flex items-center justify-between px-5 py-2 h-[52px] mx-auto bg-white transition-all duration-300 ease-in-out`}
    >
      <div className="flex items-center">
        <Link to="/" onClick={() => setIsOpen(false)}>
          <img src={psmLogo} alt="PSM_logo" className="w-10 h-6" />
        </Link>
      </div>

      <button onClick={toggleIsOpen} className="text-3xl md:hidden focus:outline-none" aria-label="Toggle menu">
        {isOpen ? <HiX className="text-custom-deepblue" /> : <HiMenu className="text-custom-deepblue" />}
      </button>

      <ul
        className={`md:flex items-center absolute md:relative md:top-0 left-0 right-0 z-10 md:p-0 py-3 px-2 w-full md:w-auto space-y-2 md:space-y-0 ${
          isScrolled ? 'top-[52px] ' : 'rounded-xl top-14'
        } border md:border-0 bg-white md:bg-transparent transition-all duration-300 ease-in-out ${
          isOpen ? 'opacity-100 max-h-screen' : 'opacity-0 max-h-0'
        } md:opacity-100 md:max-h-full overflow-hidden`}
        onClick={() => setIsOpen(false)}
      >
        <li className="mx-3">
          <Link to="/search" label="약국" />
        </li>
        {isLoggedIn ? (
          <>
            <li className="mx-3">
              <Link to="/myPage" label="마이페이지" />
            </li>
            <li className="flex items-center">
              <div className="flex items-center pr-1 ml-2 mr-0">
                <div className="inline-flex w-[32px] h-[32px] mr-2 overflow-hidden border rounded-full">
                  <img
                    src={avatar || 'https://github.com/user-attachments/assets/1b04919e-9f84-4816-b8cc-655d0792f60b'}
                    alt={nickname}
                    className="object-cover w-full h-full"
                  />
                </div>
                <p className="flex mr-2 font-bold">
                  <span className="overflow-hidden whitespace-nowrap text-ellipsis">{nickname}</span>님
                </p>
              </div>
              <Button onClick={onHandleLogout}>로그아웃</Button>
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
