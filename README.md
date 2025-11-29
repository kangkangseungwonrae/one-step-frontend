# one-step-frontend

React 19 + Vite + TypeScript + TailwindCSS 기반

---

## Docker 개발 환경 가이드

### 📋 사전 준비

### Docker 설치

1. [Docker 공식 사이트](https://www.docker.com/products/docker-desktop)에서 Docker Desktop 다운로드
2. 설치 후 Docker Desktop 실행
3. 터미널에서 확인:
   ```bash
   docker --version
   ```

---

## 🚀 빠른 시작

### 1. Docker 이미지 빌드

"이미지"는 실행 가능한 프로그램 패키지라고 생각하면 돼요.

```bash
docker build -t one-step-frontend .
```

- `docker build`: 이미지를 만들어라
- `-t one-step-frontend`: 이름을 "one-step-frontend"로 지어라
- `.`: 현재 폴더의 Dockerfile을 사용해라

**처음 빌드 시 1-2분 정도 걸릴 수 있어요.**

### 2. 개발 서버 실행

"컨테이너"는 이미지를 실제로 실행한 것이에요.

```bash
docker run -p 5173:5173 -v $(pwd):/app -v /app/node_modules one-step-frontend
```

- `docker run`: 컨테이너를 실행해라
- `-p 5173:5173`: 컨테이너의 5173 포트를 내 컴퓨터의 5173 포트로 연결
- `-v $(pwd):/app`: 내 코드를 컨테이너와 실시간 동기화
- `-v /app/node_modules`: node_modules는 컨테이너 것을 사용

### 3. 브라우저에서 확인

```
http://localhost:5173
```

**코드를 수정하면 자동으로 새로고침됩니다!** (Hot Module Replacement)

### 4. 종료

터미널에서 `Ctrl + C`를 누르면 됩니다.

---

## 🛠️ 자주 사용하는 명령어

### 이미지 관련

```bash
# 이미지 목록 보기
docker images

# 이미지 삭제
docker rmi one-step-frontend

# 캐시 없이 처음부터 다시 빌드
docker build --no-cache -t one-step-frontend .
```

### 컨테이너 관련

```bash
# 실행 중인 컨테이너 보기
docker ps

# 모든 컨테이너 보기 (중지된 것 포함)
docker ps -a

# 컨테이너 중지
docker stop [컨테이너ID]

# 컨테이너 삭제
docker rm [컨테이너ID]

# 백그라운드에서 실행 (-d 옵션)
docker run -d -p 5173:5173 -v $(pwd):/app -v /app/node_modules one-step-frontend

# 컨테이너 로그 보기
docker logs [컨테이너ID]
```

### 정리

```bash
# 중지된 모든 컨테이너 삭제
docker container prune

# 사용하지 않는 이미지 삭제
docker image prune

# 전체 정리 (컨테이너, 이미지, 네트워크, 캐시)
docker system prune -a
```
