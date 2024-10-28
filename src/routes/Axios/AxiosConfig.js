import axios from 'axios';

import Refresh from '../User/Refresh';

const REFRESH_URL = '...';

let isLoggedIn = false; // 로그인 시 true로 설정하고, 로그아웃 시 false로 설정

// axios 인스턴스 생성
const instance = axios.create({
  baseURL: 'http://localhost:8080',
  timeout: 5000, // 요청이 실패할 때까지 대기할 시간(ms)
  headers: {
    'Content-Type': 'application/json', // 기본 요청 헤더 설정
  },
  withCredentials: true // 쿠키 자동 전송을 위해 추가
});

// // 로그아웃 함수 정의 (인스턴스 생성 이후)
// const logout = async () => {
//   try {
//     // 로그아웃 요청 보내기 (쿠키 삭제는 서버에서 처리)
//     await instance.post('/api/auth/logout', null, {
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       withCredentials: true, // 쿠키 전송을 위해 필요
//     });

//     // 로그아웃 후 리다이렉트 처리
//     window.location.href = "/";
//   } catch (error) {
//     console.error('로그아웃 에러:', error);
//     alert('로그아웃 도중 오류가 발생했습니다.');
//   }
// };

// 요청 인터셉터 설정
instance.interceptors.request.use(
  (config) => {
    // 헤더에 엑세스 토큰 담기
    // 쿠키 기반 인증이므로 별도 헤더에 토큰을 추가하지 않습니다.
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터 설정
instance.interceptors.response.use(
  (response) => {
    return response; // 응답 성공 시 그대로 반환
  },
  async (error) => {
    const { config, response } = error;

    // 401 에러가 아니거나 이미 재요청된 경우 그대로 에러 반환
    if (response?.status !== 401 || 
      config?.sent || 
      config?.url.includes('/api/auth/refresh') ||
      config?.url.includes('/api/auth/logout')) {
      return Promise.reject(error);
    }

    // 토큰 갱신 시도
    config.sent = true; // 재요청 방지 플래그 설정
    try {
      // refresh 요청을 통해 새로운 access token을 발급받음
      const refreshResponse = await instance.post('/api/auth/refresh', null, {
        headers: {
          'Content-Type': 'application/json'
        },
      });

      // 새 Access Token 쿠키로 설정은 서버에서 처리됨 (withCredentials 설정으로 자동 전송됨)
      // 갱신 성공 시 이전 요청을 다시 시도
      return instance(config); // 갱신된 토큰으로 원래 요청 재시도
    } catch (refreshError) {
      console.error('토큰 갱신 실패:', refreshError);
      // Refresh Token 갱신에 실패한 경우 로그아웃 처리
      // logout();
      return Promise.reject(refreshError);
    }
  }
);
  

export default instance;