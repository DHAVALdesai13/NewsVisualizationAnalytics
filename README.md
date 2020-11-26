# 6242_DVA_Project
Course Project for CSE 6242 - Data &amp; Visual Analytics by Dharmashloka Debashis, Dhaval Desai, Florian Pesce and Himanshu Mangla

Project Proposal Document: https://www.overleaf.com/project/5f822de6060d380001e72222 <br/>
Project Progress Report: https://www.overleaf.com/project/5f9f44b913f8440001ba22a7 <br/>
Final Report: https://www.overleaf.com/project/5fb961cf1d4efc426d7b4164 <br/>
Project Final Poster: https://gtvault-my.sharepoint.com/:p:/g/personal/hmangla6_gatech_edu/EfRnL8pPRANDn7wxFNIafMABvNKA_5AeRBj3rJdwgpY_DA?e=oF3oih <br/>
Datasets used: 1. https://components.one/datasets/all-the-news-2-news-articles-dataset/ <br/>
2. https://www.researchgate.net/publication/332141218_News_Category_Dataset?channel=doi&linkId=5ca2da43a6fdccab2f67c89b&showFulltext=true

Requirements:
1. python3
2. numpy 
3. spacy
4. fastai
5. pytorch
6. geonamescache
7. pandas
8. flask
 

How To Install (Follow exact order):
1) Install packages in conda environment: <br/>
conda install -c fastai -c pytorch fastai <br/>
pip install -r requirements.txt <br/>
python3 -m spacy download en <br/>
2) Download the text classifier model from: https://drive.google.com/file/d/1G_igIJHlaOIHcWdvD5XZfWCMXP2AdRW-/view?usp=sharing
   and place it at `CODE/data/huffpost25/models/acc83.pth`
    

How to run:
1) Setup an http server:

cd CODE/

python3 -m http.server 8000

2) open the flask server:

cd CODE/flaskr <br/>
export FLASK_APP=sample.py <br/>
export FLASK_ENV=development <br/>
flask run

3) On a web browser, open: http:127.0.0.1:8000
<br/>Navigate the Graphical User Interface to see various visualizations in the 'charts' tab OR run our inference engine on a new document using a 'test a new Doc' tab
