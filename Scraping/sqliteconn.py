import sqlite3
from sqlite3 import Error
import json
import scraper_huff
from scraper_huff import parse

def read_data(path: str):
    data = []
    with open(path) as f:
        for jsonObj in f:
            dataDict = json.loads(jsonObj)
            data.append(dataDict)
    data = list(data)[1:]
    #print(data[0])
    data_link = [(n['link']) for n in data]
    dataset = [(n) for n in data]
    #print(data_link[0])
    return dataset,data_link


def store_db(dataset:list, article: list=None):
    conn = None
    try:
        conn = sqlite3.connect("news")
        print(sqlite3.version)
        cursor = conn.cursor()
        sqlite_insert_blob_query = """ INSERT INTO article_text
                                        (category, headline, authors, short_description, date, full_text) VALUES (?,?,?,?,?,?)"""
        data_category = [(n['category']) for n in dataset]
        data_headline = [(n['headline']) for n in dataset]
        data_authors = [(n['authors']) for n in dataset]
        data_short = [(n['short_description']) for n in dataset]
        data_date = [(n['date']) for n in dataset]
        for i in range(len(article)):
            #print(dataset[0][i])
            if(i % 500 == 0):
                print("{}th article was added to sqlite".format(i))
            category = str(data_category[i])
            headline = str(data_headline[i])
            authors = str(data_authors[i]) 
            short_description = str(data_short[i])
            date = str(data_date[i])
            text = str(article[i])
            #print(id)
            #print(type(text),type(id))
            text_blob = ''.join(format(ord(i), 'b') for i in text)
            data_tuple = (category,headline,authors, short_description,date,text_blob)
            cursor.execute(sqlite_insert_blob_query,data_tuple)
        conn.commit()
        cursor.close()    
    except Error as e:
        print(e)
    finally:
        if (conn):
            conn.close()
            print("the sqlite connection is closed")
    



def create_connection(db_file):
    """ create a database connection to a SQLite database """
    conn = None
    try:
        conn = sqlite3.connect("TEST")
        print(sqlite3.version)
    except Error as e:
        print(e)
    finally:
        if conn:
            conn.close()


if __name__ == '__main__':
    create_connection(r".\sqlite\db")
    dataset,data_link = read_data(r"news.json")
    #temp = [[1,"hellooo"],[2,"two"]]
    article = parse(data_link)
    store_db(dataset,article)