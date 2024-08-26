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


from PIL import Image


app = Flask(__name__)

app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = ''
app.config['MYSQL_DB'] = 'flask'

mysql = MySQL(app)

CORS(app, resources={r"/*": {"origins": "*"}})

def replace_after_angle_bracket(input_string):
    input_string = re.sub(r'<[^>]*::', '<', input_string)
    input_string = re.sub(r'std::', '', input_string)
    return input_string

def fileAsBytes(file_path):
    return_data = io.BytesIO()
    with open(file_path, 'rb') as fo:
        return_data.write(fo.read())
    return_data.seek(0)
    return return_data

def delete_file(file_path):
    try:
        os.remove(file_path)
        print(f"File '{file_path}' has been deleted.")
        return True
    except FileNotFoundError:
        print(f"File '{file_path}' does not exist.")
        return False
    except PermissionError:
        print(f"You do not have permission to delete the file '{file_path}'.")
        return False
    except Exception as e:
        print(f"An error occurred while trying to delete the file '{file_path}': {e}")
        return False

@app.route('/')
def hello_world():
    return 'v2'

@app.route('/test')
def test():
    return 'Test API v2'

@app.route('/idgen/', defaults={'path': ''})
@app.route('/idgen/<path:path>')
def idgen(path):
    # return send_from_directory('/home/ab498/main_app/static/idgenerator/www', 'index.html')
    print(path, file=sys.stderr)
    file_path = os.path.join('/home/ab498/main_app/static/idgenerator/www', path)
    if os.path.isfile(file_path):
        return send_from_directory('/home/ab498/main_app/static/idgenerator/www', path)
    else:

        index_path = os.path.join(path, 'index.html')
        file_path = os.path.join('/home/ab498/main_app/static/idgenerator/www', index_path)
        if os.path.isfile(file_path):
            return redirect(url_for('send_static', path=index_path), code=302)
        else:
            index_path = path+'.html'
            file_path = os.path.join('/home/ab498/main_app/static/idgenerator/www', path+'.html')
            if os.path.isfile(file_path):
                return redirect(url_for('send_static', path=index_path), code=302)
            else:
                return {'error': file_path+' not found'}


@app.route('/getpaymenturl')
def getpaymenturl():
    # Define the request headers
    headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjE2OTg0IiwiZXhwIjoyMDMwMzQ4NDcwfQ.7KT7nrdqTwOxsLOw7G54QPW62y8nZWsZpjCCratCmcc'
    }

    # Define the request payload
    payload = {
        "name": "TEST 1 Document Photo",
        "description": "Buying 1 Document Photo",
        "currency": "USD",
        "amount": 10,
        "redirectUrl": "https://ab498.pythonanywhere.com/idgen/results/someid"
    }

    # Make the POST request
    response = requests.post('https://api.hoodpay.io/v1/businesses/15732/payments', headers=headers, json=payload)

    # Check if the request was successful
    if response.ok:
        return jsonify(response.json()), 200
    else:
        return jsonify({'error': 'Failed to make the payment request.'}), 500



@app.errorhandler(Exception)
def handle_exception(e):
    """Return JSON instead of HTML for HTTP errors."""
    # start with the correct headers and status code from the error
    response = e.get_response()
    # replace the body with JSON
    response.data = json.dumps({
        "code": e.code,
        "name": e.name,
        "description": e.description,
    })
    response.content_type = "application/json"
    return response



from io import StringIO
import uuid



sys.stdout = buffer = StringIO()

# @app.after_request
# def log_details(response):
#     json_data = None
#     if response.is_json:
#         json_data = response.get_json()
#         json_data['_logs'] = buffer.getvalue()
#         response.set_data(jsonify(json_data).data)
#     print('after', type(response) , json_data, file=sys.stderr)


#     return response


def get_replaced_id(body, up_files):

    new_uuid = str(uuid.uuid4())

    calling_dir = os.path.dirname(os.path.abspath(__file__))

    in_file = calling_dir + "/static/idgenerator/src/templates/"+body['template']


    # Create word doc
    doc = Document()

    # Load a doc or docx file
    doc.LoadFromFile(in_file)

    pictures = []

    for i in range(doc.Sections.Count):
        sec = doc.Sections.get_Item(i)

        # Iterate through all paragraphs in each section
        for j in range(sec.Paragraphs.Count):
            para = sec.Paragraphs.get_Item(j)
            # Iterate through all child objects in each paragraph
            for k in range(para.ChildObjects.Count):
                docObj = para.ChildObjects.get_Item(k)

                # Find the images and add them to the list
                if docObj.DocumentObjectType == DocumentObjectType.Picture:
                    # print(docObj.Width, docObj.Height)
                    pictures.append(docObj)

                if docObj.DocumentObjectType == DocumentObjectType.TextBox:
                    print(docObj.Body.Paragraphs.get_Item(0).Text)
                    for key, val in body['stringMap'].items():
                        if docObj.Body.Paragraphs.get_Item(0).Text == key:
                            docObj.Body.Paragraphs.get_Item(0).Text = val


    pictures = [(docObj.Width * docObj.Height, docObj) for docObj in pictures]
    heapq.heapify(pictures)

    for key, val in body['imageMap'].items():
        area, picture = pictures[int(val)]

        w, h = picture.Width, picture.Height
        img_file = up_files[int(key)]


        picture.LoadImage(img_file)
        picture.Width, picture.Height = w, h
        print(picture.Width, picture.Height)


    imageStream = doc.SaveImageToStreams(0, ImageType.Bitmap)

    with open("ReplaceImage.jpg", "wb") as imageFile:
        imageFile.write(imageStream.ToArray())


    img = Image.open("ReplaceImage.jpg")
    # crop image to half height from top and bottom
    img = img.crop((0, img.height // 4, img.width, img.height * 3 // 4))
    # final_img = "tmp"+new_uuid+".png"
    _, final_img = tempfile.mkstemp(suffix='.png', prefix='uploaded_', dir='/home/ab498/main_app/results')
    img.save(final_img)




    doc.SaveToFile("ReplaceImage.pdf", FileFormat.PDF)

    doc.Close()

    return final_img

import tempfile


@app.route('/generateid', methods=['POST'])
def upload_file():
    try:
        buffer.truncate(0)
        buffer.seek(0)

        file = request.files
        uploaded_files = request.files.getlist('file')
        body = json.loads(request.form['bodyString'])
        print('form', body)
        print('form', [file.filename for file in uploaded_files])
        if request.is_json:
            json_data = request.get_json()
            print('JSON data:', json_data)

        if 'file' not in request.files:
            return {'error': 'no files' }

        up_files = [None] * len(uploaded_files)

        for i, uploaded_file in enumerate(uploaded_files):
            _, temp_filename = tempfile.mkstemp(suffix='.png', prefix='uploaded_', dir='/home/ab498/main_app/uploads')
            uploaded_file.save(temp_filename)
            up_files[i] = temp_filename

        result_file = get_replaced_id(body, up_files)
        fl = fileAsBytes(result_file)
        delete_file(result_file)
        for file in up_files:
            delete_file(file)

        id_string = str(uuid.uuid4())
        response = make_response(send_file(fl, mimetype='image/png'))
        # response_data = {
        #     'id': id_string
        # }
        # response.set_data(jsonify(response_data))
        response.headers['X-ID-String'] = id_string



        return response

    except Exception as e:
        return {"error": f"An error occurred: {e}"}


def git_pull():
    dirs = ["./"]
    res = ""
    for dirr in dirs:
        os.chdir(dirr)
        try:
            try:
                res +=  subprocess.run(['rm', '-rf', '.git/*.lock', '.git/ORIG_HEAD*', '.git/refs/heads', '.git/index.lock'], text=True, check=True, timeout=10)
            except Exception as e:
                pass
            res += subprocess.run(['git', 'fetch', '--all'], text=True, check=True, timeout=10)
            res += subprocess.run(['git', 'reset', '--hard', 'origin/main'], text=True, check=True, timeout=10)
            return res
        except Exception as e:
            return f"{e}"

def repeat_pull():
    open('./logs.txt', 'w').close()
    while True:
        res = git_pull()
        bf = ""
        with open('./logs.txt', 'r') as f2:
            bf = f2.read()
        with open('./logs.txt', 'a') as f:
            f.write(res + '\n' + bf)
        time.sleep(5)  # 5 minutes = 300 seconds



with open(os.devnull, 'w') as fp:
    thread = threading.Thread(target=repeat_pull)
    thread.start()
    
    # cmd = subprocess.Popen(['python', '/home/ab498/main_app/git_cron.py'], stdout=fp)

def on_exit(signum, frame):
    process.terminate()
signal.signal(signal.SIGTERM, on_exit)
# process = subprocess.Popen(['bash', '-c', 'source ~/.bashrc', '&&', '/home/ab498/node/bin/nodemon', '/home/ab498/node_main_app/server.js'], preexec_fn=os.getpid)
# if psutil.Process(os.getppid()).status() == psutil.STATUS_ZOMBIE:
#     process.terminate()


@app.route('/backend/', defaults={'path': ''})
@app.route('/backend/<path:path>')
def proxy_all(path):
    target_url = f'http://localhost:8001/{path}'
    response = requests.get(target_url)
    return response.content


@app.route('/pull')
def pull():
    return git_pull()

@app.route('/static/<path:path>')
def send_static(path):
    file_path = os.path.join('/home/ab498/main_app/static', path)
    if os.path.isfile(file_path):
        return send_from_directory('static', path)
    else:

        index_path = os.path.join(path, 'index.html')
        file_path = os.path.join('/home/ab498/main_app/static', index_path)
        if os.path.isfile(file_path):
            return redirect(url_for('send_static', path=index_path), code=302)
        else:
            index_path = path+'.html'
            file_path = os.path.join('/home/ab498/main_app/static', path+'.html')
            if os.path.isfile(file_path):
                return redirect(url_for('send_static', path=index_path), code=302)
            else:
                return {'error': file_path+' not found'}


@app.route('/files/<path:path>')
def send_static2(path):
    file_path = os.path.join('/home/ab498/main_app/static', path)
    if os.path.isfile(file_path):
        return send_from_directory('static', path)
    else:

        index_path = os.path.join(path, 'index.html')
        file_path = os.path.join('/home/ab498/main_app/static', index_path)
        if os.path.isfile(file_path):
            return redirect(url_for('send_static2', path=index_path), code=302)
        else:
            index_path = path+'.html'
            file_path = os.path.join('/home/ab498/main_app/static', path+'.html')
            if os.path.isfile(file_path):
                return redirect(url_for('send_static2', path=index_path), code=302)
            else:
                return {'error': file_path+' not found'}


@app.route('/compile', methods=['POST'])
def compile_code():
    code = request.json.get('code')
    replaced = request.json.get('replaced', '')
    if not code:
        return "No Code Provided"

    # Write code to a temporary file
    with open('temp_code.cpp', 'w') as file:
        file.write(replaced)
    with open('temp_code_raw.cpp', 'w') as file:
        file.write(code)

    # Compile and run the code
    try:
        compile_result = subprocess.run(['g++', '-o', 'output', 'temp_code.cpp', '-pthread'], capture_output=True, text=True, timeout=10)
        if compile_result.returncode == 0:
            run_result = subprocess.run(['./output'], capture_output=True, text=True, timeout=10)
            return {"output":run_result.stdout, "error":None} if run_result.returncode == 0 else {"output":None,"error":run_result.stderr}
        else:
            compile_result = subprocess.run(['g++', '-o', 'output', 'temp_code_raw.cpp', '-pthread'], capture_output=True, text=True, timeout=10)
            return {"output":None,"error":'Error:\n'+compile_result.stderr}
    except Exception as e:
        print(f"An error occurred: {e}")
        return {"output":None,"error":f"An error occurred: {e}"}

@app.route('/format', methods=['POST'])
def format_code():
    code = request.json.get('code')
    options = request.json.get('options', {})  # Set default value for options
    if not code:
        return "No Code Provided"

    # Format code using clang-format
    try:
        indent_width = options.get('indent', 4)  # Default to 4 if 'indent' not provided
        style_config = '{{BasedOnStyle: InheritParentConfig, IndentWidth: {}}}'.format(indent_width)
        formatted_code = subprocess.run(['clang-format', '-style=LLVM', '--style=' + style_config], input=code, capture_output=True, text=True, timeout=10)

        return {"output": formatted_code.stdout, "error": None} if formatted_code.returncode == 0 else {"output": None, "error": formatted_code.stderr}
    except Exception as e:
        print(f"An error occurred: {e}")
        return {"output":None,"error":f"An error occurred: {e}"}


headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.81 Safari/537.36'
}

@app.route('/validate_phone', methods=['GET'])
def validate_phone():
    if request.method != 'GET':
        return jsonify({'error': 'Only GET requests are allowed'}), 405

    phone = request.args.get('phone')
    api_key = "e85a586bb27e1330b8e7467a73ce2b2e"

    url = f"https://monetise.leadbyte.co.uk/restapi/v1.2/validate/mobile?key={api_key}&value={phone}"

    try:
        response = requests.get(url, headers=headers, verify=False)  # Adding headers to mimic a browser
        soup = BeautifulSoup(response.content, 'html.parser')
        # Example: Extracting specific data using BeautifulSoup
        extracted_data = soup.find('div', class_='your_class_name').text  # Update with relevant class or element
        return extracted_data
    except requests.RequestException as e:
        return jsonify({'error': str(e)}), 500



if __name__ == '__main__':
    app.run(debug=True)
