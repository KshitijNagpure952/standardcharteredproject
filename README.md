
import os
import re
from pathlib import Path
from urllib.parse import urlparse, parse_qs
import requests

# Replace these with your actual values
BASE_URL = "https://confluence.company.com/confluence"
PAGE_URL = "https://confluence.company.com/confluence/pages/viewpage.action?pageId=123456"
OUTPUT_FOLDER = Path(r"C:\Users\YourUsername\Documents\ConfluenceExports")

# Create a Personal Access Token if your company permits it.
TOKEN = os.getenv("CONFLUENCE_PAT")

OUTPUT_FOLDER.mkdir(parents=True, exist_ok=True)

# Extract page ID from the URL
parsed = urlparse(PAGE_URL)
params = parse_qs(parsed.query)
page_ids = params.get("pageId", [])

if not page_ids:
    raise ValueError(
        "No pageId found. Check your Confluence page URL."
    )

page_id = page_ids[0]

if not TOKEN:
    raise RuntimeError(
        "Set the CONFLUENCE_PAT environment variable first."
    )

# Request the native Word export
session = requests.Session()
session.headers.update({
    "Authorization": f"Bearer {TOKEN}",
    "Accept": "*/*",
})

export_url = f"{BASE_URL.rstrip('/')}/exportword"
response = session.get(
    export_url,
    params={"pageId": page_id},
    timeout=120,
    allow_redirects=True,
)

response.raise_for_status()

# Avoid saving an authentication/login page as a Word file.
content_type = response.headers.get("Content-Type", "").lower()
if "text/html" in content_type:
    if b"<html" in response.content[:1000].lower():
        raise RuntimeError(
            "Received HTML instead of a Word export. "
            "Authentication, redirects, or the export endpoint "
            "may need adjustment."
        )

# Confluence's legacy exporter may produce a .doc file,
# rather than a modern .docx file.
output_file = OUTPUT_FOLDER / f"confluence_page_{page_id}.doc"
output_file.write_bytes(response.content)

print(f"Export saved to: {output_file}")
print(f"Downloaded {len(response.content)} bytes")
