from flask import Flask, render_template, request
import spacy
from spacy import displacy
from collections import Counter
import pickle
import en_core_web_sm
from pprint import pprint
import os
from fastai.text.all import *

nlp = en_core_web_sm.load()
app = Flask(__name__)



data_path = Path("../data/huffpost25/")
vocab = pickle.load(open("../model/news_lm.pickle", 'rb'))

dls = TextDataLoaders.from_folder(path=data_path,train='train', valid='test', text_vocab=vocab)
learn = text_classifier_learner(dls, AWD_LSTM, drop_mult=0.5, metrics=accuracy)
learn.load("acc83")



@app.route('/')
def student():
   return render_template('document.html')

@app.route('/result',methods = ['POST', 'GET'])
def result():
   if request.method == 'POST':
      result = request.form
      #################### We fetch the document user has passed into the HTML form here#################
      myDocument = result["Document"]
      print(myDocument)
      docs = []
      docs.append(myDocument)
      
      ##################### Populate our results in this dictionary #####################################
      myDict = {"class" : "sports"}
      
      
      pred_cat = learn.predict(myDocument)[0]
      myDict['class'] = pred_cat
      for d in docs:
         entities = nlp(d)
         for X in entities.ents:
            myDict[X.text] = X.label_ 
         pprint([(X.text, X.label_) for X in entities.ents])

      ##########################################################################
      # CODE TO PERFORM INFERENCE over myDocument COMES HERE
      # STORE THE INFERED class in class, NER in namedEntities, LEXICAL COMPLEXITY in lexicalComplexity 
      ##########################################################################
      
      return render_template("InferenceResult.html",result = myDict)

if __name__ == '__main__':
   app.run(debug = True)
