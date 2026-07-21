from ultralytics import solutions



#1. Streamlit 추론 인스턴스 생성
inf = solutions.Inference(
    model="yolo11n.pt"
)

#2. 웹 UI시작
inf.inference()



# streamlit run .\yolo_streamlit.py <<VS코드 터미널에서 입력해야함
# email 엔터치면됨

