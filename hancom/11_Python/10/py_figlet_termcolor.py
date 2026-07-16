#1.pyfiglet, termcolor 불러오기
#2.pyfiglet 적용
#3.termcolor 적용
#4.pyfiglet + termcolr 적용된 텍스트

import pyfiglet 
sentence = pyfiglet
sentence = pyfiglet.figlet_format("HELLOW")
print(sentence)


from termcolor import colored
result = colored("HELLOW", "black", "on_red", ["bold"])
print(result)


import pyfiglet
from termcolor import colored 
ascii_art = pyfiglet.figlet_format("HELLOW")
result= colored(ascii_art, "black", "on_cyan", attrs=["bold"])
print(result)

import pyfiglet
from termcolor import colored

py_text = pyfiglet.figlet_format("Python")
color_text = colored(py_text, "yellow", "on_blue", ["bold"])
print(color_text)