import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import useAuthStore from '../../core/stores/useAuthStore';

import Likes from '../common/Likes';
import Review from '../common/Review';
import Profile from '../common/Profile';
import Article from '../common/ui/Article';

const MyPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentTab, setCurrentTab] = useState('likes');

  const avatar = useAuthStore((state) => state.avatar);
  const nickname = useAuthStore((state) => state.nickname);

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
    <Article className="px-5 py-2 md:px-5 w-[95%] md:w-[85%] lg:w-[50%] mx-auto xl:w-xl-1/2-important MyPage">
      {/* flex flex-col items-center min-h-screen justify-evenly */}
      <div className="my-10 text-center">
        {/* 로그인한 사용자의 프로필 이미지 */}
        <img
          src={avatar || 'https://via.placeholder.com/300'}
          alt={nickname}
          className="object-cover w-48 h-48 mx-auto mb-8 border-4 rounded-full border-custom-skyblue"
        />

        {/* 로그인한 사용자의 닉네임 */}
        <p className="text-2xl font-bold">{nickname || 'Guest'}</p>
      </div>

      <div className="flex justify-center w-full h-12 m-0 mb-10">
        <button
          onClick={() => handleTabChange('likes')}
          className={`w-1/2 px-16 py-2 rounded-s-full text-base font-semibold ${
            currentTab === 'likes' ? 'bg-custom-skyblue text-white' : 'bg-custom-gray'
          }`}
        >
          Likes
        </button>
        <button
          onClick={() => handleTabChange('review')}
          className={`w-1/2 px-16 py-2  text-base font-semibold ${
            currentTab === 'review' ? 'bg-custom-skyblue text-white' : 'bg-custom-gray'
          }`}
        >
          Review
        </button>
        <button
          onClick={() => handleTabChange('profile')}
          className={`w-1/2 px-16 py-2 rounded-r-full text-base font-semibold ${
            currentTab === 'profile' ? 'bg-custom-skyblue text-white' : 'bg-custom-gray'
          }`}
        >
          Profile
        </button>
      </div>

      <div className="w-full mt-4">
        {currentTab === 'likes' && <Likes />}
        {currentTab === 'review' && <Review />}
        {currentTab === 'profile' && <Profile />}
      </div>
    </Article>
  );
};

export default MyPage;
