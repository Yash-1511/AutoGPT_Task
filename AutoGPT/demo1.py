from flask import Flask, render_template, request
import subprocess

app = Flask(__name__)

# @app.route('/')
# def index():
#     return render_template('index.html')

@app.route('/run', methods=['POST'])
def run_command():
    command = "python -m autogpt"
    result = subprocess.check_output(command, shell=True)
    return result.decode()

if __name__ == '__main__':
    app.run(debug=True)
