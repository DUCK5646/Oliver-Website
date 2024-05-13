import json
from flask import Flask, render_template, request
import os
from openai import OpenAI
app = Flask(__name__)
client= OpenAI()

@app.route('/')
def grid():
    return render_template("index.html")
@app.route('/about')
def about():
    return render_template("about.html")
@app.route('/lyrics')
def contact():
    return render_template("lyrics.html")
@app.route('/music')
def product():
    return render_template("music.html")
@app.route('/chat')
def chat_completion():
    prompt = request.args.get('prompt')
    messages = json.loads(prompt)
    completion = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=messages

    )
   # print(completion.choices[0].message)
    return str(completion.choices[0].message.content)
if __name__ == '__main__':
    app.run(debug=True)