import re
import json

file_path = r"C:\Users\User\.gemini\antigravity\brain\60a8ad71-2311-48f0-b850-1fd08fd0375d\.system_generated\steps\367\content.md"

with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

def extract_messages():
    # Try finding remix context
    match = re.search(r'window\.__remixContext\s*=\s*(\{.*?\});\s*</script>', content, re.DOTALL)
    if match:
        data_str = match.group(1)
        try:
            data = json.loads(data_str)
            with open("chat_data.json", "w", encoding="utf-8") as out:
                json.dump(data, out, indent=2)
            print("Successfully extracted window.__remixContext to chat_data.json")
            return
        except json.JSONDecodeError as e:
            print("Failed to decode remixContext JSON:", e)

    # Try next data
    match2 = re.search(r'<script id="__NEXT_DATA__" type="application/json">(.*?)</script>', content, re.DOTALL)
    if match2:
        data_str = match2.group(1)
        try:
            data = json.loads(data_str)
            with open("chat_data.json", "w", encoding="utf-8") as out:
                json.dump(data, out, indent=2)
            print("Successfully extracted __NEXT_DATA__ to chat_data.json")
            return
        except json.JSONDecodeError as e:
            print("Failed to decode NEXT_DATA JSON:", e)

    # Try searching for all "text": "..." within the string to at least dump everything
    print("Could not find standard context. Dumping 'text' matches.")
    matches = re.finditer(r'"text":\s*"((?:\\.|[^"\\])*)"', content)
    texts = [m.group(1) for m in matches]
    
    # Also dump "parts": ["..."] 
    matches_parts = re.finditer(r'"parts":\s*\[\s*"((?:\\.|[^"\\])*)"\s*\]', content)
    parts = [m.group(1) for m in matches_parts]
    
    with open("chat_data.txt", "w", encoding="utf-8") as out:
        out.write("TEXTS:\n" + "\n---\n".join(texts) + "\n\nPARTS:\n" + "\n---\n".join(parts))
    print("Dumped raw matches to chat_data.txt")

extract_messages()
