from flask import Flask, render_template, request, redirect, session, jsonify
import util
import user_methods

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
    return redirect('/')


@app.route('/stocks')
def stocks_overview():
    if request.args:
        ticker = request.args.get('ticker', None)
        interval = request.args.get('interval', None)

        return  # data collecting util function come here

    return jsonify(util.get_quotes_for_main_page(session['user_id']))


if __name__ == '__main__':
    app.run(debug=True)
