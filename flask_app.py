# pip install flask requests flask_cors flask_mysqldb psutil pillow
from flask import send_from_directory, abort, Flask, request, jsonify, redirect, url_for, render_template, make_response, Response
import requests
import subprocess
from flask_cors import CORS
from flask_mysqldb import MySQL
import re
# from bs4 import BeautifulSoup
from flask import send_from_directory
import time
import os
import psutil
import signal
import sys
import json
import heapq
from flask import Flask, send_file
import io

state = {"running": False}


app = Flask(__name__, static_folder=None)

app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = ''
app.config['MYSQL_DB'] = 'flask'

mysql = MySQL(app)

CORS(app, resources={r"/*": {"origins": "*"}})


def exit_task():
    state["running"] = False
    os._exit(0)

callback_ran = False  # Flag to ensure the callback runs only once

def on_reload():
    print("Flask application is reloading...")

def setup_reload_callback():
    if os.getenv('FLASK_ENV') == 'development':
        signal.signal(signal.SIGTERM, lambda *args: on_reload())

@app.before_request
def before_request():
    global callback_ran
    if not callback_ran:
        setup_reload_callback()
        callback_ran = True

file_directory = os.path.dirname(os.path.abspath(__file__))

def relative_path(path):
    return os.path.join(file_directory, path)

@app.route('/path')
def curpath():
    return "{}".format(file_directory)+'\n'+os.path.join(relative_path( './') )

exec_html = '''
<body>
    <textarea id="code"></textarea>
    <button id="run" onclick="run()">Run</button>
    <div id="output" style="white-space: pre-wrap; border: 1px solid black; width: 100%;"></div>
    <script>
        async function run() {
            var code = document.getElementById("code").value;
            var output = document.getElementById("output");
            var result = await (await fetch("/exec_backend?code="+encodeURIComponent(code))).text();
            output.innerHTML = result;
        }
    </script>
</body>
'''

def exec_code(code):
    # execute python code locally:
    try:
        return subprocess.check_output(["python", "-c", code], stderr=subprocess.STDOUT).decode("utf-8")
    except subprocess.CalledProcessError as e:
        return str(e)

@app.route('/exec_backend')
def exec_backend():
    code = request.args.get('code')
    return exec_code(code)

@app.route('/exec')
def serve_html():
    return Response(exec_html, mimetype='text/html')


@app.route('/')
def hello_world():
    return 'v2'

@app.route('/test')
def test():
    try:
        response = requests.get('http://127.0.0.1:5000/')
        return response.text
    except Exception as e:
        return str(e)

@app.route('/logs')
def logs():
    return send_from_directory(relative_path( './'), 'logs.txt')


@app.route('/static/', defaults={'path': ''})
@app.route('/static/<path:path>')
def send_static(path):
    print('static')
    file_path = os.path.join(relative_path( './static'), path)
    if os.path.isfile(file_path):
        print('sending '+file_path)
        return send_from_directory(relative_path( './static'), path)
    else:
        print('exact match not found. Trying index.html')

        index_path = os.path.join(path, 'index.html')
        file_path = os.path.join(relative_path( './static'), index_path)
        if os.path.isfile(file_path):
            return send_from_directory(relative_path( './static'), index_path)
        else:
            index_path = path+'.html'
            file_path = os.path.join(relative_path( './static'), path+'.html')
            if os.path.isfile(file_path):
                return send_from_directory(relative_path( './static'), index_path)
            else:
                return {'error': file_path+' not found'}



@app.route('/pull')
def git_pull():
    dirs = [relative_path("./")]
    res = ""
    # with open(os.devnull, 'w') as fp:
    for dirr in dirs:
        os.chdir(dirr)
        try:
            try:
                res +=  subprocess.run(['rm', '-rf', '.git/*.lock'], text=True, check=True, timeout=10).stdout or ".git removed\n"
            except Exception as e:
                res += f"{e}\n"
                pass
            try:
                res += subprocess.check_output(['git', 'fetch', '--all'] , text=True, timeout=10, stderr=subprocess.STDOUT) or "pulled\n"
            except subprocess.CalledProcessError as e:
                res += str(e.output)

            res += subprocess.run(['git', 'reset', '--hard', 'origin/main'], text=True, check=True, timeout=10, stderr=subprocess.STDOUT).stdout or "Success"
            return res
        except Exception as e:
            return f"{res} {e}"
        

def repeat_pull():
    try:
        with open(os.path.join(relative_path( './'), 'logs.txt'), 'w') as f:
            f.write("")
            f.write("Started at "+time.strftime("%Y-%m-%d %H:%M:%S", time.localtime())+"\n")
        while True:
            res = str(git_pull())
            print(res)
            bf = ""
            with open(os.path.join(relative_path( './'), 'logs.txt'), 'r') as f2:
                bf = f2.read()
            with open(os.path.join(relative_path( './'), 'logs.txt'), 'w') as f:
                cur_time = time.strftime("%Y-%m-%d %H:%M:%S", time.localtime())
                f.write( cur_time + '\n' + res + '\n' + bf)
            time.sleep(0.1)  # 5 minutes = 300 seconds
    except Exception as e:
        print(e)


    
    # cmd = subprocess.Popen(['python', '/home/ab498/main_app/git_cron.py'], stdout=fp)



def start():


    try:
        # thread = threading.Thread(target=repeat_pull)
        # thread.daemon = True
        # thread.start()
        
        with open(os.path.join(relative_path( './'), 'logs.txt'), 'w') as f:
            f.write("")
            f.write("Started at "+time.strftime("%Y-%m-%d %H:%M:%S", time.localtime())+"\n")
            
        subprocess.Popen(['python', relative_path('pull.py')])

        
        state["running"] = True
        print('Started')
        

        app.run(debug=True)
    except Exception as e:
        print(e)



# exit if ketboard interrupt signal:
signal.signal(signal.SIGINT, lambda x, y: exit_task())


if __name__ == '__main__':
    try:
        start()
        exit_task()
    except (OSError, KeyboardInterrupt, ZeroDivisionError, Exception) as e:
        print("Error", e)
        exit_task()
