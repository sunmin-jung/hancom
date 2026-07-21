# YOLO Advanced 예제 모음

## 📁 폴더 구조

### 1️⃣ detection/ - 객체 탐지 성능 측정
- `yolo_compare.py` - 서로 다른 모델의 성능 비교
- `yolo_speed.py` - 추론 속도 벤치마크
- `yolo_export.py` - 모델을 다양한 형식으로 내보내기

### 2️⃣ tracking/ - 객체 추적
- `yolo_track.py` - 실시간 비디오에서 객체 추적

### 3️⃣ segmentation/ - 영역 분할
- `yolo_fast_sam.py` - FastSAM 세그먼테이션
- `yolo_sahi*.py` - SAHI 슬라이싱 기반 세그먼테이션

### 4️⃣ region_analysis/ - 영역 분석
- `yolo_region.py` - 특정 영역 감지
- `yolo_distance.py` - 객체 간 거리 측정
- `yolo_in_out.py` - 출입 감지
- `yolo_heatmap.py` - 히트맵 생성
- `yolo_get_region.py` - 영역 정보 추출

### 5️⃣ application/ - 응용 프로젝트
- `yolo_alarm.py` - 알람 시스템
- `yolo_blur.py` - 블러 처리
- `yolo_search.py` - 객체 검색
- `yolo_streamlit.py` - 웹 UI 대시보드

## 🚀 실행 방법
```bash
cd advanced/[폴더명]
python [파일명].py
```

## ⚙️ 필수 파일
- `yolo11n.pt` - YOLO 모델 (자동 다운로드)
- `FastSAM-s.pt` - FastSAM 모델 (필요시)
- `input_fast_sam.jpg` - 테스트 이미지

---
마지막 정리: 2026-07-21
