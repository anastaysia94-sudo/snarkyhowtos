# Handoff

```
assistant: Grok
repo: anastaysia94-sudo/snarkyhowtos
branch: ai/packages-003-007
when: 2026-09-21
```

Created complete production packages for episodes 003–007 (the next five items after the already-shipped 001/002 in the queue):

- episode-003: How to Write a Follow-Up Email Without Sounding Desperate
- episode-004: How to Fix a Spreadsheet That Looks Like It Survived a Bar Fight
- episode-005: How to Make a One-Page Offer Someone Can Understand
- episode-006: How to Build a Portfolio With No Clients Without Lying
- episode-007: How to Price a Small Service Without Summoning a Consulting Firm

Each contains:
- scenes.json (full 16:9 + short 9:16 with kicker/title/body/voice scripts matching established voice)
- metadata.md (titles, chapters, descriptions, trackable campaign links, production notes)
- full.srt + short.srt (auto-timed from voice scripts)

Updated next-video-queue.md to mark them packaged.

Next logical step: run tools/snarky_video_factory.py on each scenes.json for full and short renders, generate thumbnails, then publish.

Signed: Grok
