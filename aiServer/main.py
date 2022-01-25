from typing import Optional
from fastapi import FastAPI
from gensim.models import Word2Vec

app = FastAPI()

model = Word2Vec.load('word2vec.model')

@app.get("/search/{pred_target}")
def read_model(pred_target: str):
    try:
        return {"model_predict": model.wv.most_similar(f"{pred_target}")}
    except Exception as e:
        print(e)
        return {"success": False, "msg": "해당 단어에 대한 분석이 부족합니다."}
    