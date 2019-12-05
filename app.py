from flask import Flask, render_template, request, redirect, session, jsonify
import util
import user_methods
import data_manager

app = Flask(__name__)
app.secret_key = b'_5#y2L"F4Q8z\n\xec]/'


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/register', methods=['POST'])
def register():
    user_data = request.form.to_dict()
    user_methods.handle_register(user_data)
    return redirect('/')


@app.route('/login', methods=['POST'])
def login():
    user_data = request.form.to_dict()
    user_methods.handle_login(user_data)
    return redirect('/')


@app.route('/logout')
def logout():
    session.pop('username')
    session.pop('user_id')
    return redirect('/')


@app.route('/users')
def users():
    return jsonify(user_methods.get_users())


@app.route('/stocks', methods=['GET', 'PUT'])
def stocks_overview():
    if request.method == 'PUT':
        return  # adding new ticker to database

    return jsonify(util.get_quotes_for_main_page(session['user_id']))


@app.route('/stocks/<ticker>', methods=['GET', 'DELETE'])
def stock_details(ticker):
    if request.method == 'DELETE':
        user = session['user_id']
        delete_result = data_manager.delete_user_ticker(ticker, user)
        return delete_result

    return jsonify(util.get_all_stock_details_for_stock_page(ticker))


if __name__ == '__main__':
    app.run(debug=True)
