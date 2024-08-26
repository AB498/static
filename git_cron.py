from flask import Flask, request, jsonify
import requests
import subprocess
from flask_cors import CORS
from flask_mysqldb import MySQL
import re
from bs4 import BeautifulSoup
from flask import send_from_directory
import time
import os

def git_pull():
    dirs = ["/home/ab498/main_app/static", "/home/ab498/node_main_app"]
    for dirr in dirs:
        os.chdir(dirr)
        try:
            try:
                subprocess.run(['rm', '-rf', '.git/*.lock', '.git/ORIG_HEAD*', '.git/refs/heads', '.git/index.lock'], text=True, check=True, timeout=10)
            except Exception as e:
                pass
            subprocess.run(['git', 'fetch', '--all'], text=True, check=True, timeout=10)
            subprocess.run(['git', 'reset', '--hard', 'origin/main'], text=True, check=True, timeout=10)
            return {"output": "Success"}
        except Exception as e:
            return {"output": "Fail", "error": f"An error occurred: {e}"}

# Run git pull initially
git_pull()

# Loop to run git pull every 5 minutes
while True:
    time.sleep(7)  # 5 minutes = 300 seconds
    git_pull()
