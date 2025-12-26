import axios, { type AxiosRequestConfig, type InternalAxiosRequestConfig } from 'axios';

import { logout } from './services';

// 커스텀 config 인터페이스
interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  _skipInterceptor?: boolean;
  _retry?: boolean;
}

// Axios 인스턴스 생성
export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // 쿠키 자동 전송,
});

// refresh token 관련 상태 관리
let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value?: unknown) => void;
  reject: (reason?: unknown) => void;
}> = [];

// 큐에 쌓인 요청들 처리
const processQueue = (error: unknown = null) => {
  failedQueue.forEach((promise) => {
    if (error) {
      promise.reject(error);
    } else {
      promise.resolve();
    }
  });
  failedQueue = [];
};

// 인증 실패 처리 (클라이언트 상태 정리)
const handleAuthFailure = () => {
  logout();
  window.location.href = '/login';
};

// 응답 인터셉터 (에러 처리)
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config as CustomAxiosRequestConfig;

    // 인터셉터를 건너뛰어야 하는 요청들
    if (originalRequest._skipInterceptor) {
      return Promise.reject(error);
    }

    const isAuthStatusCheck = originalRequest.url?.endsWith('/auth');
    if (isAuthStatusCheck && error.response?.status === 401) {
      logout();
      return Promise.reject(error); // 에러를 던져서 useQuery가 isError가 되게 함
    }

    // 401 에러이고, 재시도하지 않은 요청인 경우
    if (error.response?.status === 401 && !originalRequest._retry) {
      // 이미 refresh 중인 경우, 큐에 추가
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(() => {
            return api(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      // refresh token 요청
      try {
        await api.post('/auth/refresh', {}, {
          _skipInterceptor: true,
        } as AxiosRequestConfig);

        // refresh 성공 시 큐에 있는 요청들 재시도
        processQueue();
        isRefreshing = false;

        // 원래 요청 재시도
        return api(originalRequest);
      } catch (refreshError) {
        // refresh 실패 시 큐에 있는 요청들 모두 에러 처리
        processQueue(refreshError);
        isRefreshing = false;

        // refresh token도 만료됨 -> 클라이언트 상태만 정리하고 로그인 페이지로
        handleAuthFailure();
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);
