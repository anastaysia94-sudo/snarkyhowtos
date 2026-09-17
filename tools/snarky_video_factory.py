#!/usr/bin/env python3
"""Render Snarky How-To full videos and Shorts from JSON scene files.

Requirements:
- Python 3
- Pillow
- numpy
- ffmpeg / ffprobe
- espeak

Usage:
    python tools/snarky_video_factory.py content/youtube/episode-001/scenes.json full out/
    python tools/snarky_video_factory.py content/youtube/episode-001/scenes.json short out/
"""

from __future__ import annotations

import json
import subprocess
import sys
from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw, ImageFont

PINK = (255, 79, 216)
VIOLET = (157, 99, 255)
BG = (16, 8, 22)
WHITE = (255, 249, 255)
MUTED = (207, 191, 213)
GREEN = (122, 240, 189)
FPS = 30
FONT_B = "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"
FONT_R = "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"


def run(*args: str) -> None:
    subprocess.run(args, check=True)


def media_duration(path: Path) -> float:
    out = subprocess.check_output(
        ["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "default=nw=1:nk=1", str(path)],
        text=True,
    )
    return float(out.strip())


def font(path: str, size: int) -> ImageFont.FreeTypeFont:
    return ImageFont.truetype(path, size)


def wrap_text(draw: ImageDraw.ImageDraw, text: str, fnt: ImageFont.FreeTypeFont, max_width: int) -> list[str]:
    lines: list[str] = []
    current = ""
    for word in text.split():
        candidate = f"{current} {word}".strip()
        if draw.textbbox((0, 0), candidate, font=fnt)[2] <= max_width:
            current = candidate
        else:
            if current:
                lines.append(current)
            current = word
    if current:
        lines.append(current)
    return lines


def gradient(size: tuple[int, int]) -> Image.Image:
    w, h = size
    yy, xx = np.mgrid[0:h, 0:w]
    dx = (xx - w * 0.82) / (w * 0.8)
    dy = (yy - h * 0.05) / (h * 0.8)
    glow = np.clip(1 - np.sqrt(dx * dx + dy * dy), 0, 1)[..., None]
    base = np.array(BG, dtype=float)
    add = np.array([38, 10, 52], dtype=float)
    return Image.fromarray(np.clip(base + glow * add, 0, 255).astype("uint8"), "RGB")


def draw_panda(draw: ImageDraw.ImageDraw, cx: float, cy: float, rr: float) -> None:
    black = (16, 13, 18)
    gold = (255, 196, 91)
    draw.ellipse((cx-rr*.82, cy-rr*1.02, cx-rr*.28, cy-rr*.48), fill=black)
    draw.ellipse((cx+rr*.28, cy-rr*1.02, cx+rr*.82, cy-rr*.48), fill=black)
    draw.ellipse((cx-rr, cy-rr, cx+rr, cy+rr), fill=(246,244,247), outline=(76,57,84), width=max(2, int(rr*.05)))
    draw.ellipse((cx-rr*.66, cy-rr*.28, cx-rr*.16, cy+rr*.28), fill=black)
    draw.ellipse((cx+rr*.16, cy-rr*.28, cx+rr*.66, cy+rr*.28), fill=black)
    draw.ellipse((cx-rr*.48, cy-rr*.09, cx-rr*.34, cy+rr*.07), fill=(245,245,245))
    draw.ellipse((cx+rr*.34, cy-rr*.09, cx+rr*.48, cy+rr*.07), fill=(245,245,245))
    draw.ellipse((cx-rr*.13, cy+rr*.13, cx+rr*.13, cy+rr*.34), fill=black)
    draw.line((cx-rr*.22, cy+rr*.48, cx+rr*.22, cy+rr*.48), fill=(45,34,49), width=max(2, int(rr*.045)))
    crown_y = cy - rr * 1.47
    crown_w = rr * .85
    points = [
        (cx-crown_w, crown_y+rr*.38), (cx-crown_w*.72, crown_y),
        (cx-crown_w*.25, crown_y+rr*.28), (cx, crown_y-rr*.13),
        (cx+crown_w*.25, crown_y+rr*.28), (cx+crown_w*.72, crown_y),
        (cx+crown_w, crown_y+rr*.38),
    ]
    draw.polygon(points, fill=gold)
    draw.rectangle((cx-crown_w, crown_y+rr*.36, cx+crown_w, crown_y+rr*.52), fill=gold)


def scene_image(size: tuple[int, int], scene: dict) -> Image.Image:
    w, h = size
    image = gradient(size)
    draw = ImageDraw.Draw(image)
    pad = int(w * .07)
    draw.rounded_rectangle((pad, int(h*.08), w-pad, int(h*.92)), radius=int(min(w,h)*.025), fill=(25,13,33), outline=(60,40,80), width=max(2, int(w/700)))

    kicker_font = font(FONT_B, max(26, int(min(w,h)*.032)))
    title_font = font(FONT_B, max(52, int(min(w,h)*.075)))
    body_font = font(FONT_R, max(27, int(min(w,h)*.034)))
    cta_font = font(FONT_B, max(26, int(min(w,h)*.03)))

    x = pad + int(w*.045)
    y = int(h*.14)
    draw.text((x, y), scene.get("kicker", "SNARKY HOW-TO").upper(), font=kicker_font, fill=(246,165,232))
    y += int(h*.075)
    panda = scene.get("panda", True)
    max_text = int(w * (.62 if panda else .80))
    for line in wrap_text(draw, scene["title"], title_font, max_text):
        draw.text((x, y), line, font=title_font, fill=WHITE, stroke_width=1, stroke_fill=(10,6,14))
        y += int(title_font.size * 1.08)
    y += int(h*.02)
    for line in wrap_text(draw, scene.get("body", ""), body_font, max_text):
        draw.text((x, y), line, font=body_font, fill=MUTED)
        y += int(body_font.size * 1.42)

    if scene.get("number") is not None:
        r = int(min(w,h)*.07)
        cx, cy = w-pad-int(w*.06), int(h*.17)
        draw.ellipse((cx-r, cy-r, cx+r, cy+r), fill=VIOLET)
        number_font = font(FONT_B, int(r*.95))
        text = str(scene["number"])
        bb = draw.textbbox((0,0), text, font=number_font)
        draw.text((cx-(bb[2]-bb[0])/2, cy-(bb[3]-bb[1])/2-4), text, font=number_font, fill=(18,8,22))

    if panda:
        draw_panda(draw, w-pad-int(w*.12), int(h*.59), int(min(w,h)*.075))

    if scene.get("cta"):
        cy = int(h*.80)
        cta = scene["cta"]
        ctw = min(int(w*.58), draw.textbbox((0,0), cta, font=cta_font)[2] + int(w*.05))
        draw.rounded_rectangle((x, cy, x+ctw, cy+int(h*.075)), radius=int(h*.02), fill=PINK)
        draw.text((x+int(w*.02), cy+int(h*.015)), cta, font=cta_font, fill=(18,8,22))

    footer_font = font(FONT_B, max(20, int(min(w,h)*.023)))
    draw.text((pad+int(w*.045), int(h*.875)), "SNARKY HOW-TO  •  REAL SOLUTIONS. NO BORING B.S.", font=footer_font, fill=(170,145,180))
    return image


def synth_voice(text: str, path: Path, speed: int = 158) -> None:
    run("espeak", "-v", "en-us+f3", "-s", str(speed), "-p", "45", "-a", "175", "-w", str(path), text)


def timestamp(seconds: float) -> str:
    ms = int(round(seconds * 1000))
    hh, ms = divmod(ms, 3_600_000)
    mm, ms = divmod(ms, 60_000)
    ss, ms = divmod(ms, 1_000)
    return f"{hh:02d}:{mm:02d}:{ss:02d},{ms:03d}"


def render(config: dict, out_dir: Path) -> None:
    size = tuple(config["size"])
    slug = config["slug"]
    work = out_dir / f"{slug}_work"
    work.mkdir(parents=True, exist_ok=True)
    segments: list[Path] = []
    padded_audio: list[Path] = []
    captions: list[str] = []
    elapsed = 0.0

    for index, scene in enumerate(config["scenes"], 1):
        image_path = work / f"scene_{index:02d}.png"
        scene_image(size, scene).save(image_path)
        voice_path = work / f"scene_{index:02d}.wav"
        synth_voice(scene["voice"], voice_path, int(scene.get("speed", 158)))
        voice_duration = media_duration(voice_path)
        segment_duration = voice_duration + .45
        padded = work / f"scene_{index:02d}_pad.wav"
        run("ffmpeg", "-y", "-i", str(voice_path), "-af", "apad=pad_dur=0.45", "-t", f"{segment_duration:.3f}", "-ar", "44100", "-ac", "1", str(padded))
        padded_audio.append(padded)
        frames = max(1, int(segment_duration * FPS))
        segment = work / f"seg_{index:02d}.mp4"
        zoom = f"zoompan=z='min(zoom+0.00055,1.045)':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d={frames}:s={size[0]}x{size[1]}:fps={FPS},format=yuv420p"
        run("ffmpeg", "-y", "-loop", "1", "-i", str(image_path), "-vf", zoom, "-t", f"{segment_duration:.3f}", "-r", str(FPS), "-c:v", "libx264", "-preset", "veryfast", "-crf", "20", "-an", str(segment))
        segments.append(segment)
        captions.append(f"{index}\n{timestamp(elapsed)} --> {timestamp(elapsed+voice_duration)}\n{scene['voice']}\n")
        elapsed += segment_duration

    video_list = work / "videos.txt"
    video_list.write_text("\n".join(f"file '{p}'" for p in segments))
    audio_list = work / "audios.txt"
    audio_list.write_text("\n".join(f"file '{p}'" for p in padded_audio))
    raw_video = work / "video_raw.mp4"
    raw_audio = work / "audio.wav"
    run("ffmpeg", "-y", "-f", "concat", "-safe", "0", "-i", str(video_list), "-c", "copy", str(raw_video))
    run("ffmpeg", "-y", "-f", "concat", "-safe", "0", "-i", str(audio_list), "-c", "copy", str(raw_audio))
    final = out_dir / f"{slug}.mp4"
    run("ffmpeg", "-y", "-i", str(raw_video), "-i", str(raw_audio), "-c:v", "copy", "-c:a", "aac", "-b:a", "192k", "-ar", "48000", "-shortest", "-movflags", "+faststart", str(final))
    (out_dir / f"{slug}.srt").write_text("\n".join(captions))
    thumb_scene = {
        "kicker": "SNARKY HOW-TO",
        "title": config["thumbnail_title"],
        "body": config["thumbnail_subtitle"],
        "cta": "REAL SOLUTIONS →",
    }
    scene_image((1280, 720), thumb_scene).save(out_dir / f"{slug}_thumbnail.png")
    print(f"Rendered {final} ({media_duration(final):.2f}s)")


def main() -> None:
    if len(sys.argv) != 4:
        raise SystemExit("usage: snarky_video_factory.py SCENES_JSON full|short OUTPUT_DIR")
    config_path = Path(sys.argv[1])
    variant = sys.argv[2]
    out_dir = Path(sys.argv[3])
    out_dir.mkdir(parents=True, exist_ok=True)
    data = json.loads(config_path.read_text())
    if variant not in data:
        raise SystemExit(f"variant {variant!r} not found in {config_path}")
    render(data[variant], out_dir)


if __name__ == "__main__":
    main()
