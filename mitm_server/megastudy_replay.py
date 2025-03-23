import requests

def login_to_megastudy(loginid, loginpw):
    url = "https://www.megastudy.net/main/login_sql.asp"

    headers = {
        "Host": "www.megastudy.net",
        "Origin": "https://www.megastudy.net",
        "Referer": "https://www.megastudy.net/MegaStudy.asp",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
        "Content-Type": "application/x-www-form-urlencoded",
        "Accept-Language": "ko-KR,ko;q=0.9",
        "Accept-Encoding": "gzip, deflate, br",
        "Connection": "keep-alive"
    }

    data = {
        "com_info": "",
        "com_os": "",
        "com_directx": "",
        "com_playerv": "",
        "login_stroke": "",
        "com_mac": "",
        "com_ip": "",
        "ret_url": "",
        "mode": "layer",
        "logintp": "S",
        "loginid": loginid,
        "loginpw": loginpw
    }

    response = requests.post(url, headers=headers, data=data)
    set_cookie = response.headers.get("Set-Cookie", "")

    raw_ck_user_info = None
    cookies = set_cookie.split(", ")
    for cookie in cookies:
        if cookie.startswith("CK%5FUSER%5FINFO="):
            raw_ck_user_info = cookie.split(";")[0]
            break

    if raw_ck_user_info:
        value_only = raw_ck_user_info.split("=", 1)[1]
        return value_only
    else:
        return None
