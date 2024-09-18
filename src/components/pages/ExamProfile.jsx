import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { updateProfile } from '../../core/api/auth';
import useAuthStore from '../../core/stores/useAuthStore';

import Article from '../common/ui/Article';
import Button from '../common/ui/Button';
import Input from '../common/ui/Input';

const ExamProfile = () => {
  const {
    accessToken,
    nickname: currentNickname,
    setAuth
  } = useAuthStore((state) => ({
    accessToken: state.accessToken,
    nickname: state.nickname,
    setAuth: state.setAuth
  }));

  const [nickname, setNickname] = useState('');
  const [avatar, setAvatar] = useState(null);
  const navigate = useNavigate();

  const handleUpdateProfile = async () => {
    const formData = new FormData();

    formData.append('nickname', nickname || currentNickname);
    formData.append('avatar', avatar);

    const response = await updateProfile(formData);

    if (response && response.success) {
      setAuth(accessToken, response.nickname || currentNickname, response.userId, response.avatar);
      navigate('/');
    }
  };

  return (
    <Article className="Profile">
      <h1 className="mb-6 text-2xl font-bold">프로필 업데이트</h1>

      <form onSubmit={(e) => e.preventDefault()} className="w-full space-y-4">
        <Input
          type="text"
          id="nickname"
          value={nickname}
          minLength={1}
          maxLength={10}
          onChange={(e) => setNickname(e.target.value)}
          placeholder="변경하실 닉네임을 입력해 주세요"
        />

        <Input
          type="file"
          accept="image/*"
          id="avatar"
          onChange={(e) => setAvatar(e.target.files[0])}
          placeholder="업로드 할 파일을 선택해 주세요"
        />
        <Button onClick={handleUpdateProfile} className="w-full p-2">
          변경 하기
        </Button>
      </form>
    </Article>
  );
};

export default ExamProfile;
