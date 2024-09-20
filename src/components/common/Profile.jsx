import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { updateProfile } from '../../core/api/auth';
import useAuthStore from '../../core/stores/useAuthStore';

import Button from '../common/ui/Button';
import Input from '../common/ui/Input';

const Profile = () => {
  const { accessToken, setAuth, currentNickname, currentAvatar } = useAuthStore((state) => ({
    accessToken: state.accessToken,
    setAuth: state.setAuth,
    currentNickname: state.nickname,
    currentAvatar: state.avatar
  }));

  const [nickname, setNickname] = useState(currentNickname || '');
  const [avatar, setAvatar] = useState(null);
  const navigate = useNavigate();

  const onHandleUpdateProfile = async () => {
    const formData = new FormData();

    formData.append('nickname', nickname || currentNickname);
    formData.append('avatar', avatar || currentAvatar);

    const response = await updateProfile(formData);

    if (response && response.success) {
      setAuth(accessToken, response.nickname, response.userId, response.avatar);
      navigate('/mypage');
    }
  };

  return (
    <form onSubmit={(e) => e.preventDefault()} className="box-border relative mx-auto space-y-6">
      {/* 닉네임 업데이트 */}
      <fieldset>
        <label htmlFor="nickname" className="flex mb-2 font-bold">
          닉네임 변경
        </label>
        <Input
          type="text"
          id="nickname"
          value={nickname}
          minLength={1}
          maxLength={10}
          onChange={(e) => setNickname(e.target.value)}
          placeholder={currentNickname || '변경하실 닉네임을 입력해 주세요'}
          className={'border border-black rounded'}
        />
      </fieldset>

      {/* 프로필 이미지 업데이트 */}
      <fieldset>
        <label htmlFor="avatar" className="flex mb-2 font-bold">
          프로필 변경
        </label>
        <Input
          type="file"
          accept="image/*"
          id="avatar"
          onChange={(e) => setAvatar(e.target.files[0])}
          placeholder="업로드 할 파일을 선택해 주세요"
          className={'border border-black rounded'}
        />
      </fieldset>

      <div className="flex justify-end">
        <Button onClick={onHandleUpdateProfile} className="w-full p-2 text-white bg-custom-deepblue hover:bg-sky-950">
          변경 하기
        </Button>
      </div>
    </form>
  );
};

export default Profile;
