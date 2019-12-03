from flask import Flask, render_template, request
import util

app = Flask(__name__)


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/register', methods=['POST'])
def register():
    user_data = request.form.to_dict()


if __name__ == '__main__':
    app.run(debug=True)
