from flask import Flask, request, jsonify, render_template
import json
import random
import nltk
from nltk.stem.lancaster import LancasterStemmer
import numpy as np
import tflearn
import joblib
import tensorflow as tf
import os
import pickle

app = Flask(__name__)

# Initialize the stemmer
stemmer = LancasterStemmer()

# Load intents file
with open("intents.json") as file:
    intents = json.load(file)

# Load data
try:
    with open("datasource venv/bin/activate.pickle", "rb") as f:
        words, labels, training, output = pickle.load(f)
except FileNotFoundError:
    # Code to process the intents file and generate the training data
    words = []
    labels = []
    docs_x = []
    docs_y = []

    for intent in intents["intents"]:
        for pattern in intent["patterns"]:
            wrds = nltk.word_tokenize(pattern)
            words.extend(wrds)
            docs_x.append(wrds)
            docs_y.append(intent["tag"])

        if intent["tag"] not in labels:
            labels.append(intent["tag"])

    words = [stemmer.stem(w.lower()) for w in words if w != "?"]
    words = sorted(list(set(words)))

    labels = sorted(labels)

    training = []
    output = []

    out_empty = [0 for _ in range(len(labels))]

    for x, doc in enumerate(docs_x):
        bag = []

        wrds = [stemmer.stem(w) for w in doc]

        for w in words:
            if w in wrds:
                bag.append(1)
            else:
                bag.append(0)

        output_row = out_empty[:]
        output_row[labels.index(docs_y[x])] = 1

        training.append(bag)
        output.append(output_row)

    training = np.array(training)
    output = np.array(output)

    with open("data.pickle", "wb") as f:
        pickle.dump((words, labels, training, output), f)

# Reset the graph and build the model
tf.compat.v1.disable_v2_behavior()
tf.compat.v1.reset_default_graph()

net = tflearn.input_data(shape=[None, len(training[0])])
net = tflearn.fully_connected(net, 8)
net = tflearn.fully_connected(net, 8)
net = tflearn.fully_connected(net, len(output[0]), activation="softmax")
net = tflearn.regression(net)

model = tflearn.DNN(net)

# Load the model if it exists, otherwise train and save the model
model_path = "model.tflearn"
if os.path.exists(model_path + ".index"):
    model.load(model_path)
else:
    model.fit(training, output, n_epoch=1000, batch_size=8, show_metric=True)
    model.save(model_path)

def bag_of_words(s, words):
    bag = [0 for _ in range(len(words))]

    s_words = nltk.word_tokenize(s)
    s_words = [stemmer.stem(word.lower()) for word in s_words]

    for se in s_words:
        for i, w in enumerate(words):
            if w == se:
                bag[i] = 1
    
    return np.array(bag)

def predict_class(sentence, words):
    bow = bag_of_words(sentence, words)
    results = model.predict([bow])
    results_index = np.argmax(results)
    tag = labels[results_index]
    return tag

def get_response(tag, intents_json):
    for intent in intents_json["intents"]:
        if intent["tag"] == tag:
            return random.choice(intent["responses"])
    return "I don't understand that."

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/templates/index.html')
def index2():
    return render_template('index.html')

@app.route('/templates/about.html')
def about():
    return render_template('about.html')

@app.route('/templates/new_reg.html')
def reg():
    return render_template('new_reg.html')

@app.route('/templates/comp.html')
def comp():
    return render_template('comp.html')

@app.route('/templates/achievments.html')
def achievements():
    return render_template('achievements.html')

@app.route('/templates/gallery.html')
def gallery():
    return render_template('gallery.html')


@app.route('/chat', methods=['POST'])
def chat():
    message = request.json['message']
    ints = predict_class(message)
    res = get_response(ints, intents)
    return jsonify({"response": res})

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000,debug=True)
