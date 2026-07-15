홈페이지 업로드 · CLI 배포 · GitHub 연동 · Claude 연동

# 1. vercel.com/drop 접속
# 2. 파일 · 폴더 · .zip 드래그 (또는 파일/폴더 선택)
# 3. 팀 선택 + 프로젝트 이름 입력
# 4. Deploy 클릭 → production URL 즉시 발급

https://vercel.com/wjdtjsals91-7914s-projects

새항목 추가 -> 프로젝트 생성 -> 깃허브 연결
-> 깃저장소 가져오기 

https://github.com/sunmin-jung/two-grop/tree/main

깃허브가서 레포지터리 하나 생성 html인덱스 파일 안에 넣기

터미널창에서 해당 인덱스파일까지 cd이동후 클로드 연결

로컬 서버 클로드로 연동해달라고 하기 


1.사이트 만들고 배포 하는 방법 Vercel로 가능

2.CLI로 배포 
cd my-app      # 프로젝트 루트로 이동 (package.json 있는 곳)
ls             # package.json 보이면 위치 맞음
vercel         # 이 위치에서 실행 → 현재 폴더가 배포 대상

npm i -g vercel       # CLI 설치 (최초 1회)
vercel login          # 브라우저 인증 (1회)
vercel                # preview 배포 — 임시 URL
vercel --prod         # production 배포 — 실서비스 URL

? Set up and deploy?   → y
? Project name?        → my-app
? Code directory?      → ./
✔ Detected Vite        → 빌드 설정 자동 감지 (vite build · dist)
? Customize settings?  → no

3.GitHub 연동
git init
git add .
git commit -m "first deploy"
git branch -M main
git remote add origin https://github.com/내아이디/my-app.git
git push -u origin main

# Vercel 웹사이트 로그인 → 해당 프로젝트 클릭
Overview            # 프로젝트 대시보드 진입
  → 좌측 사이드바 맨 아래 Settings 클릭
  → Settings 탭 목록에서 Git 선택
  → Connect Git Repository → GitHub 레포 선택 연동
# 연동 후 git push → 자동 재배포 켜짐

vercel link          # Vercel 프로젝트 연결
vercel git connect   # git 원격 연결 → 자동 배포 켜짐

4.Claude 연동
① Claude에게 코드 수정 요청
② "깃허브 푸시해줘" 한마디
③ Claude가 git add · commit · push 실행
④ Vercel이 push 감지 → 자동 재배포
⑤ 잠시 뒤 실서비스 URL에 반영

# 나
버튼 색 파란색으로 바꾸고 깃허브에 푸시해줘

# Claude
색상 변경 완료. 커밋·푸시했습니다.
→ Vercel이 배포 시작 (1~2분 후 URL 반영)