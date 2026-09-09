"""
Generate QR codes for every plant in data/plants.json.

Each QR code contains the complete GitHub Pages URL so that it can
be scanned directly from any mobile phone.
"""

import json
import os

import qrcode
from qrcode.constants import ERROR_CORRECT_H


# Your GitHub Pages website URL
BASE_URL = "https://negirahul1729.github.io/Negi-Smart-Garden"

# Folder where QR codes will be saved
OUT_DIR = os.path.join("images", "qr_codes")


def main():
    # Load plant data
    with open(
        os.path.join("data", "plants.json"),
        "r",
        encoding="utf-8"
    ) as file:
        plants = json.load(file)

    # Create QR code folder if it doesn't exist
    os.makedirs(OUT_DIR, exist_ok=True)

    # Generate QR code for each plant
    for plant in plants:
        plant_id = plant["id"]
        plant_name = plant["name"]

        # Create the complete URL
        url = f"{BASE_URL}/plant.html?id={plant_id}"

        # Create QR code
        qr = qrcode.QRCode(
            version=None,
            error_correction=ERROR_CORRECT_H,
            box_size=10,
            border=4,
        )

        qr.add_data(url)
        qr.make(fit=True)

        # Generate QR image
        img = qr.make_image(
            fill_color="black",
            back_color="white"
        )

        # Save QR code
        out_path = os.path.join(
            OUT_DIR,
            f"{plant_id}_qr.png"
        )

        img.save(out_path)

        print(f"[OK] {plant_name} -> {url}")

    print("\n========================================")
    print(f"Successfully generated {len(plants)} QR codes!")
    print(f"Saved in: {OUT_DIR}")
    print("========================================")


if __name__ == "__main__":
    main()
