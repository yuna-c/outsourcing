import React, { useEffect, useState } from 'react';
import useAuthStore from '../../core/stores/useAuthStore'; // useAuthStore import
import { useProfile } from '../../core/hooks/useAuth'; // useProfile import

const Profile = () => {
  const { nickname: currentNickname, avatar, setAvatar } = useAuthStore();
  const [nickname, setNickname] = useState('');
  const [file, setFile] = useState(null);
  const { mutate } = useProfile(); // mutate 함수 사용

  useEffect(() => {
    if (currentNickname) {
      setNickname(currentNickname); // 초기 닉네임 설정
    }
  }, [currentNickname]);

  // 닉네임 변경 핸들러
  const handleNicknameChange = () => {
    mutate(nickname); // useProfile의 mutate를 사용해 닉네임 업데이트
  };

  // 프로필 이미지 파일 변경 핸들러
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result); // 이미지 URL로 avatar 상태 설정
        setFile(selectedFile);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  return (
    <div className="p-4 mx-auto max-w-4xl">
      {/* 프로필 이미지 업데이트 */}
      <div className="text-center mb-6">
        {/* <img
          src={avatar || 'default-avatar.png'}
          alt="Profile"
          className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
        /> */}
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="mb-4 border border-gray-300 py-2 px-4 rounded-md"
        />
      </div>

      {/* 닉네임 업데이트 */}
      <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
        <div>
          <label htmlFor="nickname" className="block text-sm font-medium text-gray-700">
            닉네임
          </label>
          <input
            id="nickname"
            type="text"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>

        <button
          type="button"
          onClick={handleNicknameChange}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          닉네임 변경하기
        </button>
      </form>
    </div>
  );
};

export default Profile;
