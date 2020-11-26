def makdirectories():
	import os
	directories = ["POLITICS", "WELLNESS", "ENTERTAINMENT", "TRAVEL", "STYLEBEAUTY", "PARENTING", "HEALTHYLIVING", "QUEERVOICES", "FOODDRINK", "BUSINESS", "COMEDY", "SPORTS", "BLACKVOICES", "HOMELIVING", "PARENTS", "THEWORLDPOST", "WEDDINGS", "WOMEN", "IMPACT", "DIVORCE", "CRIME", "MEDIA", "WEIRDNEWS", "GREEN", "WORLDPOST", "RELIGION", "STYLE", "SCIENCE", "WORLDNEWS", "TASTE", "TECH", "MONEY", "ARTS", "FIFTY", "GOODNEWS", "ARTSCULTURE", "ENVIRONMENT", "COLLEGE", "LATINOVOICES", "CULTUREARTS", "EDUCATION"]

	for dir in directories:
		tmp = "mkdir data/" +dir 
		os.system(tmp)

def segregate(myFile = "data/News_Category_Dataset_v2.json", filesToWrite = ['politics.txt', 'sports.txt', 'food.txt', 'entertainment.txt']):
	import json
	f = open (myFile, 'r')
	textLines = f.readlines()
	f_ = []
	for i in range(len(filesToWrite)):
		temp = open("data/" + filesToWrite[i] + ".txt", 'a')
		f_.append(temp)
	for line in textLines:
		#print(line)
		data = json.loads(line)
		category = data["category"]
		idx = filesToWrite.index(category)
		f_[idx].write((data["headline"]).replace("\n", "") + '\t' + (data["short_description"]).replace("\n", "") + '\n')
	f.close()
#filesAllCategories = ["POLITICS", "WELLNESS", "ENTERTAINMENT", "TRAVEL", "STYLE & BEAUTY", "PARENTING", "HEALTHY LIVING", "QUEER VOICES", "FOOD & DRINK", "BUSINESS", "COMEDY", "SPORTS", "BLACK VOICES", "HOME & LIVING", "PARENTS", "THE WORLDPOST", "WEDDINGS", "WOMEN", "IMPACT", "DIVORCE", "CRIME", "MEDIA", "WEIRD NEWS", "GREEN", "WORLDPOST", "RELIGION", "STYLE", "SCIENCE", "WORLD NEWS", "TASTE", "TECH", "MONEY", "ARTS", "FIFTY", "GOOD NEWS", "ARTS & CULTURE", "ENVIRONMENT", "COLLEGE", "LATINO VOICES", "CULTURE & ARTS", "EDUCATION"]
#segregate(filesToWrite = filesAllCategories)
#makdirectories()
def moveFiles():
	import os
	directories = ["POLITICS", "WELLNESS", "ENTERTAINMENT", "TRAVEL", "STYLEBEAUTY", "PARENTING", "HEALTHYLIVING", "QUEERVOICES", "FOODDRINK", "BUSINESS", "COMEDY", "SPORTS", "BLACKVOICES", "HOMELIVING", "PARENTS", "THEWORLDPOST", "WEDDINGS", "WOMEN", "IMPACT", "DIVORCE", "CRIME", "MEDIA", "WEIRDNEWS", "GREEN", "WORLDPOST", "RELIGION", "STYLE", "SCIENCE", "WORLDNEWS", "TASTE", "TECH", "MONEY", "ARTS", "FIFTY", "GOODNEWS", "ARTSCULTURE", "ENVIRONMENT", "COLLEGE", "LATINOVOICES", "CULTUREARTS", "EDUCATION"]
	for dir in directories:
		tmp = "mv data/" + dir +"/test*.txt data/" + dir +"/test/"
		os.system(tmp)
		tmp1 = "mv data/" + dir +"/train*.txt data/" + dir +"/train/"
		os.system(tmp1)
moveFiles()