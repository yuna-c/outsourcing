import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Likes from '../common/Likes';
import Review from '../common/Review';
import Profile from '../common/Profile';
import useAuthStore from '../../core/stores/useAuthStore';

const MyPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentTab, setCurrentTab] = useState('likes');

  // Zustand 스토어에서 사용자 정보를 가져오는 함수
  const { avatar, nickname } = useAuthStore((state) => ({
    avatar: state.avatar,
    nickname: state.nickname
  }));

  // 현재 탭을 가져오는 로직
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const tab = queryParams.get('tab');
    if (tab) {
      setCurrentTab(tab);
    }
  }, [location.search]);

  // 탭 변경
  const handleTabChange = (tab) => {
    setCurrentTab(tab);
    navigate(`?tab=${tab}`);
  };

  return (
    <div className="flex flex-col items-center justify-evenly min-h-screen">
      <div className="text-center mb-4">
        {/* 로그인한 사용자의 프로필 이미지 */}
        <img
          src={
            avatar ||
            'https://vmswxqpplehaedyndokq.supabase.co/storage/v1/object/public/profile/PSM_Dprofile.png?t=2024-09-17T15%3A11%3A53.550Z'
          } // 기본 프로필 이미지 사용
          alt="default Profile image"
          className="rounded-full w-48 h-48 mx-auto border-4 border-custom-teal"
        />
        {/* 로그인한 사용자의 닉네임 */}
        <p className="mt-4 text-4xl">{nickname || 'Guest'}</p>
      </div>
      <nav className="flex justify-center m-0 max-w-[500px] w-[100%]">
        <button
          onClick={() => handleTabChange('likes')}
          className={`w-[50%] px-16 py-3 rounded-s-full ${
            currentTab === 'likes' ? 'bg-custom-teal text-white' : 'bg-gray-200'
          }`}
        >
          Likes
        </button>
        {/* <button
          onClick={() => handleTabChange('review')}
          className={`px-16 py-3 rounded-none ${currentTab === 'review' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          Review
        </button> */}
        <button
          onClick={() => handleTabChange('profile')}
          className={`w-[50%] px-16 py-3 rounded-r-full ${
            currentTab === 'profile' ? 'bg-custom-teal text-white' : 'bg-gray-200'
          }`}
        >
          Profile
        </button>
      </nav>
      <div className="w-full h-80 overflow-y-auto mt-4">
        {currentTab === 'likes' && <Likes />}
        {currentTab === 'review' && <Review />}
        {currentTab === 'profile' && <Profile />}
      </div>
    </div>
  );
};

export default MyPage;
