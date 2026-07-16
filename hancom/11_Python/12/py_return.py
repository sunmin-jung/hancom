from termcolor import colored

def highlight(text:str, color:str) -> str:
    """
    text, color를 입력받아 text 색상을 변경하는 함수
        text :str
        color :str
    """
    color_text = colored(text, color)
    return color_text


print(highlight("GOOD", "yellow"))


#return 을 언제 쓰는가?
#결과 값을 바깥으로 건네줄떄
#결과를 변수에 담아 다른 곳에서도 쓸수 있게 해줌

#results= highlight("GOOD", "yellow")
#print(results)
#print(highlight("GOOD","yellow"))