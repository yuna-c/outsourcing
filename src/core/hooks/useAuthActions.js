import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../instance/supabase';
import useAuthStore from '../stores/useAuthStore';

export const useAuthActions = () => {
  const setNickname = useAuthStore((state) => state.setNickname);
  const clearAuth = useAuthStore((state) => state.clearAuth);
  const setUser = useAuthStore((state) => state.setUser);

  const queryClient = useQueryClient();

  // 프로필에서 사용자 nickname 가져오기
  const fetchProfile = async (userId) => {
    const { data, error } = await supabase
      .from('profiles')
      .select('username') // profiles 테이블에서 username(nickname) Get
      .eq('id', userId)
      .single();

    if (error) {
      console.error('프로필 정보를 가져오는 중 오류 발생:', error.message);
      throw new Error('프로필 정보를 가져오는 중 오류가 발생했습니다.');
    }

    return data.username;
  };

  // 회원가입
  const signUp = useMutation({
    mutationFn: async ({ email, password, nickname }) => {
      console.log('회원가입 요청:', { email, password, nickname });

      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        // 사용자 메타 데이터에 닉네임 저장
        options: {
          data: {
            // Supabase에서는 'username' 에 저장
            username: nickname
          }
        }
      });

      if (authError) {
        console.error('회원가입 요청 오류:', authError);
        throw new Error(authError.message);
      }

      const userId = authData.user.id;
      const { error: profileError } = await supabase.from('profiles').upsert({ id: userId, username: nickname, email });

      if (profileError) {
        console.error('프로필 저장 중 오류:', profileError);
        throw new Error(profileError.message);
      }

      return authData;
    },

    onSuccess: async (data) => {
      const userId = data.user.id;
      // 프로필에서 nickname 가져오기
      const nickname = await fetchProfile(userId);
      // Supabase 사용자 정보 설정
      setUser(data.user);
      // nickname 상태 설정
      setNickname(nickname);

      queryClient.invalidateQueries(['user']);
    },
    onError: (error) => {
      console.error('회원가입 오류:', error);
    }
  });

  // 로그인
  const signIn = useMutation({
    mutationFn: async ({ email, password }) => {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        throw new Error(error.message);
      }
      return data;
    },
    onSuccess: async (data) => {
      const userId = data.user.id;
      const nickname = await fetchProfile(userId);
      setUser(data.user);
      setNickname(nickname);

      queryClient.invalidateQueries(['user']);
    },
    onError: (error) => {
      console.error('로그인 오류:', error);
      alert(`로그인 중 오류가 발생했습니다: ${error.message}`);
    }
  });

  // 로그아웃
  const signOut = useMutation({
    mutationFn: async () => {
      const { error } = await supabase.auth.signOut(); // Supabase 로그아웃 처리
      if (error) throw new Error(error.message);
    },
    onSuccess: () => {
      clearAuth(); // Zustand 상태 초기화 (사용자 정보, 로그인 상태 등 초기화)
      queryClient.invalidateQueries(['user']); // 캐시된 쿼리 무효화
    },
    onError: (error) => {
      console.error('로그아웃 오류:', error);
    }
  });

  return { signUp, signIn, signOut };
};

// import { useMutation, useQueryClient } from '@tanstack/react-query';
// import { supabase } from '../instance/supabase';
// import useAuthStore from '../stores/useAuthStore';

// export const useAuthActions = () => {
//   const setUser = useAuthStore((state) => state.setUser);
//   const setNickname = useAuthStore((state) => state.setNickname);
//   const queryClient = useQueryClient();

//   // 회원가입
//   const signUp = useMutation({
//     mutationFn: async ({ email, password, nickname }) => {
//       console.log('회원가입 요청:', { email, password, nickname });

//       // const { data, error } = await supabase.auth.signUp({ email, password, nickname });

//       // if (error) {
//       //   console.error('회원가입 요청 오류:', error); // 에러 로그
//       //   throw new Error(error.message);
//       // }

//       // return data;

//       const { data: authData, error: authError } = await supabase.auth.signUp({
//         email,
//         password,
//         // 사용자 메타데이터에 닉네임 저장
//         options: {
//           data: {
//             username: nickname // Supabase에서는 'username' 필드에 저장
//           }
//         }
//       });

//       if (authError) {
//         console.error('회원가입 요청 오류:', authError);
//         throw new Error(authError.message);
//       }

//       const userId = authData.user.id;
//       const { error: profileError } = await supabase.from('profiles').upsert({ id: userId, username: nickname, email });
//       // nickname: formData.nickname;

//       if (profileError) {
//         console.error('프로필 저장 중 오류:', profileError);
//         throw new Error(profileError.message);
//       }

//       return authData;
//     },

//     onSuccess: (data) => {
//       setUser(data.user);
//       queryClient.invalidateQueries(['user']);
//     },
//     onError: (error) => {
//       console.error('회원가입 오류:', error);
//     }
//   });

//   // 로그인
//   const signIn = useMutation({
//     mutationFn: async ({ email, password }) => {
//       const { data, error } = await supabase.auth.signInWithPassword({ email, password });
//       if (error) {
//         throw new Error(error.message);
//       }
//       return data;
//     },
//     onSuccess: (data) => {
//       setUser(data.user);
//       queryClient.invalidateQueries(['user']);
//     },
//     onError: (error) => {
//       console.error('로그인 오류:', error);
//       alert(`로그인 중 오류가 발생했습니다: ${error.message}`);
//     }
//   });

//   // 로그아웃
//   const signOut = useMutation({
//     mutationFn: async () => {
//       const { error } = await supabase.auth.signOut();
//       if (error) throw new Error(error.message);
//     },
//     onSuccess: () => {
//       setUser(null);
//       queryClient.invalidateQueries(['user']);
//     },
//     onError: (error) => {
//       console.error('로그아웃 오류:', error);
//     }
//   });

//   return { signUp, signIn, signOut };
// };
