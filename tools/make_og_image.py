#!/usr/bin/env python3
"""Generate raster social cards (PNG) from the Snarky brand system.

Social crawlers that reject SVG og:images get these instead. Upload the PNG
to the custom-domain host (or any stable public URL) and point og:image at it.

Usage:
    python tools/make_og_image.py out/
    # writes out/og-image.png (1200x630) and out/favicon-512.png (512x512)
"""

from __future__ import annotations

import os
import sys
from pathlib import Path

FONT_CANDIDATES = [
    "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf",
    "/usr/share/fonts/truetype/liberation/LiberationSans-Bold.ttf",
]


def pick_font() -> str:
    for p in FONT_CANDIDATES:
        if os.path.exists(p):
            return p
    raise SystemExit("No usable font found for OG image.")


def main() -> None:
    if len(sys.argv) != 2:
        raise SystemExit("usage: make_og_image.py OUTPUT_DIR")
    from PIL import Image, ImageDraw, ImageFont  # lazy: keeps --help/py_compile light

    out = Path(sys.argv[1])
    out.mkdir(parents=True, exist_ok=True)
    font_path = pick_font()

    card = Image.new("RGB", (1200, 630), (16, 8, 22))
    d = ImageDraw.Draw(card)
    d.rounded_rectangle((60, 60, 1140, 570), radius=28, outline=(60, 40, 80), width=3)
    d.text((110, 120), "SNARKY HOW-TO", font=ImageFont.truetype(font_path, 44), fill=(246, 165, 232))
    d.text((110, 210), "Pick a service you", font=ImageFont.truetype(font_path, 88), fill=(255, 249, 255))
    d.text((110, 310), "can sell TODAY.", font=ImageFont.truetype(font_path, 88), fill=(255, 249, 255))
    d.text((110, 440), "Real solutions. No boring B.S.", font=ImageFont.truetype(font_path, 40), fill=(207, 191, 213))
    card.save(out / "og-image.png")

    icon = Image.new("RGB", (512, 512), (16, 8, 22))
    d = ImageDraw.Draw(icon)
    d.ellipse((96, 150, 200, 250), fill=(16, 13, 18))
    d.ellipse((312, 150, 416, 250), fill=(16, 13, 18))
    d.ellipse((126, 170, 386, 430), fill=(246, 244, 247))
    d.ellipse((176, 260, 236, 340), fill=(16, 13, 18))
    d.ellipse((276, 260, 336, 340), fill=(16, 13, 18))
    d.polygon([(176, 130), (206, 60), (236, 120), (256, 55), (276, 120), (306, 60), (336, 130)], fill=(255, 196, 91))
    icon.save(out / "favicon-512.png")
    print(f"Wrote {out / 'og-image.png'} and {out / 'favicon-512.png'}")


if __name__ == "__main__":
    main()
