from flask import Flask, render_template, session, jsonify
import util

app = Flask(__name__)


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/stocks')
def stocks_overview():
    return jsonify(util.get_quotes_for_main_page(session['user_id']))


if __name__ == '__main__':
    app.run(debug=True)
