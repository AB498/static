# pip install flask requests flask_cors flask_mysqldb psutil pillow
from flask import send_from_directory, abort, Flask, request, jsonify, redirect, url_for, render_template, make_response
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
import threading

state = {"running": False}


def git_pull():
    dirs = ["./"]
    res = ""
    for dirr in dirs:
        os.chdir(dirr)
        try:
            try:
                res +=  subprocess.run(['rm', '-rf', '.git/*.lock', '.git/ORIG_HEAD*', '.git/refs/heads', '.git/index.lock'], text=True, check=True, timeout=10).stdout or ".git removed\n"
            except Exception as e:
                pass
            res += subprocess.run(['git', 'pull', '-X', 'ours'], text=True, check=True, timeout=10).stdout or "pulled\n"
            # res += subprocess.run(['git', 'reset', '--hard', 'origin/main'], text=True, check=True, timeout=10).stdout or "Success"
            return res
        except Exception as e:
            return f"{e}"
    


def repeat_pull():
    try:
        if not os.path.exists('./logs.txt'):
            with open('./logs.txt', 'w') as f:
                f.write("")
        while True:
            res = git_pull()
            print(res)
            bf = ""
            with open('./logs.txt', 'r') as f2:
                bf = f2.read()
            with open('./logs.txt', 'w') as f:
                f.write(res + '\n' + bf)
            time.sleep(5)  # 5 minutes = 300 seconds
    except Exception as e:
        print(e)


    
    # cmd = subprocess.Popen(['python', '/home/ab498/main_app/git_cron.py'], stdout=fp)


def start():
    app = Flask(__name__)

    app.config['MYSQL_HOST'] = 'localhost'
    app.config['MYSQL_USER'] = 'root'
    app.config['MYSQL_PASSWORD'] = ''
    app.config['MYSQL_DB'] = 'flask'

    mysql = MySQL(app)

    CORS(app, resources={r"/*": {"origins": "*"}})


    thread = threading.Thread(target=repeat_pull)
    thread.start()
    
    state["running"] = True
    print('Started')
    

    app.run(debug=True)


    

def exit_task():
    state["running"] = False
    os._exit(0)

# exit if ketboard interrupt signal:
signal.signal(signal.SIGINT, lambda x, y: exit_task())

try:
    start()
    exit_task()
except (OSError, KeyboardInterrupt, ZeroDivisionError, Exception) as e:
    print("Error", e)
    exit_task()
