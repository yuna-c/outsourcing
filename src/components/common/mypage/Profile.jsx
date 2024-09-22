import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { updateProfile } from '../../../core/api/auth';
import useAuthStore from '../../../core/stores/useAuthStore';

import Button from '../ui/Button';
import Input from '../ui/Input';
import { api } from '../../../core/instance/axiosInstance';

const Profile = () => {
  const accessToken = useAuthStore((state) => state.accessToken);
  const setAuth = useAuthStore((state) => state.setAuth);
  const currentNickname = useAuthStore((state) => state.nickname);
  const currentAvatar = useAuthStore((state) => state.avatar);
  const userId = useAuthStore((state) => state.userId);

  const [nickname, setNickname] = useState(currentNickname || '');
  const [avatar, setAvatar] = useState(null);
  const navigate = useNavigate();

  const onHandleUpdateProfile = async () => {
    const formData = new FormData();

    // console.log('currentAvatar=>', currentAvatar);
    // console.log('avatar=>', avatar);

    formData.append('nickname', nickname || currentNickname);
    if (avatar) {
      formData.append('avatar', avatar);
    }

    const response = await updateProfile(formData);

    if (response && response.success) {
      // console.log('response =>', response);
      if (nickname !== currentNickname) {
        await updateCommentsNickname(userId, nickname);
      }

      setAuth({
        accessToken: accessToken,
        nickname: response.nickname || currentNickname,
        userId: response.userId || useAuthStore.getState().userId,
        avatar: response.avatar || currentAvatar
      });
      navigate('/mypage');
    }
  };

  const updateCommentsNickname = async (userId, newNickname) => {
    try {
      const response = await api.get('/pharmacies');
      const allPharmacies = response.data;

      const updatedPharmacies = allPharmacies.map((pharmacy) => {
        if (!pharmacy.comments) return pharmacy;

        const updatedComments = pharmacy.comments.map((comment) => {
          if (comment.userId === userId) {
            return { ...comment, nickname: newNickname };
          }
          return comment;
        });
        return { ...pharmacy, comments: updatedComments };
      });
      for (const pharmacy of updatedPharmacies) {
        await api.patch(`/pharmacies/${pharmacy.id}`, { comments: pharmacy.comments });
      }
    } catch (error) {
      console.error('댓글 닉네임 업데이트 오류 => ', error);
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
          className={'border border-custom-gray rounded'}
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
          className={'border border-custom-gray rounded'}
        />
      </fieldset>

      <div className="flex justify-end">
        <Button
          onClick={onHandleUpdateProfile}
          className="w-full p-2 text-white h-11 bg-custom-deepblue hover:bg-custom-skyblue"
        >
          변경 하기
        </Button>
      </div>
    </form>
  );
};

export default Profile;
