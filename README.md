# one-step-frontend

React 19 + Vite + TypeScript + TailwindCSS 기반

---

## 📋 사전 준비

### Docker 설치

1. [Docker 공식 사이트](https://www.docker.com/products/docker-desktop)에서 Docker Desktop 다운로드
2. 설치 후 Docker Desktop 실행
3. 터미널에서 확인:
   ```bash
   docker --version
   ```

---

## 🚀 프로젝트 실행

```bash
chmod +x scripts/run_dev.sh  # 최초 1회만
./scripts/run_dev.sh
```

브라우저에서 접속: http://localhost:3000

- Docker + Nginx로 최적화된 빌드 파일을 서빙해요
- 코드 수정 후 다시 `./scripts/run_dev.sh` 실행하면 반영돼요

---

## 🛑 실행 중지 및 정리

### 개발 환경 중지

```bash
docker stop one-step-frontend-container
```

### 완전히 삭제 (다시 깔끔하게 시작하고 싶을 때)

```bash
docker stop one-step-frontend-container
docker rm one-step-frontend-container
docker rmi one-step-frontend
```

---

## ❓ 문제 해결

### 포트가 이미 사용 중이라는 에러

```bash
# 3000 포트를 사용 중인 프로세스 찾기
lsof -i :3000

# 해당 프로세스 종료
kill -9 [PID번호]
```
