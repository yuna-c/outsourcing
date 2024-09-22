import { useState } from 'react';
import { supabase } from '../../core/instance/supabase';
import useAuthStore from '../../core/stores/useAuthStore'; // 상태 관리 관련
// import { useAuthActions } from '../../core/hooks/useAuthActions';

export default function ProfileImageUpload() {
  const { userId } = useAuthStore(); // 로그인된 유저 ID 가져오기
  const [file, setFile] = useState(null); // 파일 상태 관리
  const [uploading, setUploading] = useState(false); // 업로드 상태
  const [avatarUrl, setAvatarUrl] = useState(''); // 업로드된 이미지 URL

  // 파일 선택 시 파일 상태 업데이트
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // 파일 업로드 처리 함수
  const uploadImage = async () => {
    if (!file || !userId) {
      alert('파일과 유저 정보가 필요합니다.');
      return;
    }

    try {
      setUploading(true);

      const fileExt = file.name.split('.').pop(); // 파일 확장자 가져오기
      const fileName = `${userId}_${Date.now()}.${fileExt}`; // 유저 ID와 타임스탬프를 이용해 파일 이름 생성
      const filePath = `avatars/${fileName}`;

      // Supabase 스토리지에 파일 업로드
      const { data, error } = await supabase.storage.from('avatars').upload(filePath, file);

      if (error) throw error;

      // 업로드된 파일의 URL 얻기
      const { publicUrl } = supabase.storage.from('avatars').getPublicUrl(filePath).data;

      // 업로드된 이미지 URL 저장
      setAvatarUrl(publicUrl);

      // 업로드된 이미지 URL을 유저 프로필에 업데이트 (Supabase profiles 테이블 업데이트)
      const { error: profileError } = await supabase
        .from('profiles')
        .update({ avatar_url: publicUrl })
        .eq('id', userId);

      if (profileError) {
        throw profileError;
      }

      alert('이미지 업로드 및 프로필 업데이트 성공!');
    } catch (error) {
      console.error('이미지 업로드 실패:', error.message);
      alert('이미지 업로드 실패');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <h2>프로필 이미지 업로드</h2>
      <input type="file" accept="image/*" onChange={handleFileChange} /> {/* 파일 선택 */}
      <button onClick={uploadImage} disabled={uploading}>
        {uploading ? '업로드 중...' : '업로드'}
      </button>
      {avatarUrl && (
        <div>
          <p>업로드된 이미지:</p>
          <img src={avatarUrl} alt="Uploaded Profile" />
        </div>
      )}
    </div>
  );
}
