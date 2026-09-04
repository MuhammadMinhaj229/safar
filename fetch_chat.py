import asyncio
from playwright.async_api import async_playwright

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        page = await browser.new_page()
        await page.goto("https://chatgpt.com/share/6a892230-0e5c-83e8-b69d-e0a3ca1c84bc", wait_until="networkidle")
        
        # Give it a couple of seconds to render
        await page.wait_for_timeout(2000)
        
        # Get all text from the body
        text = await page.evaluate('document.body.innerText')
        with open("chat_content_playwright.txt", "w", encoding="utf-8") as f:
            f.write(text)
        print("Extracted text successfully.")
        
        await browser.close()

if __name__ == "__main__":
    asyncio.run(main())
