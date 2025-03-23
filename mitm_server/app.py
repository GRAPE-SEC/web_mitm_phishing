from flask import Flask, send_from_directory

app = Flask(__name__)

@app.route('/', defaults={'path': 'index.html'})
@app.route('/<path:path>')
def serve(path):
    return send_from_directory('static/megastudy_htttrack', path)

if __name__ == '__main__':
    app.run(debug=True)
