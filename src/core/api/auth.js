import { auth } from '../instance/axiosInstance';
import useAuthStore from '../stores/useAuthStore';

// 회원가입
export const register = async (formData) => {
  try {
    const response = await auth.post(`/register`, formData);
    return response.data;
  } catch (error) {
    const errorMessage = error?.response?.data?.message || '회원가입 중 오류가 발생했습니다.';
    console.log(errorMessage);
    alert(errorMessage);
    throw new Error(errorMessage);
  }
};

// 로그인
export const login = async (formData) => {
  try {
    const response = await auth.post(`/login?expiresIn=60m`, formData);
    useAuthStore.getState().setAuth({
      accessToken: response.data.accessToken,
      nickname: response.data.nickname,
      userId: response.data.userId,
      avatar: response.data.avatar
    });
    return response.data;
  } catch (error) {
    console.log(error?.response?.data.message);
    alert(error?.response?.data.message);
  }
};

// 회원정보 가져오기
export const getUserInfo = async () => {
  const { accessToken } = useAuthStore.getState();
  if (accessToken) {
    try {
      const response = await auth.get(`/user`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`
        }
      });
      return response.data;
    } catch (error) {
      console.log(error?.response?.data.message);
      alert('accessToken이 만료되었습니다');
      useAuthStore.getState().clearAuth();
    }
  }
};

// 프로필 업데이트
export const updateProfile = async (formData) => {
  const { accessToken } = useAuthStore.getState();
  if (accessToken) {
    try {
      const response = await auth.patch(`/profile`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${accessToken}`
        }
      });
      return response.data;
    } catch (error) {
      console.log(error?.response?.data.message);
      alert(error?.response?.data.message);
      useAuthStore.getState().clearAuth();
    }
  }
};
