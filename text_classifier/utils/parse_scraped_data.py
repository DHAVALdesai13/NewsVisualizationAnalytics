import json
import os
import tqdm
import glob

def read_json(filename):
    lines = open(filename).read().split("\n")[:-1]
    res = {}
    print(len(lines))
    for line in lines:
        tmp = json.loads(line)

        res[tmp['link'].strip()] = tmp
    return res

def read_csv(filename):
    lines = open(filename).read().split("\n")[:-1]
    print(len(lines))
    news_dict = {}
    for i, line in enumerate(lines):
        if i<2:
            continue
        cols = line.split(';')
        link = cols[0]
        article = ";".join(cols[1:])
        if "https://" in link:
            news_dict[link.strip()] = article
    return news_dict

def join_news(org_filename, scraped_filename):
    org_news_dict = read_json(org_filename)
    news_dict = read_csv(scraped_filename)
    joined_news = {}
    for key in org_news_dict:
        if key in news_dict:
            joined_news[key] = org_news_dict[key]
            joined_news[key]['full_article'] = news_dict[key]
    return joined_news

def dump_json(joined_news, filename):
    with open(filename, 'w') as outfile:
        json.dump(joined_news, outfile)

def load_json(filename):
    with open(filename, 'r') as infile:
        news = json.load(infile)
    return news

def prepare_dataset(dataroot, news):

    if not os.path.exists(dataroot):
        os.makedirs(dataroot)

    for i, key in tqdm.tqdm(enumerate(news)):
        category = news[key]['category']
        category_path = os.path.join(dataroot, category)
        if not os.path.exists(category_path):
            os.makedirs(category_path)
        content = news[key]['headline'] + "\t" + news[key]['short_description'] + "\t" + news[key]['full_article']

        content_path = os.path.join(category_path, str(i)+".txt")

        with open(content_path, 'w') as outfile:
            outfile.write(content)

def analyze_data(dataroot):
    folders = glob.glob(dataroot+"/*")
    for folder in folders:
        files = glob.glob(folder+"/*")
        print(folder.split("/")[-1], len(files))

def count_articles(joined_news):
    cat_count = {}
    for key in joined_news:
        cat_key = joined_news[key]['category']
        if cat_key in cat_count:
            cat_count[cat_key] += 1
        else:
            cat_count[cat_key] = 1
        # cat_dict[cat_key] = 
    return cat_count

if __name__ == "__main__":

    org_filename = "data/news.json"
    scraped_filename = "data/scraping_result.csv"
    joined_news = join_news(org_filename, scraped_filename)

    cat_count = count_articles(joined_news)

    for key in cat_count:
        print(key, cat_count[key])




    
    

    # out_filename = "news_scraped.json"
    # dump_json(joined_news, out_filename)

    # filename = "news_scraped.json"
    # news = load_json(filename)

    # dataroot = "data/huffpost_scraped"
    # prepare_dataset(dataroot, news)

    # dataroot = "data/huffpost_scraped"
    # analyze_data(dataroot)







