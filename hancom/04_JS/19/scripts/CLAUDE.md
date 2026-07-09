# Gemini 위임 규칙

## 위임 기준
- 큰 파일(>100KB), 이미지, PDF → Gemini CLI 호출
- 코딩, 판단, 작은 작업 → Claude 직접

## 사용법
```bash
gemini --skip-trust "$(cat 파일) 요약"
```

## 실패 시
Gemini 실패 → Claude 직접 처리 + "Gemini 할당량 다 썼어요"

## 표시
Gemini 결과 = 🔷🔷🔷 마커로 감싼다

## 우선순위
사용자 명령 > 규칙 (당신이 "Claude로" 지시하면 위임 스킵)# Gemini 위임 규칙
