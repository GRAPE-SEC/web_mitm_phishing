import os

def convert_to_utf8(root_dir):
    for root, _, files in os.walk(root_dir):
        for file in files:
            if file.endswith(".html") or file.endswith(".js") or file.endswith(".css"):  # 필요에 따라 확장자 조정
                file_path = os.path.join(root, file)
                try:
                    with open(file_path, "r", encoding="euc-kr") as f:
                        content = f.read()
                    with open(file_path, "w", encoding="utf-8") as f:
                        f.write(content)
                    print(f"Converted: {file_path}")
                except Exception as e:
                    print(f"❌ Error with {file_path}: {e}")

# 사용법: 현재 디렉토리에 있는 'static/megastudy_htttrack' 폴더를 변환
convert_to_utf8("static/megastudy_htttrack")
