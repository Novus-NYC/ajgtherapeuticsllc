"""Optimize the AJG source media into self-hosted assets under public/media.

Usage: python3 -I scripts/prepare-media.py <downloaded-media-dir> <public-media-dir>

Source files are the original site's Canva exports, fetched with
scripts/fetch-media.sh. Names below map hashed originals to readable names.
"""
import os
import sys

from PIL import Image

SRC, OUT = sys.argv[1], sys.argv[2]
os.makedirs(os.path.join(OUT, "logos"), exist_ok=True)

# name: (source file, max long edge, optional crop box as fractions l,t,r,b)
PHOTOS = {
    "founder": ("75083a83d80481bed51a8fa30df6f622.jpg", 1400, None),
    "award-night": ("873fe53b769c1b6a36b7737bf17df076.jpg", 1400, None),
    "award-crystal": ("6ae18bf5266a2a61b5bba93bbea79f63.jpg", 1200, None),
    "lets-talk-peace": ("4fc802737ed98fd0429e6dd2a4265684.jpg", 1400, None),
    "telemundo-segment": ("ffdd2dfa610eb24ccf8b068ef0b56ffb.jpg", 1200, None),
    "nbcuniversal": ("d64be87c3509121911f6403ed36eebe0.jpg", 723, None),
    "project-beauty": ("5b1be5d46de49f9b3a915f6e998b8ec5.png", 467, None),
    "youth-talk": ("813b7caa75a4a0fef2d299b863e4ae3e.jpg", 800, None),
    "career-day": ("3f8f4535d6f2c4584940c35257f93d37.jpg", 1600, None),
    # Phone screenshots: trim the black letterbox bars.
    "group-circle": ("ce5a73ab98da9eab75dca75605eab119.png", 1400, (0, 0.2, 1, 0.8)),
    "graduation": ("8c6d739f420b8e85227826edf72dec71.png", 1400, (0, 0.335, 1, 0.66)),
    "clinton-note": ("ed173762429a25f04a71c1eb82d4a600.jpg", 1400, None),
    "chcf-letter": ("66f2b1edaa8c8d1cc22b048dcac32d74.jpg", 1600, None),
    "summit-flyer": ("966fb68a8719e789d716aea42b36679f.jpg", 1400, None),
}

LOGOS = {
    "telemundo": ("08aceffb9c42c06f4127e502b4e164df.jpg", None),
    "univision": ("35fad78e1b23e33eb0cf51d7d0d94d29.jpg", None),
    "acacia-network": ("0c92eea07fa7d12bca744ee6cccd2a29.jpg", None),
    "acdp": ("183eec4feed1b4d7ce85f9a499382569.jpg", None),
    "nasw": ("2edea77013ad65fce40e9e031044a404.jpg", None),
    "bronx-collective": ("8557c4877a89ab7c61d9ed0d2ec22fbd.png", (0.05, 0.12, 0.95, 0.88)),
    "bronx-chamber": ("7e01d60dbcdd77b40be8c158601e0b49.jpg", (0, 0.2, 1, 1)),
    "nyc-doc": ("dbcdf063bc993f73f14f9254b9ecb48d.jpg", None),
    "lswc": ("f42e3705ad0f09977429566adf1f3ec1.jpg", None),
}


def load(name, crop):
    im = Image.open(os.path.join(SRC, name))
    if im.mode in ("P", "RGBA", "LA"):
        bg = Image.new("RGB", im.size, "white")
        rgba = im.convert("RGBA")
        bg.paste(rgba, mask=rgba.split()[3])
        im = bg
    im = im.convert("RGB")
    if crop:
        w, h = im.size
        im = im.crop((int(crop[0] * w), int(crop[1] * h), int(crop[2] * w), int(crop[3] * h)))
    return im


for out, (src, edge, crop) in PHOTOS.items():
    im = load(src, crop)
    im.thumbnail((edge, edge), Image.LANCZOS)
    im.save(os.path.join(OUT, f"{out}.jpg"), quality=82, optimize=True, progressive=True)
    print(out, im.size)

for out, (src, crop) in LOGOS.items():
    im = load(src, crop)
    im.thumbnail((640, 640), Image.LANCZOS)
    im.save(os.path.join(OUT, "logos", f"{out}.png"), optimize=True)
    print("logo", out, im.size)
