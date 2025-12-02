// vite-env.d.ts
/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />

declare module '@tailwindcss/vite';

// axios 타입 확장
import 'axios';

declare module 'axios' {
  export interface AxiosRequestConfig {
    _skipInterceptor?: boolean;
    _retry?: boolean;
  }
}
