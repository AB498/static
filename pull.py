def git_pull():
    dirs = ["./"]
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
            res += subprocess.run(['git', 'fetch', '--all'] , text=True, check=True, timeout=10).stdout or "pulled\n"
            res += subprocess.run(['git', 'reset', '--hard', 'origin/main'], text=True, check=True, timeout=10).stdout or "Success"
            return res
        except Exception as e:
            return f"{e}"
        

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

repeat_pull()