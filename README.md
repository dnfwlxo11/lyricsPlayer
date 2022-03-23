
# Lyrics Player

#### 전이학습된 bert 모델을 통해 사용자의 감정을 분석하고 노래 가사를 학습하여 임베딩한 doc2vec 모델을 사용한 AI 음악 플레이어
(AI music player with doc2vec model created by embedding the lyrics of the song and analyzing the user's emotions through the transfer learning bert model)
    
<br/>

### 당신을 가장 잘 이해하는 음악 플레이어
(the best music player that understand you)
  
<br/><br/>
## 시작하기 ( Getting Started )

도커 환경으로 구성되어 있으며 서버를 구성하고싶다면 Docker만 설치하면 됩니다.  
(It is configured Docker environment and you only need to install Docker if you want to configure the server.)  
<br/>
### 설치 ( installing and run )
1. 도커 허브로 설치하는 경우 (use Dockerhub)
```bash
# 준비 중 (to be soon) #
```
2. 깃허브에서 clone하여 설치하는 경우 (use github repo)
```bash
# 2-1) clone repo from github
git clone https://github.com/dnfwlxo11/lyricsPlayer

# 2-2) cd to docker-compose directory
cd {clone directory}/lyricsPlayer/docker-compose

# 2-3) KoBert Model file download and paste
Model-file-link : https://drive.google.com/drive/folders/1_pkwu_woK6jyi5S9YIEI5kYghzACAI84?usp=sharing
# download file paste to "{clone directory}/lyricsPlayer/docker-compose/fastapi/app/models/"
# It should have the following structure
# path : "{clone directory}/lyricsPlayer/docker-compose/fastapi/models/"
# models
#  ├── doc2vec.bin
#  ├── 2200223_model.pt
#  ├── kobert_from_pretrained
#  │ ├── config.json
#  │ └── pytorch_model.bin
#  └── kobert_news_wiki_ko_cased-1087f8699e.spiece

# 2-4) docker build and running
docker-compose up --build -d
```

  
<br/><br/>
## 서비스 구성 ( Service Configuration ) 
![lyricsPlayer drawio (2)](https://user-images.githubusercontent.com/32836490/156947704-77e154c6-86e0-4cbd-a755-5ae550b11f29.png)
  
<br/><br/>
## 배포 ( Deployment )
만약 위의 설치법을 보고 완료했다면 다음 주소로 들어가면됩니다.  
(If you followed the above steps, you can enter the following address.)
  
  
http://localhost:16000
<br/><br/>
## 사용한 오픈소스 및 리소스들 ( Use opensources and resources )
#### 모델 (Model)
* [KoBert](https://github.com/SKTBrain/KoBERT) - KoBert (SKT Brain)
  
#### 음악 파일 (Music files)
* [자멘도 뮤직](https://www.jamendo.com) [(저작권 정보)](https://www.jamendo.com/legal/licenses) (Jamendo Music (copyright information))  
만약 불법적인 무언가가 있다면 알려주세요, 수정하겠습니다.  
If there is anything illegal, please let me know and I will fix it.  
<br/><br/>

## 미리보기 ( Preview )
![image](https://user-images.githubusercontent.com/32836490/156948756-828f3dca-48c0-446a-b49e-cd2f89eae67a.png)
![image](https://user-images.githubusercontent.com/32836490/156948836-b93ade9f-6bfb-44da-98c1-134f71ffc192.png)
![image](https://user-images.githubusercontent.com/32836490/156948859-fa018662-0dff-4b8b-a028-44798cdf0327.png)
![image](https://user-images.githubusercontent.com/32836490/156949097-325f4e83-e8d6-4884-804e-4caaf75aeae4.png)

#### 스크린샷의 한국 노래들은 샘플이며 노래 파일을 제외한 타이틀, 가수명, 썸네일만을 크롤링했습니다.
#### The korean songs in the screenshots are samples and only the title, artist, and thumbnail, not the song file, were crawled.
<br/><br/>
## 유의사항 ( Caution )
최초 실행 혹은 재실행 시   
ELK 스택이 켜지는 동안 음악 검색 기능이 동작하지 않습니다.  
(When running for the first time or running again  
Music search function does not work while ELK Stack is on.)  

만약 Node.js 컨테이너가 'exec user process caused: no such file or directory' 에러를 발생시키며 실행되지 않는 경우  
(If the Node.js container does not run with an error 'exec user process caused: no such file or directory')  

![image](https://user-images.githubusercontent.com/32836490/159600600-760f5844-1880-4991-9ecc-e3bd0f395c80.png)  
"entrypoint.sh", "wait-for-it.sh" 두 개 파일의 라인 시퀀스를 "CRLF"에서 "LF"로 바꾼후 다시 빌드하시면 됩니다.  
(Change the line sequence of the two files "entrypoint.sh" and "wait-for-it.sh" from "CRLF" to "LF" and then rebuild.)  
<br/><br/>
