import axios from 'axios';

import Refresh from '../User/Refresh';

const REFRESH_URL = '...';


const logout = () => {
    localStorage.removeItem('access_token');
};

// axios 인스턴스 생성
const instance = axios.create({
    baseURL: 'http://localhost:8080',
    timeout: 5000, // 요청이 실패할 때까지 대기할 시간(ms)
    headers: {
      'Content-Type': 'application/json', // 기본 요청 헤더 설정
    }
  });

// access token 재발급
const getRefreshToken = async () => {
    try {
        const res = await Refresh();
        const accessToken = res.data;
        return accessToken;
    } catch (e) {
      // 로그아웃 처리
      logout();
    }
  };

// 요청 인터셉터 설정
instance.interceptors.request.use(
    (config) => {
      // 헤더에 엑세스 토큰 담기
      const accessToken = localStorage.getItem('access_token');
      console.log('토큰:', accessToken);
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // 응답 인터셉터
instance.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      const { config, response } = error;
      //  401에러가 아니거나 재요청이거나 refresh 요청인 경우 그냥 에러 발생
      if (response.status !== 401 || config.sent || config.url === REFRESH_URL) {
        return Promise.reject(error);
      }
      // 아닌 경우 토큰 갱신
      config.sent = true; // 무한 재요청 방지
      const accessToken = await getRefreshToken();
      if (accessToken) {
        localStorage.setItem('access_token', accessToken);
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
      return axios(config); // 재요청
    },
  );
  

export default instance;