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
    <Article className="px-5 py-10 md:px-5 w-[95%] md:w-[85%] lg:w-[50%] mx-auto xl:w-xl-1/2-important MyPage">
      <div className="my-10 text-center">
        {/* 로그인한 사용자의 프로필 이미지 */}
        <img
          src={avatar || 'https://github.com/user-attachments/assets/1b04919e-9f84-4816-b8cc-655d0792f60b'}
          alt={nickname}
          className="object-cover w-32 h-32 md:w-48 md:h-48 mx-auto mb-8 border-4 rounded-full border-custom-deepblue"
        />

        {/* 로그인한 사용자의 닉네임 */}
        <p className="text-xl md:text-2xl font-bold">{nickname || 'Guest'}</p>
      </div>

      {/* 반응형 탭 메뉴 */}
      <div className="flex justify-around w-full m-0 mb-10">
        <button
          onClick={() => handleTabChange('likes')}
          className={`flex-1 px-4 py-2 text-base font-semibold rounded-l-full ${
            currentTab === 'likes' ? 'bg-custom-deepblue text-white' : 'bg-custom-gray'
          } md:h-12 h-10`}
        >
          Likes
        </button>
        <button
          onClick={() => handleTabChange('review')}
          className={`flex-1 px-4 py-2 text-base font-semibold ${
            currentTab === 'review' ? 'bg-custom-deepblue text-white' : 'bg-custom-gray'
          } md:h-12 h-10`}
        >
          Review
        </button>
        <button
          onClick={() => handleTabChange('profile')}
          className={`flex-1 px-4 py-2 text-base font-semibold rounded-r-full ${
            currentTab === 'profile' ? 'bg-custom-deepblue text-white' : 'bg-custom-gray'
          } md:h-12 h-10`}
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
