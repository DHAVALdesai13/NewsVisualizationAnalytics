#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Fri Oct 30 11:45:57 2020

@author: florianpesce
"""
#urls is a list of strings
#parse returns a list of ids and a list of article contents
def parse(urls, categories):

    from lxml import html
    from urllib.request import Request, urlopen
    from urllib.error import URLError 
    import time
    import csv
    
    contents = []
    tic = time.perf_counter()
    
    nb_scraped = 0
    for counter, url in enumerate(urls):
        
        category = categories[counter]
        
        needed_categories = {'GREEN': 650, 'PARENTS': 200, 'THE WORLDPOST': 750, 'EDUCATION': 900, 'BUSINESS': 750, 'SCIENCE': 1000, 'ARTS & CULTURE': 800, 'STYLE': 700, 'SPORTS': 500, 'WOMEN': 250, 'LATINO VOICES': 800, 'RELIGION': 800, 'GOOD NEWS': 1100, 'WEIRD NEWS': 600, "TASTE": 700, "CRIME": 700, "COLLEGE": 1000, "TECH": 1000, "IMPACT": 750, "TRAVEL": 870, "MEDIA": 320}
        
        if (counter < 43540):
            continue
        
        '''
        if (counter == 50000):
            break
        '''
        
        if ((category in needed_categories) == False):
            continue
        else:
            if (needed_categories[category] <= 0):
                continue
    
        nb_scraped += 1
        
        if(nb_scraped % 100 == 0):
            toc = time.perf_counter()
            print("{}th page was scraped. Time: {} minutes".format(nb_scraped,(toc-tic)/60))
            print("Counter value {}".format(counter))

        
        try:
            req = Request(url, headers={'User-Agent': 'Mozilla/82.0.2'})
            webpage = urlopen(req).read().decode('utf-8')
            
            tree = html.fromstring(webpage)
            
            
            #content = tree.xpath('//span/text()')
            xpath_query = ("//div[@class = 'content-list-component yr-content-list-text text']//p/text() | "
                           "//div[@class = 'content-list-component yr-content-list-text text']//p/span/text() | "
                           "//div[@class = 'content-list-component yr-content-list-text text']//p/a/text() | "
                           "//div[@class = 'content-list-component yr-content-list-text text']//p/span/a/text()")
            content = tree.xpath(xpath_query)
            
            body = ''.join(content)
            body = body.replace(u'\xa0', u' ')
            
            with open('scraping_result.csv', 'a') as file:
                writer = csv.writer(file)
                writer.writerow([url,body])
            contents.append(body)
            needed_categories[category] = needed_categories[category] - 1
        except URLError as e:
            print(e)
            continue
        
    return contents        

def get_urls_categories(path):
    
    import json
    
    urls = []
    categories = []
    with open(path) as f:
        for json_object in f:
            article_dict = json.loads(json_object)    
            urls.append(article_dict["link"])
            categories.append(article_dict["category"])
            
            
    return (urls, categories)
    
#path = "./News_Category_Dataset_v2.json"
path = "./news.json"
urls, categories = get_urls_categories(path)
#urls = ["https://www.huffpost.com/entry/texas-amanda-painter-mass-shooting_n_5b081ab4e4b0802d69caad89"]
parse(urls, categories)



