"""
Generate an individual QR code for each plant in data/plants.json.

The QR code points to plant.html?id=<plant_id> so a visitor can scan it
in the garden and instantly open the plant's detail page.

Usage:
    python generate_qr.py [base_url]

    base_url (optional): e.g. https://yourdomain.github.io
    If omitted, codes use a relative URL "plant.html?id=..." which works
    when the site is hosted; you can regenerate with a full URL later.
"""

import json
import os
import sys

import qrcode
from qrcode.constants import ERROR_CORRECT_H

BASE_URL = sys.argv[1].rstrip("/") if len(sys.argv) > 1 else ""
OUT_DIR = os.path.join("images", "qr_codes")


def main():
    with open(os.path.join("data", "plants.json"), encoding="utf-8") as f:
        plants = json.load(f)

    os.makedirs(OUT_DIR, exist_ok=True)

    for plant in plants:
        # Build the URL the QR should encode
        if BASE_URL:
            url = f"{BASE_URL}/plant.html?id={plant['id']}"
        else:
            url = f"plant.html?id={plant['id']}"

        qr = qrcode.QRCode(
            version=None,
            error_correction=ERROR_CORRECT_H,
            box_size=10,
            border=4,
        )
        qr.add_data(url)
        qr.make(fit=True)

        img = qr.make_image(fill_color="black", back_color="white")
        out_path = os.path.join(OUT_DIR, f"{plant['id']}_qr.png")
        img.save(out_path)

        print(f"[OK] {plant['name']:<22} -> {out_path}  ({url})")

    print(f"\nGenerated {len(plants)} QR codes in '{OUT_DIR}'.")


if __name__ == "__main__":
    main()
