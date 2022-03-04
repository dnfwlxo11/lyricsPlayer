import torch
import gluonnlp as nlp
import numpy as np
from . import bertClassifier
from . import bertDataset
import json
from transformers import BertModel
import os

def get_kobert_model(model_path, vocab_file, ctx="cpu"):
    bertmodel = BertModel.from_pretrained(model_path, return_dict=False)
    device = torch.device(ctx)
    bertmodel.to(device)
    bertmodel.eval()
    vocab_b_obj = nlp.vocab.BERTVocab.from_sentencepiece(vocab_file, padding_token="[PAD]")
    
    return bertmodel, vocab_b_obj

def predict(predict_sentence):
    data = [predict_sentence, '0']
    dataset_another = [data]

    another_test = bertDataset.BERTDataset(dataset_another, 0, 1, tok, max_len, True, False)
    test_dataloader = torch.utils.data.DataLoader(another_test, batch_size=batch_size, num_workers=0)
    
    model.eval()

    for batch_id, (token_ids, valid_length, segment_ids, label) in enumerate(test_dataloader):
        token_ids = token_ids.long().to(device)
        segment_ids = segment_ids.long().to(device)

        valid_length= valid_length
        label = label.long().to(device)

        out = model(token_ids, valid_length, segment_ids)


        test_eval=[]
        for i in out:
            logits = i
            logits = logits.detach().cpu().numpy()

            print(logits, 'logits')
            
            test_eval.append(labelMap[str(np.argmax(logits))])

        print(">> 입력하신 내용에서 " + test_eval[0] + "기운이 느껴집니다.")
        return test_eval[0]

# 파라미터 설정
max_len = 64
batch_size = 64
warmup_ratio = 0.1
num_epochs = 5
max_grad_norm = 1
log_interval = 200
learning_rate =  5e-5

# input 생성
tokenizer = './models/kobert_news_wiki_ko_cased-1087f8699e.spiece'
bertmodel, vocab = get_kobert_model('./models/kobert_from_pretrained', './models/kobert_news_wiki_ko_cased-1087f8699e.spiece')
tok = nlp.data.BERTSPTokenizer(tokenizer, vocab, lower=False)
device = torch.device('cpu')
model = bertClassifier.BERTClassifier(bertmodel, dr_rate=0.5)
model.load_state_dict(torch.load('./models/220223_model.pt', map_location=device))

with open('./utils/labelMap.json', 'r') as f:
    labelMap = json.load(f)