import glob
import tqdm



def calculate_metrics(learn, path):
    recall_dict = {}
    precision_dict = {}
    precision_tot = {}
    confusion_matrix = {}
    
    labels = learn.dls.vocab[1]
    for label in labels:
        precision_tot[label]=0
        precision_dict[label]=0
        confusion_matrix[label] = {}
        for label2 in labels:
            confusion_matrix[label][label2]=0
    acc_hit = 0
    total = 0
    for label in tqdm.tqdm(labels):
        label_path = path+label

        files = glob.glob(label_path+"/*")
        recall_hit = 0
        for file in files:
            total+=1
            article = open(file).read()
            pred_label = learn.predict(article)[0]
            precision_tot[pred_label]+=1
            confusion_matrix[label][pred_label]+=1
            if pred_label == label:
                acc_hit+=1
                recall_hit+=1
                precision_dict[pred_label]+=1

        recall_label = 1.*recall_hit/len(files)
        recall_dict[label] = recall_label
        for plabel in labels:
            confusion_matrix[label][plabel] = 1.*confusion_matrix[label][plabel]/len(files)
            


    acc = 1.*acc_hit/total
    for label in labels:
        if precision_tot[label] == 0:
            precision_dict[label]=0
        else:
            precision_dict[label] = 1.*precision_dict[label]/precision_tot[label]
    
    return acc, recall_dict, precision_dict, confusion_matrix

