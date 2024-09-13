import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Article from '../common/ui/Article';
import Likes from '../common/Likes';
import Review from '../common/Review';
import Profile from '../common/Profile';
const MyPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentTab, setCurrentTab] = useState('likes');

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const tab = queryParams.get('tab');
    if (tab) {
      setCurrentTab(tab);
    }
  }, [location.search]);

  const handleTabChange = (tab) => {
    setCurrentTab(tab);
    navigate(`?tab=${tab}`);
  };

  return (
    <div className="flex flex-col items-center justify-evenly min-h-screen">
      {/* <Article className="MyPage text-center">My Page</Article> */}
      <div className="text-center mb-4">
        {/* 로그인한 사용자의 프로필이 보여지도록 수정 */}
        <img
          src=""
          alt="User Profile image"
          // className="rounded-full w-32 h-32 mx-auto border-solid border border-blue-500"
          className="rounded-full w-48 h-48 mx-auto border-4 border-blue-500"
        />
        {/* 로그인한 사용자의 닉네임이 보여지도록 수정 */}
        <p className="mt-4 text-4xl">{'Guest'}</p>
      </div>
      <nav className="flex m-0">
        <button
          onClick={() => handleTabChange('likes')}
          className={`px-16 py-3 rounded-s-full ${currentTab === 'likes' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          Likes
        </button>
        <button
          onClick={() => handleTabChange('review')}
          className={`px-16 py-3 rounded-none ${currentTab === 'review' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          Review
        </button>
        <button
          onClick={() => handleTabChange('profile')}
          className={`px-16 py-3 rounded-r-full ${currentTab === 'profile' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          Profile
        </button>
      </nav>
      <div className="bg-gray-300 w-full h-64 mt-4">
        {currentTab === 'likes' && <Likes />}
        {currentTab === 'review' && <Review />}
        {currentTab === 'profile' && <Profile />}
      </div>
    </div>
  );
};

export default MyPage;
