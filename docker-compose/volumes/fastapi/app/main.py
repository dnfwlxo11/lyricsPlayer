import os
import sys
from fastapi import FastAPI
from gensim.models import Doc2Vec
from utils import kobert
from fastapi.middleware.cors import CORSMiddleware
import gdown

app = FastAPI()

if not os.path.isfile('./models/kobert_from_pretrained/pytorch_model.bin'):
    gdown.download_folder('https://drive.google.com/drive/folders/1_pkwu_woK6jyi5S9YIEI5kYghzACAI84', quiet=True)
d2vmodel = Doc2Vec.load(os.path.join('./models', 'doc2vec.bin'))

@app.get("/ai")
def read_model():
    try:
        return { "success": True, "msg": "서버 정상 가동 중" }
    except Exception as e:
        print(e)
        return { "success": False, "msg": "서버 가동 간 에러 발생" }

@app.get("/ai/search/d2v/{pred_target}")
def read_model(pred_target: str):
    try:
        inferred_vec = d2vmodel.infer_vector(pred_target.split())
        positive = d2vmodel.docvecs.most_similar(positive=[inferred_vec], topn=5)
        negative = d2vmodel.docvecs.most_similar(negative=[inferred_vec], topn=5)

        d2vmodel_predict = {
            "positive": positive,
            "negative": negative
        }

        return { "success": True, "model_predict": d2vmodel_predict }
    except Exception as e:
        print(e)
        return { "success": False, "msg": "해당 단어에 대한 분석이 부족합니다." }

@app.get("/ai/search/emotion/{pred_target}")
def read_model(pred_target: str):
    try:
        print(pred_target)
        
        result = kobert.predict(str(pred_target))

        return { "success": True, "model_predict": result }
    except Exception as e:
        print(e)
        return { "success": False, "msg": "해당 단어에 대한 분석이 부족합니다." }
    