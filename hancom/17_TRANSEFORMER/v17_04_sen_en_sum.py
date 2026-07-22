from transformers import pipeline

#1. 요약 파이프라인 생성
summarizer = pipeline(
    "summarization",
    model="t5-small"
)

#2. 요약할 원문
text = """
Here's the English translation:

The repressed desires within the human psyche. An old house, with a hairline crack zigzagging down from the roof through the wall like a bolt of lightning, vanishing into a murky swamp. A doppelgänger. The dual structure of consciousness and unconsciousness. Life and death, self and other, reality and illusion, the natural and the supernatural, masculine and feminine. Strange dread, mortal terror! The story exposes the shadows of fear and hatred lurking in the human unconscious, confronting the struggle between the self and its hidden other side.

Edgar Allan Poe—the writer who transformed detective and horror fiction into high literary art through his exceptional aesthetic sensibility and profound psychoanalytic insight—wrote his masterwork short story "The Fall of the House of Usher," widely hailed as the most perfect Gothic work in American literary history.

"""
#3. 요약 실행
summary = summarizer (
    text,
    min_length=20, #최소 토큰 수 => 너무 짧은 요약 방지
    max_length=60, #최대 토큰 수 => 길이 폭주 방지
    do_sample=False #매번 동일한 결과
)
#4. 결과 확인
sum_text = summary[0]['summary_text']
print(f"요약된 문장 : {sum_text}")


