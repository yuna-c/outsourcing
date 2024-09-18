import { auth } from '../instance/axiosInstance';

// 회원가입
export const register = async (formData) => {
  try {
    const response = await auth.post(`/register`, formData);

    return response.data;
  } catch (error) {
    console.log(error?.response?.data.message);
    alert(error?.response?.data.message);
  }
};

// 로그인
export const login = async (formData) => {
  try {
    const response = await auth.post(`/login?expiresIn=60m`, formData);

    localStorage.setItem('accessToken', response.data.accessToken);

    return response.data;
  } catch (error) {
    console.log(error?.response?.data.message);
    alert(error?.response?.data.message);
  }
};

// 회원정보 가져오기
export const getUserInfo = async () => {
  const accessToken = localStorage.getItem('accessToken');
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
      localStorage.clear();
    }
  }
};

// 업데이트 프로필
export const updateProfile = async (formData) => {
  console.log(formData);
  const accessToken = localStorage.getItem('accessToken');
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
      localStorage.clear();
    }
  }
};
