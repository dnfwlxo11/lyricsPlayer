import os
import sys
from typing import Optional
from fastapi import FastAPI
from gensim.models import Word2Vec
from gensim.models import FastText
from utils import kobert

app = FastAPI()

w2vmodel = Word2Vec.load(os.path.join('./models', 'word2vec_model.h5'))
print(os.path.join('./models', 'word2vec_model.h5'))

def sentence_vectors(sentence, model):
    sentence_list = sentence.split('-')
    sen2vec = None
    count = 0
    for word in sentence_list:
        if word in model.wv.key_to_index:
            count += 1
            if sen2vec is None:
                sen2vec = model.wv[word]
            else:
                sen2vec = sen2vec + model.wv[word]
                
    if sen2vec is not None:
        sen2vec = sen2vec/count
        
    return sen2vec

def sentence_repeat_remove(sentence, model_predict):
    sentence_list = sentence.split('-')
    for word in sentence_list:
        count = 0
        for compare in model_predict:
            if word==compare[0]:
                del model_predict[count]
                break
            else:
                pass
            count+=1

    return model_predict

@app.get("/ai")
def read_model():
    try:
        return { "success": True, "msg": "서버 정상 가동 중" }
    except Exception as e:
        print(e)
        return { "success": False, "msg": "서버 가동 간 에러 발생" }

@app.get("/ai/search/w2v/{pred_target}")
def read_model(pred_target: str):
    try:
        positive = w2vmodel.wv.most_similar(positive = pred_target.split('-'), topn=10),
        negative = w2vmodel.wv.most_similar(negative = pred_target.split('-'), topn=10)

        w2vmodel_predict = {
            "positive": positive,
            "negative": negative
        }

        return { "success": True, "model_predict": w2vmodel_predict }
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
    