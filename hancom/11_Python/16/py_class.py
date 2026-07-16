# 1. 클래스 : 제품의 설계도
# 2. 생성자 : 객체를 만들때 실행되는 함수
# 3. 속성 : 클래스 안의 변수
# 4. 메서드 : 클래스 안의 함수 
# 5. 객체 : 설계도로 만든 제품
#===
#클래스 정의
class World:
    # 생성자
    def __init__(self, name,time):
        #속성
        self.name = name 
        self.time = time
    def hello(self):
        print(f"Hello,{self.name}!!")
        print(f"현재 시간은 {self.time}입니다")
# 객체 생성
asia = World("korea","09:00")


asia.hello()            
#Hello,korea!!