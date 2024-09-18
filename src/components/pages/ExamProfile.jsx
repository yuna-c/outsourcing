import { useState, useEffect } from 'react';
import { useProfile } from '../../core/hooks/useAuth';
import useAuthStore from '../../core/stores/useAuthStore'; // useAuthStore import
import Input from '../common/ui/Input';
import Article from '../common/ui/Article';
import Button from '../common/ui/Button';

const ExamProfile = () => {
  const { nickname: currentNickname } = useAuthStore();
  const [nickname, setNickname] = useState('');
  const { mutate } = useProfile();

  useEffect(() => {
    if (currentNickname) {
      setNickname(currentNickname);
    }
  }, [currentNickname]);

  const handleNicknameChange = () => {
    mutate(nickname);
  };

  return (
    <Article className="Profile">
      <h1 className="mb-6 text-2xl font-bold">프로필 업데이트</h1>

      {/* 
      {isLoading && <p>로딩중입니다...</p>}
      {isError && <p>오류가 발생하였습니다...</p>} 
      */}

      <form onSubmit={(e) => e.preventDefault()} className="w-full space-y-4">
        <Input type="text" value={nickname} onChange={(e) => setNickname(e.target.value)} placeholder="새 닉네임" />
        <Button onClick={handleNicknameChange} className="w-full p-2">
          변경 하기
        </Button>
      </form>
    </Article>
  );
};

export default ExamProfile;
