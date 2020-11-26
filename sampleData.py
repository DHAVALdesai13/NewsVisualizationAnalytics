import csv
def generateSample(myData, sampleSize):
	import random
	f = open (myData, 'r')
	textLines = f.readlines()
	sampled_list = random.sample(textLines, sampleSize)
	#print(sampled_list)
	return sampled_list

def generateAllSamples(numSamples, trainOrTest):
	categories = ["food", "sports", "entertainment", "politics"]
	filesAllCategories = ["POLITICS", "WELLNESS", "ENTERTAINMENT", "TRAVEL", "STYLE & BEAUTY", "PARENTING", "HEALTHY LIVING", "QUEER VOICES", "FOOD & DRINK", "BUSINESS", "COMEDY", "SPORTS", "BLACK VOICES", "HOME & LIVING", "PARENTS", "THE WORLDPOST", "WEDDINGS", "WOMEN", "IMPACT", "DIVORCE", "CRIME", "MEDIA", "WEIRD NEWS", "GREEN", "WORLDPOST", "RELIGION", "STYLE", "SCIENCE", "WORLD NEWS", "TASTE", "TECH", "MONEY", "ARTS", "FIFTY", "GOOD NEWS", "ARTS & CULTURE", "ENVIRONMENT", "COLLEGE", "LATINO VOICES", "CULTURE & ARTS", "EDUCATION"]
	for category in filesAllCategories:
		sampledList = generateSample("data/" + category + ".txt", numSamples)
		if(category == "STYLE & BEAUTY"):
			category = "STYLEBEAUTY"
		elif (category == "HEALTHY LIVING"):
			category = "HEALTHYLIVING"
		elif (category == 'QUEER VOICES'):
			category = "QUEERVOICES"
		elif (category == "FOOD & DRINK"):
			category = "FOODDRINK"
		elif (category == "BLACK VOICES"):
			category = "BLACKVOICES"
		elif(category == "HOME & LIVING"):
			category = "HOMELIVING"
		elif(category == "THE WORLDPOST"):
			category = "THEWORLDPOST" 
		elif(category == "WEIRD NEWS"):
			category = "WEIRDNEWS"
		elif(category == "WORLD NEWS"):
			category = "WORLDNEWS"
		elif(category == "GOOD NEWS"):
			category = "GOODNEWS"
		elif(category == "ARTS & CULTURE"):
			category = "ARTSCULTURE"
		elif(category == "LATINO VOICES"):
			category = "LATINOVOICES"
		elif(category == "CULTURE & ARTS"):
			category = "CULTUREARTS"
		num = 0
		for line in sampledList:
			num = num+1

			f = open("data/" + category + "/" + trainOrTest + "_" + str(num) + ".txt", "a")
			f.write(str(line))
			f.close()

#generateAllSamples(1000, "train")

import random
import sys
csv.field_size_limit(sys.maxsize)
def sampleCSV(sampleSize):
	sampled_list = []
	textLines = []
	with open('all-the-news-2-1.csv', newline='') as csvfile:
		spamreader = csv.reader(csvfile)
		rowCount = 0
		for row in spamreader:
			#print(', '.join(row))
			textLines.append(row)
			rowCount = rowCount + 1
			if(rowCount == 2200000):
				break
			if(rowCount % 100000 == 0):
				print("done with ", rowCount)
	sampled_list = random.sample(textLines, sampleSize)
	for line in sampled_list:
		f = open("all_sampled2.csv", "a")
		f.write(str(line) + "\n")
		f.close()

sampleCSV(270000)
'''
samples = generateSample("all-the-news-2-1.csv", 1)

'''