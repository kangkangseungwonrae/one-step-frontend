// vite-env.d.ts
/// <reference types="vite/client" />

declare module '@tailwindcss/vite';

// axios 타입 확장
import 'axios';

declare module 'axios' {
  export interface AxiosRequestConfig {
    _skipInterceptor?: boolean;
    _retry?: boolean;
  }
}
