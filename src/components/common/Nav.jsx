import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../../core/stores/useAuthStore';

import { HiMenu, HiX } from 'react-icons/hi';
import { FaPills } from 'react-icons/fa';

import Button from './ui/Button';
import Link from './ui/Link';

const Nav = () => {
  const navigate = useNavigate();
  const navRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false); // 스크롤 상태 추가

  const { isLoggedIn, avatar, nickname, clearAuth } = useAuthStore((state) => ({
    isLoggedIn: state.isLoggedIn,
    avatar: state.avatar,
    nickname: state.nickname,
    clearAuth: state.clearAuth
  }));

  // 로그아웃 핸들러 useCallback으로 메모이제이션
  const onHandleLogout = useCallback(() => {
    clearAuth();
    navigate('/');
    setIsOpen(false);
  }, [clearAuth, navigate]);

  // 메뉴 토글 핸들러 useCallback으로 메모이제이션
  const toggleMenu = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  // 외부 클릭 핸들러 useCallback으로 메모이제이션
  const handleClickOutside = useCallback((event) => {
    if (navRef.current && !navRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  }, []);

  // 스크롤 이벤트 핸들러 추가
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    document.addEventListener('scroll', handleScroll);
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handleClickOutside]);

  return (
    <nav
      ref={navRef}
      className={`fixed z-30 left-0 right-0 ${
        isScrolled ? 'w-full my-0 rounded-none' : 'w-[95%] lg:w-[50%] xl:w-[50%] my-5 '
      } flex items-center justify-between px-5 box-border py-2 mx-auto border border-custom-gray rounded-full bg-custom-gray transition-all duration-300 ease-in-out Nav`}
    >
      <div className="flex items-center">
        <Link to="/" onClick={() => setIsOpen(false)}>
          <FaPills className="text-3xl text-black" />
        </Link>
      </div>

      <button onClick={toggleMenu} className="text-3xl md:hidden focus:outline-none" aria-label="Toggle menu">
        {isOpen ? <HiX /> : <HiMenu />}
      </button>

      <ul
        className={`md:flex items-center absolute md:relative top-16 md:top-0 left-0 right-0 z-10 md:p-0 py-3 px-2 w-full md:w-auto md:space-y-0 space-y-2 rounded-xl border md:border-0 bg-custom-gray md:bg-transparent transition-all duration-300 ease-in-out ${
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
              <div className="flex items-center pr-1 mx-2 md:mr-2">
                <div className="inline-flex w-8 h-8 mr-2 overflow-hidden border rounded-full">
                  <img
                    src={avatar || 'https://via.placeholder.com/30'}
                    alt={nickname}
                    className="object-cover w-full h-full"
                  />
                </div>
                <span className="text-bold"> {nickname} 님</span>
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
