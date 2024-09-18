import { auth } from '../instance/axiosInstance';

// 회원가입
export const register = async (userData) => {
  try {
    const { data } = await auth.post(`/register`, userData);
    return data;
  } catch (error) {
    console.error('회원가입 중 오류 발생 (register):', error.response?.data || error.message);
    throw new Error('회원가입을 처리하는 중 문제가 발생했습니다.');
  }
};

// 로그인
export const login = async (userData) => {
  try {
    const { data } = await auth.post(`/login`, userData); // ?expiresIn=10m 세션 만료 토큰
    return data;
  } catch (error) {
    console.error('로그인 중 오류 발생 (login):', error.response?.data || error.message);
    throw new Error('로그인 처리 중 문제가 발생했습니다.');
  }
};

// 사용자 프로필 가져오기
export const getUserProfile = async (token) => {
  try {
    const { data } = await auth.get(`/login`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    });
    return data;
  } catch (error) {
    console.error('프로필 가져오는 중 오류 발생 (getUserProfile):', error.response?.data || error.message);
    throw new Error('사용자 프로필을 불러오는 중 문제가 발생했습니다.');
  }
};

// 사용자 프로필 업데이트
export const updateProfile = async (token, userData) => {
  try {
    const { data } = await auth.patch(
      `/profile`,
      { nickname: userData.nickname },
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );
    return data;
  } catch (error) {
    console.error('프로필 업데이트 중 오류 발생 (updateProfile):', error.response?.data || error.message);
    throw new Error('프로필을 업데이트하는 중 문제가 발생했습니다.');
  }
};
