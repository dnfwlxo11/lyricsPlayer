from typing import Optional
from fastapi import FastAPI
from gensim.models import Word2Vec
import os 

app = FastAPI()

model = Word2Vec.load(os.path.join('/code/app', 'word2vec.model'))

@app.get("/ai")
def main():
    try:
        return { "success": True, "msg": "서버 구동 중" }
    except Exception as e:
        print(e)
        return { "success": False, "msg": "서버 구동 간 에러발생", "err": err }

@app.get("/ai/search/{pred_target}")
def read_model(pred_target: str):
    try:
        return { "success": True, "model_predict": model.wv.most_similar(f"{pred_target}") }
    except Exception as e:
        print(e)
        return { "success": False, "msg": "해당 단어에 대한 분석이 부족합니다." }
    