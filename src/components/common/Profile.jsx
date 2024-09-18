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
    <div className="relative max-w-[500px] mx-auto">
      {/* 프로필 이미지 업데이트 */}
      <div>
        <label htmlFor="nickname" className="font-bold text-xl">
          프로필
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className=" mt-2 mb-4 border border-black py-3 px-4 rounded w-[100%]"
        />
      </div>

      {/* 닉네임 업데이트 */}
      <form onSubmit={(e) => e.preventDefault()} className="space-y-4 ">
        <div>
          <label htmlFor="nickname" className="font-bold text-xl">
            닉네임
          </label>
          <input
            id="nickname"
            type="text"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            className="mt-2 block w-full px-3 py-4 border border-black rounded focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <div className="flex justify-end">
          <button
            type="button"
            onClick={handleNicknameChange}
            className="w-28 h-10 bg-custom-teal text-white py-2 px-4 rounded-md hover:bg-custom-green focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            변경하기
          </button>
        </div>
      </form>
    </div>
  );
};

export default Profile;
