# Counter App

간단한 카운터 웹 애플리케이션입니다.

## 주요 기술
- Node.js (Express)
- PostgreSQL
- Docker & Docker Compose
- Nginx (프론트엔드)
- GitHub Actions (CI/CD)

## 실행 방법

### 로컬에서 실행
```bash
docker compose up -d
```

### 접속
- 프론트엔드: http://서버IP
- API: http://서버IP:3000

## 배포
- AWS EC2, ECS, RDS 등 클라우드 환경 지원
- GitHub Actions로 자동 빌드/배포

---

문의: [이메일 또는 GitHub 이슈](https://github.com/LeeHwansub/counter-app/issues) 