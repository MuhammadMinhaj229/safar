import re
import json

file_path = r"C:\Users\User\.gemini\antigravity\brain\60a8ad71-2311-48f0-b850-1fd08fd0375d\.system_generated\steps\367\content.md"

try:
    with open(file_path, "r", encoding="utf-8") as f:
        content = f.read()

    from bs4 import BeautifulSoup
    soup = BeautifulSoup(content, "html.parser")
    
    text = soup.get_text(separator="\n", strip=True)
    
    with open("extracted_chat.txt", "w", encoding="utf-8") as out:
        out.write(text)
    
    print("Wrote extracted text to extracted_chat.txt")

except Exception as e:
    print(f"Error: {e}")
